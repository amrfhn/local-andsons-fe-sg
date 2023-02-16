<template>
  <div class="main-wrapper contact-us-wrapper">
    <GlobalHeader show-full-logo />

    <div class="container">
      <div class="first-section text-center">
        <h1 class="title mb-20">Contact Us</h1>
        <h3 class="subtitle mb-28">
          If you have questions or want to get in touch, we’re here for you.
        </h3>

        <div class="contact-details mb-28">
          <h3 class="mb-10">Call us</h3>
          <a class="cta-link tw-text-bismark" href="tel:+65 69515393">
            +65 6951 5393
          </a>
        </div>

        <!-- <div class="contact-details mb-28">
          <h3 class="mb-10">Chat with us on WhatsApp</h3>
          <div class="cta-link tw-text-bismark" @click="triggerWhatsapp">+65 87565801</div>
        </div> -->

        <div class="contact-details mb-28">
          <h3 class="mb-10">Email us anytime</h3>
          <a class="cta-link tw-text-bismark" href="mailto:hello@andsons.com.sg">
            hello@andsons.com.sg
          </a>
        </div>

        <div class="contact-details mb-28">
          <h3 class="mb-10">Follow us on</h3>
          <a target="_blank" class="cta-link tw-text-bismark" href="https://www.instagram.com/andsons">
            Instagram
          </a>
          <span> and </span>
          <a target="_blank" class="cta-link tw-text-bismark" href="https://www.facebook.com/weareandsons">
            Facebook
          </a>
        </div>
      </div>
    </div>

    <!-- <JoinCommunity /> -->
  </div>
</template>

<script>
import { formatMetaTags } from '@/utils/prettify.js'
import GlobalHeader from '@/components/GlobalHeader'
// import JoinCommunity from "@/components/JoinCommunity";

export default {
  components: {
    GlobalHeader
    // JoinCommunity,
  },
  metaInfo() {
    return formatMetaTags({
      title: 'Contact Us',
      description: 'If you have questions or want to get in touch, we’re here for you.',
      urlPath: this.$route.path
    })
  },
  methods: {
    triggerWhatsapp() {
      setTimeout(function() {
        document.getElementsByClassName('vsc-popup-button')[0].click()
      }, 100)
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  padding-left: 3rem;
  padding-right: 3rem;
}

.main-wrapper {
  &.contact-us-wrapper {
    box-sizing: border-box;
    scroll-snap-align: start;
    padding-top: 3rem;
    background-color: $springwood-background;

    .popOverlay {
      position: fixed;
      z-index: 1000;
      width: 100%;
      height: 100%;
      background: transparent;
      left: 0;
      top: 0;
    }

    .isNotLandingHeader {
      margin-top: 0;
    }

    .title {
      font-family: PublicSansExtraBold, sans-serif;
      font-size: 3rem;
      margin-bottom: 55px;
      z-index: 3;
    }
    h3 {
      font-size: 18px;
    }
    .first-section {
      margin-top: 1.5rem;
      padding-top: 7rem;
      padding-bottom: 7rem;

      .contact-details {
        font-size: 18px;
      }

      .cta-link {
        font-size: 18px;
        cursor: pointer;
        text-decoration: underline;
      }
    }
  }
}
</style>
