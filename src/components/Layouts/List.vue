<template>
  <Flex
    align-items="tw-items-stretch"
    class-names="tw-flex-col"
    :class="[classNames, gap, alignItems, justifyContent, isMobileFlexRowCenter]"
  >
    <slot></slot>
  </Flex>
</template>

<script>
import Flex from './Flex.vue'
export default {
  components: { Flex },
  props: {
    gap: {
      type: String,
      default: 'tw-gap-4',
      validator: function(value) {
        return ['tw-gap-0', 'tw-gap-1', 'tw-gap-2', 'tw-gap-4', 'tw-gap-6', 'tw-gap-8', 'tw-gap-10'].includes(value)
      }
    },
    alignItems: {
      type: String,
      default: 'tw-items-start',
      validator: function(value) {
        return ['tw-items-start', 'tw-items-center', 'tw-items-end', 'tw-items-stretch'].includes(value)
      }
    },
    justifyContent: {
      type: String,
      default: 'tw-justify-center',
      validator: function(value) {
        return [
          'tw-justify-start',
          'tw-justify-center',
          'tw-justify-end',
          'tw-justify-between',
          'tw-justify-around'
        ].includes(value)
      }
    },
    isMobileFlexRowCenter: {
      type: Boolean,
      default: false
    },
    classNames: {
      type: String,
      default: ''
    }
  }
}
</script>
