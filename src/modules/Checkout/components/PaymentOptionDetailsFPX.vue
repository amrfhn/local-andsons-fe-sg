<template>
  <div>
    <div v-show="!loading" id="card-element" class="stripe-wrapper selected"></div>
  </div>
</template>
<script>
export default {
  name: 'PaymentOptionFPX',
  props: ['stripe'],
  data() {
    return {
      loading: false,
      card: undefined
    }
  },
  async mounted() {
    this.loading = true
    await this.loadPaymentMethods()
    this.loading = false
    this.$emit('ready', null)
  },
  beforeUnmount() {
    this.card.unmount()
    this.card = undefined
  },
  methods: {
    async loadPaymentMethods() {
      const elements = this.stripe.elements()
      this.card = elements.create('fpxBank', {
        classes: { base: 'stripe-wrapper no-padding' },
        style: {
          base: {
            lineHeight: '60px',
            padding: '0 16px'
          }
        },
        accountHolderType: 'individual'
      })
      this.card?.mount('#card-element')
    },
    getCard() {
      return this.card
    }
  }
}
</script>
<style lang="scss" scoped>
.stripe-wrapper {
  border: 1px solid #b7b7b7;
  height: 50px;
  padding: 0 16px;
  &.no-padding {
    padding: 0;
  }

  &.selected {
    border: 2px solid #ed9075;
  }
}
.payment-remark {
  color: #fff;
  padding: 13px 16px;

  @media screen and (max-width: 450px) {
    font-size: 0.9rem;
  }
}
.checkout-title {
  margin-bottom: 40px;

  @media screen and (max-width: 450px) {
    margin-bottom: 20px;
  }
}
.credit-card-row {
  display: flex;
  align-items: center;
  cursor: pointer;
  background: #fff;
  border: 1px solid #b7b7b7;

  &.selected {
    border: 2px solid #ed9075;
  }

  @media screen and (max-width: 410px) {
    * {
      font-size: 14px !important;
    }
  }

  @media screen and (max-width: 670px) {
    flex-direction: column;
  }

  .cc-icon {
    height: 1rem;
    min-height: 0;
    max-height: none;
    margin-right: 32px;
  }
  .cc-text {
    font-size: 1.25rem;

    &:first-letter {
      text-transform: capitalize;
    }

    @media screen and (max-width: 768px) {
      font-size: 15px;
    }
  }
  .cc-number {
    margin-left: auto;
  }
  .action {
    margin-left: auto;

    @media screen and (max-width: 768px) {
      font-size: 15px;
    }
  }

  .card-info,
  .card-number-action,
  .card-type {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .tag {
    background: #ed9075;
    border-radius: 4px;
    padding: 4px 8px;
    color: #fff;
    margin-left: 18px;
    display: table;
  }

  @media screen and (max-width: 670px) {
    .card-info,
    .card-number-action {
      width: 100%;
    }

    .cc-number {
      margin-left: 0;
    }

    .card-number-action {
      margin-top: 2rem;
    }
  }

  .card-number-action {
    flex-grow: 1;
  }
}
</style>
