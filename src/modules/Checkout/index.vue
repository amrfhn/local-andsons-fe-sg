<template>
  <div v-if="!loading" class="checkout-wrapper white-header">
    <CheckoutHeader />
    <div class="checkout-inner-wrapper">
      <div class="checkout-content">
        <div class="checkout-form">
          <Accordion>
            <AccordionPanel
              v-if="requiresProfileVerification && (!hasUserProfile || profile_updated)"
              title="Profile Verification"
              :expanded="currentStep === 1"
            >
              <!-- <template v-slot:action>
                <div v-if="currentStep > 1" @click="changeStep(1)">
                  Edit
                </div>
              </template> -->

              <template v-slot:content>
                <ProfileVerification
                  @profile-updated="profileUpdated"
                  @step-completed="changeStep(2)"
                ></ProfileVerification>
              </template>
            </AccordionPanel>

            <AccordionPanel title="Shipping information" :expanded="currentStep === 2">
              <template v-slot:action>
                <div v-if="currentStep > 2" @click="changeStep(2)">Edit</div>
              </template>

              <template v-slot:content>
                <Address @step-completed="changeStep(3)"></Address>
              </template>
            </AccordionPanel>

            <AccordionPanel title="Shipping options" :expanded="currentStep === 3">
              <template v-slot:action>
                <div v-if="currentStep > 3" @click="changeStep(3)">Edit</div>
              </template>

              <template v-slot:content>
                <Shipping
                  :note="shippingNote"
                  @step-completed="changeStep(4)"
                  @shipping-note="updateShippingNote"
                ></Shipping>
              </template>
            </AccordionPanel>

            <AccordionPanel title="Payment" :expanded="currentStep === 4">
              <template v-slot:action>
                <div v-if="currentStep > 4" @click="changeStep(4)">Edit</div>
              </template>

              <template v-slot:content>
                <Payment :shipping-note="shippingNote" @step-completed="checkoutCompleted"></Payment>
              </template>
            </AccordionPanel>
          </Accordion>

          <div class="tw-hidden md:tw-block">
            <hr class="tw-mt-5 tw-mb-10" />
            <h3 class="tw-font-bold tw-text-xl md:tw-text-3xl tw-mb-3">
              Frequently Asked
            </h3>
            <CheckoutFaqs />
            <div class="tw-px-2 tw-py-10">
              <LegitScriptLogo />
            </div>
          </div>
        </div>
        <div class="order-summary">
          <OrderSummary :toggle-faqs="toggleFaqs" />
        </div>
      </div>
    </div>

    <CheckoutFaqsModal :show-modal="showFaqs" :toggle-modal="toggleFaqs" />

    <NotificationModal :key="showNotification" v-model="showNotification" :path="path" />
  </div>
</template>

<script lang="jsx">
import { getCarts } from '@/api/carts'
import { getOrderById, getOrders } from '@/api/orders'
import { getQuestionsByProductId } from '@/api/questions'
import { checkSkipAppointment } from '@/api/users'
import Accordion from '@/components/Accordion.vue'
import AccordionPanel from '@/components/AccordionPanel.vue'
import LegitScriptLogo from '@/components/Badges/LegitScriptLogo'
import CheckoutHeader from '@/components/CheckoutHeader'
import { consultationTypes } from '@/constants'
import Address from '@/modules/Checkout/Address'
import NotificationModal from '@/modules/Checkout/components/NotificationModal'
import Payment from '@/modules/Checkout/Payment'
import ProfileVerification from '@/modules/Checkout/ProfileVerification'
import Shipping from '@/modules/Checkout/Shipping'
import CheckoutFaqs from '@/modules/FAQs/CheckoutFaqs.vue'
import CheckoutFaqsModal from '@/modules/FAQs/CheckoutFaqsModal.vue'
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import OrderSummary from './components/OrderSummary'

dayjs.extend(isBetween)

