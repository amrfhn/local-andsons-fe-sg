<template>
  <div>
    <p class="tw-text-md tw-w-full tw-leading-6">
      You will be redirected to
      <img
        src="@/assets/images/atome/atome_transparent.png"
        class="tw-h-6 tw-align-middle tw-inline-block"
        align="top"
      />
      to complete your payment. After making payment, you will be redirected back to us to complete your checkout.
    </p>
    <br />
    <p class="tw-text-md tw-w-full tw-leading-6">
      If you have purchased a prescription item, you will be directed to book an appointment with our doctors.
    </p>
    <hr v-if="hasSubscription" class="tw-my-4" />
    <div v-if="hasSubscription" class="tw-px-4 tw-py-3 md:tw-px-6 md:tw-py-5 tw-my-3 tw-bg-gray-100">
      <div class="tw-text-lg tw-font-bold tw-mb-2">
        Credit/Debit Card Details
      </div>
      <p class="tw-text-sm tw-leading-5">
        Your first subscription payment will be paid through
        <img
          src="@/assets/images/atome/atome_transparent.png"
          class="tw-h-5 tw-align-middle tw-inline-block"
          align="top"
        />. Future subscription renewals will be charged to your card. You can update your card details on your profile
        page.
      </p>
      <div id="credit-card-atome" class="tw-my-4">
        <CreditCards :allow-select="true" @payment-method-selected="onSelectPaymentMethod" />
      </div>
    </div>
  </div>
</template>
<script>
// import PaymentOptionCreditCard from "@/modules/Dashboard/MyAccount/MyDetails/CardDetails.vue";

import CreditCards from '@/modules/Dashboard/MyAccount/MyDetails/components/CreditCards.vue'

export default {
  name: 'PaymentOptionAtome',
  props: ['hasSubscription'],
  components: {
    CreditCards
  },
  mounted() {
    this.$emit('ready', null)
  },
  methods: {
    onSelectPaymentMethod() {
      this.$emit('atome', true)
    }
  }
}
</script>
