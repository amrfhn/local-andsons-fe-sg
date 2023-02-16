<template>
  <MountingPortal mount-to="body" append>
    <div id="cart-sidebar" class="sidebar-wrapper" :class="{ visible: visible }" @click="close">
      <div class="sidebar" @click="onChildrenClick">
        <div class="header">
          <button class="close" @click="close">
            <font-awesome-icon :icon="['fas', 'arrow-right']" />
          </button>
          <div class="cart-header">
            <p class="title">Your cart</p>
            <div class="cart-quantity">
              {{ cartQuantity }}
            </div>
          </div>
        </div>
        <div class="cart-content">
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
            :is-subscription="!!product.product_option_price.sub_duration_refresh"
          />
        </div>
        <Footer :cart-length="cartQuantity" />
      </div>
    </div>
  </MountingPortal>
</template>
<script>
import { MountingPortal } from 'portal-vue'
import CartItem from '../CartItem'
import Footer from './Footer'
import { mapGetters } from 'vuex'

export default {
  name: 'Sidebar',
  components: {
    MountingPortal,
    CartItem,
    Footer
  },
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
  },
  methods: {
    close: function() {
      this.$emit('toggleVisible')
    },
    onChildrenClick: function(e) {
      e.stopPropagation()
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebar-wrapper {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9999999999;
  transform: translateX(100%);
  transition: all 0.3s;
  &.visible {
    transform: translateX(0);
    -webkit-transform: translate3d(0, 0, 0);
  }

  &.visible .sidebar {
    -webkit-transform: translate3d(0, 0, 0);
  }
  .sidebar {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 50%;
    height: 100vh;
    background: #fff;
    font-family: 'Public Sans', sans-serif;
    padding: 30px 0 0;
    //transform: translateX(100%);
    display: flex;
    flex-direction: column;
    align-items: stretch;
    overflow: initial;
    @media screen and (max-width: 1240px) {
      width: 100%;
      overflow: auto;
      padding: 30px 0 0;
    }
    @media screen and (max-width: 768px) {
      overflow: auto;
      padding: 15px 0 0;
    }

    .header {
      display: flex;
      align-items: center;
      justify-content: center;
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
        margin: 0 auto;
        align-items: center;

        .title {
          font-size: 32px;
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
        padding: 0 15px;
        overflow: initial;
        // height: 100%;
      }
      @media screen and (max-width: 1239px) {
        overflow: initial;
      }
    }
  }
}
</style>
