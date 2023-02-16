<template>
  <div class="checkout-wrapper">
    <GlobalHeader show-full-logo />
    <div class="checkout-inner-wrapper">
      <div class="checkout-content">
        <div class="addon-wrapper">
          <h3 class="addon-title">What does the doc say?</h3>
          <p class="addon-description">
            Strengthen your kit with recommendations by our medical team
          </p>
        </div>
        <div v-if="addons.length > 0" class="price-options-container">
          <div class="addon-title">Recommended For You</div>
          <div class="addon-subtitle">
            Save more when you complete your kit with these products. It's a one-time purchase.
          </div>
          <div class="product-plan">
            <div
              v-for="product in addons"
              :key="product.option.id"
              :class="[
                'product-plan-option',
                selectedProducts.find((selectedProduct) => selectedProduct.option.id === product.option.id)
                  ? 'active'
                  : '',
                product.recommended ? 'recommended' : ''
              ]"
              @click="selectProduct(product)"
            >
              <div class="product-image">
                <img :src="product.image_thumbnail_arr" alt="Product Image" />
              </div>
              <div class="product-deets">
                <div class="product-plan-details">
                  <div class="tw-col">
                    <div class="product-plan-option-name">
                      {{ product.title }}
                    </div>
                    <div class="product-description">
                      {{ product.option.name }}
                    </div>
                  </div>
                  <div class="product-plan-option-price" v-html="product.option.product_option_prices[0].price_desc" />
                </div>
                <div class="product-description" v-html="product.short_desc" />
              </div>
              <div v-if="product.recommended" class="tag">
                Recommended For You
              </div>
            </div>
          </div>
          <button v-if="selectedProducts.length === 0" class="submit-button" @click="proceedNextStep">
            SKIP
          </button>
          <button v-else class="submit-button" @click="onSubmit">
            NEXT
          </button>
        </div>

        <div v-else class="price-options-container">
          <div class="addon-subtitle">
            No add-on available for the selected product.
          </div>
          <button class="submit-button" @click="proceedNextStep">
            SKIP
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GlobalHeader from '@/components/GlobalHeader'
import { getProductDetails } from '@/api/products'
import { addItemToCart, getCarts } from '@/api/carts'
import { trackAddToCart, trackCheckoutStarted } from '@/utils/analytics.js'

export default {
  name: 'AddOns',
  components: { GlobalHeader },
  data() {
    return {
      relatedProducts: [],
      selectedProducts: []
    }
  },
  computed: {
    authenticated() {
      return this.$store.state.authenticated
    },
    addons() {
      const addons = []
      this.relatedProducts.map((product) => {
        product.product_options.forEach((option) => {
          if (
            option.type === 'ONE_OFF' &&
            option.product_option_prices.length > 0 &&
            !option.product_option_prices[0].sub_duration_type
          ) {
            addons.push({
              ...product,
              option
            })
          }
        })
      })

      const recommended = this.getRecommendedProduct()

      return addons
        .filter((rel) => rel.option)
        .sort((firstProduct, secondProduct) => {
          const isRecommended = firstProduct.slug === recommended
          let keepProductOrder = true
          if (firstProduct.id === secondProduct.id && firstProduct.option.id > secondProduct.option.id) {
            keepProductOrder = false
          }
          return isRecommended && keepProductOrder ? -1 : 1
        })
    }
  },
  async mounted() {
    await this.getData()
    const recommended = this.getRecommendedProduct()

    const firstRecommendedProductIndex = this.addons.findIndex((addon) => addon.slug === recommended)

    if (firstRecommendedProductIndex >= 0) {
      this.selectProduct(this.addons[firstRecommendedProductIndex])
      this.addons[firstRecommendedProductIndex].recommended = true
    }
  },
  methods: {
    getRecommendedProduct() {
      return this.$route.query.addon || localStorage.getItem('recommended_addon')
    },
    async getData() {
      const productIdOrSlug = this.$store.state.addToCartItem[0].id ?? this.$route.params.slug
      const {
        data: {
          response: {
            product: { related_products }
          }
        }
      } = await getProductDetails(productIdOrSlug)
      this.relatedProducts = related_products
    },
    selectProduct(product) {
      const index = this.selectedProducts.findIndex((selectedProduct) => selectedProduct.id === product.id)
      const optionIndex = this.selectedProducts.findIndex(
        (selectedProduct) => selectedProduct.option.id === product.option.id
      )
      if (index > -1 && optionIndex > -1) {
        this.selectedProducts.splice(index, 1)
      } else if (index > -1 && optionIndex === -1) {
        this.selectedProducts.splice(index, 1)
        this.selectedProducts.push(product)
      } else {
        this.selectedProducts.push(product)
      }
    },
    track(selectedProduct) {
      const { category_id, title, prescription_based, order } = selectedProduct
      trackAddToCart(window, {
        ...selectedProduct.option,
        category_id,
        title,
        prescription_based,
        order
      })
    },
    async proceedNextStep() {
      if (this.authenticated) {
        return this.$router.push('/checkout')
      } else {
        return this.$router.push('/user/register?fromCheckout')
      }
    },
    async onSubmit() {
      // Add item to cart
      for (const selectedProduct of this.selectedProducts) {
        await addItemToCart({
          product_option_price_id: selectedProduct.option.product_option_prices[0].id,
          quantity: 1,
          period_quantity: 0,
          action: selectedProduct.prescription_based ? 'OVERRIDE' : undefined
        })
        this.track(selectedProduct)
      }

      // Update cart
      const response = await getCarts()
      this.$store.commit('updateCart', response.data.response)

      await trackCheckoutStarted(window, this.cartItems, this.$store.state.cart.cart?.id)
      await this.proceedNextStep()
    }
  }
}
</script>

