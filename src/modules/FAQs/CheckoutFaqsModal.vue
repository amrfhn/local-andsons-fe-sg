<template>
  <Modal :is-shown="showModal" :hide-modal="() => toggleModal(false)">
    <template v-slot:header>
      <h2 class="tw-font-bold tw-text-xl md:tw-text-3xl ">Frequently Asked</h2>
    </template>
    <template v-slot:body>
      <CheckoutFaqs />
    </template>
  </Modal>
</template>

<script>
import CheckoutFaqs from './CheckoutFaqs'
import Modal from '@/components/Modal'

export default {
  name: 'CheckoutFaqsModal',
  components: {
    CheckoutFaqs,
    Modal
  },
  props: {
    toggleModal: {
      type: Function
    },
    showModal: {
      type: Boolean,
      default: false
    }
  }
}
</script>
