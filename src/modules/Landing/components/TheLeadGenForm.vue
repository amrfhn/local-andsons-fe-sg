<template>
  <div>
    <div class="leadgen-content">
      <div class="contact-header">
        <p class="contact-subtitle">Get the latest updates from andSons</p>
      </div>
      <p class="error-message">{{ error }}</p>
      <form action="" class="contact-form">
        <input v-model="email" type="text" placeholder="Email" />
        <div class="btn-submit">
          <button
            id="subcribeButton"
            class="submit-button state-0"
            :disabled="sendState"
            @click.prevent="callSubscribeAPI"
          >
            <span class="pre-state-msg">Sign Up</span>
            <span class="current-state-msg hide">Sending...</span>
            <span class="done-state-msg hide">Done!</span>
            <span class="error-state-msg hide">Error!</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import dom from '@/utils/domManipulation.js'
import { trackNewSubscription } from '@/utils/analytics'

export default {
  data() {
    return {
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
    }
  },
  methods: {
    async callSubscribeAPI() {
      this.error = ''
      if (this.email != '') {
        try {
          this.sendState = true
          dom.updateButtonMsg()
          const response = await axios.post(`https://hooks.zapier.com/hooks/catch/9347414/oxvdvg1/?email=${this.email}`)
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
        this.error = 'Please key in your email'
      }
    },
    clearInput() {
      this.email = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.error-message {
  color: red;
  display: block;
  text-align: left;
  margin-bottom: 1rem;
  @media screen and (max-width: 768px) {
    font-size: 80%;
  }
}

.footer-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  object-fit: cover;

  @media screen and (max-width: 768px) {
    display: none;
  }
}

.leadgen-content {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;

  .contact-header {
    .contact-title {
      font-family: PublicSansExtraBold, sans-serif;
      font-size: 3.75rem;
      text-align: center;
      @media screen and (max-width: 768px) {
        font-size: clamp(1rem, 10vw, 2rem);
      }
    }

    .contact-subtitle {
      font-family: PublicSans, monospace;
      font-size: 1.125rem;

      @media screen and (max-width: 768px) {
        font-size: 1rem;
      }
    }
  }
}

.contact-form {
  display: flex;
  align-items: center;
  height: 50px;

  input {
    height: 58px;
    width: 30vw;
    max-width: 500px;
    border: 1px solid black;
    // margin-right: 2rem;
    padding: 0 2rem;
    @media screen and (max-width: 768px) {
      width: 50vw;
      margin-right: 0;
    }

    @media screen and (max-width: 450px) {
      height: 50px;
    }
  }

  .submit-button {
    display: block;
    font-family: 'PublicSansExtraBold', sans-serif;
    text-transform: uppercase;
    letter-spacing: 1px;
    height: 58px;
    width: 180px;
    line-height: 58px;
    overflow: hidden;
    background: black;
    border: 1px solid black;
    cursor: pointer;
    transition: all 0.3s ease;
    margin: 0;
    padding: 0;

    @media screen and (max-width: 768px) {
      font-size: 80%;
      width: 130px;
    }

    @media screen and (max-width: 450px) {
      height: 50px;
      line-height: 50px;
    }

    &.animated {
      animation: 0.3s short-press cubic-bezier(0.77, 0, 0.175, 1) forwards;
    }

    > span {
      display: block;
      color: white;
      text-align: center;

      &.pre-state-msg {
        transition: all 0.3s cubic-bezier(0.77, 0, 0.175, 1);
      }
    }

    &.state-1 {
      .pre-state-msg {
        margin-top: -58px;
        @media screen and (max-width: 450px) {
          margin-top: -50px;
        }
      }
    }

    &.state-2 {
      .pre-state-msg {
        margin-top: -116px;
        @media screen and (max-width: 450px) {
          margin-top: -100px;
        }
      }
    }

    &.state-3 {
      .pre-state-msg {
        margin-top: -174px;
        @media screen and (max-width: 450px) {
          margin-top: -150px;
        }
      }
    }
  }
}

.contact-card {
  margin: auto;
  padding-top: 3rem;
  display: none;

  @media screen and (max-width: 768px) {
    display: initial;
  }
}
</style>
