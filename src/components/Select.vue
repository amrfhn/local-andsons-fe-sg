<template>
  <div :class="`field ${hasError ? 'has-error' : ''} tw-mt-1 tw-mb-1 md:tw-mb-6`">
    <select
      :id="id"
      :name="id"
      :value="value"
      :class="!value ? 'placeholder' : ''"
      @change="(e) => $emit('change', e.target.value)"
    >
      <option value="" selected disabled hidden>{{ placeholder }}</option>
      <slot />
    </select>
    <img class="arrow-down-image" :src="require('../assets/images/arrow-down.svg')" alt="arrow-down" />
    <!-- <label v-if="!!placeholder && !value" :for="id">{{ placeholder }}</label> -->
  </div>
</template>
<script>
export default {
  name: 'Select',
  props: {
    placeholder: { type: String, default: '' },
    id: {},
    value: { default: '' },
    hasError: { default: '' }
  }
}
</script>

<style lang="scss" scoped>
.field {
  position: relative;
  border: 1px solid #000;
  height: 50px;
  line-height: 1;

  &.has-error {
    border-color: #d85639;
  }
  > .arrow-down-image {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 20px;
  }
  label {
    font-size: 1.125rem;
    position: absolute;
    color: #b7b7b7;
    top: 0;
    left: 20px;
    bottom: 0;
    margin: auto;
    pointer-events: none;
    height: 1.125rem;

    @media screen and (max-width: 768px) {
      font-size: 0.8rem;
      height: 0.8rem;
    }
    //transition: all 0.3s;
  }
  select {
    border: none;
    outline: none;
    width: 100%;
    height: 100%;
    padding: 0 15px;
    appearance: none;
    &.right-space {
      padding-right: 30px;
    }

    @media screen and (max-width: 400px) {
      font-size: 1rem;
    }
  }
  .placeholder {
    color: #b7b7b7;
  }
  option {
    color: black;
  }
}
</style>
