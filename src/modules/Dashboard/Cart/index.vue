<template>
  <div class="cart">
    <div class="header">
      <div class="cart-header">
        <h1 class="title">Your cart</h1>
        <div class="cart-quantity">
          {{ cartQuantity }}
        </div>
      </div>
    </div>
    <div class="cart-content">
      <div v-if="cartQuantity">
        <CartItem
          v-for="product in cart.products"
          :key="product.product_option_price_id"
          :product-slug="product.product_option_price.product_option.product.slug"
          :product-option-price-id="product.product_option_price_id"
          :title="product.product_option_price.product_option.product.title"
          :description="product.product_option_price.desc || ''"
          :unit-description="product.product_option_price.product_option.name || ''"
          :initial-quantity="product.quantity"
          :unit-price="Number(product.product_option_price.price)"
          :thumbnail-url="product.product_option_price.product_option.product.image_thumbnail_arr[0]"
          :can-increment="
            product.product_option_price.product_option.product.prescription_based !== 1 &&
              product.product_option_price.product_option.product.consultation_type === 1
          "
          :summary-mode="false"
          :currency-prefix="'$'"
          :cart-id="product.cart_id || -1"
          :active-ingredient="product.product_option_price.product_option.product.active_ingredient"
        />
      </div>
      <div v-else class="empty-cart tw-flex tw-flex-col tw-pt-10 tw-pb-20">
        <p class="tw-text-3xl tw-font-bold">
          Your cart is empty.
        </p>
        <router-link
          to="/evaluation/start"
          class="tw-mt-8 tw-px-16 tw-py-4 tw-text-xl tw-font-semibold tw-bg-black tw-text-white"
        >
          Find&nbsp;Your&nbsp;Treatment&nbsp;&rarr;
        </router-link>
      </div>
    </div>
    <div class="cart-submit">
      <Footer :cart-length="cartQuantity" custom-submit-class="not-full-width" />
    </div>
  </div>
</template>

<script>
import CartItem from '@/components/Cart/CartItem'
import Footer from '@/components/Cart/Sidebar/Footer'
import { mapGetters } from 'vuex'

export default {
  name: 'Sidebar',
  components: { CartItem, Footer },
  props: {
    visible: Boolean
  },
  computed: {
    ...mapGetters(['getCartList']),
    cart: function() {
      return this.getCartList(this.$route.path)
    },
    cartQuantity() {
      let quantity = 0
      ;(this.cart.products || []).forEach((product) => {
        if (product.id >= 0) {
          quantity += 1
        }
      })
      return quantity
    }
  }
}
</script>

<style lang="scss" scoped>
.cart {
  background-color: $white-text;
  padding: 32px;
  margin-top: 16px;

  @include mediaSm {
    padding: 20px 0 0 0;
  }
}

.empty-cart {
  display: flex;
  justify-content: center;
  align-items: center;
}

.header {
  display: flex;
  // align-items: center;
  // justify-content: center;
  margin-bottom: 30px;
  padding: 0 30px;
  @media screen and (max-width: 768px) {
    padding: 0 20px;
    margin-bottom: 20px;
  }
  .close {
    cursor: pointer;
    background: transparent;
    width: 25px;
    height: 25px;
    border: 0;
    outline: none;
    @media screen and (max-width: 768px) {
      width: 16px;
      height: 16px;
    }
    > svg {
      width: 100%;
      height: 100%;
    }
  }
  .cart-header {
    display: flex;
    margin: 0;
    align-items: center;

    .title {
      font-family: 'PublicSansBold', sans-serif;
      font-size: 2rem;
      // margin: 0 auto;
      @media screen and (max-width: 768px) {
        font-size: 24px;
      }
    }

    .cart-quantity {
      height: 30px;
      width: 30px;
      color: white;
      background: #d85639;
      padding: 0.5rem;
      margin-left: 1rem;
      border-radius: 5px;
      text-align: center;
      font-size: 14px;
    }
  }
}
.cart-content {
  overflow: auto;
  flex-grow: 1;
  padding: 0 30px;
  @media screen and (max-width: 768px) {
    padding: 0 20px;
    overflow: initial;
    // height: 100%;
  }
  @media screen and (max-width: 1239px) {
    overflow: initial;
  }
}
</style>
