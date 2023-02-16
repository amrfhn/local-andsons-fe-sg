<template>
  <div
    :class="`
        product-item
        tw-w-full
        tw-flex
        tw-flex-row
        tw-mb-10
        tw-text-left
        lg:tw-mx-4
        lg:tw-px-4
        md:tw-flex-col
        md:tw-text-left
        ${category.slug || ''}
      `"
  >
    <div class="product-image-wrapper md:tw-mb-3 tw-flex tw-flex-1 tw-w-1/3 md:tw-w-full">
      <router-link v-if="productInfo.data.slug" :to="`/product/${productInfo.data.slug}`" class="tw-relative tw-w-full">
        <img
          v-if="productInfo.data.image"
          class="product-image tw-w-full tw-mr-2 md:tw-pr-0 tw-mx-auto tw-self-center md:tw-self-stretch"
          :src="productInfo.data.image"
          :alt="productInfo.data.title"
        />
      </router-link>
      <div v-else class="tw-relative tw-items-center tw-w-full">
        <img
          v-if="productInfo.data.image"
          class="product-image tw-w-full tw-pr-2 md:tw-pr-0 tw-mx-auto tw-self-center md:tw-self-stretch"
          :src="productInfo.data.image"
          :alt="productInfo.data.title"
        />
      </div>
    </div>

    <div class="product-content tw-place-content-center tw-flex tw-flex-col tw-ml-2 md:tw-hidden tw-w-2/3">
      <router-link v-if="productInfo.data.slug" :to="`/product/${productInfo.data.slug}`">
        <div class="tw-text-lg tw-font-extrabold tw-mb-0">
          {{ productInfo.data.title }}
          <font-awesome-icon :icon="['fas', 'chevron-right']" class="tw-text-lg tw-ml-4 tw-hidden md:tw-flex" />
        </div>
        <div class="tw-text-base" v-html="productInfo.data.description" />
      </router-link>
      <div v-else>
        <div class="product-title md:tw-mb-4">
          {{ productInfo.data.title }}
        </div>
        <div class="product-description tw-mt-1 md:tw-mb-6" v-html="productInfo.data.description" />
      </div>
      <div class="product-price tw-font-bold md:tw-text-xl" v-html="productInfo.data.priceDescription" />
      <div v-if="['supplements', 'skincare'].indexOf($route.params.catalogue) > -1">
        <router-link
          v-if="productInfo.data.isRx.default && $route.params.catalogue === 'skincare'"
          class="submit-button tw-w-full tw-text-center tw-px-5 tw-py-2 tw-mt-2 md:tw-mt-3 md:tw-mx-auto tw-text-xs"
          :to="`/evaluation/${$route.params.catalogue}/start`"
        >
          Start&nbsp;Evaluation
        </router-link>
        <router-link
          v-else
          class="submit-button tw-w-full tw-text-center tw-px-3 tw-py-2 tw-mt-2 md:tw-mt-3 md:tw-mx-auto tw-text-xs"
          :to="`/product/${productInfo.data.slug}/options`"
        >
          Buy&nbsp;Now
        </router-link>
      </div>
    </div>

    <div class="product-content md:tw-place-content-start tw-hidden md:tw-flex tw-flex-1 tw-w-full">
      <router-link v-if="productInfo.data.slug" :to="`/product/${productInfo.data.slug}`">
        <div class="tw-text-xl tw-font-extrabold tw-mb-0">
          {{ productInfo.data.title }}
          <font-awesome-icon :icon="['fas', 'chevron-right']" class="tw-text-xl tw-ml-4" />
        </div>
        <div class="tw-text-base tw-mb-6" v-html="productInfo.data.description" />
      </router-link>
      <div v-else>
        <div class="product-title md:tw-mb-4">
          {{ productInfo.data.title }}
        </div>
        <div class="product-description tw-mt-1 tw-mb-6" v-html="productInfo.data.description" />
      </div>
    </div>

    <div class="product-cta tw-hidden md:tw-flex md:tw-flex-col tw-w-2/3 md:tw-w-full">
      <div
        v-if="showPrice"
        class="product-price tw-font-bold tw-text-lg md:tw-text-xl"
        v-html="productInfo.data.priceDescription"
      />
      <div v-if="['supplements', 'skincare'].indexOf($route.params.catalogue) > -1">
        <router-link
          v-if="productInfo.data.isRx.default && $route.params.catalogue === 'skincare'"
          class="submit-button tw-w-full tw-max-w-full tw-text-center tw-px-5 tw-py-3 md:tw-py-5 tw-mt-2 md:tw-mt-3"
          :to="`/evaluation/${$route.params.catalogue}/start`"
        >
          Start&nbsp;Evaluation
        </router-link>
        <router-link
          v-else
          class="submit-button tw-w-full tw-max-w-full tw-text-center tw-px-3 tw-py-3 md:tw-py-5 tw-mt-2 md:tw-mt-3"
          :to="`/product/${productInfo.data.slug}/options`"
        >
          Buy&nbsp;Now
          <span v-if="['skincare'].indexOf($route.params.catalogue) === 0">
            - $ {{ productInfo.data.priceDescription }}/month
          </span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShowcaseBuilderProductItem',
  props: ['category', 'productInfo'],
  computed: {
    purchaseOrEvaluationButtonText() {
      switch (this.$route.params.catalogue) {
        case 'skincare':
          return 'Start evaluation'
        default:
          return 'Buy now'
      }
    },
    productPurchaseOrEvaluationLink() {
      switch (this.$route.params.catalogue) {
        case 'skincare':
          return `/evaluation/${this.$route.params.catalogue}/start`
        default:
          return `/product/${this.productInfo.data.slug}/options`
      }
    },
    showPrice: function () {
      return (
        ['skincare'].indexOf(this.$route.params.catalogue) === -1 ||
        (['skincare'].indexOf(this.$route.params.catalogue) === 0 && this.productInfo.data.isPrescriptionProduct)
      )
    },
  },
}
</script>

<style lang="scss" scoped>
.product-item {
  .submit-button {
    transition: all 0.3s ease-in-out;
  }
  .submit-button:hover {
    background-color: black !important;
    color: white !important;
  }
  .product-image-wrapper .product-image {
    z-index: 1;
    // max-height: 180px;
  }
  &.supplements,
  &.skincare {
    .product-image-wrapper .product-image {
      @media screen and (min-width: 768px) {
      }
    }
  }
  .product-title {
    font-family: PublicSansBold, sans-serif;
  }
  .product-description {
    overflow: hidden;
    min-height: calc(2 * 20px);
    // line-height: 28px;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    @include mediaSm {
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
  .product-price {
    @include mediaSm {
      margin-top: 0.5em;
    }
  }
}
</style>