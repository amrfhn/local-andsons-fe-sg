<template>
  <div class="tw-container tw-mx-auto tw-px-4" :class="[classNames]">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    classNames: {
      type: String,
      default: ''
    }
  }
}
</script>
