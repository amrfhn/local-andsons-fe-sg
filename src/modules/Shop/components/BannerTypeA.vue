<template>
  <div class="banner-design-a">
    <p class="title" v-html="bannerDetails.title"></p>
    <p class="short-desc" v-html="bannerDetails.short_desc">
      Subscribe for 3 months and get the first on us
    </p>
    <div class="banner-images">
      <img :src="bannerDetails.image_arr[0]" alt="product_banner" />
      <img :src="bannerDetails.image_tag_arr[0]" alt="product_banner_abstract" class="abstract-bg" />
    </div>
    <a
      v-if="bannerDetails.cta !== null && bannerDetails.cta_open_in_new_tab == '0'"
      class="submit-button"
      :href="bannerDetails.cta_url"
      v-html="bannerDetails.cta"
    ></a>
    <a
      v-if="bannerDetails.cta !== null && bannerDetails.cta_open_in_new_tab == '1'"
      class="submit-button"
      :href="bannerDetails.cta_url"
      target="_blank"
      v-html="bannerDetails.cta"
    ></a>
  </div>
</template>

<script>
export default {
  props: ['bannerDetails']
}
</script>

<style lang="scss" scoped>
.banner-design-a {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 90vh;
  & > * {
    text-align: center;
  }

  &::before {
    content: '';
    height: 15vh;
    max-height: 200px;
    display: block;
  }
}

.title {
  font-size: 1.5rem;
  font-family: 'PublicSans', sans-serif;
  font-weight: 700;

  @media screen and (max-width: 450px) {
    font-size: 1rem;
  }
}

.short-desc {
  font-size: 2.3rem;
  margin: 1.5rem 0;
  letter-spacing: 1px;
  font-family: 'PublicSansExtraBold', sans-serif;
  padding: 0 30px;

  @media screen and (max-width: 450px) {
    font-size: 1.5rem;
  }
}

.banner-images {
  position: relative;
  max-width: 820px;
  max-height: 440px;
  margin: 0 auto;
  overflow: hidden;
  z-index: 10;
  & > img {
    object-fit: contain;
  }

  .abstract-bg {
    position: absolute;
    width: 70vw;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: -1;
    @media screen and (max-width: 450px) {
      width: 90%;
    }
  }
}

a {
  text-decoration: none;
}

.slider-btn-right {
  background: transparent !important;
}

.submit-button {
  margin-top: 0 !important;
  margin-bottom: 100px !important;
}
</style>
