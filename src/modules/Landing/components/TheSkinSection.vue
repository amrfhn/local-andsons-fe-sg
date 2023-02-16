<template>
  <section id="skin-section" class="skin">
    <img src="../../../assets/images/skin_logo.svg" class="skin-logo" :class="{ 'skin-logo-banner': headerBanner }" />
    <div class="flex" style="overflow:hidden;">
      <div class="skin-images">
        <div class="abs-container">
          <div class="model-container card-parallax-medium">
            <img
              src="../../../assets/images/skin_model.png"
              alt="skin-model"
              class="skin-model"
              data-aos="zoom-out"
              data-aos-duration="500"
            />
          </div>
          <div class="skin-handcream card-parallax-medium">
            <img src="../../../assets/images/skin_handcream.png" alt="skin-handcream" class="" />
          </div>
          <div class="skin_model2 card-parallax-fast">
            <img src="../../../assets/images/skin_model2.png" alt="skin_model2" class="" />
          </div>
        </div>
      </div>
      <div class="skin-content">
        <div class="content">
          <p class="title">Acne & skin ageing is treatable</p>
          <p class="subtitle">
            Confidence comes with being comfortable in your skin.
            <mark>Get your game face on</mark> with creams and lotions formulated to reduce acne and keep your skin
            healthy.
          </p>
          <router-link class="buttonStyle" :to="'/treatment/skincare'">
            Treatments from $59
          </router-link>
        </div>
      </div>
      <img src="../../../assets/images/pink_texture.png" alt="pink-texture" class="pink-texture" data-aos="fade-in" />
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
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

  // &:hover{
  //   background-color: transparent;
  //   color: black;
  // }

  @media screen and (max-width: 768px) {
    margin-top: 1rem;
    font-size: 0.9rem;
    padding: 1rem 2rem;
  }
}
#skin-section {
  scroll-snap-align: start;
}

.skin {
  padding-top: 72px;
  background-color: $catskillwhite-background;

  .skin-logo {
    display: block;
    position: sticky;
    position: -webkit-sticky;
    top: 50px;
    height: auto;
    width: 100%;
    max-width: 66px;
    margin-left: 60px;
    z-index: 10;
    opacity: 0;

    @media screen and (max-width: 767px) {
      top: 74px;
    }
  }

  .pink-texture {
    position: absolute;
    height: auto;
    width: 40vw;
    bottom: -5vw;
    right: 0;
    max-width: 30rem;
  }

  .skin-images {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30rem;

    .abs-container {
      position: relative;
      width: 60vw;
      height: 60vw;
      max-width: 25rem;
      max-height: 25rem;
    }

    .model-container {
      position: relative;
      overflow: hidden;
      z-index: 3;

      .skin-model {
        position: relative;
        display: block;
        width: 60vw;
        height: 60vw;
        max-width: 25rem;
        max-height: 25rem;
        z-index: 2;
      }
    }

    .pink-droplet {
      position: absolute;
      display: block;
      height: auto;
      width: 30vw;
      max-width: 10rem;
      bottom: -7rem;
      right: -4rem;
      z-index: 3;
    }

    .skin-handcream {
      position: absolute;
      display: block;
      height: auto;
      width: 30vw;
      max-width: 15rem;
      top: -5rem;
      left: -6rem;
      // transform: translate(-44%, -33%);
      z-index: 1;
    }

    .skin_model2 {
      position: absolute;
      display: block;
      height: auto;
      width: 29vw;
      max-width: 10rem;
      top: -5rem;
      right: -5rem;
      // transform: translate(46%, -54%);
      z-index: 1;
    }
  }

  .skin-content {
    .big-typography {
      font-family: 'HighSummit', serif;
      font-size: $big-typography;
      color: $white-text;
    }

    .content {
      padding: 4rem 3rem 5rem 3rem;
      .title {
        position: relative;
        font-family: 'PublicSansExtraBold', sans-serif;
        font-size: $title;
        padding-bottom: 20px;
        z-index: 3;

        &::before {
          content: 'Skin';
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
