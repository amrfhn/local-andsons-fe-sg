<template>
  <div class="order-container tw-mx-auto tw-my-6 md:tw-my-10">
    <h3 class="order-success tw-text-center tw-mb-3 tw-text-2xl tw-font-semibold">
      Order Successful
    </h3>
    <h3 class="order-title tw-px-3 tw-text-center tw-text-3xl md:tw-text-5xl tw-font-bold tw-mb-5">
      Let's book a time with your doctor.
    </h3>

    <div class="calendar-wrapper">
      <div class="header-wrapper tw-mx-auto">
        <p class="order-subtitle tw-text-center tw-text-sm md:tw-text-base">
          Our doctors are required by law to conduct video consultations in order to finalise your prescription.
        </p>
        <p
          v-if="Object.keys(timeslots).length > 0"
          class="order-warning tw-px-2 md:tw-px-4 tw-py-3 tw-text-sm md:tw-text-base tw-font-bold tw-text-center tw-mt-5 tw-mb-10"
        >
          Deliveries for consults scheduled after 5:45PM, only be processed the following morning.
        </p>
      </div>
      <Loading v-if="loading" />
      <transition v-else name="fade">
        <div v-if="error" class="tw-mt-5">
          <p class="tw-text-xl tw-font-bold tw-text-center tw-mb-3">
            {{ error }}
          </p>
          <p class="tw-text-center tw-mb-3">
            We encountered an error. Please contact support to book your appointment.
          </p>
          <button class="tw-bg-black tw-text-white tw-font-semibold tw-py-4 tw-px-10" @click="intercomShow">
            Contact Support
          </button>
        </div>
        <div
          v-else-if="Object.keys(timeslots).length === 0"
          class="tw-text-center tw-mt-10 tw-bg-gray-100 tw-py-10 tw-px-5"
        >
          <h2 class="tw-text-xl tw-font-bold tw-text-center tw-mb-3">
            We couldn't find an available timeslot.
          </h2>
          <p class="tw-mb-3">
            No worries! Reach out to our customer support and we will schedule one for you as soon as possible.
          </p>
          <button class="tw-bg-black tw-text-white tw-font-semibold tw-py-4 tw-px-10" @click="intercomShow">
            Contact Support
          </button>
        </div>
        <DateTimeSelector
          v-else-if="Object.keys(timeslots).length > 0"
          :timeslots="timeslots"
          :loading="submitting"
          @submit="scheduleAppointment"
        />
      </transition>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { formatMetaTags } from '@/utils/prettify.js'
import { getOrderById } from '@/api/orders'
import { getAvailableSlots, updateAppointment } from '@/api/appointments'
import DateTimeSelector from '@/components/DateTimeSelector.vue'
import Loading from '@/components/Loading.vue'

