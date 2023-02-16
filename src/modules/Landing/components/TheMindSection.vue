<template>
  <section id="mind-section" class="mind">
    <img src="../../../assets/images/mind_logo.svg" class="mind-logo" :class="{ 'mind-logo-banner': headerBanner }" />
    <div class="flex" style="overflow:hidden;padding-top:20px">
      <div class="mind-images">
        <div class="abs-container">
          <div class="model-container card-parallax-medium">
            <img
              src="../../../assets/images/man-in-pink.jpg"
              alt="mind-model"
              class="mind-model"
              data-aos="zoom-out"
              data-aos-duration="500"
              data-aos-anchor-placement="center-bottom"
            />
          </div>
          <div class="hand-fist card-parallax-fast">
            <img src="../../../assets/images/hand_fist.jpg" alt="hand-fist" class="" />
          </div>
          <div class="gel-background card-parallax-low">
            <img src="../../../assets/images/gel_background.jpg" alt="gel-background" class="" />
          </div>
        </div>
      </div>
      <div class="mind-content">
        <div class="content">
          <h2 class="title">Mental Health Determines Your Well-Being</h2>
          <p class="subtitle">
            It’s okay to not be okay. We feel it too. In times like these, it’s key to take care of your mental health.
            Whether you’re looking for anonymous support groups or individual talk therapy,
            <mark>we’re here to help.</mark>
          </p>
          <a href="/mental-health" class="buttonStyle">
            EXPLORE MORE
          </a>
        </div>
      </div>
      <img src="../../../assets/images/powder.png" alt="powder" class="powder" data-aos="fade-in" />
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
// import CommonButton from "@/modules/Landing/components/CommonButton.vue";

export default {
  components: {
    // CommonButton
  },
  computed: {
    ...mapGetters({
      headerBanner: 'getHeaderBanner'
    })
  }
}
</script>

<style lang="scss" scoped>
.buttonStyle {
  margin-top: 2rem;
  display: table;
  text-transform: uppercase;
  padding: 1.4rem 4rem;
  font-size: 14px;
  letter-spacing: 2px;
  background-color: black;
  color: white;
  border: 1px solid black;
  font-family: 'PublicSansExtraBold', sans-serif;
  text-decoration: none;
  transition: all 0.4s ease-in-out;

  &:hover {
    background-color: transparent;
    color: black;
  }

  @media screen and (max-width: 768px) {
    margin-top: 1rem;
    font-size: 0.9rem;
    padding: 1rem 2rem;
  }
}
#mind-section {
  scroll-snap-align: start;
}

.mind {
  padding-top: 72px;
  background-color: $greenwhite-background;

  .mind-logo {
    display: block;
    position: sticky;
    position: -webkit-sticky;
    top: 50px;
    z-index: 10;
    height: auto;
    width: 100%;
    max-width: 76.8px;
    margin-left: 62px;
    opacity: 0;

    @media screen and (max-width: 767px) {
      top: 74px;
    }
  }

  .powder {
    position: absolute;
    height: auto;
    bottom: -3vw;
    right: 0;
    width: 40vw;
    max-width: 30rem;
  }

  .mind-images {
    position: relative;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 85vw;
    right: 2rem;

    .abs-container {
      position: relative;
      width: 60vw;
      height: 60vw;
      max-width: 30rem;
      max-height: 30rem;
    }

    .model-container {
      position: relative;
      overflow: hidden;
      z-index: 0;

      .mind-model {
        position: relative;
        display: block;
        width: 60vw;
        height: 60vw;
        max-width: 30rem;
        max-height: 30rem;
        z-index: 0;
      }
    }

    .hand-fist {
      position: absolute;
      display: block;
      height: auto;
      width: 35vw;
      max-width: 13rem;
      left: -6rem;
      top: -3rem;
      z-index: 2;
    }

    .gel-background {
      position: absolute;
      display: block;
      height: auto;
      width: 25vw;
      max-width: 10rem;
      bottom: -6rem;
      left: -3rem;
      z-index: 0;
    }
  }

  .mind-content {
    margin-top: 80px;

    .big-typography {
      font-family: 'HighSummit', serif;
      font-size: $big-typography;
      color: $white-text;
    }

    .content {
      padding: 4rem 2rem 5rem 3rem;
      .title {
        position: relative;
        font-family: 'PublicSansExtraBold', sans-serif;
        font-size: $title;
        padding-bottom: 20px;
        z-index: 3;

        &::before {
          content: 'Mind';
          position: absolute;
          z-index: -1;
          left: -30px;
          top: -7rem;
          font-family: 'HighSummit', serif;
          font-size: $big-typography;
          color: $white-text;
        }
      }

      .subtitle {
        font-family: 'PublicSans', sans-serif;
        font-size: $fontsize-15;
        padding-bottom: 20px;
        line-height: 1.5;
      }
    }
  }
}
</style>
