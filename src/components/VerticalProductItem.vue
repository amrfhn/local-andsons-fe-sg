<template>
  <div class="product-item">
    <div class="product-image-wrapper">
      <img class="product-image" :src="imageThumbnail" alt="andsons product" />
      <img v-if="imageBg" :src="imageBg" class="product-background" alt="product background" />
    </div>
    <div class="product-link-area" @click="pushToProductDetail()">
      <div class="product-content">
        <div class="product-title">{{ title }}</div>
        <div class="product-description" v-html="short_desc" />
        <div class="price" v-html="priceDesc" />
      </div>
    </div>
    <div v-if="isPrescriptionProduct">
      <div class="view-product-button" @click="openQuestionnaire">
        START EVALUATION
      </div>
      <div class="prescription-tag-container">
        <div class="prescription-tag">Prescription product</div>
      </div>
    </div>
    <div v-else>
      <ProductItemModal
        v-if="isMultiplePrice"
        :id="id"
        :category_id="category_id"
        :order="order"
        :title="title"
        :is-prescription-product="isPrescriptionProduct"
        :product-options="productOptions"
        :short_desc="short_desc"
      />
      <div
        v-else-if="productOptions[0].cta_enabled"
        class="
              view-product-button
              tw-w-full
              tw-text-center
              tw-px-5
              tw-py-3
              md:tw-py-5
              tw-mt-2
              md:tw-mt-3
              md:tw-mx-auto"
        :disabled="!productOptions[0].cta_enabled"
        :style="!productOptions[0].cta_enabled ? { backgroundColor: 'grey', cursor: 'not-allowed' } : ''"
        @click="onSubmit"
      >
        {{ productOptions[0].cta }}
      </div>
    </div>
  </div>
</template>

<script>
import { addItemToCart, getCarts } from '@/api/carts'
import { eventBus } from '@/main.js'
import { getProductDetails } from '@/api/products'
import ProductItemModal from '@/components/ProductItemModal'
import { isPrescriptionBased } from '@/utils/categories.js'
import { trackAddToCart } from '@/utils/analytics.js'
import _ from 'lodash'

export default {
  name: 'VerticalProductItem',
  components: {
    ProductItemModal
  },
  props: {
    id: { required: true, type: Number },
    category_id: { required: true, type: Number },
    order: { required: true, type: Number },
    price: { required: true, type: Number },
    title: { required: true, type: String },
    description: { required: true, type: String },
    short_desc: { required: true, type: String },
    priceDesc: { required: true },
    slug: { required: true, type: String },
    type: { required: false, type: String },
    imageThumbnail: { required: true, type: String },
    imageBg: { default: null, type: String },
    isPrescriptionProduct: { required: true, type: Boolean },
    isMultiplePrice: { required: true, type: Boolean },
    productOptions: { default: () => [] },
    subProducts: { default: () => [] }
  },
  methods: {
    trackSelectItem() {
      const category_id = this.category_id
      const category = this.$store.getters['categories/idToSlug'][category_id]
      const { sku, product_option_prices } = this.productOptions[0]
      window?.dataLayer?.push({
        event: 'select_item',
        ecommerce: {
          items: [
            {
              item_name: this.title,
              item_id: sku,
              price: product_option_prices[0].price,
              item_category: category,
              item_category_2: isPrescriptionBased(this.isPrescriptionProduct),
              item_list_name: category,
              item_list_id: category_id,
              index: this.order,
              quantity: 1
            }
          ]
        },
        eventCallback: () => {
          window?.dataLayer?.push({ ecommerce: { items: undefined } })
        }
      })
    },
    pushToProductDetail() {
      this.trackSelectItem()
      this.$router.push(`/product/${this.slug}`)
    },
    async openQuestionnaire() {
      /*
      getCarts().then(response => {
        this.$store.commit("updateCart", response.data.response);
      });
      this.$store.commit("updateAddToCartItem", [
        {
          id: this.id,
          isMultiplePrice: this.isMultiplePrice,
          slug: this.slug
        }
      ]);
      */
      await this.$router.push('/evaluation/start')
    },
    onSubmit: _.debounce(
      async function() {
        if (this.isMultiplePrice) {
          this.trackSelectItem()
        } else if (this.productOptions.length === 0) {
          let response = await getProductDetails(this.id)

          const selectedOption = response.data.response.product.product_options[0]
          const productOptionPriceId = selectedOption.product_option_prices[0].id
          await addItemToCart({
            product_option_price_id: productOptionPriceId,
            quantity: 1,
            period_quantity: 0
          })
          getCarts().then((response) => {
            this.$store.commit('updateCart', response.data.response)
          })
          eventBus.$emit('toggleNavBar', true)
          trackAddToCart(window, {
            ...selectedOption,
            category_id: this.category_id,
            title: this.title,
            prescription_based: this.prescription_based,
            order: this.order
          })
        } else {
          const selectedOption = this.productOptions[0]
          const productOptionPriceId = selectedOption.product_option_prices[0].id
          await addItemToCart({
            product_option_price_id: productOptionPriceId,
            quantity: 1,
            period_quantity: 0
          })
          getCarts().then((response) => {
            this.$store.commit('updateCart', response.data.response)
          })
          this.$store.commit('updateAddToCartItem', [
            {
              id: null,
              isMultiplePrice: false,
              slug: null
            }
          ])
          eventBus.$emit('toggleNavBar', true)
          trackAddToCart(window, {
            ...selectedOption,
            category_id: this.category_id,
            title: this.title,
            prescription_based: this.prescription_based,
            order: this.order
          })
        }
      },
      1000,
      {
        leading: true,
        trailing: false
      }
    )
  }
}
</script>

