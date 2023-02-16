<template>
  <section id="sex-section" class="sex">
    <img src="../../../assets/images/sex_logo.png" class="sex-logo" :class="{ 'sex-logo-banner': headerBanner }" />
    <div class="flex">
      <div class="sex-images">
        <div class="abs-container">
          <div class="model-container card-parallax-medium">
            <img
              src="../../../assets/images/sex_model.jpg"
              alt="sex-model"
              class="sex-model"
              data-aos="zoom-out"
              data-aos-anchor-placement="top-center"
              data-aos-duration="500"
            />
          </div>
          <div class="left-cream card-parallax-slow">
            <img src="../../../assets/images/left_cream.png" alt="left-cream" class="" data-aos="fade-in" />
          </div>
          <div class="hand-cream card-parallax-fast">
            <img src="../../../assets/images/hand_cream.jpg" alt="hand-cream" class="" />
          </div>
          <div class="sex-powder card-parallax-slow">
            <img src="../../../assets/images/sex_powder.png" alt="sex-powder" class="" />
          </div>
        </div>
      </div>
      <div class="sex-content">
        <div class="content">
          <h2 class="title">Sexual Health Builds Your Confidence</h2>
          <p class="subtitle">
            It happens to a lot of us. While there are multiple causes, there's also a range of
            <mark>evidence-based medications</mark> to treat it. We can help you figure out why and offer the right
            treatments that can help too.
          </p>
          <router-link class="buttonStyle" :to="'/treatment/sexual-health'">Treatments from $35</router-link>
        </div>
      </div>
      <img src="../../../assets/images/right_cream.png" alt="right-cream" class="right-cream" data-aos="fade-in" />
    </div>
  </section>
</template>

<script>
// import CommonButton from "@/modules/Landing/components/CommonButton.vue";
import { mapGetters } from 'vuex'

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

  @include mediaSm {
    margin-top: 1rem;
    font-size: 0.7rem;
    padding: 1rem 2rem;
    text-align: center;
  }
}

#sex-section {
  scroll-snap-align: start;
}

.sex {
  padding-top: 76px;
  background-color: $potpourri-background;

  .sex-logo {
    display: block;
    position: sticky;
    position: -webkit-sticky;
    top: 56px;
    height: auto;
    width: 100%;
    max-width: 66px;
    margin-left: 58px;
    z-index: 10;
    opacity: 0;

    @media screen and (max-width: 767px) {
      top: 80px;
    }
  }

  .right-cream {
    position: absolute;
    bottom: 0;
    right: 0;
    height: auto;
    width: 35vw;
    max-width: 20rem;
    z-index: 0;
  }

  .sex-images {
    position: relative;
    margin-top: 1rem;
    height: 85vw;
    display: flex;
    justify-content: flex-end;

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
      right: 2rem;

      .sex-model {
        position: relative;
        display: block;
        height: 60vw;
        width: 60vw;
        max-width: 30rem;
        max-height: 30rem;
        z-index: 1;
      }
    }

    .left-cream {
      position: absolute;
      display: block;
      height: auto;
      width: 70vw;
      max-width: 30rem;
      left: -12rem;
      bottom: -7rem;
      z-index: 1;
    }

    .hand-cream {
      position: absolute;
      display: block;
      height: auto;
      width: 40vw;
      max-width: 17rem;
      left: -8rem;
      bottom: -4rem;
      z-index: 1;
    }

    .sex-powder {
      position: absolute;
      display: block;
      height: auto;
      width: 30vw;
      max-width: 11rem;
      right: 0;
      bottom: -6rem;
      z-index: 3;
    }
  }

  .sex-content {
    z-index: 1;

    .big-typography {
      font-family: 'HighSummit', serif;
      font-size: $big-typography;
      color: $white-text;
    }

    .content {
      padding: 4rem 2rem 5rem 3rem;

      @include mediaSm {
        padding: 4rem 2rem 2rem 2rem;
      }

      .title {
        position: relative;
        font-family: 'PublicSansExtraBold', sans-serif;
        font-size: $title;
        padding-bottom: 20px;
        z-index: 3;

        &::before {
          content: 'Sex';
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
