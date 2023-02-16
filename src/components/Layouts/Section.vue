<template>
  <section :class="[classNames, padding]">
    <slot></slot>
  </section>
</template>

<script>
export default {
  props: {
    padding: {
      type: String,
      default: 'tw-py-0',
      validator: function(value) {
        return ['tw-py-0', 'tw-py-4', 'tw-py-8', 'tw-py-20'].includes(value)
      }
    },
    classNames: {
      type: String,
      default: ''
    }
  }
}
</script>
