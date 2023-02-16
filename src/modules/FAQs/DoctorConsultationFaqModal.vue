<template>
  <Modal :is-shown="showFaqs" :hide-modal="() => toggleFaqs(false)">
    <template v-slot:header>
      <h2 class="tw-font-bold tw-text-xl md:tw-text-2xl">
        Why is there a $20 consultation fee? Can I remove it from the cart?
      </h2>
    </template>
    <template v-slot:body>
      <p class="tw-mb-4">
        This fee covers the time spent for our doctor to review your information, assess your suitability for treatment
        and to go over your personalised treatment plans with you.
      </p>
      <p class="tw-mb-4">
        Our doctors are reimbursed by the number of patients they help and 100% of the consultation fees go to our
        medical team for their expertise and time.
      </p>
      <p>
        Because all our prescription treatments are tailored for you, a teleconsultation by our doctor is required
        before the treatment plan can be prescribed to ensure it is suitable for your needs.
      </p>
    </template>
  </Modal>
</template>

<script>
import Modal from '@/components/Modal'

export default {
  name: 'CheckoutFaqsModal',
  components: {
    Modal
  },
  props: {
    toggleFaqs: {
      type: Function
    },
    showFaqs: {
      type: Boolean,
      default: false
    }
  }
}
</script>
