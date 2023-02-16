<template>
  <div class="subscription-card">
    <div class="subscription-title">
      <div class="subscription-number-anchor">
        <div class="tag">#{{ subscription.reference }}</div>
      </div>
    </div>
    <div class="subscription-subtitle" :style="{ marginBottom: '32px' }">
      Subscription started on {{ formatDate(subscription.created_at) }}
    </div>
    <SubscriptionProductList :products="subscription.subscription_product_option_prices || []" />
    <div class="subscription-details-cancel">
      <div class="subscription-details">
        <div class="subscription-price">
          <p class="subscription-price-currency">
            {{ subscription.currency === 'MYR' ? 'RM' : subscription.currency }}
            {{ subscription.total_amount }}
          </p>
          <p class="subscription-duration">
            / {{ subscription.sub_duration_refresh }}
            {{ subscription.sub_duration_type.toLowerCase() }}
          </p>
        </div>
        <div v-if="subscription.is_active" class="subscription-shipment">
          <p class="subscription-shipment-title">Next Renewal Date</p>
          <p class="subscription-shipment-date">
            {{ formatDate(subscription.next_billing_date) }}
          </p>
        </div>
      </div>
      <div v-if="subscription.is_active" class="subscription-buttons">
        <div v-if="!showModal" class="subscription-button" @click="triggerIntercomChangeShipmentDate">
          CHANGE NEXT RENEWAL DATE
        </div>
        <ChangeShipmentDateModal
          v-else
          :show-modal="showModal"
          :subscription="subscription"
          @change="updateSubscriptionDate"
        />
        <div
          v-if="!showReallyCancel"
          class="subscription-button"
          @click.stop="triggerIntercom({ subscription: subscription })"
        >
          CANCEL SUBSCRIPTION
        </div>
        <div v-else class="subscription-button red" @click.stop="cancelSubscription({ subscription: subscription })">
          REALLY CANCEL SUBSCRIPTION?
        </div>
      </div>
      <div v-else class="subscription-ended">Subscription ended on {{ formatDate(subscription.cancelled_at) }}</div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { eventBus } from '@/main.js'
import { cancelSubscriptionById } from '@/api/subscriptions'
import { trackCancelSubscription } from '@/utils/analytics.js'
import ChangeShipmentDateModal from './ChangeShipmentDateModal.vue'
import SubscriptionProductList from '@/modules/Dashboard/components/SubscriptionProductList'
export default {
  name: 'SubscriptionListItem',
  components: { SubscriptionProductList, ChangeShipmentDateModal },
  props: {
    subscription: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      showModal: false,
      showReallyCancel: false
    }
  },
  methods: {
    triggerIntercom() {
      const product = this.subscription.subscription_product_option_prices[0].product_option_price.product_option
        .product.title
      window?.Intercom(
        'showNewMessage',
        `Hi, I'd like to cancel my subscription for ${product} (subscription id: #${this.subscription.reference})`
      )
      this.showReallyCancel = true
    },
    triggerIntercomChangeShipmentDate() {
      const product = this.subscription.subscription_product_option_prices[0].product_option_price.product_option
        .product.title
      window?.Intercom(
        'showNewMessage',
        `Hi, I'd like to change my next subscription delivery date for ${product} (subscription id: #${this.subscription.reference})`
      )
    },
    cancelSubscription() {
      if (
        window.confirm(
          'Are you sure you want to cancel this subscription plan? Your cancellation will take effect from next month onwards.'
        )
      ) {
        cancelSubscriptionById(this.subscription.id).then((response) => {
          if (response) {
            eventBus.$emit('loadingSubscription', true)
            eventBus.$emit('refreshSubscriptionsList')
            trackCancelSubscription(window, this.subscription.id)
          }
        })
      }
    },
    formatDate(date) {
      return dayjs(date).format('DD MMM YYYY')
    },
    updateSubscriptionDate(changed) {
      this.showModal = false
      if (changed) {
        eventBus.$emit('loadingSubscription', true)
        eventBus.$emit('refreshSubscriptionsList')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.tag {
  margin-left: 0;
}
.subscription-title {
  @media screen and (max-width: 768px) {
    font-size: 1rem;
  }
}
.subscription-details-cancel {
  position: relative;
  display: flex;
  justify-content: space-between;
  @include mediaSm {
    flex-wrap: wrap;
  }
  .subscription-buttons {
    display: flex;
    flex-wrap: wrap-reverse;
    justify-content: flex-end;
    column-gap: 20px;
    row-gap: 10px;
    margin-top: auto;
    .subscription-button {
      padding: 10px 20px;
      border: solid black 1px;
      text-align: center;
      cursor: pointer;
      &.red {
        border: solid red 1px;
        color: red;
      }
      @media screen and (min-width: 992px) {
        padding: 12px 60px;
      }
      @media screen and (max-width: 768px) {
        margin: 10px auto;
        position: relative;
        width: 100%;
        row-gap: 0;
      }
    }
  }
  .subscription-ended {
    position: absolute;
    right: 0;
    bottom: 0;
    padding: 10px 0;
    text-align: center;
    @media screen and (min-width: 992px) {
      padding: 12px 60px;
    }
    @media screen and (max-width: 768px) {
      position: relative;
      max-width: 300px;
      margin: 40px auto;
    }
  }
}
.subscription-details {
  max-width: 450px;
  background-color: #f5e7e3;
  padding: 2rem;
  margin-top: 3rem;
  color: #ec9074;
  @media screen and (min-width: 992px) {
    max-width: 380px;
  }
  @media screen and (max-width: 768px) {
    padding: 20px;
    max-width: 100%;
    width: 100%;
  }
  .subscription-price {
    display: flex;
    .subscription-price-currency {
      font-size: 28px;
      @media screen and (max-width: 768px) {
        font-size: 1rem;
      }
    }
    .subscription-duration {
      margin-left: 15px;
      align-self: flex-end;
      padding-bottom: 3px;
      @media screen and (max-width: 768px) {
        font-size: 1rem;
        padding-bottom: 2px;
      }
    }
  }
  .subscription-shipment {
    display: flex;
    flex-direction: row;
    margin-top: 15px;
    .subscription-shipment-title {
      font-size: 16px;
      @media screen and (max-width: 768px) {
        font-size: 12px;
      }
    }
    .subscription-shipment-date {
      margin-left: 40px;
      align-self: flex-end;
      padding-bottom: 0;
      @media screen and (max-width: 768px) {
        margin-left: 20px;
        font-size: 12px;
      }
    }
  }
}
</style>
