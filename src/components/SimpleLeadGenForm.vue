<template>
  <form action="" class="simple-form">
    <div class="input-groups">
      <input v-model="name" type="text" placeholder="Name" />
      <input v-model="email" type="email" placeholder="Email" />
    </div>
    <div class="btn-submit">
      <button id="subcribeButton" class="submit-button state-0" :disabled="sendState" @click.prevent="callSubscribeAPI">
        <span class="pre-state-msg">GET NOTIFIED</span>
      </button>
    </div>
  </form>
</template>

<script>
import axios from 'axios'
import dom from '@/utils/domManipulation.js'
import { trackNewSubscription } from '@/utils/analytics'

export default {
  data() {
    return {
      name: '',
      email: '',
      error: '',
      sendState: false
    }
  },
  watch: {
    email(val) {
      if (val === '') {
        this.error = ''
        this.sendState = false
      }
    },
    name(val) {
      if (val === '') {
        this.error = ''
        this.sendState = false
      }
    }
  },
  methods: {
    hasValidInputs() {
      return this.email != '' && this.name != ''
    },
    async callSubscribeAPI() {
      this.error = ''
      if (this.hasValidInputs()) {
        try {
          this.sendState = true
          dom.updateButtonMsg()
          // zapier hook is for SG skincare lead gen only
          const response = await axios.post(
            `https://hooks.zapier.com/hooks/catch/9347414/ojoqsdq/?email=${this.email}&name=${this.name}`
          )
          if (response.status === 200) {
            trackNewSubscription(window, this.email)
            dom.finalButtonMsg()
            this.clearInput()
          }
        } catch (error) {
          this.sendState = false
          this.error = error.response.data.userMessage
          dom.errorButtonMsg()
        }
      } else {
        this.error = 'Please key in your name and email.'
      }
    },
    clearInput() {
      this.email = ''
      this.name = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.simple-form {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: unset;

  @include mediaSm {
    flex-direction: column;
  }
}

input[type='text'],
input[type='email'] {
  max-width: 200px;
  border: 1px solid black;
  padding: 1rem;

  @include mediaSm {
    max-width: 50%;
  }
}

.submit-button {
  margin-top: 0;
  padding: 1rem 18px;
}

@include mediaSm {
  .input-groups,
  .btn-submit,
  .submit-button {
    width: 100%;
  }

  .btn-submit {
    margin-top: 10px;
  }
}
</style>
