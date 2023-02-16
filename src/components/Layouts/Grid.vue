<template>
  <div
    class="tw-grid tw-auto-rows-auto tw-auto-rows-fr"
    :class="[classNames, cols, gap, alignItems, justifyContent, justifyItems]"
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
    cols: {
      type: String,
      default: 'tw-grid-cols-1',
      validator: function(value) {
        return [
          'tw-grid-cols-1',
          'tw-grid-cols-2',
          'tw-grid-cols-3',
          'tw-grid-cols-4',
          'tw-grid-cols-5',
          'tw-grid-cols-5',
          'tw-grid-cols-7'
        ].includes(value)
      }
    },
    justifyContent: {
      type: String,
      default: 'tw-justify-center'
    },
    alignItems: {
      type: String,
      default: 'tw-items-start',
      validator: function(value) {
        return ['tw-items-start', 'tw-items-center', 'tw-items-end'].includes(value)
      }
    },
    justifyItems: {
      type: String,
      default: 'tw-justify-items-center'
    },
    isAutoRow: {
      type: Boolean,
      default: true
    },
    classNames: {
      type: String,
      default: ''
    }
  }
}
</script>
