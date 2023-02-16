<template>
  <div>
    <ThreedsModal :is-shown="threedAuthModal" :hide-modal="() => toggleThreedAuthModal(false)">
      <template v-slot:body>
        <iframe
          :src="threedAuthUrl"
          scrolling="yes"
          allowtransparency="true"
          class="lightwidget-widget"
          style="width: 100%; height: 100%; border: 0; overflow: hidden"
        ></iframe>
      </template>
    </ThreedsModal>

    <!-- Leave route popout warning -->
    <div v-show="showLeaveModal" class="modal" @click="toggleShowLeaveModal">
      <div class="modal-content" @click.stop="">
        <div class="close-button-container">
          <span class="close-button" @click="toggleShowLeaveModal">X</span>
        </div>

        <div class="checkout-title" :style="{ marginBottom: '20px' }">You’re about to leave checkout.</div>
        <p>Leaving so soon? We’ll save your cart for you.</p>

        <div
          :style="{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '20px',
          }"
        >
          <button class="submit-button tw-w-full tw-mt-5" @click="leavePage">LEAVE CHECKOUT</button>
        </div>

        <span class="textLink" @click="toggleShowLeaveModal">Stay and continue checkout.</span>
      </div>
    </div>

    <div>
      <div v-if="containsPrescibedItem && selectedOption === 'CreditCard'" class="payment-remark tw-text-bismark">
        Your payment will be held until consultation with a doctor is complete.
      </div>
      <div class="label">Payment method</div>
      <payment-option
        name="Credit / Debit card"
        :selected="selectedOption === 'CreditCard'"
        class="tw-mb-1"
        @click="onOptionChange('CreditCard')"
      >
        <template v-slot:append>
          <img class="card-icon tw-mr-2" :src="require('@/assets/images/visa.png')" alt="visa card icon" />
          <img class="card-icon" :src="require('@/assets/images/mastercard.png')" alt="mastercard icon" />
        </template>
      </payment-option>
      <payment-option
        v-if="isAtomeEnabled"
        name="Atome"
        description="3 easy payments, 0% interest"
        :selected="selectedOption === 'Atome'"
        @click="onOptionChange('Atome')"
      >
        <template v-slot:append>
          <img
            class="card-icon atome-scale"
            :src="require('@/assets/images/atome/atome_transparent.png')"
            alt="atome icon"
          />
        </template>
      </payment-option>
      <div v-if="selectedOption !== undefined && paymentDetails">
        <div class="tw-text-xl tw-font-bold tw-my-4">Payment Details</div>
        <p v-if="selectedOption === 'GRAB'">You will be redirected for authentication with Grab.</p>
      </div>

      <transition name="component-fade" mode="out-in">
        <component
          :is="paymentDetails"
          ref="paymentDetails"
          :stripe="stripe"
          :has-subscription="checkSubscription"
          :has-error="atomeCardMissing"
          @ready="onSelectPaymentMethod"
          @atome="hasCreditCard"
        />
      </transition>
      <div class="tw-mt-4">
        <Checkbox
          id="terms & conditions"
          :error="checkboxError"
          :label="'I agree to the Terms and Conditions'"
          :link="'/terms-&-conditions'"
          :checked="terms"
          :error-message="`You'll need to agree to our Terms & Conditions before making your payment.`"
          @checked="checkTerm"
        />
      </div>
      <div v-show="errorMessage" class="error-message">{{ errorMessage }}</div>
      <div class="actions">
        <button
          v-if="!paymentLoading"
          :class="`submit-button tw-w-full disabled:${submitDisabled}`"
          :disabled="selectedOption === undefined || submitDisabled"
          :style="selectedOption === undefined ? { backgroundColor: 'grey', cursor: 'not-allowed' } : ''"
          @click="onSubmit"
        >
          PROCEED&nbsp;WITH&nbsp;PAYMENT
        </button>
        <Loading v-else />
      </div>
    </div>
    <atome-alert-modal :key="atomeAlert" v-model="atomeAlert" :url="atomeUrl" />
  </div>
</template>

<script>
import Checkbox from '@/components/Checkbox'
import Loading from '@/components/Loading'
import { loadStripe } from '@stripe/stripe-js'
import {
  createTransaction,
  getStripePaymentMethods,
  payStripePaymentMethod,
  removeStripePaymentMethod,
} from '@/api/transactions'
import { getOrderById, createOrder } from '@/api/orders'
import { formatMetaTags } from '@/utils/prettify.js'
import PaymentOption from '@/modules/Checkout/components/PaymentOption'
import PaymentOptionCreditCard from '@/modules/Checkout/components/PaymentOptionDetailsCC.vue'
import PaymentOptionFPX from '@/modules/Checkout/components/PaymentOptionDetailsFPX.vue'
import PaymentOptionAtome from '@/modules/Checkout/components/PaymentOptionDetailsAtome.vue'
import AtomeAlertModal from './Atome/PaymentAlertModal.vue'
import { AtomeService } from '@/api/atome'
import CardDetails from '@/modules/Dashboard/MyAccount/MyDetails/CardDetails.vue'
import { trackOrderCreated } from '@/utils/analytics'
import ThreedsModal from '@/components/ThreedsModal.vue'

