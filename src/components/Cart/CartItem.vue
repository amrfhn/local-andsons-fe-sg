<template>
  <div class="cart-item tw-justify-between tw-flex tw-flex-row">
    <img class="cart-image tw-self-start" :src="thumbnailUrl" alt="cart image" />
    <div class="cart-info tw-pl-3">
      <div class="tw-flex tw-flex-row">
        <span
          v-if="isSubscription"
          class="cart-badge tw-bg-red-300 tw-text-xs tw-font-semibold tw-mr-2 tw-px-2.5 tw-py-0.5 md:tw-py-1 tw-rounded-full"
          >Subscription</span
        >
        <span
          v-if="unitPrice <= 0"
          class="cart-badge tw-bg-blue-200 tw-text-xs tw-font-semibold tw-mr-2 tw-px-3 md:tw-px-5 tw-py-0.5 md:tw-py-1 tw-rounded-full"
          >Free</span
        >
      </div>
      <div class="cart-title tw-text-xs md:tw-text-lg tw-flex tw-font-bold tw-leading-tight">
        {{ title }} <CartItemInfo :product-slug="productSlug" />
      </div>

      <div v-if="productOptionPriceId">
        <p>{{ unitDescription }}</p>
        <p :style="{ flexDirection: 'row', display: 'flex' }" v-html="description" />
      </div>
    </div>
    <div class="cart-value">
      <div v-show="showQuantity" class="cart-quantity">
        <div v-if="summaryMode" class="quantity-count">x{{ quantity }}</div>
        <Quantity
          v-else
          :initial-quantity="quantity"
          :removable="removable"
          :can-increment="canIncrement"
          :currency-prefix="currencyPrefix"
          @change="updateQuantity"
          @remove="removeProduct"
        /><!--:canDecrement default to true.-->
      </div>
    </div>
    <div class="cart-price" :class="{ 'line-through': strikethroughPrice }">
      {{ currencyPrefix + totalPrice.toFixed(2) + currencySuffix }}
    </div>
  </div>
</template>
<script>
/**
 * CartItem Represents a single component within any of the 3 carts:
 * The sidebar, dashboard cart and the payment OrderSummary cart after payment is placed.
 * listens to quantity component, triggers debounced method on update.
 * calls updateServerQuantity after 0.5s, which updates server, and grabs cart from server into store.
 * summaryMode displays text instead of the Quantity component for payment page.
 */
