<template>
  <div
    :class="
      `
        product-item
        tw-flex
        tw-flex-row
        tw-mb-10
        tw-text-left
        md:tw-mx-4
        md:tw-px-4
        md:tw-px-0
        md:tw-flex-col
        md:tw-text-left
        ${category.slug || ''}
      `
    "
  >
    <div class="product-image-wrapper md:tw-mb-3 tw-flex tw-flex-1 tw-w-1/3 md:tw-w-full">
      <router-link :to="`/product/${productInfo.slug}`" class="tw-relative tw-w-full">
        <img
          v-if="productInfo.imageThumbnail"
          class="product-image tw-w-full tw-mr-2 md:tw-pr-0 tw-mx-auto tw-self-center md:tw-self-stretch"
          :src="productInfo.imageThumbnail"
          :alt="productInfo.title"
        />
      </router-link>
      <span
        v-if="productInfo.isPrescriptionProduct"
        class="product-tag tw-px-2 tw-m-2 md:tw-absolute tw-z-10 tw-rounded-md tw-text-base tw-hidden md:tw-block"
      >
        Prescription
      </span>
    </div>

    <div class="product-content tw-place-content-center tw-flex tw-flex-col tw-ml-2 md:tw-hidden tw-w-2/3">
      <router-link :to="`/product/${productInfo.slug}`">
        <span v-if="productInfo.isPrescriptionProduct" class="product-tag tw-px-2 tw-z-10 tw-rounded-md tw-text-xs">
          Prescription
        </span>
        <div class="tw-text-lg tw-font-extrabold tw-mb-0">
          {{ productInfo.title }}
          <font-awesome-icon :icon="['fas', 'chevron-right']" class="tw-text-lg tw-ml-4 tw-hidden md:tw-flex" />
        </div>
        <div class="tw-text-base" v-html="productInfo.short_desc" />
      </router-link>
      <div v-if="showPrice" class="product-price tw-font-bold md:tw-text-xl" v-html="productInfo.priceDesc" />
      <div v-if="['supplements', 'skincare'].indexOf($route.params.catalogue) > -1">
        <router-link
          v-if="productInfo.isPrescriptionProduct"
          class="submit-button tw-w-full tw-text-center tw-px-5 tw-py-2 tw-mt-2 md:tw-mt-3 md:tw-mx-auto tw-uppercase tw-text-xs"
          :to="`/evaluation/${$route.params.catalogue}/start`"
        >
          Start&nbsp;Evaluation
        </router-link>
        <router-link
          v-else
          class="submit-button tw-w-full tw-text-center tw-px-10 tw-py-2 tw-mt-2 md:tw-mt-3 md:tw-mx-auto tw-uppercase tw-text-xs"
          :to="`/product/${productInfo.slug}/options`"
        >
          Buy&nbsp;Now
        </router-link>
      </div>
    </div>

    <div class="product-content md:tw-place-content-start tw-hidden md:tw-flex tw-flex-1 tw-w-full">
      <router-link :to="`/product/${productInfo.slug}`">
        <div class="tw-text-xl tw-font-extrabold tw-mb-0">
          {{ productInfo.title }}
          <font-awesome-icon :icon="['fas', 'chevron-right']" class="tw-text-xl tw-ml-4" />
        </div>
        <div class="tw-text-base tw-mb-6" v-html="productInfo.short_desc" />
      </router-link>
    </div>

    <div class="product-cta tw-hidden md:tw-flex md:tw-flex-col tw-w-2/3 md:tw-w-full">
      <div
        v-if="showPrice"
        class="product-price tw-font-bold tw-text-lg md:tw-text-xl"
        v-html="productInfo.priceDesc"
      />
      <div v-if="['supplements', 'skincare'].indexOf($route.params.catalogue) > -1">
        <router-link
          v-if="productInfo.isPrescriptionProduct"
          class="submit-button tw-w-80 tw-max-w-full tw-text-center tw-px-5 tw-py-3 md:tw-py-5 tw-mt-2 md:tw-mt-3 tw-uppercase"
          :to="`/evaluation/${$route.params.catalogue}/start`"
        >
          Start&nbsp;Evaluation
        </router-link>
        <router-link
          v-else
          class="submit-button tw-w-80 tw-max-w-full tw-text-center tw-px-10 tw-py-3 md:tw-py-5 tw-mt-2 md:tw-mt-3 tw-uppercase"
          :to="`/product/${productInfo.slug}/options`"
        >
          Buy&nbsp;Now
          <span v-if="['skincare'].indexOf($route.params.catalogue) === 0"> - {{ productInfo.priceDesc }} </span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShowcaseProductItemV2',
  props: ['category', 'productInfo'],
  computed: {
    showPrice: function() {
      return (
        ['skincare'].indexOf(this.$route.params.catalogue) === -1 ||
        (['skincare'].indexOf(this.$route.params.catalogue) === 0 && this.productInfo.isPrescriptionProduct)
      )
    }
  }
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
      // max-height: 270px;
      // height: min-content;
    }
  }

  .product-image-wrapper .product-image {
    z-index: 1;
    // max-height: 180px;
  }

  .product-title {
    font-family: PublicSansBold, sans-serif;
  }

  .product-content {
    max-width: 320px;
    min-height: 72px;
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
  .product-tag {
    background-color: #f3ff37;
  }
}
</style>
