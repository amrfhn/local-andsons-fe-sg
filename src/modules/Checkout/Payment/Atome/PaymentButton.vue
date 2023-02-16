<template>
  <div>
    <button class="atome-button tw-w-full" @click="payByAtome">
      <div class="tw-flex tw-w-full tw-items-stretch">
        <div class="tw-shrink tw-text-sm tw-mr-4 tw-self-center">
          Atome - 3 Monthly Payments, 0% interest.
        </div>
        <div class="tw-inline-block tw-self-end">
          <img src="@/assets/images/atome/atome_transparent.png" class="tw-h-10 tw-grow" />
        </div>
      </div>
    </button>
  </div>
</template>

<script>
import { AtomeService } from '@/api/atome'
export default {
  name: 'AtomePayButton',
  components: {},
  props: ['orderId'],
  methods: {
    async payByAtome() {
      const { makePayment } = AtomeService()
      const url = await makePayment(this.orderId)

      this.$emit('redirect:url', url)
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
