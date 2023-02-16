<template>
  <div
    class="tw-flex tw-h-full tw-w-full"
    :class="[
      classNames,
      direction,
      gap,
      alignItems,
      justifyContent,
      { 'flex-col items-stretch text-center sm:flex-row sm:items-center sm:text-left': isMobileFlexRowCenter }
    ]"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
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
    direction: {
      type: String,
      default: 'tw-flex-row',
      validator: function(value) {
        return ['tw-flex-row', 'tw-flex-col', 'flex-row-reverse', 'flex-col-reverse'].includes(value)
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
