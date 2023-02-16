<template>
  <div id="cover" class="tw-col-span-1 md:tw-col-span-6 lg:tw-col-span-5">
    <div class="product-cover-photo tw-mb-6">
      <carousel
        ref="carousel"
        class="nav-size"
        :per-page="1"
        :center-mode="true"
        navigation-prev-label="&#10094;"
        navigation-next-label="&#10095;"
        :navigation-click-target-size="10"
        :navigation-enabled="true"
        pagination-active-color="#ED9075"
        pagination-color="#EAEBDF"
      >
        <slide v-for="(image, index) in productData.image_arr" :key="index">
          <img :src="image" alt="Product Image" class="product-carousel-image" />
        </slide>
      </carousel>
    </div>
  </div>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel'

export default {
  name: 'ProductCoverPhoto',
  components: {
    Carousel,
    Slide
  },
  props: ['productData'],
  mounted() {
    setTimeout(this.$refs.carousel.computeCarouselWidth, 300)
  }
}
</script>

<style scoped lang="scss">
.product-cover-photo {
  max-width: 700px;
  max-height: 700px;
  width: 100%;

  button {
    font-size: 300px;
  }
}

/deep/ .VueCarousel-dot-container,
/deep/ .VueCarousel-dot {
  margin-top: 0 !important;
}

.product-cover-photo > *,
.product-cover-photo > * > *,
.product-cover-photo > * > * > *,
.product-cover-photo > * > * > * > *,
.product-cover-photo > * > * > * > * > * {
  height: 100%;
  width: 100%;
}
</style>