<style lang="scss" scoped>
.product-item {
  position: relative;
  text-align: left;
  width: 30vw;
  text-decoration: none;
  padding: 3rem 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @include mediaSm {
    width: 70vw;
  }

  .product-link-area {
    cursor: pointer;
  }

  .product-image-wrapper {
    position: absolute;
    right: -42vw;
    top: -7vh;
    transform: rotate(340deg);
    width: 130%;
    max-width: 350px;
    height: auto;
    z-index: 0;

    @include mediaSm {
      width: 70%;
      height: auto;
      right: -35vw;
      top: -8vh;
    }

    .product-image {
      position: relative;
      max-height: 400px;

      @include mediaSm {
        max-height: 250px;
      }
    }

    .product-background {
      position: absolute;
      margin-left: auto;
      margin-right: auto;
      left: 0;
      right: 0;
      text-align: center;
    }
  }

  &:nth-child(2n) {
    .product-image-wrapper {
      left: -35vw;
      top: -7vh;
      transform: rotate(10deg);
      max-width: 350px;

      @include mediaSm {
        width: 70%;
        height: auto;
        left: -30vw;
        top: -13vh;
      }
    }
  }

  .product-content {
    display: flex;
    flex-direction: column;

    @media screen and (max-width: 768px) {
      margin-top: -10vw;
    }
  }

  .product-title {
    font-family: PublicSansExtraBold, sans-serif;
    font-size: 1.375rem;
    padding-bottom: 1rem;
    z-index: 1;

    @include mediaSm {
      font-size: 1.1rem;
      padding-bottom: 1rem;
    }
  }
  .product-description {
    font-family: PublicSans, monospace;
    font-size: 16px;
    overflow: hidden;
    // height: calc(2 * 28px);
    line-height: 28px;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    z-index: 1;

    @include mediaSm {
      font-size: 0.8rem;
      // padding-bottom: 1rem;
      line-height: 1.4;
    }
  }

  .prescription-tag-container {
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    text-align: center;

    @media screen and (max-width: 450px) {
      left: 0;
      text-align: left;
    }
  }
  .prescription-tag {
    color: #fff;
    background: #ed9075;
    font-family: PublicSans, monospace;
    font-size: 1rem;
    padding: 8px 16px;
    z-index: 10;
    border-radius: 4px 4px 4px 4px;
    display: inline-block;

    @media screen and (max-width: 768px) {
      font-size: 1rem;
    }

    @media screen and (max-width: 410px) {
      font-size: 0.8rem;
      border-radius: 0 4px 4px 0;
    }
  }
  .price {
    background-size: contain;
    font-family: PublicSansBold, monospace;
    font-size: 1.125rem;
    display: table;
    z-index: 10;
    bottom: 0;
    right: 0;
    margin: 1rem 0;

    @include mediaSm {
      font-size: 1rem;
      margin: 1rem 0;
    }
  }

  div .view-product-button {
    cursor: pointer;
    margin: 1rem auto 0;
    background: #000;
    color: #fff;
    text-align: center;
    font-family: PublicSansExtraBold, sans-serif;
    font-size: 1rem;
    letter-spacing: 1.2px;
    opacity: 1;
    display: flex;
    justify-content: center;
    // width: max-content;

    @media screen and (max-width: 768px) {
      font-size: 0.9rem;
      width: 100%;
    }
  }
}
</style>
