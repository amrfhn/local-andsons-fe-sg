<template>
  <div>
    <span
      v-if="productData.prescription_based"
      class="tw-flex tw-w-32 tw-leading-5 tw-pt-2 tw-pb-1 tw-justify-center tw-font-medium tw-mb-2 tw-bg-prescription"
    >
      Prescription
    </span>
    <div class="tw-flex tw-font-extrabold tw-text-3xl md:tw-text-5xl md:tw-mb-8 tw-mb-4">
      {{ productData.title }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductTitle',
  props: ['productData']
}
</script>
