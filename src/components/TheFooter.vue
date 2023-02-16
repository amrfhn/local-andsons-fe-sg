<template>
  <footer v-if="showFooter" id="subscribe" class="footer">
    <div class="container-fluid">
      <div class="row">
        <div class="footer-col contact-container">
          <div class="contact-header head">
            <p class="contact-title">Sign up to our newsletter.</p>
          </div>
          <p class="error-message">{{ error }}</p>
          <form action="" class="contact-form">
            <input v-model="name" type="text" placeholder="Name" />
            <input v-model="email" type="text" placeholder="Email" />
            <div class="btn-submit">
              <button
                id="subcribeButton"
                class="submit-button state-0"
                :disabled="sendState"
                @click.prevent="callSubscribeAPI"
              >
                <span class="pre-state-msg">Subscribe</span>
                <span class="current-state-msg hide">Sending...</span>
                <span class="done-state-msg hide">Done!</span>
                <span class="error-state-msg hide">Error!</span>
              </button>
            </div>
          </form>

          <div class="science-container">
            <h3 class="contact-title">The science behind it!</h3>
            <a class="btn-white" href="https://andsons.com.sg/blog/">
              CHECK OUR BLOG
            </a>
            <div class="tw-mt-10"><LegitScriptLogo /></div>
          </div>
        </div>
        <div class="row dropdown-row tw-flex-shrink tw-flex-wrap">
          <DropdownItem v-for="content in contents" :key="content.title" :content="content" />
        </div>
      </div>
      <div class="a-footer">
        <div class="footer-col social">
          <div class="social-links">
            <a href="https://www.instagram.com/andsons/" target="_blank">
              <font-awesome-icon :icon="['fab', 'instagram']" />
            </a>
            <a href="https://www.facebook.com/weareandsons/" target="_blank">
              <font-awesome-icon :icon="['fab', 'facebook-square']" />
            </a>
            <!-- 	<a href="https://twitter.com/andsons_my"><font-awesome-icon :icon="['fab','twitter-square']" /></a> -->
          </div>
        </div>
        <div class="credit-card-logo">
          <img class="mr-10 cc-img" src="../assets/images/payments/visa-bnw.png" alt="visa-logo" />
          <img class="mr-10 cc-img" src="../assets/images/payments/mastercard-bnw.png" alt="mastercard-logo" />
          <img class="mr-10 cc-img" src="../assets/images/atome/atome_footer.png" alt="atome-logo" />
        </div>
      </div>
      <div class="b-footer">
        <a
          href="https://www.moh.gov.sg/docs/librariesprovider5/default-document-library/voluntary-listing-of-direct-telemedicine-service-providers-20sep2021.pdf"
          target="_blank"
          class="tw-text-white tw-text-lg tw-flex tw-justify-center tw-mb-8"
        >
          <u>andSons is part of the MOH’s list of direct telemedicine providers.</u>
        </a>
        <p class="tw-text-center tw-text-white tw-text-sm tw-mb-5 tw-max-w-5xl tw-mx-auto">
          DISCLAIMER: andSons is a digital health platform which facilitates the provision of healthcare services by
          connecting its users with licensed doctors, pharmacies and other licensed healthcare institutions. andSons
          itself is neither a licensed clinic nor a licensed pharmacy. andSons does not prescribe, store or dispense any
          medication. For further information, refer to our
          <a href="/terms-&-conditions" class="tw-text-white">terms of use</a>.
        </p>
        <p>All rights reserved by &copy; {{ currentYear }} &Sons (v{{ appVersion }})</p>
      </div>
    </div>
  </footer>
</template>

<script>
import DropdownItem from '@/components/DropdownItem'
import axios from '@/services/axios-config.js'
import dom from '@/utils/domManipulation.js'
import { trackNewSubscription } from '@/utils/analytics'
import LegitScriptLogo from '@/components/Badges/LegitScriptLogo'

