<template>
  <section id="talk-to-us-section" class="tw-bg-limegreen">
    <div class="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 tw-gap-x-28">
      <div class="tw-grid tw-justify-end">
        <img src="../../../assets/images/call-doctor.png" alt="" />
      </div>
      <div
        class="tw-flex tw-flex-col tw-justify-center tw-items-center sm:tw-items-start tw-gap-6 tw-text-center sm:tw-text-left tw-p-10"
      >
        <h1 class="tw-font-bold tw-text-2.5xl sm:tw-text-5xl">Talk to us</h1>
        <p class="tw-font-ahamono">Unsure where to start?</p>
        <p class="tw-font-ahamono">
          Schedule a call with one of our licensed Doctors to talk about your symptoms and options today.
        </p>
        <button class="buttonStyle tw-w-fit" @click="navigateToDoctorsPage">
          TALK TO A DOCTOR
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import { trackUserAction } from '@/utils/analytics'
export default {
  methods: {
    navigateToDoctorsPage: function() {
      trackUserAction('Talk To a Doctor Selected', {
        origin: this.$router.currentRoute.fullPath
      })
      this.$router.push('/book-consultation')
    }
  }
}
</script>
