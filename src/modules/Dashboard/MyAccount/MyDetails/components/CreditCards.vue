<template>
  <div v-if="!isLoading" class="tw-mt-8">
    <NewCreditCard
      v-if="isNewCardVisible"
      :has-active-subscription="hasActiveSubscription"
      :has-saved-cards="paymentMethods.length > 0"
      @payment-method-added="paymentMethodAdded"
      @card-change-cancelled="cardChangeCancelled"
    />
    <div v-else-if="paymentMethods.length > 0" class="tw-relative">
      <a
        v-if="!isNewCardVisible && isCheckout"
        type="button"
        class="tw-ml-auto tw-absolute tw-right-0 tw-font-medium tw-cursor-pointer"
        :style="{ top: '-1.5rem' }"
        @click="showNewCard"
      >
        Change card
      </a>
      <div
        v-for="(paymentMethod, idx) in paymentMethods"
        :key="`payment_method_${idx}`"
        :class="[
          'credit-card-row',
          allowSelect && selectedPaymentMethod?.id === paymentMethod.id && 'selected',
          allowSelect && 'selectable'
        ]"
        @click="selectPaymentMethod(paymentMethod)"
      >
        <Flex justify-content="tw-justify-between" align-items="tw-items-center">
          <div
            v-if="!isTempCard"
            class="tw-bg-[#ed9075] tw-rounded tw-px-2 tw-py-1 tw-text-xs tw-font-semibold tw-text-white"
          >
            Default
          </div>
        </Flex>

        <Flex
          id="card-number-action"
          justify-content="tw-justify-between"
          align-items="tw-items-center"
          class="tw-grow tw-w-full"
        >
          <div class="tw-relative tw-inset-x-0 tw-bottom-0 tw-w-full">
            <div class="tw-translate-y-4 tw-my-4"></div>
            <Flex justify-content="tw-justify-between" align-items="tw-items-end" class-names="tw-relative tw-w-full">
              <div class="tw-translate-y-4">
                <b class="tw-tracking-widest tw-text-lg">
                  <span class="tw-tracking-widest tw-align-middle">**** **** ****</span> {{ paymentMethod.card?.last4 }}
                </b>

                <div class="tw-text-sm">
                  Expires <b>{{ `${paymentMethod.card?.exp_month} / ${paymentMethod.card?.exp_year}` }}</b>
                </div>
              </div>
              <div class="tw-h-12 tw-relative tw-flex tw-items-end" :style="{ aspectRatio: '266/144' }">
                <img
                  :src="require(`@/assets/images/card-icons/${paymentMethod.card?.brand}.svg`)"
                  class="tw-object-contain tw-absolute tw-bottom-1 tw-right-0"
                />
              </div>
            </Flex>
          </div>
        </Flex>
      </div>
    </div>
    <Button
      v-if="!isNewCardVisible && !isCheckout"
      variant="primary"
      class-names="tw-my-2 tw-m-auto tw-w-full md:tw-w-auto md:tw-ml-auto tw-cursor-pointer"
      :is-full-width="false"
      @click="showNewCard"
    >
      Replace
    </Button>
    <CardErrorModal ref="cardError" :error="cardError" />
  </div>
</template>

<script>
import { getStripePaymentMethods, removeStripePaymentMethod } from '@/api/transactions'
import Button from '@/components/Elements/Button.vue'
import CardErrorModal from '../CardErrorModal.vue'
import Flex from '@/components/Layouts/Flex.vue'
import NewCreditCard from './NewCreditCard.vue'

export default {
  components: { Button, NewCreditCard, Flex, CardErrorModal },
  props: {
    allowSelect: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isLoading: false,
      selectedPaymentMethod: null,
      paymentMethods: [],
      isNewCardVisible: false,
      deletingCardId: null,
      hasActiveSubscription: true,
      cardError: '',
      isTempCard: false
    }
  },
  computed: {
    isCheckout: function() {
      return this.$route.name === 'Checkout'
    }
  },
  watch: {
    selectedPaymentMethod: function(newSelectedPaymentMethod) {
      this.$emit('payment-method-selected', newSelectedPaymentMethod)
    }
  },
  mounted() {
    this.fetchPaymentMethods()
  },
  methods: {
    fetchPaymentMethods: function(defaultOnly = true) {
      this.isLoading = true
      getStripePaymentMethods(defaultOnly).then((response) => {
        this.paymentMethods = []
        const paymentMethods = response.data.response.paymentMethods

        if (paymentMethods.length > 0) {
          this.isTempCard = paymentMethods.length === 1 ? false : true
          this.paymentMethods.push(paymentMethods[0])
          this.selectPaymentMethod(this.paymentMethods[0])
        } else {
          this.selectPaymentMethod(null)
          this.isNewCardVisible = true
        }

        this.hasActiveSubscription = response.data.response.hasSubscription
        this.isLoading = false
      })
    },
    paymentMethodAdded: function(getDefault) {
      this.isNewCardVisible = false
      this.fetchPaymentMethods(getDefault)
    },
    cardChangeCancelled: function() {
      this.isNewCardVisible = false
    },
    showNewCard: function() {
      this.isNewCardVisible = true
    },
    deleteCard: async function(paymentMethodId) {
      if (this.deletingCardId) {
        return
      }

      try {
        const params = {
          payment_method_id: paymentMethodId
        }
        this.deletingCardId = paymentMethodId
        await removeStripePaymentMethod(params)

        this.fetchPaymentMethods()
      } catch (error) {
        const message = error.response?.data?.userMessage || 'Something went wrong'
        this.cardError = message
        this.openCardErrorModal()
      } finally {
        this.deletingCardId = null
      }
    },
    selectPaymentMethod: function(paymentMethod) {
      this.selectedPaymentMethod = paymentMethod
    },
    openCardErrorModal: function() {
      this.$refs.cardError.openModal()
    }
  }
}
</script>

<style lang="scss" scoped>
.credit-card-row {
  padding: 16px;

  .action-container {
    display: flex;
    flex-direction: row;
    margin-left: auto;

    .delete-container {
      margin-right: 1rem;
    }
  }

  &.selected {
    border: 2px solid #ed9075;
  }

  &.selectable {
    cursor: pointer;
  }

  .action {
    text-decoration: underline;
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
    font-family: PublicSans, monospace;
    font-size: 1.125rem;

    &:first-letter {
      text-transform: capitalize;
    }
  }
  .cc-number {
    margin-left: auto;
  }

  .card-info,
  .card-number-action,
  .card-type {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .tag {
      background: #ed9075;
      border-radius: 4px;
      padding: 4px 8px;
      color: #fff;
      margin-left: 18px;
      font-size: 0.9375rem;
      display: table;
    }
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

.no-card-container {
  text-align: center;

  margin-top: 1rem;
  margin-bottom: 1rem;

  p {
    padding-bottom: 1rem;
  }

  a {
    text-decoration: underline;
  }
}
</style>
