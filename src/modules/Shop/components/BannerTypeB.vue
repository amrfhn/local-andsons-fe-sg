<template>
  <div class="banner-design-b">
    <div class="banner-content">
      <div class="tw-text-3xl md:tw-text-5xl 2xl:tw-text-6xl tw-font-extrabold" v-html="title" />
      <div class="tw-text-base md:tw-text-xl tw-mt-4" v-html="bannerDetails.short_desc" />
      <a
        v-if="bannerDetails.cta !== null && bannerDetails.cta_open_in_new_tab == '0'"
        class="submit-button banner-b tw-my-8"
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
  computed: {
    title: function() {
      return window.innerWidth > 768 ? this.bannerDetails.title : this.bannerDetails.title.replaceAll('&nbsp;', ' ')
    }
  }
}
</script>

<style lang="scss" scoped>
.bg-image {
  display: block;
  width: 100%;
  height: 100vh;
  position: absolute;
  background-size: contain;
  object-fit: cover;
  top: calc(50% - 60px);
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

.banner-design-b {
  position: relative;
  height: 100vh;
  width: 100%;
  min-height: 650px;

  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
  }
}

.banner-content {
  height: 100%;
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 45%;
  margin-left: calc(30px + 5vw);
  margin-right: calc(30px + 5vw);

  @media screen and (max-width: 768px) {
    & {
      max-width: 100%;
      justify-content: flex-start;
      text-align: center;
    }

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
    font-size: 64px;
    letter-spacing: 1px;
    font-family: 'PublicSansBlack', sans-serif;
    line-height: 1;

    @include mediaSm {
      font-size: 3rem;
    }
  }

  .short-desc {
    // font-family: "AHAMONO", sans-serif;
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

    @media screen and (max-width: 450px) {
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

.banner-b {
  // max-width: 20rem;
  align-self: flex-start;

  @media screen and (max-width: 768px) {
    margin-bottom: 2rem;
    align-self: center;
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