<style lang="scss" scoped>
.checkout-wrapper {
  background-color: $springwood-background;
  min-height: 100vh;
}

.checkout-inner-wrapper {
  padding: 6rem 0 0;

  @media screen and (max-width: 768px) {
    padding-top: 4.5rem;
  }
}

.checkout-content {
  padding: 4rem calc(30px + 5vw);
  width: 100%;
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: 768px) {
    padding: 0;
    flex-direction: column;
  }
}

.addon-wrapper {
  background-color: #f2f2ec;
  border-radius: 10px;
  width: 30vw;
  height: fit-content;
  padding: 20px;

  @media screen and (max-width: 768px) {
    width: 90vw;
    margin-bottom: 20px;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    flex-direction: column;
  }
  .addon-title {
    padding-bottom: 20px;
    font-family: PublicSansExtraBold, monospace;
    font-size: 2rem;

    @include mediaSm {
      padding-top: 0;
      padding-bottom: 5px;
      font-size: 1.5rem;
    }
  }
  .addon-description {
    font-family: PublicSans, monospace;
    font-size: 18px;
    line-height: 1.4;

    @include mediaSm {
      padding-top: 0;
      padding-bottom: 5px;
      font-size: 0.9rem;
    }
  }
}

.price-options-container {
  margin: 0 4rem 40px 4rem;
  @include mediaSm {
    margin: 0 1rem 40px;
  }

  .addon-title {
    font-family: PublicSansBold, sans-serif;
    font-size: 2rem;
    margin-bottom: 40px;

    @media screen and (max-width: 768px) {
      font-size: 1.8rem;
      padding-bottom: 20px;
    }
  }

  .addon-subtitle {
    font-family: PublicSans, monospace;
    font-size: 1.125rem;
    line-height: 1.4;
    @media screen and (max-width: 768px) {
      font-size: 14px;
      line-height: 1.3;
    }
  }

  .product-plan {
    font-family: PublicSans, monospace;

    .product-plan-option {
      flex-basis: 50%;
      cursor: pointer;
      padding: 25px;
      font-size: 1.125rem;
      background: #fff;
      margin: 8px 0;
      border: 3px solid #fff;
      transition: all 0.1s;
      position: relative;
      flex-direction: row;
      display: flex;

      @include mediaSm {
        font-size: 1rem;
        flex-direction: column;
      }

      .product-image {
        img {
          width: 70px;
        }
      }

      .product-deets {
        margin-left: 2rem;
        width: 100%;
        @include mediaSm {
          margin-left: 0.5rem;
        }
      }
      .product-plan-details {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        padding-bottom: 10px;
      }

      .product-plan-option-price {
        text-align: right;
      }

      .product-plan-option-name {
        font-size: 1.5rem;
        font-family: PublicSansBold, sans-serif;
        margin: auto 0;
      }
      &.active {
        border: 3px solid $apricot-text;
      }

      .product-description {
        font-size: 16px;
      }

      &.recommended {
        padding-top: 2.6rem;

        &.active {
          border: 3px solid $apricot-text;
        }

        /deep/.tag {
          font-family: PublicSansBold, sans-serif;
          width: calc(100% + 6px);
          position: absolute;
          left: -3px;
          top: -4px;
          background: $apricot-text;
          color: #fff;
          padding: 5px 20px;
          font-size: 0.8rem;
          text-transform: uppercase;
          text-align: center;
          letter-spacing: 1.5px;
        }
      }
    }
  }

  .submit-button {
    margin-left: auto;
    &:disabled {
      background-color: grey;
      cursor: not-allowed;
    }
  }
}
</style>
