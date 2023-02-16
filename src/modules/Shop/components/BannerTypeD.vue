<template>
  <div class="banner-design-d">
    <div class="banner-content">
      <div class="short-desc" v-html="bannerDetails.short_desc"></div>
      <div class="title" v-html="bannerDetails.title"></div>
      <a
        v-if="bannerDetails.cta !== null && bannerDetails.cta_open_in_new_tab == '0'"
        class="submit-button banner-d"
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
  props: ['bannerDetails']
}
</script>

<style lang="scss" scoped>
.banner-design-d {
  position: relative;
  height: 90vh;
  // height: 100%;
  width: 100%;

  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
  }
}

.bg-image {
  display: block;
  width: 100%;
  height: 100%;
  position: absolute;
  background-size: contain;
  object-fit: cover;
  top: 50%;
  left: 0;
  transform: translateY(-50%);

  @media screen and (max-width: 768px) {
    top: 0;
    left: 0;
    transform: initial;
    background-size: cover;
    width: 100%;
  }
}

.banner-content {
  height: 100%;
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 700px;
  margin-left: calc(30px + 5vw);
  margin-right: calc(30px + 5vw);

  @media screen and (max-width: 768px) {
    height: initial;

    &::before {
      content: '';
      height: 15vh;
      max-height: 200px;
      display: block;
    }
  }

  @media screen and (max-width: 450px) {
    margin: 0 30px;
  }

  .title {
    margin-bottom: 2rem;
    font-size: 90px;
    letter-spacing: 1px;
    font-family: 'PublicSansBlack', sans-serif;
    line-height: 1;

    @include mediaSm {
      font-size: 3rem;
    }
  }

  .short-desc {
    font-family: 'AHAMONO', sans-serif;
    font-size: 24px;

    @include mediaSm {
      font-size: 16px;
      margin-bottom: 10px;
    }

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

    @include mediaSm {
      font-size: 15px;
    }
  }

  /deep/ li::marker {
    color: #ed9075;
  }
}

a {
  text-decoration: none;
}

.banner-d {
  // max-width: 20rem;
  align-self: flex-start;

  @media screen and (max-width: 768px) {
    margin-bottom: 2rem;
    margin-top: 0;
  }
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
</style>
