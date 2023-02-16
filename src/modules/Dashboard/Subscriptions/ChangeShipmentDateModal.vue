<template>
  <div v-if="showModal" class="popup">
    <transition name="fade" appear>
      <div class="popup-overlay" @click="$emit('change')"></div>
    </transition>

    <transition name="slide" appear>
      <div class="modal">
        <div class="modal-header mb-32">
          Select your next renewal date.<br />
          You will be charged on this date.
          <span class="close-button" @click="$emit('change')">
            <img :src="require(`@/assets/images/close.svg`)" alt="X" />
          </span>
        </div>
        <div class="modal-body text-center">
          <DatePicker
            v-model="date"
            class="change-date"
            mode="date"
            :min-date="new Date()"
            :max-date="max_date"
            is-required
            color="red"
          />
          <p v-show="error" class="error">{{ error }}</p>
          <div class="submit-button" @click="changeSubscriptionDate">
            Update Next Renewal Date
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import DatePicker from 'v-calendar/lib/components/date-picker.umd'
import { updateSubscriptionDateById } from '@/api/subscriptions.js'
import dayjs from 'dayjs'
export default {
  name: 'ChangeShipmentDateModal',
  components: { DatePicker },
  props: {
    subscription: {
      type: Object,
      required: true
    },
    showModal: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      date: dayjs(this.subscription.next_billing_date).toDate(),
      max_date: dayjs(this.subscription.next_billing_date)
        .add(1, 'month')
        .toDate(),
      error: ''
    }
  },
  methods: {
    padZero(i) {
      return String(i).padStart(2, '0')
    },
    async changeSubscriptionDate() {
      const date = this.date
      const month = this.padZero(date.getMonth() + 1)
      const day = this.padZero(date.getDate())
      const hours = this.padZero(date.getHours())
      const minutes = this.padZero(date.getMinutes())
      const res = await updateSubscriptionDateById(this.subscription.id, {
        date: `${date.getFullYear()}-${month}-${day} ${hours}:${minutes}:00`
      })
      if (res.status === 200) {
        this.$emit('change', true)
      } else {
        this.error = res.userMessage ?? 'Unable to change next shipping date'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.popup {
  .popup-overlay {
    position: fixed;
    display: block;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 98;
    cursor: pointer;
  }
  .modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 99;
    padding: 25px;
    width: 100%;
    max-width: 415px;
    background-color: #fff;
    border-radius: 5px;
    max-height: 90vh;
    overflow: auto;
    @media screen and (max-width: 450px) {
      width: 90vw;
    }
  }
  .modal-header {
    font-size: 1.5rem;
    text-align: center;
    font-family: 'PublicSansExtraBold', sans-serif;
    @media screen and (max-width: 400px) {
      font-size: 18px;
    }
    .close-button {
      position: absolute;
      cursor: pointer;
      top: 3%;
      right: 2%;
      @media screen and (max-width: 400px) {
        right: 5%;
      }
      img {
        height: 15px;
        width: 15px;
        cursor: pointer;
      }
    }
  }
  .modal-body {
    .btn-modal {
      display: inline-block;
      padding: 1.2rem 2rem;
      margin: 1rem auto 0.5rem;
      font-size: 18px;
      background-color: white;
      color: black;
      border: 1px solid black;
      font-family: 'PublicSansBold', sans-serif;
      text-decoration: none;
      transition: all 0.4s ease-in-out;
      &:hover {
        background-color: black;
        color: white;
      }
    }
    .error {
      padding-top: 20px;
      color: red;
    }
    .submit-button {
      margin: 20px auto 0;
      padding: 20px;
    }
  }
}
</style>
