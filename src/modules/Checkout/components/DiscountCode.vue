<template>
  <section class="tw-mb-4 hover:tw-text-secondary">
    <!-- Discount Display Box  -->
    <div v-show="discount.code" class="tw-flex tw-flex-row tw-justify-between">
      <div class="label">
        <!-- Discount Tag -->
        <div class="tw-flex tw-items-center">
          <span class="tw-flex tw-text-md tw-font-bold tw-text-green-800 tw-items-center"
            >Discount {{ cart.discount && cart.discount.code ? `- ${cart.discount.code}` : '' }}</span
          >
          <span class="tw-flex tw-text-xs tw-ml-1">
            (<a class="tw-flex tw-mx-1 tw-text-red-700" href="#" title="Remove Voucher" @click="removeDiscount"
              >Remove</a
            >)
          </span>
        </div>
      </div>
      <!-- Discount Price  -->
      <div class="tw-font-bold">
        {{ discount.amount === 0 ? 'N/A' : '- ' + toCurrency(discount.amount) }}
      </div>
    </div>
    <!-- Discount Description  -->
    <div v-if="cart.discount && cart.discount.description">
      <span class="tw-text-xs tw-text-gray-500">{{ cart.discount.description }}</span>
    </div>

    <!-- Discount Submit Form -->
    <form v-if="showDiscount" class="tw-flex tw-items-center" @submit="submitDiscountCode">
      <Field
        id="discountCode"
        label="Discount code"
        type="text"
        class="tw-h-14 tw-flex"
        :value="discountCode"
        @change="changeDiscountCode"
      />
      <button
        class="tw-font-medium tw-tracking-wider tw-flex tw-cursor-pointer tw-items-center tw-bg-black tw-text-white tw-h-12 md:tw-h-14 tw-mt-0 md:tw-mt-2 tw-px-6"
        type="submit"
        :disabled="checkingApplyButton"
      >
        APPLY
      </button>
      <img :src="closeSvg" class="tw-h-4 tw-ml-4 tw-cursor-pointer" alt="close button" @click="toggleDiscountTab" />
    </form>
    <p
      v-else-if="cart.total && !(cart.discount && cart.discount.code)"
      class="tw-cursor-pointer tw-text-bismark"
      @click="toggleDiscountTab"
    >
      Have a discount code? Enter it here
    </p>
    <div v-show="errors.discountCode" class="tw-text-red-500 tw-mt-1 tw-text-sm">
      {{ errors.discountCode }}
    </div>
  </section>
</template>

<script>
import Field from '@/components/Field.vue'
import closeSvg from '@/assets/images/close.svg'
import { applyVoucher, removeVoucher } from '@/api/carts.js'
import { mapGetters } from 'vuex'

export default {
  name: 'CheckoutDiscountCode',
  components: {
    Field
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
    toCurrency(value) {
      return '$' + Number(value).toFixed(2)
    }
  }
}
</script>

<style lang="scss" scoped></style>
