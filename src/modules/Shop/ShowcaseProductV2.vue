<template>
  <div id="showcase-listing" :class="`showcase-listing ${category.slug}`">
    <div v-if="showcaseProducts.length > 0" class="products-container">
      <div class="showcase-header tw-text-center">
        <div class="tw-font-black md:tw-text-6xl tw-text-4xl md:tw-mb-4" v-html="title"></div>
        <p class="description" v-html="description" />
      </div>
      <div
        class="products md:tw-grid md:tw-gap-16 md:tw-ml-auto md:tw-mr-auto tw-mt-10 md:tw-mt-0 tw-w-full tw-flex tw-flex-wrap tw-place-items-center tw-items-stretch"
        :class="columnsClass"
      >
        <ShowcaseProductItem
          v-for="(product, index) in showcaseProducts"
          :key="index"
          :product-info="product"
          :category="category"
        />
      </div>

      <router-link
        v-if="['supplements', 'skincare'].indexOf(category.slug) === -1"
        class="submit-button inverted"
        :to="`/evaluation/${$route.params.catalogue}/start`"
      >
        GET&nbsp;TREATMENT&nbsp;PLANS
      </router-link>
    </div>
  </div>
</template>

<script>
import ShowcaseProductItem from '@/components/ShowcaseProductItemV2'

export default {
  components: { ShowcaseProductItem },
  props: ['showcaseProducts', 'category'],
  computed: {
    prescribedProducts: function() {
      return this.showcaseProducts.filter((p) => p.isPrescriptionProduct === true)
    },
    nonprescribedProducts: function() {
      return this.showcaseProducts.filter((p) => p.isPrescriptionProduct === false)
    },
    title: function() {
      switch (this.category.slug) {
        case 'hair-loss':
          return "<span>Losing hair? It's preventable.</span>"
        case 'sexual-health':
          return '<span>Tackling <u>erectile dysfunction</u> &amp; <br /><u>premature ejaculation</u> has never been easier.</span>'
        case 'supplements':
          return '<span>Our Supplements.</span>'
        default:
          return '<span>No Magic, Just Science</span>'
      }
    },
    description: function() {
      switch (this.category.slug) {
        case 'skincare': // skincare
          return 'Skincare made to work.'
        case 'supplements':
          return 'Made in labs. Backed by science.'
        default:
          return 'Thanks to science.'
      }
    },
    /**
     * Note that because of purgecss, we cannot use dynamically generated css classes
     */
    columnsClass: function() {
      switch (this.showcaseProducts.length) {
        case 1:
        case 2:
          return 'md:tw-grid-cols-2 md:tw-w-2/3'

        case 3:
          return 'md:tw-grid-cols-3 md:tw-10/12'

        case 5:
          return 'md:tw-grid-cols-3 tw-w-full'

        default:
          return 'md:tw-grid-cols-3 tw-w-full'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.showcase-listing {
  // background-color: $springwood-background;
  background-color: white;

  .products-container {
    margin: 5rem auto;
    max-width: 80vw;

    @include mediaSm {
      margin: 2rem auto;
    }
  }

  .showcase-header {
    padding-bottom: 3rem;
    @include mediaSm {
      padding: 0;
    }

    .title {
      font-family: 'PublicSansBlack', sans-serif;
      font-size: 4rem;
      margin-bottom: 0.25rem;

      @include mediaSm {
        font-size: 2rem;
        margin-bottom: 0.5rem;
      }
    }

    .description {
      font-size: 24px;

      @include mediaSm {
        font-size: 1rem;
      }
    }
  }

  .submit-button {
    text-decoration: none;
    margin: 5rem auto 2rem auto;
    text-align: center;

    @include mediaSm {
      margin: 0.5rem auto;
    }
  }
}
</style>
