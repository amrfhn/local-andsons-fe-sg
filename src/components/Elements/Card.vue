<template>
  <article class="tw-rounded-lg" :class="[classNames, { 'tw-shadow': isShadow, 'tw-rounded-none': isSquare }]">
    <Box
      as="section"
      :padding="padding"
      class="tw-h-full"
      :class="[maxHeight, boxClassName, { 'tw-overflow-y-auto': isScrollable }]"
    >
      <slot></slot>
    </Box>
  </article>
</template>

<script>
import Box from './Box.vue'

export default {
  components: { Box },
  props: {
    padding: {
      type: String,
      default: 'tw-p-6'
    },
    isScrollable: {
      type: Boolean,
      default: false
    },
    isShadow: {
      type: Boolean,
      default: false
    },
    isSquare: {
      type: Boolean,
      default: false
    },
    maxHeight: {
      type: String,
      default: 'tw-max-h-[100vh]'
    },
    boxClassName: {
      type: String,
      default: ''
    },
    classNames: {
      type: String,
      default: ''
    }
  }
}
</script>
