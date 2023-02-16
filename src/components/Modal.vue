<template>
  <transition name="fade">
    <div
      v-show="isShown"
      class="
      tw-fixed
      tw-flex
      tw-top-0
      tw-left-0
      tw-justify-around
      tw-items-center
      tw-w-full
      tw-h-full
    "
      style="z-index:999999999999;"
    >
      <div
        class="
        tw-fixed
        overlay
        tw-w-full
        tw-h-full
      "
        style="z-index:10; background: rgba(0, 0, 0, 0.5)"
        @click="hideModal"
      />
      <div
        class="
        tw-flex
        tw-flex-col
        tw-self-center
        tw-overflow-y-auto
        tw-px-8
        tw-pt-6
        tw-pb-10
        tw-m-4
        tw-bg-white
        lg:tw-w-1/2
        md:tw-w-3/5
        tw-w-full
      "
        style="z-index: 999; max-height: 90vh;"
      >
        <div class="tw-flex header tw-w-full tw-justify-between tw-mb-4">
          <slot name="header"></slot>
          <div class="tw-cursor-pointer tw-flex tw-px-1 tw--mt-0 tw-text-3xl" @click="hideModal">
            ×
          </div>
        </div>
        <div class="tw-flex tw-flex-col tw-w-full tw-font-normal">
          <slot name="body"></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    isShown: {
      type: Boolean,
      default: false
    },
    hideModal: {
      type: Function
    }
  },
  mounted() {
    window.scrollTo(0, 0)
  },
  methods: {}
}
</script>
