<template>
  <button
    :disabled="disabled"
    type="button"
    :class="[
      baseClass,
      hoverClass,
      classNames,
      { 'tw-bg-brand-black tw-text-brand-white': variant === 'primary' },
      { 'tw-bg-white tw-text-brand-black': variant === 'secondary' },
      { 'tw-h-[52px] tw-py-[0.875rem] tw-px-6': size !== 'small' },
      { 'tw-px-3 tw-py-2': size === 'small' },
      { 'tw-w-full': isFullWidth },
      { 'tw-uppercase': uppercase },
      { 'disabled:tw-cursor-not-allowed disabled:tw-opacity-50': disabled }
    ]"
    @click="click"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    uppercase: {
      type: Boolean,
      default: true
    },
    classNames: {
      type: String,
      default: ''
    },
    isFullWidth: {
      type: Boolean,
      default: true
    },
    size: {
      type: String,
      default: ''
    },
    variant: {
      type: String,
      default: 'primary',
      validator: function(value) {
        return ['primary', 'secondary'].includes(value)
      }
    }
  },
  data() {
    return {
      baseClass:
        'tw-flex tw-font-bold tw-select-none tw-items-center tw-justify-center tw-no-underline tw-transition-all tw-border tw-border-brand-black tw-cursor-pointer',
      hoverClass: 'hover:tw-bg-brand-black hover:tw-text-brand-white hover:opacity-75'
    }
  },
  methods: {
    click: function() {
      this.$emit('click')
    }
  }
}
</script>
