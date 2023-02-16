<template>
  <div>
    <v-date-picker
      v-model="selectedDate"
      mode="datetime"
      :minute-increment="minuteIncrement"
      :min-date="minDate"
      :max-date="maxDate"
      :disabled-dates="disabledDates"
      :color="color"
      is-required
      @input="checkTime"
    />

    <p v-show="error != errorState.Success" class="error-message">
      {{ error }}
    </p>

    <button class="submit-button" :disabled="error != errorState.Success" @click="submit">
      <slot />
    </button>
  </div>
</template>

<script>
import DatePicker from 'v-calendar/lib/components/date-picker.umd'
/**
 * Wrapper for v-date-picker
 * Exposes minuteIncrement: interval of valid slots,
 *         dayWindow: number of enabled days starting from today
 * @displayName Date Time Selector
 */

export default {
  name: 'DateTimeSelector',
  components: { 'v-date-picker': DatePicker },
  props: {
    color: {
      type: String,
      default: 'red'
    },
    minuteIncrement: {
      type: Number,
      default: 15,
      validator: function(value) {
        return 60 % value === 0 ? 'success' : 1 <= value && value <= 60 ? 'warning' : 'error'
      }
    },
    dayWindow: {
      type: Number,
      default: 3
    },
    openTime: {
      type: Array,
      default: () => [9, 0],
      validator: function(value) {
        return value.length == 2 ? 'success' : 'error'
      }
    },
    closeTime: {
      type: Array,
      default: () => [21, 0],
      validator: function(value) {
        return value.length == 2 ? 'success' : 'error'
      }
    },
    disabledDates: {
      type: Array,
      default: () => []
    },
    leadTime: {
      type: Number,
      default: 0,
      validator: function(value) {
        return value >= 0
      }
    }
  },
  data() {
    const errorState = Object({
      Success: '',
      Past: 'Please select a future timeslot',
      WorkingHours: `Our consultation hours are from ${this.padZero(this.openTime[0])}:${this.padZero(
        this.openTime[1]
      )} to ${this.padZero(this.closeTime[0])}:${this.padZero(this.closeTime[1])}. Please select a suitable time.`
    })
    return {
      errorState,
      selectedDate: new Date(this.getNextSlot()),
      minDate: new Date(this.getNextSlot()),
      maxDate: this.getMaxDate(),
      disabledDate: { weekdays: [] },
      order: {},
      appointment: {},
      error: errorState.Success
    }
  },
  watch: {
    selectedDate() {
      this.checkTime()
    }
  },
  methods: {
    roundInterval(date) {
      const incrementSeconds = 60000 * this.minuteIncrement
      return new Date(Math.ceil(date.getTime() / incrementSeconds) * incrementSeconds)
    },
    nextValidTime(date) {
      const minutes = date.getHours() * 60 + date.getMinutes()
      if (minutes < this.openTime[0] * 60 + this.openTime[1]) {
        date = new Date(date.getFullYear(), date.getMonth(), date.getDate(), this.openTime[0], this.openTime[1])
      } else if (this.closeTime[0] * 60 + this.closeTime[1] < minutes) {
        date = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1, this.openTime[0], this.openTime[1])
      }
      return this.roundInterval(date)
    },
    getCurrentDate() {
      return new Date() // Just a wrapper around Date to allow it to be mocked.
    },
    getNextSlot() {
      let now = this.getCurrentDate()
      return this.nextValidTime(new Date(now.getTime() + this.leadTime * 60000))
    },
    getMaxDate() {
      let maxDate = new Date(this.getNextSlot())
      maxDate.setDate(maxDate.getDate() + this.dayWindow)
      return maxDate
    },
    /**
     * Gets called when selectedDate changes or button clicked.
     */
    checkTime() {
      const timeNow = new Date(this.getNextSlot())
      const selectedDate = this.roundInterval(this.selectedDate)
      const minutes = selectedDate.getHours() * 60 + selectedDate.getMinutes()
      this.error =
        selectedDate < timeNow
          ? this.errorState.Past
          : minutes < this.openTime[0] * 60 + this.openTime[1] || this.closeTime[0] * 60 + this.closeTime[1] < minutes
          ? this.errorState.WorkingHours
          : this.errorState.Success
    },
    padZero(i) {
      return String(i).padStart(2, '0')
    },
    /**
     * Emits string of format "yyyy-mm-dd HH:mm:00"
     */
    submit() {
      this.checkTime()
      const date = this.roundInterval(new Date(this.selectedDate))
      const month = this.padZero(date.getMonth() + 1)
      const day = this.padZero(date.getDate())
      const hours = this.padZero(date.getHours())
      const minutes = this.padZero(date.getMinutes())
      if (this.error === this.errorState.Success) {
        this.$emit('submit', `${date.getFullYear()}-${month}-${day} ${hours}:${minutes}:00`)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.submit-button {
  text-align: center;
  text-decoration: none;
  font-family: 'PublicSansExtraBold', sans-serif;
  margin: 40px auto;
}

.error-message {
  color: $apricot-text;
  margin-top: 1rem;
}
</style>
