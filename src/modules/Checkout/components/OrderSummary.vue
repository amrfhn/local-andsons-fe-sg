<template>
  <div id="OrderSummary" class="order-summary-wrapper md:tw-sticky md:tw-top-24">
    <div class="item-list-wrapper">
      <div class="header">
        <div class="header-item">
          <div class="tw-font-bold">Order Summary</div>
        </div>
      </div>

      <div v-show="Object.keys(cart).length > 0" class="cart-content">
        <div v-for="product in cart.products" :key="product.product_option_price_id">
          <CartItem
            :product-slug="product.product_option_price.product_option.product.slug"
            :product-option-price-id="product.product_option_price_id"
            :title="product.product_option_price.product_option.product.title"
            :description="product.product_option_price.desc || ''"
            :unit-description="product.product_option_price.product_option.name || ''"
            :initial-quantity="product.quantity / (isPaymentRoute ? product.product_option_price.factor : 1)"
            :unit-price="Number(product.product_option_price.price)"
            :thumbnail-url="product.product_option_price.product_option.product.image_thumbnail_arr[0]"
            :can-increment="
              product.product_option_price.product_option.product.prescription_based !== 1 &&
                product.product_option_price.product_option.product.consultation_type === 1
            "
            :summary-mode="isPaymentRoute"
            :currency-prefix="'$'"
            :cart-id="product.cart_id || -1"
            :active-ingredient="product.product_option_price.product_option.product.active_ingredient"
            :is-subscription="!!product.product_option_price.sub_duration_refresh"
          />
          <div class="cart-border"></div>
        </div>
      </div>
    </div>
    <div class="footer md:tw-pb-10">
      <div class="sub-price-row tw-mb-2">
        <span class="label tw-font-medium">Subtotal</span>
        <span class="price tw-font-medium">{{ toCurrency(cart.subtotal) }}</span>
      </div>
      <div class="sub-price-row tw-mb-2">
        <span class="label tw-font-medium">Shipping</span>
        <span class="price tw-font-medium">{{ toCurrency(cart.shippingFee || 0) }}</span>
      </div>

      <div v-if="cart.discount && cart.discount.amount" class="sub-price-row tw-mb-2">
        <div class="label tw-flex tw-flex-col tw-justify-center">
          <div class="tw-flex tw-items-center">
            <span class="tw-flex tw-text-green-800 tw-font-medium tw-items-center"
              >Discount {{ cart.discount.code ? `- ${cart.discount.code}` : '' }}</span
            >
            <span class="tw-flex tw-text-xs tw-ml-2">
              (<a class="tw-flex tw-mx-1 tw-text-red-700" href="#" title="Remove Voucher" @click="removeDiscount"
                >Remove</a
              >)
            </span>
          </div>
          <div>
            <span class="tw-text-xs tw-text-gray-500">{{ cart.discount.description }}</span>
          </div>
        </div>
        <span class="tw-flex tw-text-green-800 tw-font-medium">{{
          cart.discount.amount == 0 ? 'N/A' : '- ' + toCurrency(cart.discount.amount)
        }}</span>
      </div>

      <DiscountCode v-if="!(cart.discount && cart.discount.amount)" />

      <div class="price-row">
        <span class="tw-font-medium tw-text-xl">Total</span>
        <span class="price tw-font-medium tw-text-xl">{{ toCurrency(cart.total) }}</span>
      </div>
    </div>

    <div class="sticky-footer tw-px-7 tw-pt-4 tw-pb-3">
      <div class="tw-flex tw-justify-between tw-flex-row">
        <div class="tw-flex tw-flex-col">
          <div class="price-row tw-flex tw-justify-between tw-font-bold">
            <span class="capitalize">Total:&nbsp;</span>
            <span class="price">{{ toCurrency(cart.total) }}</span>
          </div>
          <a class="view-summary" href="#OrderSummary" target="_parent">
            <span>View Order Summary</span>
          </a>
        </div>
        <div class="tw-flex tw-flex-row tw-justify-center tw-items-end">
          <div
            class="tw-flex tw-flex-col tw-items-center tw-cursor-pointer tw-font-semibold tw-mr-8"
            @click="() => toggleFaqs(true)"
          >
            <font-awesome-icon :icon="['far', 'question-circle']" />
            <span class="tw-text-sm">FAQs</span>
          </div>
          <div class="tw-flex tw-flex-col tw-items-center tw-cursor-pointer tw-font-semibold" @click="showIntercom">
            <font-awesome-icon :icon="['far', 'comments']" />
            <span class="tw-text-sm">Chat</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CartItem from '@/components/Cart/CartItem.vue'
