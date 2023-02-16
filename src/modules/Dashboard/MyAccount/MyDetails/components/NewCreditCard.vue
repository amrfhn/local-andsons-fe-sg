<template>
  <div>
    <h3 class="tw-text-xl">New Card</h3>
    <div id="card-element" class="stripe-wrapper"></div>
    <div class="tw-mt-4">
      <Checkbox
        v-if="isCheckout && hasSavedCards"
        :error="false"
        :label="'Use as default'"
        :checked="saveAsDefault"
        @checked="toggleCheckbox"
      />
    </div>
    <div class="tw-mt-4">
      <Button v-if="isLoading" disabled>
        Saving ...
      </Button>
      <div v-else>
        <List gap="tw-gap-2">
          <Button @click="promptToUpdateSubscriptions">
            Save card
          </Button>
          <Button v-if="hasSavedCards" variant="secondary" @click="cancelCardChange">
            Cancel
          </Button>
        </List>
      </div>
    </div>
    <PaymentUpdateModal
      ref="defaultCardChange"
      @subscription-update-submitted="saveNewCard"
      @card-change-cancelled="cancelCardChange"
    />
    <CardErrorModal ref="cardError" :error="cardError" />
  </div>
</template>

<script>
import { attachStripePaymentMethod } from '@/api/transactions'
import { loadStripe } from '@stripe/stripe-js'

import Button from '@/components/Elements/Button.vue'
import Checkbox from '@/components/Checkbox'
import List from '@/components/Layouts/List.vue'
import CardErrorModal from '../CardErrorModal.vue'
import PaymentUpdateModal from '../PaymentUpdateModal.vue'

export default {
  components: {
    Button,
    CardErrorModal,
    Checkbox,
    List,
    PaymentUpdateModal
  },
  props: {
    hasActiveSubscription: Boolean,
    hasSavedCards: Boolean
  },
  data() {
    return {
      isLoading: false,
      stripe: undefined,
      card: undefined,
      cardError: '',
      saveAsDefault: this.isCheckout ? false : true
    }
  },
  computed: {
    isCheckout: function() {
      return this.$route.name === 'Checkout'
    }
  },
  mounted() {
    const vm = this
    const key = process.env.VUE_APP_STRIPE_PUBLISH_KEY
    loadStripe(key).then(function(data) {
      vm.stripe = data
      setTimeout(function() {
        let elements = vm.stripe.elements()
        vm.card = elements.create('card', {
          classes: { base: 'stripe-wrapper' },
          style: {
            base: {
              lineHeight: '60px'
            }
          },
          hidePostalCode: true
        })
        vm.card?.mount('#card-element')
      }, 500)
    })
  },
  methods: {
    promptToUpdateSubscriptions: function() {
      if (this.hasActiveSubscription && (this.saveAsDefault || !this.isCheckout)) {
        this.$refs.defaultCardChange.openModal()
      } else {
        this.saveNewCard()
      }
    },
    saveNewCard: async function() {
      this.isLoading = true

      try {
        const result = await this.stripe.createPaymentMethod({
          type: 'card',
          card: this.card
        })
        this.card.clear()
        await attachStripePaymentMethod({
          payment_method_id: result.paymentMethod.id,
          default: this.saveAsDefault ? 1 : 0,
          remove_cards: this.saveAsDefault ? 1 : 0
        })
        this.$emit('payment-method-added', this.saveAsDefault)
      } catch (error) {
        const message = error.response?.data?.userMessage || 'Something went wrong'
        this.cardError = message
        this.openCardErrorModal()
      } finally {
        this.isLoading = false
      }
    },
    cancelCardChange: function() {
      this.card.clear()
      this.$emit('card-change-cancelled')
    },
    openCardErrorModal: function() {
      this.$refs.cardError.openModal()
    },
    closeCardErrorModa: function() {
      this.$refs.cardError.closeModal()
    },
    toggleCheckbox: function() {
      this.saveAsDefault = !this.saveAsDefault
    }
  }
}
</script>

<style lang="scss" scoped>
.new-card-title {
  font-weight: bold;
  margin-top: 2rem;
}

.add-new-card-btn {
  text-align: center;
  margin-top: 32px;
}

.stripe-wrapper {
  border: 1px solid #b7b7b7;
  height: 60px;
  padding: 0 16px;
  margin-top: 1rem;
}

.action {
  cursor: pointer;
  text-decoration: underline;
  font-family: PublicSans, monospace;
  font-size: 1.125rem;
}
</style>
