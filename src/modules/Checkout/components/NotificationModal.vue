<template>
  <div
    v-if="value"
    class="
      tw-p-4
      tw-fixed
      tw-top-0
      tw-left-0
      tw-flex
      tw-justify-around
      tw-items-center
      tw-w-full
      tw-h-full
    "
    style="z-index:9999999999; background: rgba(0, 0, 0, 0.5)"
  >
    <div
      class="
        tw-flex-col
        tw-self-center
        tw-m-auto
        tw-p-8
        tw-text-center
        checkout-notification
      "
      style="width:500px"
    >
      <h1 class="tw-text-3xl tw-font-bold tw-mb-8">NOTICE</h1>
      <p class="tw-text-md tw-align-middle tw-w-full">
        You will be redirected in {{ countdownTimer }}
        to book a consultation with your doctor.
        <br /><br />
        You must book and complete the consultation for your purchase to be approved and shipped out.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CheckoutNotificationModal',
  components: {},
  props: {
    value: {
      type: Boolean,
      default: false
    },
    path: {
      type: String,
      required: false
    },
    countdown: {
      type: Number,
      default: 5
    }
  },
  data() {
    return {
      countdownTimer: this.countdown
    }
  },
  mounted() {
    if (this.path) this.startCountdown()
  },
  methods: {
    startCountdown() {
      setTimeout(() => {
        this.countdownTimer--
        if (!this.countdownTimer) {
          this.$router.replace(this.path)
        } else {
          this.startCountdown()
        }
      }, 1000)
    }
  }
}
</script>
<style lang="scss" scoped>
.checkout-notification {
  background-color: #f9eade;
}
</style>
