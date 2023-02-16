<template>
  <div class="input-wrapper" :class="[isChecked ? 'selected' : '']" @click="$emit('change', value)">
    <input
      type="radio"
      :name="groupName"
      :checked="isChecked"
      :value="value"
      hidden
      @change="$emit('change', $event.target.value)"
    />
    <div v-show="showCheckbox" class="checkbox" :class="{ selected: isChecked }">
      <font-awesome-icon :icon="['fas', 'check']" />
    </div>
    <slot />
  </div>
</template>

<script>
/**
 * Template for implementing Radio buttons.
 * Sample usage:
 * data(){
 * return {radioOutput: ""};
 * },
 * <template>
 * <Radio value="foo" v-model="radioOutput" :class="'sample'"> <div>Name</div> <font-awesome-icon icon={["fas", "spinner"]} /> </Radio>
 * <Radio value="bar" v-model="radioOutput"> Content to be displayed. </Radio>
 * </template>
 *
 * Binded to testValue in parent component.
 * emits: [change]
 * Props:
 *  modelValue: radio group selected value
 *  value: radio button value
 */

export default {
  name: 'Radio',
  model: {
    prop: 'modelValue',
    event: 'change'
  },
  props: {
    modelValue: { default: '' },
    value: { default: undefined },
    groupName: { type: String, required: true },
    showCheckbox: { type: Boolean, default: false }
  },
  computed: {
    isChecked() {
      return JSON.stringify(this.modelValue) === JSON.stringify(this.value)
    }
  }
}
</script>

<style lang="scss" scoped>
.input-wrapper {
  display: flex;
  padding: 25px;
  width: 100%;
  .checkbox {
    &.hidden {
      background-color: transparent;
      > svg {
        color: #ed9075;
        display: none;
      }
    }
    margin-right: 12px;
    width: 20px;
    height: 20px;
    min-width: 20px;
    min-height: 20px;
    background-color: $springwood-background;
    > svg {
      color: #ed9075;
      display: none;
    }

    &.selected:not(.hidden) {
      > svg {
        color: #ed9075;
        display: block;
      }
    }
  }
  &.selected {
    border: 3px solid #ed9075;
    .product-plan-option-extra {
      display: block;
    }
  }
}
</style>
