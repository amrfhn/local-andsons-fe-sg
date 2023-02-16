<template>
  <div class="tw-pb-16 md:tw-pb-20">
    <div class="tabs tw-flex tw-justify-around tw-rounded-md tw-bg-gray-100">
      <button
        v-for="(dateTimeslots, date) in timeslots"
        :key="date"
        :class="
          `tw-flex tw-flex-auto tw-justify-center tw-py-2 tw-mx-0 tw-text-md tw-rounded-md ${
            date === selectedDate ? 'tw-bg-black tw-text-white' : 'tw-underline'
          }`
        "
        @click="() => setSelectedDate(date)"
      >
        {{ date }}
      </button>
    </div>

    <div class="tab-panel tw-container">
      <div v-if="Object.keys(morningTimeSlots).length > 0">
        <div class="tw-flex tw-font-bold tw-text-lg tw-mt-5 tw-mb-3">
          Morning
        </div>
        <div class="tw-grid tw-grid-cols-3 md:tw-grid-cols-6 tw-gap-4">
          <button
            v-for="(staffIds, datetime) in morningTimeSlots"
            :key="datetime"
            :class="
              `tw-flex tw-px-5 tw-py-3 tw-text-md tw-justify-center tw-shadow-md tw-rounded-md ${
                datetime === selectedDateTime ? 'tw-bg-black tw-text-white' : ''
              }`
            "
            @click="() => setSelectedDateTime(datetime)"
          >
            {{ formatTime(datetime) }}
          </button>
        </div>
      </div>

      <div v-if="Object.keys(afternoonTimeSlots).length > 0">
        <div class="tw-flex tw-font-bold tw-text-lg tw-mt-10 tw-mb-3">
          Afternoon
        </div>
        <div class="tw-grid tw-grid-cols-3 md:tw-grid-cols-6 tw-gap-4">
          <button
            v-for="(staffIds, datetime) in afternoonTimeSlots"
            :key="datetime"
            :class="
              `tw-flex tw-px-5 tw-py-3 tw-text-md tw-justify-center tw-shadow-md tw-rounded-md ${
                datetime === selectedDateTime ? 'tw-bg-black tw-text-white' : ''
              }`
            "
            @click="() => setSelectedDateTime(datetime)"
          >
            {{ formatTime(datetime) }}
          </button>
        </div>
      </div>

      <div v-if="Object.keys(eveningTimeSlots).length > 0">
        <div class="tw-flex tw-font-bold tw-text-lg tw-mt-10 tw-mb-3">
          Evening
        </div>
        <div class="tw-grid tw-grid-cols-3 md:tw-grid-cols-6 tw-gap-4">
          <button
            v-for="(staffIds, datetime) in eveningTimeSlots"
            :key="datetime"
            :class="
              `tw-flex tw-px-5 tw-py-3 tw-text-md tw-justify-center tw-shadow-md tw-rounded-md ${
                datetime === selectedDateTime ? 'tw-bg-black tw-text-white' : ''
              }`
            "
            @click="() => setSelectedDateTime(datetime)"
          >
            {{ formatTime(datetime) }}
          </button>
        </div>
      </div>
    </div>

    <p v-show="error" class="error-message">
      {{ error }}
    </p>

    <div class="footer tw-fixed tw-w-full tw-left-0 tw-bottom-0 tw-shadow-lg">
      <div class="tw-flex tw-align-center tw-max-w-screen-md tw-py-4 tw-px-4 tw-mx-auto tw-justify-between">
        <div class="tw-flex tw-items-center">
          <div v-if="!selectedDateTime" class="tw-flex tw-text-sm md:tw-text-lg tw-font-semibold">
            Please select a date &amp; time
          </div>
          <div v-else>
            <p class="tw-flex tw-text-sm md:tw-text-lg tw-font-medium">
              {{ formatDate(selectedDateTime) }} @
              {{ formatTime(selectedDateTime) }}
            </p>
          </div>
        </div>
        <button
          class="tw-flex tw-px-6 md:tw-px-6 tw-py-2 md:tw-py-3 tw-bg-black tw-font-publicsans tw-text-white tw-font-semibold tw-text-sm md:tw-text-lg lg:tw-text-xl tw-tracking-wide"
          :disabled="error || !selectedDateTime || loading"
          @click="submit"
        >
          <div v-if="loading">Scheduling...</div>
          <div v-else class="tw-flex">Schedule<span class="tw-hidden sm:tw-flex tw-ml-1">Consult</span></div>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'

export default {
  name: 'DateTimeSelector',
  props: {
    loading: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    timeslots: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    const dates = Object.keys(this.timeslots)
    return {
      selectedDateTime: null,
      selectedDate: dates.length > 0 ? dates[0] : null,
      error: null
    }
  },
  computed: {
    morningTimeSlots() {
      return this.filterForMorningTimeSlots(this.timeslots[this.selectedDate])
    },
    afternoonTimeSlots() {
      return this.filterForAfternoonTimeSlots(this.timeslots[this.selectedDate])
    },
    eveningTimeSlots() {
      return this.filterForEveningTimeSlots(this.timeslots[this.selectedDate])
    }
  },
  watch: {
    timeslots: function(newTimeslots) {
      const dates = Object.keys(newTimeslots)
      this.selectedDate = dates.length > 0 ? dates[0] : null
    }
  },
  methods: {
    formatDate(datetime) {
      return dayjs(datetime).format('D MMM YYYY, ddd')
    },
    formatTime(datetime) {
      return dayjs(datetime).format('hh:mmA')
    },
    filterTimeSlots(timeslots, predicate) {
      const filteredTimeSlots = Object.keys(timeslots)
        .filter(predicate)
        .reduce((res, key) => ((res[key] = timeslots[key]), res), {})

      return filteredTimeSlots
    },
    filterForMorningTimeSlots(timeslots) {
      return this.filterTimeSlots(timeslots, (datetime) => dayjs(datetime).format('H') < 12)
    },
    filterForAfternoonTimeSlots(timeslots) {
      return this.filterTimeSlots(
        timeslots,
        (datetime) => dayjs(datetime).format('H') >= 12 && dayjs(datetime).format('H') < 18
      )
    },
    filterForEveningTimeSlots(timeslots) {
      return this.filterTimeSlots(timeslots, (datetime) => dayjs(datetime).format('H') >= 18)
    },
    /**
     * Gets the staff id
     *
     * If there are more than one staff available, we will randomly get the staff
     */
    getStaffId(timeslots, selectedDate, selectedDateTime) {
      const staffIds = timeslots[selectedDate][selectedDateTime]
      const randomisedIndex = new Date().getTime() % staffIds.length
      return staffIds[randomisedIndex]
    },
    setSelectedDate(date) {
      this.selectedDate = date
    },
    setSelectedDateTime(datetime) {
      this.selectedDateTime = datetime
    },
    /**
     * Emits
     * 1. date: string of format "yyyy-mm-dd HH:mm:00"
     * 2. staffId: string of the staffId
     */
    submit() {
      if (!this.error) {
        const staffId = this.getStaffId(this.timeslots, this.selectedDate, this.selectedDateTime)

        this.$emit('submit', dayjs(this.selectedDateTime).format('YYYY-MM-DD HH:mm:00'), staffId)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.footer {
  background: #f6f7f1;
}
.error-message {
  color: $apricot-text;
  margin-top: 1rem;
}
</style>
