<template>
  <div
    :class="
      `
        product-item
        tw-flex
        tw-flex-row
        tw-mb-10
        tw-text-left
        tw-px-4
        md:tw-flex-col
        md:tw-text-left
        ${slug || ''}
      `
    "
  >
    <div class="product-link-area tw-place-content-center tw-mb-10 tw-flex-row md:tw-flex-col tw-flex">
      <div
        class="product-image-wrapper md:tw-mb-3 tw-inline-block md:tw-flex sm:tw-overflow-hidden md:overflow-visible tw-w-1/3 md:tw-w-full tw-justify-center"
        @click="pushToProductDetail()"
      >
        <img class="product-image" :src="imageThumbnail" :alt="title" />
        <img v-if="imageBg" :src="imageBg" class="product-background" alt="product background" />
      </div>
      <div
        class="product-content tw-w-3/4 tw-flex-grow tw-self-center tw-flex tw-flex-col md:tw-hidden tw-ml-3 md:tw-ml-0"
      >
        <div class="product-content-main md:tw-h-36 tw-flex-col" @click="pushToProductDetail()">
          <div class="product-title md:tw-h-1/2 md:tw-mb-0 tw-overflow-ellipsis tw-overflow-hidden tw-flex">
            {{ title }}
          </div>
          <div
            class="product-description md:tw-h-auto tw-mt-1 md:tw-mb-6 tw-overflow-ellipsis tw-overflow-hidden tw-flex"
            v-html="short_desc"
          />
        </div>
        <div class="price" @click="pushToProductDetail()" v-html="priceDesc" />
        <div v-if="isPrescriptionProduct">
          <div
            class="view-product-button tw-w-full tw-text-center tw-px-5 tw-py-3 md:tw-py-5 tw-mt-2 md:tw-mt-3 md:tw-mx-auto"
            @click="openQuestionnaire"
          >
            START EVALUATION
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
            class="view-product-button tw-w-full tw-text-center tw-px-5 tw-py-3 md:tw-py-5 tw-mt-2 md:tw-mt-3 md:tw-mx-auto"
            :disabled="!productOptions[0].cta_enabled"
            :style="!productOptions[0].cta_enabled ? { backgroundColor: 'grey', cursor: 'not-allowed' } : ''"
            @click="onSubmit"
          >
            {{ productOptions[0].cta }}
          </div>
        </div>
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
  name: 'ProductItem',
  components: {
    ProductItemModal
  },
  props: {
    id: { required: true, type: Number },
    category_id: { required: true, type: Number },
    category: { required: true, type: Object },
    order: { required: true, type: Number },
    price: { required: true, type: Number },
    title: { required: true, type: String },
    description: { required: true, type: String },
    short_desc: { required: true, type: String },
    priceDesc: { required: true },
    slug: { required: true, type: String },
    type: { required: true, type: String },
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
      await this.$router.push(`/evaluation/${this.category.slug}/start`)
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
            prescription_based: this.isPrescriptionProduct,
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
            prescription_based: this.isPrescriptionProduct,
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
  text-align: center;
  max-width: 790px;
  max-height: 790px;
  text-decoration: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: left;

  @media screen and (max-width: 450px) {
    margin: 0;
  }

  .product-link-area {
    cursor: pointer;
  }

  .product-image-wrapper {
    position: relative;

    .product-image {
      position: relative;
      z-index: 1;
    }

    .product-background {
      position: absolute;
      margin-left: auto;
      margin-right: auto;
      left: 0;
      right: 0;
      text-align: center;
    }

    .product-image,
    .product-background {
      width: auto;
      max-width: 500px;
      max-height: 250px;
      // height: 250px;

      @media screen and (max-width: 768px) {
        max-width: 100%;
      }
    }
  }

  .product-content {
    display: flex;
    flex-direction: column;
    // margin-top: -3vw;

    @media screen and (max-width: 768px) {
      margin-top: 0vw;
    }
  }

  .product-title {
    // top: calc(70% + 2rem);
    font-family: PublicSansExtraBold, sans-serif;
    font-size: 1.5rem;
    @include mediaSm {
      font-size: 1.125rem;
      padding-bottom: 0rem;
    }
  }
  .product-description {
    // font-family: AHAMONO, monospace;
    font-size: 0.9rem;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;

    @media screen and (max-width: 768px) {
      font-size: 0.8rem;
      height: initial;
      line-height: 1.4;
      min-height: 0;
      -webkit-line-clamp: unset;
    }

    @media screen and (max-width: 450px) {
      padding: 0;
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
    // top: 3%;
    color: #fff;
    background: #ed9075;
    font-family: PublicSans, monospace;
    font-size: 1rem;
    padding: 8px 16px;
    //min-width: 40%;
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
    //font-family: AHAMONO, monospace;
    font-size: 1.125rem;

    @media screen and (max-width: 768px) {
      position: initial;
      align-self: left;
      font-size: 0.8rem;
      margin-top: 0.5rem;
    }
  }

  .view-product-button {
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
  .product-image,
  .product-title,
  .product-description,
  .product-image-hover,
  .view-product-button {
    transition: all 0.3s;
  }
}
</style>
