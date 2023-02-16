<template>
  <div class="option tw-py-3 tw-px-5" :class="{ selected: selected, disabled: disabled }" @click="onClick">
    <div class="option-checked">
      <font-awesome-icon :icon="['fas', 'check']" />
    </div>
    <slot name="prepend"></slot>
    <div>
      <div class="option-name tw-text-lg tw-font-medium">
        {{ name }}
      </div>
      <div v-if="!!description" class="option-description tw-text-sm" v-html="description"></div>
    </div>
    <div class="tw-grow tw-flex-grow"></div>
    <slot name="append"></slot>
  </div>
</template>

<script>
export default {
  name: 'PaymentOptions',
  props: ['selected', 'name', 'disabled', 'description'],
  methods: {
    onClick() {
      if (this.disabled) return
      this.$emit('click')
    }
  }
}
</script>
<style lang="scss" scoped>
.option {
  cursor: pointer;
  background: #fff;
  display: flex;
  border: 1px solid #b7b7b7;
  align-items: center;

  @media screen and (max-width: 768px) {
    padding: 12px;
  }

  &.selected {
    border: 2px solid #ed9075;
    .option-checked {
      svg {
        color: #ed9075;
      }
    }
  }
  &.disabled {
    background-color: #cfcfcf;
    cursor: initial;
  }
  .option-checked {
    background: $springwood-background;
    min-width: 20px;
    width: 20px;
    height: 20px;
    margin-right: 20px;
    text-align: center;
    line-height: 24px;
    svg {
      color: $springwood-background;
    }
  }
  .logo-dimension {
    height: auto;
    width: 40px;
    margin-right: 15px;

    @media screen and (max-width: 410px) {
      width: 30px;
    }
  }
}
</style>
