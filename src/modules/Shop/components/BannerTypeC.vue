<template>
  <div class="banner-design-c">
    <div class="banner-content">
      <div class="banner-description">
        <div class="title" v-html="bannerDetails.title"></div>
        <div class="short-desc" v-html="bannerDetails.short_desc"></div>
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
    <img class="bg-image desktop" :src="bannerDetails.image_bg_arr[0]" />
    <img class="bg-image mobile" :src="bannerDetails.image_bg_mobile_arr[0]" />
  </div>
</template>

<script>
export default {
  props: ['bannerDetails'],
  data() {
    return {
      bgImage: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.banner-design-c {
  height: 100%;
  position: relative;

  @media screen and (max-width: 768px) {
    height: 100%;
  }
}

.banner-content {
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  height: 100%;
  align-items: center;
  margin: 0 calc(5vw + 30px);

  @media screen and (max-width: 768px) {
    flex-direction: column;
    justify-content: space-around;
  }

  @media screen and (max-width: 450px) {
    margin: 0 30px;
  }
}

.bg-image {
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-size: contain;
}

.desktop {
  display: block;
}

.mobile {
  display: none;
}

@media screen and (max-width: 768px) {
  .desktop {
    display: none;
  }

  .mobile {
    display: block;
  }
}

.title {
  margin-bottom: 2rem;
  font-size: 40px;
  letter-spacing: 1px;
  font-family: 'PublicSansExtraBold', sans-serif;

  @media screen and (max-width: 450px) {
    font-size: 25px;
  }
}

.short-desc {
  /deep/ ul {
    list-style: disc;
    margin-left: 17px;
  }
}
/deep/ li {
  font-family: 'PublicSansBold', sans-serif;
  font-weight: 700;
  font-size: 18px;
  margin-bottom: 0.5rem;

  @media screen and (max-width: 450px) {
    font-size: 15px;
  }
}

/deep/ li::marker {
  color: #ed9075;
}

a {
  text-decoration: none;
}
</style>
