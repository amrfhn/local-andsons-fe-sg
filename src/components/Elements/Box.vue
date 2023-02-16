<template>
  <component :is="as" :class="[classNames, padding]">
    <slot></slot>
  </component>
</template>

<script>
export default {
  props: {
    padding: {
      type: String,
      default: 'tw-py-0',
      validator: function(value) {
        return ['tw-py-0', 'tw-py-2', 'tw-py-4', 't2-py-6', 'tw-py-8'].includes(value)
      }
    },
    as: {
      type: String,
      default: 'div',
      validator: function(value) {
        return ['div', 'header', 'section', 'footer'].includes(value)
      }
    },
    classNames: {
      type: String,
      default: ''
    }
  }
}
</script>
