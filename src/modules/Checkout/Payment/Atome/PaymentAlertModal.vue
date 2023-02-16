<template>
  <div
    v-if="value"
    class="tw-p-4 tw-fixed tw-top-0 tw-left-0 tw-flex tw-justify-around tw-items-center tw-w-full tw-h-full"
    style="z-index: 9999999999; background: rgba(0, 0, 0, 0.5)"
  >
    <div
      class="tw-flex-col tw-self-center tw-border-4 tw-border-black tw-bg-white tw-m-auto tw-p-4 tw-text-center"
      style="width: 500px"
    >
      <h1 class="tw-text-3xl tw-mb-8">NOTICE</h1>
      <p class="tw-text-md tw-align-middle tw-w-full">
        You will be redirected in {{ cd }} to
        <img
          src="@/assets/images/atome/atome_transparent.png"
          class="tw-h-7 tw-align-middle tw-inline-block"
          align="middle"
        />
        to complete your payment. After making payment, you will be redirected back to us to complete your checkout.
      </p>
      <br />
      <p class="tw-text-md tw-w-full">
        If you have purchased a prescription item, you will be directed to book an appointment with our doctors.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AtomePayButton',
  components: {},
  props: {
    value: {
      type: Boolean,
      default: false
    },
    url: {
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
      cd: this.countdown
    }
  },
  mounted() {
    if (this.url) this.startCountdown()
  },
  methods: {
    startCountdown() {
      setTimeout(() => {
        this.cd--
        if (!this.cd) {
          window.location.replace(this.url)
        } else {
          this.startCountdown()
        }
      }, 1000)
    }
  }
}
</script>
<style lang="scss" scoped>
.atome-button {
  font-family: 'PublicSansExtraBold', sans-serif;
  outline: none;
  border: 2px solid black;
  cursor: pointer;
  padding: 1.4rem 1rem;
  letter-spacing: 1.2px;
  align-items: center;
  text-align: left;
}
</style>
