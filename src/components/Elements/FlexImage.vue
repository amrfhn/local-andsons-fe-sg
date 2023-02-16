<template>
  <Flex1 class="tw-flex tw-justify-center tw-m-auto" :class="[aspectRatio]">
    <img
      :alt="alt"
      :class="[backgroundPosition, backgroundSize, classNames]"
      fetchpriority="low"
      loading="lazy"
      :src="src"
      :style="{ maxWidth: `${maxWidth}` }"
    />
  </Flex1>
</template>

<script>
import Flex1 from '@/components/Layouts/Flex1.vue'
export default {
  components: { Flex1 },
  props: {
    alt: {
      type: String,
      default: ''
    },
    aspectRatio: {
      type: String,
      default: 'tw-aspect-square'
    },
    backgroundSize: {
      type: String,
      default: 'tw-object-fill',
      validator: function(value) {
        return [
          'tw-object-cover',
          'tw-object-contain',
          'tw-object-fill',
          'tw-object-none',
          'tw-object-scale-down'
        ].includes(value)
      }
    },
    backgroundPosition: {
      type: String,
      default: 'tw-object-center',
      validator: function(value) {
        return ['tw-object-center', 'tw-object-bottom', 'tw-object-top', 'tw-object-right', 'tw-object-left'].includes(
          value
        )
      }
    },
    classNames: {
      type: String,
      default: ''
    },
    height: {
      type: Number,
      default: 40
    },
    maxWidth: {
      type: String,
      default: '100%'
    },
    src: {
      type: String,
      required: true,
      default: ''
    },
    width: {
      type: Number,
      default: 40
    }
  }
}
</script>
