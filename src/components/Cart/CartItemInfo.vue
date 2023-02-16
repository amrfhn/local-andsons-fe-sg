<template>
  <div v-if="hasInfoModal" class="tw-ml-2">
    <div class="tw-cursor-pointer" @click="() => toggleFaqs(true)">
      <font-awesome-icon :icon="['fa', 'exclamation-circle']" :style="{ color: 'grey', fontSize: '12px' }" />
    </div>
    <component :is="this.productComponentMap[productSlug]" :show-faqs="showFaqs" :toggle-faqs="toggleFaqs" />
  </div>
</template>
<script>
import DoctorConsultationFaqModal from '@/modules/FAQs/DoctorConsultationFaqModal.vue'
export default {
  name: 'CartItemModal',
  components: {
    DoctorConsultationFaqModal
  },
  props: {
    productSlug: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      showFaqs: false,
      productComponentMap: {
        'doctor-consultation': 'DoctorConsultationFaqModal',
        preconsultation: 'DoctorConsultationFaqModal'
      }
    }
  },
  computed: {
    hasInfoModal() {
      return Object.keys(this.productComponentMap).indexOf(this.productSlug) > -1
    }
  },
  methods: {
    toggleFaqs(show = false) {
      this.showFaqs = show
    }
  }
}
</script>
