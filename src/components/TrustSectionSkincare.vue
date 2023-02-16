<template>
  <section class="trust-section tw-bg-cover md:tw-py-16 tw-py-4" :style="`background-image: url(${backgroundImage})`">
    <div class="container tw-grid md:tw-grid-cols-2 tw-grid-cols-1 tw-p-8 tw-justify-items-end">
      <div class="tw-self-center md:tw-w-3/4 tw-w-full">
        <div>
          <h2 class="tw-text-3xl md:tw-text-5xl tw-mb-4 tw-font-extrabold tw-text-center md:tw-text-left">
            Licensed doctors ready to help you.
          </h2>
          <p class="tw-text-base md:tw-text-xl tw-text-center md:tw-text-left">
            It happens. Get a head start by talking to one of our doctors about your symptoms today.
          </p>
        </div>
        <router-link v-if="ctaLink" class="submit-button tw-mx-auto md:tw-mx-0 tw-mt-8" :to="ctaLink">
          TALK TO A DOCTOR
        </router-link>
      </div>
    </div>
  </section>
</template>

<script>
import callDoctorImg from '@/assets/images/call-doctor-2.png'
import callDoctorImgMobile from '@/assets/images/call-doctor-mobile.png'
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '../../tailwind.config'

const fullConfig = resolveConfig(tailwindConfig)

export default {
  name: 'TrustSectionSkincare',
  props: ['ctaLink'],
  data() {
    return {
      callDoctorImg,
      callDoctorImgMobile,
      backgroundImage: callDoctorImg
    }
  },
  created() {
    window.addEventListener('resize', this.getImage)
  },
  destroyed() {
    window.removeEventListener('resize', this.getImage)
  },
  mounted() {
    this.getImage()
  },
  methods: {
    getImage: function() {
      const breakpoint = parseInt(fullConfig.theme.screens.md.slice(0, fullConfig.theme.screens.md.indexOf('px')))
      this.backgroundImage = window.innerWidth > breakpoint ? callDoctorImg : callDoctorImgMobile
    }
  }
}
</script>

<style lang="scss" scoped>
.trust-section {
  display: flex;
  flex-direction: row;
  background-color: $darkgreen-background;

  @include mediaSm {
    flex-direction: column;
    background-position: bottom;
    height: 100vh;
    // background-color: $greenwhite-background;
  }

  .trust-content {
    text-align: left;
    padding: 5rem 10rem;
    background-color: $greenwhite-background;
    width: 60vw;

    @include mediaSm {
      width: 100vw;
      padding: 5rem 2rem;
    }
  }
  .trust-image {
    background-color: $darkgreen-background;
    width: 40vw;
    margin: auto auto 0 auto;
    text-align: center;

    @include mediaSm {
      display: none;
    }
  }

  .trust-title {
    color: $black-text;
    font-family: 'PublicSansBlack', sans-serif;
    font-size: 4rem;
    margin-bottom: 2rem;

    @include mediaSm {
      font-size: 2rem;
      margin-bottom: 1rem;
    }
  }
  .trust-description {
    font-family: 'PublicSans', sans-serif;
    font-size: 1.5rem;
    line-height: 1.5;

    @include mediaSm {
      font-size: 18px;
    }
  }
}
</style>
