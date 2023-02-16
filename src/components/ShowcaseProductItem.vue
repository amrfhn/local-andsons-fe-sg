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
        md:tw-px-0
        md:tw-flex-col
        md:tw-text-left
        ${category.slug || ''}
      `
    "
  >
    <div class="product-image-wrapper md:tw-mb-3 tw-flex tw-flex-1 tw-w-1/3 md:tw-w-full">
      <router-link :to="`/product/${productInfo.slug}`" class="tw-flex tw-self-center">
        <img
          v-if="productInfo.imageThumbnail"
          class="product-image tw-w-full tw-flex tw-pr-2 md:tw-pr-0 tw-mx-auto"
          :src="productInfo.imageThumbnail"
          :alt="productInfo.title"
        />
      </router-link>
    </div>

    <div class="product-content tw-flex tw-flex-col tw-ml-3 md:tw-hidden tw-w-2/3">
      <router-link :to="`/product/${productInfo.slug}`">
        <div class="product-title md:tw-mb-0">
          {{ productInfo.title }}
        </div>
        <div class="product-description tw-mt-1 md:tw-mb-6" v-html="productInfo.short_desc" />
      </router-link>
      <div class="product-price" v-html="productInfo.priceDesc" />
      <div v-if="['supplements', 'skincare'].indexOf($route.params.catalogue) > -1">
        <router-link
          v-if="productInfo.isPrescriptionProduct"
          class="submit-button tw-w-full tw-text-center tw-px-5 tw-py-2 tw-mt-2 md:tw-mt-3 md:tw-mx-auto"
          :to="`/evaluation/${$route.params.catalogue}/start`"
        >
          Start&nbsp;Evaluation
        </router-link>
        <router-link
          v-else
          class="submit-button tw-w-full tw-text-center tw-px-10 tw-py-2 tw-mt-2 md:tw-mt-3 md:tw-mx-auto"
          :to="`/product/${$route.params.catalogue}/select`"
        >
          Buy&nbsp;Now
        </router-link>
      </div>
    </div>

    <div class="product-content tw-hidden md:tw-flex tw-flex-1 tw-w-2/3 md:tw-w-full">
      <router-link :to="`/product/${productInfo.slug}`">
        <div class="product-title md:tw-mb-0">
          {{ productInfo.title }}
        </div>
        <div class="product-description tw-mt-1 tw-mb-6" v-html="productInfo.short_desc" />
      </router-link>
    </div>

    <div class="product-cta tw-hidden md:tw-flex md:tw-flex-col tw-w-2/3 md:tw-w-full">
      <div class="product-price" v-html="productInfo.priceDesc" />
      <div v-if="['supplements', 'skincare'].indexOf($route.params.catalogue) > -1">
        <router-link
          v-if="productInfo.isPrescriptionProduct"
          class="submit-button tw-w-80 tw-max-w-full tw-text-center tw-px-5 tw-py-3 md:tw-py-5 tw-mt-2 md:tw-mt-3"
          :to="`/evaluation/${$route.params.catalogue}/start`"
        >
          Start&nbsp;Evaluation
        </router-link>
        <router-link
          v-else
          class="submit-button tw-w-80 tw-max-w-full tw-text-center tw-px-10 tw-py-3 md:tw-py-5 tw-mt-2 md:tw-mt-3"
          :to="`/product/${productInfo.slug}/options`"
        >
          Buy&nbsp;Now
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShowcaseProductItem',
  props: ['category', 'productInfo']
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
  &.supplements,
  &.skincare {
    .product-image-wrapper .product-image {
      max-height: 100%;
    }
  }
  .product-image-wrapper .product-image {
    z-index: 1;
    max-height: 180px;
  }
  .product-title {
    font-family: PublicSansBold, sans-serif;
    font-size: 1.5rem;
    @include mediaSm {
      font-size: 1.125rem;
      padding-bottom: 0rem;
    }
  }
  .product-description {
    font-family: AHAMONO, monospace;
    font-size: 0.9rem;
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
    font-family: AHAMONO, monospace;
    font-size: 1.125rem;
    @include mediaSm {
      font-size: 0.8rem;
      margin-top: 0.5em;
    }
  }
}
</style>
