<template>
  <div>
    <CreditCards :allow-select="true" @payment-method-selected="handlePaymentMethodChange" />
  </div>
</template>
<script>
import CreditCards from '@/modules/Dashboard/MyAccount/MyDetails/components/CreditCards.vue'

export default {
  name: 'PaymentOptionsCC',
  components: { CreditCards },
  methods: {
    handlePaymentMethodChange: function(selectedPaymentMethod) {
      this.$emit('ready', selectedPaymentMethod)
    }
  }
}
</script>
