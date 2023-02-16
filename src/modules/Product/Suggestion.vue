<template>
  <div v-if="suggestedProducts.length > 0" class="product-suggestion tw-flex tw-flex-col tw-py-20 tw-bg-white">
    <div
      class="product-suggestion-title tw-w-full tw-flex tw-text-3xl md:tw-text-5xl tw-font-black tw-justify-start md:tw-justify-center tw-mb-8 md:tw-mb-12"
    >
      Best paired with
    </div>
    <div class="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-3">
      <div v-for="product in suggestedProducts" :key="product.id">
        <ProductItem v-if="product.category && product.category.slug" v-bind="product" />
      </div>
    </div>
  </div>
</template>
<script>
import ProductItem from '@/components/ProductItem.vue'

export default {
  components: { ProductItem },
  props: ['suggestedProducts'],
  methods: {
    backButton() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
.product-suggestion {
  padding-left: calc(30px + 5vw);
  padding-right: calc(30px + 5vw);

  @media screen and (max-width: 768px) {
    padding-left: 5vw;
    padding-right: 5vw;
  }
}
</style>
