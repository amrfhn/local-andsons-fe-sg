<template>
  <div class="footer">
    <div v-if="!isNaN(cart.subtotal)" class="subtotal-row">
      <div>
        <div class="title tw-text-xl tw-font-bold">Subtotal</div>
        <div class="tw-text-sm">Shipping is calculated during checkout</div>
      </div>
      <div class="cart-price tw-font-bold">
        {{ toCurrency(cart.subtotal) }}
      </div>
    </div>
    <div v-show="discount.code" class="discount-row">
      <div class="label tw-flex tw-flex-col tw-justify-center">
        <div class="tw-flex tw-items-center">
          <span class="tw-flex tw-text-xl tw-font-bold tw-text-green-800 tw-items-center"
            >Discount {{ cart.discount && cart.discount.code ? `- ${cart.discount.code}` : '' }}</span
          >
          <span class="tw-flex tw-text-xs tw-ml-2">
            (<a class="tw-flex tw-mx-1 tw-text-red-700" href="#" title="Remove Voucher" @click="removeDiscount"
              >Remove</a
            >)
          </span>
        </div>
        <div v-if="cart.discount && cart.discount.description">
          <span class="tw-text-xs tw-text-gray-500">{{ cart.discount.description }}</span>
        </div>
      </div>
      <div class="discount-price tw-font-bold">
        {{ discount.amount === 0 ? 'N/A' : '- ' + toCurrency(discount.amount) }}
      </div>
    </div>
    <form v-if="showDiscount" class="discount-code tw-items-center" @submit="submitDiscountCode">
      <Field
        id="discountCode"
        label="Discount code"
        type="text"
        class="tw-h-16 tw-flex"
        :value="discountCode"
        @change="changeDiscountCode"
      />
      <button
        class="tw-flex tw-items-center tw-bg-black tw-text-white tw-h-14 tw-mt-0 tw-px-6"
        type="submit"
        :disabled="checkingApplyButton"
      >
        APPLY
      </button>
      <img :src="closeSvg" class="close-btn" alt="close button" @click="toggleDiscountTab" />
    </form>
    <p
      v-else-if="cart.total && !(cart.discount && cart.discount.code)"
      class="discountButton tw-text-bismark tw-cursor-pointer"
      @click="toggleDiscountTab"
    >
      Have a discount code? Enter it here
    </p>
    <div v-show="errors.discountCode" class="error-message">
      {{ errors.discountCode }}
    </div>

    <button
      ref="checkBottom"
      :class="submitStyle"
      :disabled="checkingCheckoutButton"
      @scroll="scrollDebounce"
      @click="checkout"
    >
      CHECKOUT
    </button>
  </div>
</template>

<script>
import { applyVoucher, removeVoucher } from '@/api/carts.js'
import closeSvg from '@/assets/images/close.svg'
import { eventBus } from '@/main.js'
import { mapGetters } from 'vuex'
import Field from '../../Field.vue'
import { trackCheckoutStarted } from '@/utils/analytics.js'

export default {
  components: {
    Field
  },
  props: {
    cartLength: {
      type: Number,
      default: 0
    },
    customSubmitClass: undefined
  },
  data() {
    return {
      closeSvg: closeSvg,
      discountCode: '',
      errors: {
        discountCode: ''
      },
      showDiscount: false
    }
  },
  watch: {
    discountCode(val) {
      if (val === '') {
        this.errors.discountCode = ''
      }
    }
  },
  methods: {
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
    },
    changeDiscountCode(e) {
      this.discountCode = e
    },
    async submitDiscountCode(e) {
      e.preventDefault()

      // Show error if discount code is blank
      if (!this.discountCode.trim()) {
        this.errors.discountCode = 'Invalid code'
      } else {
        const cartId = this.$store.state.cart.cart.id
        const res = await applyVoucher(cartId, this.discountCode)
        // Show error if discount code is invalid
        if (res.statusCode === 400) {
          this.errors.discountCode = res.devMessage
        } else if (res.statusCode === 200) {
          const { code, discount_amount, description, total, subtotal } = res.response.apply_discounts
          const cartWithDiscountedPrice = {
            ...this.$store.state.cart,
            discount: {
              code,
              description,
              amount: discount_amount
            },
            total,
            subtotal
          }
          this.$store.commit('updateCart', cartWithDiscountedPrice)
          // Close discount code input
          this.showDiscount = false
          // Clear error
          this.errors.discountCode = ''
        }
      }
    },
    debounce(callback, delay) {
      let timeout
      return function() {
        clearTimeout(timeout)
        timeout = setTimeout(callback, delay)
      }
    },
    scrollDebounce() {
      this.debounce(this.reactToSafariOverflowBar(this.$refs.checkBottom, 20), 200)
    },
    reactToSafariOverflowBar(element, offsetBottom) {
      if (!element) {
        return
      }
      const { bottom } = element.getBoundingClientRect()
      const SAFARI_MOBILE_BOTTOM_MENU_HEIGHT = 44
      if (Math.floor(bottom) > window.innerHeight) {
        element.style.bottom = offsetBottom + SAFARI_MOBILE_BOTTOM_MENU_HEIGHT
      } else {
        element.style.bottom = offsetBottom
      }
    },
    toggleDiscountTab() {
      this.showDiscount = !this.showDiscount
      this.errors.discountCode = ''
    },
    async checkout() {
      eventBus.$emit('toggleCart')

      await trackCheckoutStarted(window, this.cartItems, this.$store.state.cart.cart.id)

      const location = this.authenticated ? '/checkout' : '/user/register?fromCheckout'
      this.$router.push(location)

      //Remove any cache pending payment
      this.$store.commit('updateCurrentPendingPayment', null)
    },
    toCurrency(value) {
      return '$' + Number(value).toFixed(2)
    }
  },
  // eslint-disable-next-line vue/order-in-components
  computed: {
    ...mapGetters(['getCartList']),
    cart: function() {
      return this.getCartList(this.$route.path)
    },
    authenticated() {
      return this.$store.state.authenticated
    },
    discount() {
      return this.cart.discount || { code: '', amount: 0 }
    },
    checkingCheckoutButton() {
      return !this.cartLength
    },
    checkingApplyButton() {
      return !this.discountCode
    },
    submitStyle() {
      let classes = this.cartLength ? 'submit-button full-width ' : 'submit-button full-width disabled '
      return `${classes} ${this.customSubmitClass || ''}`
    },
    cartItems() {
      return this.$store.state.cart.cart?.cart_product_option_prices || []
    }
  }
}
</script>

