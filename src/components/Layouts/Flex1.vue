<template>
  <div class="tw-flex-1" :class="[classNames]">
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
