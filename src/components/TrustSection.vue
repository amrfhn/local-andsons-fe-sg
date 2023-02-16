<template>
  <div class="trust-section">
    <div class="trust-content">
      <h2 class="trust-title">Licensed doctors ready to help you.</h2>
      <p class="trust-description">
        It happens. Get a head start by talking to one of our doctors about your symptoms today.
      </p>
      <router-link v-if="ctaLink" class="submit-button inverted" :to="ctaLink">
        TALK TO A DOCTOR
      </router-link>
    </div>
    <div class="trust-image">
      <img :src="this.callDoctorImg" />
    </div>
  </div>
</template>

<script>
import callDoctorImg from '@/assets/images/call-doctor.png'

export default {
  name: 'TrustSection',
  props: ['ctaLink'],
  data() {
    return {
      callDoctorImg
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
    flex-direction: column-reverse;
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
