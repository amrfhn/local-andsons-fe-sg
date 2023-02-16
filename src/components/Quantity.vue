<template>
  <div>
    <div class="quantity">
      <div
        :style="{
          visibility: canDecrement ? 'visible' : 'hidden'
        }"
        :class="{
          disabled: quantity <= 1
        }"
        class="controller"
        data-testid="decrement"
        @click="decrement"
      >
        <font-awesome-icon :icon="['fas', 'minus']" />
      </div>
      <input v-model.number="quantity" :readonly="!(canIncrement || canDecrement)" class="number-input" />
      <div
        :style="{
          visibility: canIncrement ? 'visible' : 'hidden'
        }"
        class="controller"
        data-testid="increment"
        @click="increment"
      >
        <font-awesome-icon :icon="['fas', 'plus']" />
      </div>
    </div>
    <button v-if="removable" class="remove" @click.once="remove">Remove</button>
  </div>
</template>

<script>
/**
 * Quantity component
 * Takes in initialQuantity, removable (show remove button), canDecrement, canIncrement, minQuantity, maxQuantity
 * Emits remove (when remove clicked), change (when value changed)
 */
export default {
  name: 'Quantity',
  props: {
    initialQuantity: { type: Number, required: true },
    removable: { type: Boolean, default: true },
    canDecrement: { type: Boolean, default: true },
    canIncrement: { type: Boolean, default: true },
    minQuantity: { type: Number, default: 1 },
    maxQuantity: { type: Number, default: 100000 }
  },
  // emits: ["remove", "change"],
  data() {
    return {
      quantity: this.initialQuantity
    }
  },
  watch: {
    quantity: function(newQuantity, oldQuantity) {
      let updatedQuantity =
        typeof newQuantity === 'number'
          ? Math.max(Math.min(parseInt(newQuantity), this.maxQuantity), this.minQuantity)
          : this.minQuantity
      if (!this.canIncrement) {
        updatedQuantity = Math.min(updatedQuantity, this.initialQuantity)
      }
      if (!this.canDecrement) {
        updatedQuantity = Math.max(updatedQuantity, this.initialQuantity)
      }
      if (updatedQuantity !== newQuantity) {
        this.quantity = updatedQuantity
      }
      if (updatedQuantity !== oldQuantity) {
        this.$emit('change', this.quantity)
      }
    },
    initialQuantity: function(quantity) {
      this.quantity = quantity
    }
  },
  methods: {
    remove() {
      this.$emit('remove')
    },
    increment() {
      if (this.canIncrement) {
        this.quantity = Math.min(this.quantity + 1, this.maxQuantity)
      }
    },
    decrement() {
      if (this.canDecrement) {
        this.quantity = Math.max(this.quantity - 1, this.minQuantity)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.quantity {
  display: flex;
  align-items: center;
  width: fit-content;
  position: relative;
  user-select: none;
  font-size: 16px;
  @media screen and (max-width: 768px) {
    margin-right: 0;
  }
  .controller {
    cursor: pointer;
    width: 24px;
    height: 24px;
    text-align: center;
    line-height: 23px;
    transition: all 0.3s;
    &.disabled {
      pointer-events: none;
      cursor: default;
      opacity: 0;
    }
    svg {
      font-size: 10px;
    }

    @media screen and (max-width: 768px) {
      width: 18px;
    }
  }
  .number-input {
    border: 0;
    outline: none;
    height: 24px;
    width: 28px;
    text-align: center;
    color: #333;
    font-size: 18px;
    font-family: 'PublicSansBold', sans-serif;
    padding: 0px;
    background: transparent;
    @media screen and (max-width: 768px) {
      font-size: 14px;
    }
  }
}
.remove {
  cursor: pointer;
  background: transparent;
  border: 0;
  outline: none;
  font-size: 14px;
  position: relative;
  &:before {
    content: '';
    position: absolute;
    bottom: -2px;
    height: 2px;
    width: 100%;
    top: initial !important;
    left: 0 !important;
    right: 0 !important;
    background-color: #000;
    transform: scaleX(0);
    transform-origin: left;
    transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
  }
  &:hover {
    &:before {
      transform: scaleX(1);
    }
  }

  @media screen and (max-width: 768px) {
    font-size: 12px;
  }
}
</style>