<style lang="scss" scoped>
.footer {
  margin-top: auto;
  background: #fafafa;
  padding: 30px;
  @media screen and (max-width: 768px) {
    padding: 20px 20px 75px;
  }
  .discount-code {
    display: flex;
    align-items: center;
    margin: 20px 0;

    @media screen and (max-width: 450px) {
      flex-direction: column;

      .field-wrapper {
        width: 100% !important;
        margin-right: 0 !important;
      }

      .submit-button {
        width: 100%;
        margin-top: 0.5rem;
      }
    }
    > * {
      &:first-child {
        // width: 60%;
        // line-height: 43px;
        // flex-basis: 45%;
        label,
        input {
          font-size: 1.125rem;
        }
      }
    }
    .apply-btn {
      margin: auto 0 0 0;
      // @media screen and (max-width:319px ) {
      //   padding-top: 1.75em;
      //   padding-bottom: 1.75em;
      // }
      // @media screen and (max-width:400px ) {
      //   padding-top: 1.75em;
      //   padding-bottom: 1.75em;
      // }
      // @media screen and (min-width:401px ) {
      //   padding-top: 1.5em;
      //   padding-bottom: 1.5em;
      // }
      // @media screen and (min-width:768px ) {
      //   padding-top: 1.75em;
      //   padding-bottom: 1.75em;
      // }
      // @media screen and (min-width:769px ) {
      //   padding-top: 1.25em;
      //   padding-bottom: 1.25em;
      // }
    }
  }
  .subtotal-row,
  .discount-row,
  .total-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;

    .cart-price,
    .discount-price {
      color: #ed9075;
      font-size: 18px;
      user-select: none;
      @media screen and (max-width: 768px) {
        font-size: 16px;
      }
    }
  }
  .error-message {
    margin: 16px 0;
    display: flex;
    font-family: PublicSans, monospace;
    font-size: 1.125rem;
    color: #d85639;
    &:before {
      content: '';
      background: url('../../../assets/images/notice.svg') no-repeat center;
      background-size: contain;
      width: 16px;
      height: 16px;
      margin-right: 8px;
    }

    @media screen and (max-width: 410px) {
      font-size: 0.8rem;
    }
  }

  #checkBottom {
    margin-top: 20px;
    margin-bottom: initial;

    @media screen and (max-width: 450px) {
      margin-bottom: 10em;
    }
  }
}

.btn-remove-discount {
  color: red;
  text-decoration: none;
}

.discountButton {
  margin: 20px 0;
  font-family: 'PublicSans', sans-serif;
  font-size: 1.125rem;
  @media screen and (max-width: 768px) {
    font-size: 0.75rem;
  }
  span {
    cursor: pointer;
  }
}

.apply-btn {
  // margin-top: 0 !important;
  // padding: 0.95rem 3rem;
  max-height: 100%;
  margin: auto;
}

.not-full-width {
  width: 25%;
  margin-left: auto;

  @include mediaSm {
    width: 100%;
    margin-left: 0;
  }
}

.close-btn {
  margin: 20px;
  width: 15px;
  height: 15px;
  cursor: pointer;

  @media screen and (max-width: 450px) {
    margin-top: 1rem;
  }
}
</style>