export default {
  components: {
    Accordion,
    AccordionPanel,
    Address,
    CheckoutFaqs,
    CheckoutFaqsModal,
    CheckoutHeader,
    LegitScriptLogo,
    NotificationModal,
    OrderSummary,
    Shipping,
    Payment,
    ProfileVerification,
  },
  data() {
    return {
      showProfile: true,
      hasProfile: false,
      showSchedule: false,
      questionSets: [],
      carts: [],
      currentStep: 1,
      loading: false,
      orders: [],
      profile_updated: false,
      skipAppointment: false,
      showNotification: false,
      path: '',
      showFaqs: false,
      shippingNote: ''
    }
  },
  computed: {
    /**
     *  Checks if the user needs to have their profile verified
     *  1. There is a prescription based product in cart
     *  2. There is a doctor consult in cart
     */
    requiresProfileVerification() {
      return this.carts.some((cart) => {
        const product = cart.product_option_price.product_option.product

        return (
          product.prescription_based ||
          product.consultation_type === consultationTypes.DOCTOR_CONSULT
        )
      })
    },
    hasUserProfile() {
      return !!this.$store.state.userProfile.profile
    },
    skipAppointmentBooking() {
      const now = dayjs()
      const sevenDaysBefore = now.subtract(7, 'day')

      const latestConsultOnlyOrder = this.orders.find(
        (order) => order.has_consult_only,
      )

      return (
        !!(
          latestConsultOnlyOrder &&
          dayjs(latestConsultOnlyOrder.approved_at).isBetween(
            sevenDaysBefore,
            now,
          )
        ) || this.skipAppointment
      )
    },
  },
  watch: {
    $route() {
      window.location.reload()
    },
  },
  async mounted() {
    this.loading = true
    this.intercomHideLauncher()

    const skipAppointmentResponse = await checkSkipAppointment()
    this.skipAppointment =
      skipAppointmentResponse?.data?.response?.skipAppointment ?? false

    const orderResponse = await getOrders()
    this.orders = orderResponse.data.response.data

    const orderId = this.$route.params.orderId
    if (orderId) {
      const orderResponse = await getOrderById(orderId)
      const order = orderResponse?.data?.response?.order ?? {}

      if (['PAID', 'PAID_PENDING_DOCTOR'].includes(order.status)) {
        await this.checkoutCompleted(orderId)
        this.loading = false
        return
      }
    }

    const cartResponse = await getCarts()
    this.carts =
      cartResponse?.data?.response?.cart?.cart_product_option_prices || []

    this.$store.commit('updateCart', cartResponse.data.response)

    if (
      this.$store.state.addToCartItem !== null &&
      this.$store.state.addToCartItem[0].isMultiplePrice
    ) {
      const questionResponse = await getQuestionsByProductId(
        this.$store.state.addToCartItem[0].id,
      )
      this.questionSets = questionResponse.data.response.questionSets
    }

    if (!this.requiresProfileVerification || this.hasUserProfile) {
      this.changeStep(2)
    }

    this.loading = false
  },
  methods: {
    toggleFaqs(show = true) {
      this.showFaqs = show
    },
    changeStep(step) {
      this.currentStep = step
    },
    profileUpdated() {
      // Avoid profile tab completely disappearing when profile is saved in global store
      this.profile_updated = true
    },
    updateShippingNote(note) {
      // set Shipping Note
      this.shippingNote = note
    },
    checkoutCompleted(orderId) {
      if (this.requiresProfileVerification && !this.skipAppointmentBooking) {
        this.showNotification = true
        this.path = `/checkout/appointment/${orderId}`
        // this.$router.replace("/checkout/appointment/" + orderId);
      } else {
        this.$router.replace(`/order/success?order_id=${orderId}`)
      }
    },
    intercomHideLauncher() {
      if (window.innerWidth < 768) {
        window.Intercom('update', {
          hide_default_launcher: true,
        })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.checkout-wrapper {
  background-color: $springwood-background;

  @media screen and (max-width: 1024px) {
    overflow: hidden;
  }

  .checkout-inner-wrapper {
    padding: 6rem 0 0;
    background: white;

    @media screen and (max-width: 768px) {
      padding-top: 4.5rem;
      margin-bottom: 0;
    }
  }

  .checkout-content {
    position: relative;
    display: flex;
    justify-content: center;
    padding: 0 calc(30px + 5vw);

    @media screen and (max-width: 1024px) {
      flex-direction: column;
      align-items: center;
      padding: 0;
    }

    .checkout-form {
      flex: 1;
      padding: 1rem 0 3rem 0;

      @media screen and (max-width: 1024px) {
        width: 100%;
        padding: 0rem 1.75rem 0 1.75rem;
      }

      .field {
        line-height: initial;
      }
    }

    .order-summary {
      flex: 1;
      padding: 1rem 0 3rem 3rem;

      @media screen and (max-width: 1024px) {
        width: 100%;
        padding: 0;
      }
    }
  }
}
</style>