import Quantity from '../Quantity'
import { addItemToCart, deleteItemFromCart, getCarts } from '@/api/carts'
import CartItemInfo from './CartItemInfo.vue'
import { isPrescriptionBased } from '@/utils/categories.js'
import _ from 'lodash'
export default {
  name: 'CartItem',
  components: {
    CartItemInfo,
    Quantity
  },
  props: {
    productSlug: { type: String, default: null },
    productOptionPriceId: { type: Number, required: true, default: -1 }, // productOptionPriceId
    title: { type: String, required: true },
    description: { type: String, default: '' },
    unitDescription: { type: String, default: '' },
    initialQuantity: { type: Number, required: true },
    unitPrice: { type: Number, required: true }, // Price per unit to be displayed in cart
    thumbnailUrl: { type: String, required: true }, // Image URL
    canIncrement: { type: Boolean, required: true }, // Disable changes if true
    summaryMode: { type: Boolean, required: true }, // If true, display "x"+quantity, else display Quantity widget.
    currencyPrefix: { type: String, default: '$' },
    currencySuffix: { type: String, default: '' },
    cartId: { type: Number, required: true }, // Required for trackRemoveFromCart method
    strikethroughPrice: { type: Boolean, default: false }, // Used to be "product.product_option_price_id<0".
    activeIngredient: { type: String, default: null },
    isSubscription: { type: Boolean, default: false }
  },
  data() {
    return {
      quantity: this.initialQuantity,
      pending: false // check if value has been updated since last server request.
    }
  },
  computed: {
    removable() {
      return ['doctor-consultation', 'preconsultation'].indexOf(this.productSlug) === -1
    },
    showQuantity() {
      return this.productOptionPriceId >= 0
    },
    totalPrice() {
      return this.quantity * this.unitPrice
    }
  },
  watch: {
    initialQuantity(newValue) {
      if (!this.pending) this.quantity = newValue
    }
  },
  methods: {
    updateServerQuantity: _.debounce(async function() {
      this.pending = false
      await addItemToCart({
        product_option_price_id: this.productOptionPriceId,
        quantity: this.quantity,
        action: 'OVERRIDE',
        period_quantity: 0 // REMOVE? DEPRECATED?
      })
      getCarts().then((response) => {
        this.$store.commit('updateCart', response.data.response)
      })
    }, 500),
    updateQuantity(quantity) {
      this.quantity = quantity
      this.pending = true
      this.updateServerQuantity()
    },
    async removeProduct() {
      this.trackRemoveFromCart(this.productOptionPriceId)

      await deleteItemFromCart(this.cartId, this.productOptionPriceId)
      let response = await getCarts()
      response = response?.data?.response ?? null

      if (response) {
        this.$store.commit('updateCart', response)
        const totalPrice = response.total

        // Redirect user to dashboard if cart is empty in checkout page
        this.$route.path.includes('checkout') && totalPrice <= 0 ? this.$router.push(`/`) : null
      }
    },
    trackRemoveFromCart(productOptionPriceId) {
      const items = this.$store.state.cart.cart?.cart_product_option_prices || []
      const removedIndex = items.findIndex((data) => data.product_option_price_id == productOptionPriceId)
      const removedItem = items.find((data) => data.product_option_price_id == productOptionPriceId)

      const { price, product_option } = removedItem.product_option_price
      const { title, prescription_based, category_id } = product_option.product
      const category = this.$store.getters['categories/idToSlug'][category_id]

      window?.dataLayer?.push({
        event: 'remove_from_cart',
        ecommerce: {
          items: [
            {
              item_name: title,
              item_id: product_option.sku,
              price: price,
              item_category: category,
              item_category_2: isPrescriptionBased(prescription_based),
              item_variant: product_option.name,
              item_list_name: category,
              item_list_id: category_id,
              quantity: removedItem.quantity,
              index: removedIndex
            }
          ]
        },
        eventCallback: () => {
          window?.dataLayer?.push({ ecommerce: { items: undefined } })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.cart-item {
  align-items: center;
  margin-bottom: 30px;
  position: relative;
  .cart-image {
    width: 70px;
    height: 70px;
    min-width: 70px;
    min-height: 70px;
    background-color: $springwood-background;
    background-size: 100% auto;
    @media screen and (max-width: 768px) {
      width: 50px;
      height: 50px;
      min-width: 50px;
      min-height: 50px;
    }
  }

  .cart-value {
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media screen and (max-width: 400px) {
      align-items: flex-start;
      margin: 0;
      justify-content: space-between;
    }
  }

  .cart-product-container {
    display: flex;
    flex-basis: 100%;
    justify-content: space-between;
    flex-direction: row;

    @media screen and (max-width: 400px) {
      flex-direction: column;
    }
  }

  .cart-info {
    width: calc(100% - 80px - 48px - 60px);

    @media screen and (max-width: 768px) {
      margin-bottom: auto;
    }
    h3 {
      margin: 0 0 8px;
      font-weight: normal;
      font-size: 18px;
      @media screen and (max-width: 768px) {
        font-size: 14px;
      }
    }
    p {
      margin: 0;
      font-size: 14px;
      @media screen and (max-width: 768px) {
        font-size: 12px;
      }
    }
  }

  .nonEditQuantity {
    font-size: 16px;
    flex-basis: 10%;
    display: grid;
    place-items: center;

    @media screen and (max-width: 768px) {
      font-size: 14px;
    }

    @media screen and (max-width: 400px) {
      place-items: start;
    }
  }

  .quantity {
    margin-right: 0;
  }
  .cart-quantity {
    text-align: center;
    height: 48px;
  }
  .cart-price {
    color: #ed9075;
    font-size: 18px;
    user-select: none;
    text-align: end;
    height: 48px;
    width: 100px;

    @media screen and (max-width: 400px) {
      text-align: end;
    }
    @media screen and (max-width: 768px) {
      width: 40px;
      line-height: 24px;
      font-size: 12px;
      top: initial;
      bottom: 0;
    }
  }
  .quantity-count {
    margin-left: 24px;
    border: 0;
    outline: none;
    height: 24px;
    width: 45px;
    text-align: center;
    color: #333;
    font-size: 20px;
    font-family: 'PublicSansBold', sans-serif;
    padding: 0 8px;
    background: transparent;
    @media screen and (max-width: 768px) {
      font-size: 12px;
    }
  }
  .remove {
    cursor: pointer;
    background: transparent;
    border: 0;
    outline: none;
    font-size: 14px;
    font-family: PublicSans, monospace;
    position: relative;
    &:before {
      content: '';
      position: absolute;
      bottom: -2px;
      height: 2px;
      width: 100%;
      top: initial !important;
      left: 0 !important;
      right: 0 !important;
      background-color: #000;
      transform: scaleX(0);
      transform-origin: left;
      transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
    }
    &:hover {
      &:before {
        transform: scaleX(1);
      }
    }

    @media screen and (max-width: 768px) {
      font-size: 12px;
    }
  }

  .cart-badge {
    @media screen and (max-width: 768px) {
      font-size: 0.65rem;
    }
  }
}
</style>