export default {
  name: 'TheFooter',
  components: {
    DropdownItem,
    LegitScriptLogo
  },
  data() {
    return {
      appVersion: process.env.VUE_APP_PACKAGE_VERSION,
      currentYear: new Date().getFullYear(),
      toggle: false,
      contents: [
        {
          title: 'COUNTRIES',
          isSubRoute: false,
          contentItem: [
            {
              title: 'Singapore',
              icon: require('@/assets/images/flag-icons/SG_Flag.jpg'),
              iconAlt: 'Singapore Site',
              iconClass: 'tw-opacity-40',
              link: 'https://andsons.com.sg'
            },
            {
              title: 'Malaysia',
              icon: require('@/assets/images/flag-icons/MY_Flag.jpg'),
              iconAlt: 'Malaysia Site',
              link: 'https://andsons.com.my'
            }
          ]
        },
        {
          title: 'TREATMENTS',
          isSubRoute: true,
          contentItem: [
            {
              title: 'Hair Loss',
              link: '/treatment/hair-loss'
            },
            {
              title: 'Sexual Health',
              link: '/treatment/sexual-health'
            },
            {
              title: 'Supplements',
              link: '/treatment/supplements'
            },
            {
              title: 'Skincare',
              link: '/treatment/skincare'
            },
            {
              title: 'Mental Health',
              isSubRoute: false,
              link: '/mental-health'
            }
          ]
        },
        {
          title: 'OUR TEAM',
          isSubRoute: false,
          contentItem: [
            {
              title: 'Medical Team',
              link: '/medical-team'
            }
          ]
        },
        {
          title: 'LEGAL',
          isSubRoute: true,
          contentItem: [
            {
              title: 'Privacy Policy',
              link: '/privacy-policy'
            },
            {
              title: 'Terms & Conditions',
              link: '/terms-&-conditions'
            },
            {
              title: 'Refund Policy',
              link: '/refund-policy'
            }
          ]
        },
        {
          title: 'CONTACT',
          isSubRoute: false,
          contentItem: [
            {
              title: '+65 69515393',
              link: 'tel:+6569515393'
            },
            {
              title: 'hello@andsons.com.sg',
              link: 'mailto:hello@andsons.com.sg'
            },
            {
              title: 'PX Ventures Pte Ltd (202029531N)'
            },
            {
              title: '65 UBI ROAD 1, #01-59, OXLEY BIZHUB Singapore 408729'
            }
          ]
        }
      ],
      name: '',
      email: '',
      error: '',
      sendState: false
    }
  },
  computed: {
    showFooter() {
      return this.$route.path.indexOf('/checkout') === -1 && this.$route.name !== 'Invoice'
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
      if (this.email != '' && this.name != '') {
        try {
          this.sendState = true
          dom.updateButtonMsg()
          const response = await axios.post(`/api/v1/leads/subscribeNewsletter`, { email: this.email, name: this.name })
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
        this.error = 'Please key in your name and email'
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
.container-fluid {
  width: 90vw;
  margin: auto;
}
.footer {
  background-color: #000;
  padding: 70px 0;
  margin-top: auto;
}
.row {
  display: flex;
  justify-content: space-between;
  &.dropdown-row {
    justify-content: flex-end;
  }
  @include mediaSm {
    flex-wrap: wrap;
  }
}

.footer-col .social-links a {
  display: inline-block;
  font-size: 35px;
  height: 40px;
  width: 40px;
  margin: 0 20px 0px 0;
  text-align: center;
  /* line-height: 40px; */
  color: #ffffff;
}

.footer-col {
  &.address-container {
    width: 20%;
    max-width: 198px;
    color: #fff;
    padding: 0 20px;

    @include mediaSm {
      width: 100%;
      // text-align: center;
      max-width: 100%;
    }

    h4 {
      font-size: 18px;
      color: #ffffff;
      font-weight: 500;
      position: relative;
      margin-bottom: 25px;
      text-transform: uppercase;
    }

    p {
      font-size: 16px;
      line-height: 22px;
      font-weight: 300;
      display: block;
      margin-bottom: 16px;
    }
  }
}

.footer-col {
  p {
    font-size: 22px;
    color: #ffffff;
    text-transform: capitalize;
    margin-bottom: 30px;
    position: relative;
    font-family: 'PublicSansExtraBold', sans-serif;
  }
}

.social {
  @media screen and (max-width: 510px) {
    width: 100%;
  }
}

.science-container {
  @include mediaSm {
    margin-bottom: 55px;
  }
  .btn-white {
    color: white;
    border: 2px solid white;
    padding: 8px 40px;
    text-decoration: none;
    font-family: 'PublicSansExtraBold', sans-serif;
    text-transform: uppercase;
  }
}

.footer-col {
  &.social {
    .social-links {
      padding-left: 10px;
      @media screen and (max-width: 510px) {
        display: flex;
        // justify-content: center;
      }
    }
  }
}

.b-footer {
  text-align: center;
  color: #999;
  padding-top: 50px;
}

.a-footer {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 1.5rem;
  padding-top: 2rem;
  border-top: 1px solid grey;
}

.error-message {
  color: red;
  display: block;
  text-align: left;
  margin-bottom: 1rem;
  @media screen and (max-width: 768px) {
    font-size: 80%;
  }
}

.contact-container {
  padding: 0 15px;
  @include mediaMd {
    // padding-right: 20px;
    max-width: 360px;
    height: 400px;
  }
}

.contact-form {
  margin-bottom: 2rem;
  input {
    height: 40px;
    width: calc(100% / 2);
    max-width: 500px;
    border: 1px solid #fff;
    padding: 0 2rem;
    background-color: transparent;
    color: #fff;

    &::-webkit-input-placeholder {
      /* Chrome/Opera/Safari */
      color: #fff;
    }
  }

  .submit-button {
    display: block;
    font-family: 'PublicSansExtraBold', sans-serif;
    text-transform: uppercase;
    letter-spacing: 1px;
    height: 40px;
    line-height: 40px;
    overflow: hidden;
    background: #fff;
    border: 1px solid black;
    color: #000;
    cursor: pointer;
    transition: all 0.3s ease;
    margin: 10px 0;
    padding: 0;
    width: 100%;

    @media screen and (max-width: 768px) {
      font-size: 80%;
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
      color: #000;
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

.credit-card-logo {
  justify-content: flex-end;
  align-items: center;
  display: flex;

  .cc-img {
    max-width: 50px;
  }
}
</style>
