<template>
  <div id="AccordionPanel" class="panel">
    <div
      :class="`tw-flex tw-items-center tw-justify-between accordion-panel-header ${expanded ? 'tw-pt-5' : 'tw-py-5'}`"
    >
      <label :class="`tw-font-bold tw-text-xl md:tw-text-3xl ${expanded ? '' : 'tw-opacity-30'}`" for="">{{
        title
      }}</label>
      <div class="accordion-panel-action tw-font-medium tw-cursor-pointer">
        <slot name="action"></slot>
      </div>
    </div>
    <div v-if="expanded" class="accordion-panel-content tw-my-5">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    expanded: {
      type: Boolean,
      default: false
    }
  }
}
</script>