export default {
  components: { DateTimeSelector, Loading },
  metaInfo() {
    return formatMetaTags({
      title: 'Appointment',
      urlPath: this.$route.path
    })
  },
  data() {
    return {
      appointment: null,
      error: null,
      loading: true,
      submitting: false,
      order: null,
      timeslots: {},
      retryFetchAppointmentCount: 0
    }
  },
  created() {
    window.addEventListener('beforeunload', this.unloadCheck)
  },
  beforeDestroy() {
    window.removeEventListener('beforeunload', this.unloadCheck)
  },
  beforeRouteLeave(to, from, next) {
    const confirmationMessage =
      'You are leaving before booking your appointment. You must book and complete the consultation for your purchase to be approved and shipped out.'
    if (to.name === 'Success' || to.name === 'Landing') {
      window.removeEventListener('beforeunload', this.unloadCheck)
      next()
      return
    }
    if (confirm(confirmationMessage)) {
      window.removeEventListener('beforeunload', this.unloadCheck)
      next()
    }
    next(false)
  },
  mounted: async function() {
    this.intercomHideLauncher()
    await this.getAvailableSlots()
    await this.getOrderInfo()
  },
  methods: {
    unloadCheck(e) {
      e = e || window.event
      const confirmationMessage = 'It looks like you have not booked your appointment.'
      //old browsers
      if (e) {
        e.returnValue = confirmationMessage
      }
      //safari, chrome(chrome ignores text)
      return confirmationMessage
    },
    async getAvailableSlots() {
      const dateFormat = 'YYYY-MM-DD'

      const today = dayjs().format(dateFormat)
      const tomorrow = dayjs()
        .add(1, 'day')
        .format(dateFormat)
      const dayAfter = dayjs()
        .add(2, 'day')
        .format(dateFormat)

      // hotfix: Add dayFollowing
      const dayFollowing = dayjs()
        .add(3, 'day')
        .format(dateFormat)

      const response = await getAvailableSlots({
        dates: `${today},${tomorrow},${dayAfter},${dayFollowing}`
      })
      const availableSlots = response?.data?.response

      this.timeslots = this.formatAvailableSlots(availableSlots)
    },
    formatAvailableSlots(rawSlots) {
      if (!rawSlots) return []

      const slots = {}

      for (const datetime in rawSlots) {
        const datetimeDayjs = dayjs(datetime)

        //  Do not include any timeslots that are
        //  1. 45 minutes from now
        //  2. earlier than now
        if (
          dayjs()
            .add(45, 'minutes')
            .isAfter(datetimeDayjs)
        ) {
          continue
        }

        const date = datetimeDayjs.format('DD MMM, ddd')

        if (!slots[date]) {
          slots[date] = {}
        }

        slots[date][datetime] = rawSlots[datetime]
      }

      return slots
    },
    async getOrderInfo() {
      getOrderById(this.$route.params.orderId, true).then((rsp) => {
        this.order = rsp?.data?.response?.order

        if (this.order.appointment) {
          this.appointment = this.order.appointment
          this.loading = false
        } else if (this.retryFetchAppointmentCount < 5) {
          // appointment scheduling might take some time to be returned in backend
          setTimeout(this.getOrderInfo, 1000)
          this.retryFetchAppointmentCount += 1
          if (this.retryFetchAppointmentCount === 5) {
            this.loading = false
          }
        } else {
          this.error = 'Unable to Retrieve Appointment'
        }
      })
    },
    intercomHideLauncher() {
      if (window.innerWidth < 768) {
        window.Intercom('update', {
          hide_default_launcher: true
        })
      }
    },
    intercomShow() {
      window.Intercom('show')
    },
    async scheduleAppointment(date, staffId = null) {
      try {
        this.submitting = true

        // Takes in string of format "yyyy-mm-dd HH:mm:00"
        await updateAppointment(this.appointment.id, {
          appt_date_time: date,
          staff_id: staffId
        })

        this.$store.commit('updateScheduleStatus', true)
        this.$router.replace(`/order/success?order_id=${this.$route.params.orderId}`)
      } catch (error) {
        alert(error?.response?.data?.userMessage ?? 'An error has occurred. Please try again.')
      } finally {
        this.submitting = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.calendar-wrapper {
  background-color: white;
  padding: 0 15px;

  .header-wrapper {
    max-width: 520px;
  }
}

.order-container {
  max-width: 768px;
  overflow: hidden;
}
.cart-logo {
  display: block;
  width: 126px;
  height: 69px;
  margin: 0 auto 45px;
  .cart {
    transform-origin: center;
    animation: rotate 600ms 300ms cubic-bezier(0.4, 0, 0.2, 1) infinite alternate;
    @keyframes rotate {
      to {
        transform: rotate(-25deg);
      }
    }
  }
  .dot {
    transform-origin: center;
    animation: scale 600ms 300ms cubic-bezier(0.4, 0, 0.2, 1) infinite alternate;
    @keyframes scale {
      to {
        transform: scale(0.7);
      }
    }
  }
}
.order-warning {
  background-color: #e8c0ba;
}

.fade-enter-active {
  transition: opacity 0.5s ease-in-out;
}

.fade-enter {
  opacity: 0;
}
</style>