import DiscountCode from '@/modules/Checkout/components/DiscountCode.vue'
import { eventBus } from '@/main.js'
import { removeVoucher } from '@/api/carts.js'
import { mapGetters } from 'vuex'

export default {
  name: 'OrderSummary',
  components: {
    CartItem,
    DiscountCode
  },
  props: {
    toggleFaqs: {
      default: Function
    }
  },
  computed: {
    ...mapGetters(['getCartList']),
    cart: function() {
      return this.getCartList(this.$route.path)
    },
    currentPath() {
      return this.$route.name
    },
    containsPrescibedItem() {
      const prescriptionItems = (this.cart.products || []).filter(
        (cartProduct) => cartProduct.product_option_price.product_option.product.prescription_based == 1
      )
      return prescriptionItems.length > 0
    },
    isPaymentRoute() {
      return /payment/.test(this.$route.path)
    }
  },
  methods: {
    showIntercom() {
      window.Intercom('show')
    },
    toCurrency(value) {
      return '$' + Number(value).toFixed(2)
    },
    openSideBar() {
      if (this.currentPath === 'Payment') {
        this.$router.push({ name: 'Shipping' })
        return
      }
      eventBus.$emit('toggleNavBar', true)
    },
    async removeDiscount(e) {
      e.preventDefault()
      const cartId = this.$store.state.cart.cart.id
      const res = await removeVoucher(cartId)
      const { code, discount_amount, description, total, subtotal } = res.response.apply_discounts
      const cartAfterDiscountRemoved = {
        ...this.$store.state.cart,
        discount: {
          code,
          description,
          amount: discount_amount
        },
        total,
        subtotal
      }
      this.$store.commit('updateCart', cartAfterDiscountRemoved)
      // Close discount code input
      this.showDiscount = false
      // Clear error
      this.errors.discountCode = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.order-summary-wrapper {
  display: flex;
  overflow-y: auto;
  flex-direction: column;
  width: 100%;

  .header {
    color: #000;
    font-weight: 700;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2rem 30px 1rem 30px;
    background: #f6f7f1;

    @media screen and (max-width: 768px) {
      padding: 2rem 5vw 1rem 5vw;
    }

    .header-item {
      width: 100%;
      padding-bottom: 1rem;
      border-bottom: 1px solid black;

      div {
        font-size: 2rem;

        @media screen and (max-width: 768px) {
          font-size: 1.3rem;
        }
      }
    }
  }

  .cart-content {
    padding: 0 30px;
    // flex-grow: 1;
    overflow: auto;
    background: #f6f7f1;

    @media screen and (max-width: 400px) {
      padding: 0 5vw;
    }

    .cart-border {
      border-bottom: 2px solid rgba(0, 0, 0, 0.1);
      width: 100%;
      margin-bottom: 1rem;
    }
  }
  .footer {
    background: #f6f7f1;
    padding-left: 30px;
    padding-right: 30px;
    padding-bottom: 2rem;

    @media screen and (max-width: 767px) {
      padding: 0 5vw;
    }

    .sub-price-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #ed9075;
      strike {
        color: #000;
      }
      .label {
        color: #000;
      }
    }
    .price-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 2px solid rgba(0, 0, 0, 0.1);
      padding-top: 2rem;
    }
  }

  // Only show when it is on mobile mode
  .sticky-footer {
    display: none;
    position: fixed;
    z-index: 100;
    bottom: 0;
    width: 100%;
    background: white;
    padding-left: 30px;
    padding-right: 30px;

    @media screen and (max-width: 767px) {
      display: block;
      padding-left: 5vw;
      padding-right: 5vw;
    }

    .price-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .view-summary {
      text-decoration: underline;
      color: rgba(0, 0, 0, 0.5);
      font-size: 0.75rem;
    }
  }

  // To modify space of CartItem component
  .cart-item {
    margin-bottom: 1rem;
  }
}
</style>