const paymentDetailsComponents = {
  CreditCard: PaymentOptionCreditCard,
  FPX: PaymentOptionFPX,
  GRAB: null,
  Atome: PaymentOptionAtome,
}

export default {
  name: 'Payment',
  beforeRouteLeave(to, from, next) {
    if (to.name === 'Appointment') {
      this.showLeaveModal = false
      this.fromLeaveButton = false
      next()
    } else if (to.name !== 'Success') {
      if (this.fromLeaveButton) {
        this.showLeaveModal = false
        this.fromLeaveButton = false
        next()
      } else {
        this.showLeaveModal = true
        this.leavingRoutePath = to.path
      }
    } else {
      next()
    }
  },
  metaInfo() {
    return formatMetaTags({
      title: 'Payment',
      urlPath: this.$route.path,
    })
  },
  components: {
    Checkbox,
    PaymentOption,
    Loading,
    PaymentOptionCreditCard,
    PaymentOptionFPX,
    PaymentOptionAtome,
    AtomeAlertModal,
    CardDetails,
    ThreedsModal,
  },
  props: {
    shippingNote: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      submitDisabled: false,
      selectedOption: 'CreditCard',
      clientSecret: undefined,
      saveCard: false,
      terms: true,
      checkboxError: false,
      order: '',
      containsPrescibedItem: false,
      showLeaveModal: false,
      leavingRoutePath: null,
      fromLeaveButton: false,
      errorMessage: null,
      atomeAlert: false,
      atomeUrl: '',
      paymentLoading: false,
      selectedPaymentMethod: null,
      stripe: null,
      paymentDetails: null,
      atomeAllowedDomains: [],
      atomeHasCreditCard: false,
      atomeCardMissing: false,
      threedAuthUrl: '',
      threedAuthModal: false,
    }
  },
  computed: {
    isAtomeEnabled() {
      const email = this.$store.state?.userProfile?.email
      const domain = email ? email.split('@').pop() : ''
      return this.atomeAllowedDomains.includes(domain) || this.atomeAllowedDomains.includes('*')
    },
    cart() {
      return this.$store.state.cart
    },
    currentPendingPayment() {
      return this.$store.state.currentPendingPayment
    },
    checkSubscription() {
      const hasSubscription = this.$store.state.cart.cart.cart_product_option_prices.some((product) => {
        const {
          product_option_price: { sub_duration_refresh },
        } = product
        return !!sub_duration_refresh
      })
      return hasSubscription
    },
    selectedAddress() {
      return this.$store.state.selectedAddress
    },
    deliveryOptionId() {
      return this.$store.state.deliveryOptionId
    },
  },
  watch: {
    terms(val) {
      if (val) {
        this.checkboxError = false
      }
    },
  },
  async mounted() {
    // this.loadPaymentMethods();
    this.stripe = await loadStripe(process.env.VUE_APP_STRIPE_PUBLISH_KEY)
    this.onOptionChange(this.selectedOption)
    this.atomeAllowedDomains = JSON.parse(process.env.VUE_APP_ATOME_ALLOWED_DOMAINS ?? null) ?? []

    // Listener for 3ds message
    window.addEventListener('message', this.handle3dsComplete, false)
  },
  methods: {
    handle3dsComplete: async function (ev) {
      if (ev.data !== '3DS-authentication-complete') {
        return
      }
      this.toggleThreedAuthModal(false)

      try {
        const result = await this.stripe.retrievePaymentIntent(this.clientSecret)

        if (result.error) {
          this.errorMessage = result.error.message
        } else {
          if (result.paymentIntent.status === 'succeeded') {
            this.$emit('step-completed', this.order.id)
          } else if (result.paymentIntent.status === 'requires_payment_method') {
            this.errorMessage = 'Authentication failed'
          }
        }
      } catch (err) {
        this.errorMessage = 'Authentication failed'
      }
    },
    toggleThreedAuthModal(value) {
      this.threedAuthModal = value
    },
    hasCreditCard(value) {
      this.atomeHasCreditCard = value
    },
    leavePage() {
      this.fromLeaveButton = true

      this.$router.replace(this.leavingRoutePath)
    },
    checkTerm() {
      this.terms = !this.terms
    },
    async getOrderInfo() {
      const orderId = this.currentPendingPayment

      let order = await getOrderById(orderId).then((rsp) => {
        return rsp?.data?.response?.order ?? null
      })
      this.order = order
      return order
    },
    changeSaveCard() {
      this.saveCard = !this.saveCard
    },
    toggleShowLeaveModal() {
      this.showLeaveModal = !this.showLeaveModal
    },
    onOptionChange(value) {
      this.submitDisabled = true
      this.errorMessage = ''
      this.selectedOption = value
      this.paymentDetails = paymentDetailsComponents[value]
      this.submitDisabled = false
    },
    async onSubmit() {
      this.paymentLoading = true
      this.errorMessage = ''

      const isOrderCreated = await this.createOrderAndTransaction()
      if (!isOrderCreated) {
        this.submitDisabled = false
        this.paymentLoading = false
        return
      }

      const generalError = 'Oops, something went wrong. try again later.'
      if (!this.terms) {
        this.checkboxError = true
        return
      }

      if (this.selectedPaymentMethod) {
        this.submitDisabled = true
        this.errorMessage = null

        payStripePaymentMethod({
          payment_method_id: this.selectedPaymentMethod.id,
          order_id: this.currentPendingPayment,
          return_url: location.origin + '/order/processing',
        })
          .then(async (response) => {
            if (response.data.response?.payment_intent?.next_action?.redirect_to_url?.url) {
              this.toggleThreedAuthModal(true)
              this.threedAuthUrl = response.data.response?.payment_intent?.next_action?.redirect_to_url?.url
            } else if (!response.data.error) {
              this.$emit('step-completed', this.order.id)
            }
          })
          .catch(({ response: { data } }) => {
            this.errorMessage = data.userMessage ? data.userMessage : generalError
          })
          .finally(() => {
            this.submitDisabled = false
            this.paymentLoading = false
          })
      } else {
        // localStorage.setItem('productOptions',JSON.stringify(this.$store.state.cart.cart.cart_product_option_prices));
        this.submitDisabled = true

        let payload
        if (this.selectedOption === 'CreditCard') {
          this.errorMessage = 'Please enter and save your credit card details'
          this.submitDisabled = false
          this.paymentLoading = false
          return
        } else if (this.selectedOption === 'FPX') {
          const card = this.$refs.paymentDetails.getCard()
          payload = await this.stripe.confirmFpxPayment(this.clientSecret, {
            payment_method: { fpx: card },
            return_url: location.origin + process.env.VUE_APP_BASE_ROUTE + '/order?order_id=' + this.order.id,
          })
        } else if (this.selectedOption === 'GRAB') {
          payload = await this.stripe.confirmGrabPayPayment(this.clientSecret, {
            return_url: location.origin + process.env.VUE_APP_BASE_ROUTE + '/order?order_id=' + this.order.id,
          })
        } else if (this.selectedOption === 'Atome') {
          if (!this.atomeHasCreditCard && this.checkSubscription) {
            this.errorMessage = 'Please input your credit card details.'
            this.submitDisabled = false
            this.paymentLoading = false
            return
          }
          const { makePayment } = AtomeService()
          this.atomeUrl = await makePayment(this.order.id)
          this.atomeAlert = true
        }
        if (!payload.error) {
          this.$emit('step-completed', this.order.id)
        }

        this.errorMessage = payload?.error?.message ? payload.error.message : generalError
        this.submitDisabled = false
        this.paymentLoading = false
      }
    },
    onDelete(id) {
      const params = {
        payment_method_id: id,
      }
      removeStripePaymentMethod(params).then((response) => {
        if (response) {
          getStripePaymentMethods().then((response) => {
            this.paymentMethods = response.data.response.paymentMethods
            this.loadPaymentMethods()
          })
        }
      })
    },
    onSelectPaymentMethod(paymentMethod) {
      this.selectedPaymentMethod = paymentMethod
    },
    redirectToAtome(url) {
      this.atomeAlert = true
      this.atomeUrl = url
      this.$forceUpdate()
    },
    async createOrderAndTransaction() {
      try {
        const response = await createOrder({
          cart_id: this.cart.cart.id,
          address_id: this.selectedAddress.id,
          shipping_note: this.shippingNote,
          delivery_option_id: this.deliveryOptionId,
        })

        const orderId = response.data.response.order.id
        const cartItems = this.cart.cart.cart_product_option_prices

        if (orderId) {
          this.$store.commit('updateCurrentPendingPayment', orderId)
          await trackOrderCreated(window, cartItems, orderId)
        }

        const order = await this.getOrderInfo()

        const productOptions = JSON.stringify(order.order_product_option_prices)

        if (productOptions.trim().includes('"prescription_based":1')) {
          this.containsPrescibedItem = true
          this.$store.commit('updatePaymentHasPrescribedItem', true)
          localStorage.setItem('paymentHasPrescribedItem', true)
        } else {
          this.containsPrescibedItem = false
          this.$store.commit('updatePaymentHasPrescribedItem', false)
          localStorage.setItem('paymentHasPrescribedItem', false)
        }

        let paymentMethod
        switch (this.selectedOption) {
          case 'CreditCard':
            paymentMethod = 'card'
            break
          case 'FPX':
            paymentMethod = 'fpx'
            break
          case 'GRAB':
            paymentMethod = 'grabpay'
            break
        }
        if (this.selectedOption !== 'Atome') {
          const transaction = await createTransaction({
            order_id: this.currentPendingPayment,
            payment_method_type: paymentMethod,
          })
          const { payment_intent } = transaction.data.response
          this.clientSecret = payment_intent.client_secret
        }
        return true
      } catch (error) {
        this.errorMessage = error?.response?.data?.userMessage || 'Oops, something went wrong. try again later'
        return false
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.stripe-wrapper {
  border: 1px solid #b7b7b7;
  height: 50px;
  padding: 0 16px;
  &.no-padding {
    padding: 0;
  }

  &.selected {
    border: 2px solid #ed9075;
  }
}
.payment-remark {
  color: #fff;
  padding: 13px 16px;

  @media screen and (max-width: 450px) {
    font-size: 0.9rem;
  }
}
.checkout-title {
  margin-bottom: 40px;

  @media screen and (max-width: 450px) {
    margin-bottom: 20px;
  }
}

.credit-card-row {
  display: flex;
  align-items: center;
  margin-bottom: 18px;
  cursor: pointer;
  background: #fff;
  border: 1px solid #b7b7b7;

  &.selected {
    border: 2px solid #ed9075;
  }

  @media screen and (max-width: 410px) {
    * {
      font-size: 14px !important;
    }
  }

  @media screen and (max-width: 670px) {
    flex-direction: column;
  }

  .cc-icon {
    height: 1rem;
    min-height: 0;
    max-height: none;
    margin-right: 32px;
  }
  .cc-text {
    font-size: 1.125rem;

    &:first-letter {
      text-transform: capitalize;
    }

    @media screen and (max-width: 768px) {
      font-size: 15px;
    }
  }
  .cc-number {
    margin-left: auto;
  }
  .action {
    margin-left: auto;

    @media screen and (max-width: 768px) {
      font-size: 15px;
    }
  }

  .card-info,
  .card-number-action,
  .card-type {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .tag {
    background: #ed9075;
    border-radius: 4px;
    padding: 4px 8px;
    color: #fff;
    margin-left: 18px;
    display: table;
  }

  @media screen and (max-width: 670px) {
    .card-info,
    .card-number-action {
      width: 100%;
    }

    .cc-number {
      margin-left: 0;
    }

    .card-number-action {
      margin-top: 2rem;
    }
  }

  .card-number-action {
    flex-grow: 1;
  }
}
.card-group {
  margin-bottom: 40px;
  display: flex;

  @media screen and (max-width: 450px) {
    margin-bottom: 20px;
  }
}
.card-icon {
  height: 1rem;
}
.mb-1 {
  margin-bottom: 1rem;
}
.modal {
  display: flex;
  position: fixed;
  z-index: 100000;
  justify-content: center;
  align-content: center;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
  text-align: center;
}
.modal-content {
  background-color: #fefefe;
  margin: auto;
  padding: 20px 30px 40px;
  border: 1px solid #888;
  width: 35%;

  @media screen and (max-width: 750px) {
    width: 95%;
  }
}
.textLink {
  text-decoration: underline;
  cursor: pointer;
}
.close-button-container {
  display: flex;
  justify-content: flex-end;
  font-size: 1.5rem;
}
.close-button {
  cursor: pointer;
}
.error-message {
  position: relative;
  padding: 0.75rem 1.25rem;
  margin: 1rem 0;
  border: 1px solid #f5c6cb;
  border-radius: 0.25rem;
  font-size: 1.125rem;
  color: #721c24;
  background-color: #f8d7da;
  @media screen and (max-width: 410px) {
    font-size: 0.8rem;
  }
}

.label {
  font-family: PublicSans, monospace;
  font-size: 1.125rem;
  margin: 30px 0 10px;
  @media screen and (max-width: 768px) {
    font-size: 1rem;
  }
}
.atome-scale {
  transform-origin: 100% 50%;
  transform: scale(2);
}
</style>
