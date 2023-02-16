<template>
  <div
    class="input-wrapper"
    :class="{ selected: isChecked }"
    @click="() => updateInput(isExclusive ? true : !isChecked)"
  >
    <!--<input
      type="checkbox"
      :checked="isChecked"
      :value="value"
      @change="e => updateInput(e.target.checked)"
      hidden
    />-->
    <input type="radio" name="groupName" :checked="isChecked" :value="value" hidden />
    <div v-show="showCheckbox" class="checkbox-icon">
      <font-awesome-icon :icon="['fas', 'check']" />
    </div>
    <slot />
  </div>
</template>

<script>
/* Template for using the RadioCheckbox component. */

/* There are 2 possible use cases: */
/* 1) The modelValue is an Array of all selected value and the value is a possible value */
/* 2) If all values are exclusive, treat like a Radio with the modelValue  */
/*    being the selected value, and the value being a possible value with type != Array.  */
/*    If any of the values have to be Arrays. use the first option,  */
/*    and bind a list containing the selected value instead. */
/* Emits change */

/* Props: */
/* falseValue: Currently only used for single checkbox with 2 values */
/* value: the actual value of the selected option.*/
/* modelValue: either the list of all selected items or the value of a radio group / single checkbox */
/* groupName: the name of the entire group of RadioCheckboxes binded by the same modelValue. */
/* isExclusive: if true, selecting this will unselect all other elements */
/* showCheckbox: just toggle hidden on checkbox */
/* Sample usage: */

/* Example: 
export default {
  data() {
    return {
      favourites: [],
      gender: "'male'",
      customText: "",
    };
  }
};
<template>
  <div>
    // Set gender as "male" on click
    <RadioCheckbox
      value="male"
      v-model="gender"
      groupName="quizQuestion"
      :isExclusive="true"
      >Male</RadioCheckbox
    >

    // Set gender as "female" on click
    <RadioCheckbox
      value="female"
      v-model="gender"
      groupName="quizQuestion"
      :isExclusive="true"
      >Female</RadioCheckbox
    >

    // Toggle "Apple" in favourites
    <RadioCheckbox 
      value="Apple" 
      :modelValue="favourites" 
      @change="newValue=>{favourites = newValue}" 
      groupName="favourites">Apple</RadioCheckbox>

    // Toggle "Pear" in favourites
    <RadioCheckbox value="Pear" v-model="favourites" groupName="favourites">Pear</RadioCheckbox>

    // value defaults to undefined, set favourites as [] since isExclusive === "true"
    <RadioCheckbox v-model="favourites" groupName="favourites" :isExclusive="true">None</RadioCheckbox>

    // Example for custom text option
    <RadioCheckbox
      :value="customText"
      :overrideSelected="customText !== '' ? true : null"
      v-model="favourites"
      groupName="favourites"
      :isExclusive="false"
      ><input v-model="customText"
    /></RadioCheckbox>
  </div>
</template>
*/

export default {
  name: 'RadioCheckbox',
  model: {
    prop: 'modelValue',
    event: 'change'
  },
  props: {
    modelValue: { default: '' },
    value: { default: undefined },
    falseValue: { default: false },
    showCheckbox: { default: true },
    groupName: { type: String, required: true },
    isExclusive: { default: false },
    overrideSelected: { type: Boolean, default: null }
  },
  computed: {
    isChecked() {
      if (this.overrideSelected !== null) {
        return this.overrideSelected
      }
      if (this.modelValue instanceof Array) {
        if (this.isExclusive) {
          return (
            JSON.stringify(this.modelValue) ===
            (typeof this.value === 'undefined' ? '[]' : JSON.stringify([this.value]))
          )
        }
        return this.modelValue.includes(this.value)
      }
      return JSON.stringify(this.modelValue) === JSON.stringify(this.value)
    }
  },
  watch: {
    isChecked(newValue) {
      if (this.isExclusive && newValue === false) {
        this.updateInput(newValue)
      }
    }
  },
  methods: {
    updateInput(isChecked) {
      if (this.overrideSelected !== null) {
        isChecked = this.overrideSelected
      }
      if (this.modelValue instanceof Array) {
        let newValue
        if (this.isExclusive && isChecked) {
          newValue = typeof this.value === 'undefined' ? [] : [this.value]
        } else {
          newValue = [...this.modelValue]
          if (isChecked) {
            newValue.push(this.value)
          } else {
            if (newValue.includes(this.value)) {
              newValue.splice(newValue.indexOf(this.value), 1)
            }
          }
        }
        this.$emit('change', newValue)
      } else {
        if (this.isExclusive) {
          this.$emit('change', this.value)
        } else {
          this.$emit('change', isChecked ? this.value : this.falseValue)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.input-wrapper {
  display: flex;
  cursor: pointer;
  padding: 25px;
  .checkbox-icon {
    margin-right: 12px;
    width: 20px;
    height: 20px;
    min-width: 20px;
    min-height: 20px;
    background-color: $springwood-background;
    > svg {
      display: block;
      opacity: 0;
    }
    @keyframes scaleIn {
      0%,
      100% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.3);
      }
    }
  }

  &.selected {
    border: 2px solid #ed9075;

    .checkbox-icon {
      > svg {
        color: #ed9075;
        opacity: 1;
        animation: scaleIn 300ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
      }
    }
  }
}
</style>
