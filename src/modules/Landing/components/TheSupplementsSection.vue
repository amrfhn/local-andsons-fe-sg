<template>
  <section id="supplements-section" class="supplements">
    <div class="flex" style="overflow:hidden;">
      <div class="supplements-images">
        <div class="abs-container">
          <div class="card-parallax-medium model-container">
            <img
              id="model-anchor"
              src="../../../assets/images/supplements_model.jpg"
              alt="pink_boy"
              class="pink-boy"
              data-aos="zoom-out"
              data-aos-duration="500"
            />
          </div>
          <div class="card-parallax-slow left-clay">
            <img src="../../../assets/images/hand_fist.jpg" alt="left-clay" data-aos="fade-in" />
          </div>
          <div class="card-parallax-fast supplements-texture">
            <img src="../../../assets/images/supplements_texture.jpg" alt="supplements-texture" />
          </div>
          <div class="card-parallax-slow gray-moist">
            <img src="../../../assets/images/supplements_pills.jpg" alt="supplements-pills" />
          </div>
        </div>
      </div>
      <div class="supplements-content">
        <div class="content">
          <p class="title">For a healthy you</p>
          <p class="subtitle">
            Whether it’s to manage stress, improve sexual and muscular health, or support your body’s natural function –
            our vitamins will give you
            <mark>the support you need</mark>.
          </p>
          <router-link class="buttonStyle" :to="'/treatment/supplements'">
            Treatments from $49
          </router-link>
        </div>
      </div>
      <img src="../../../assets/images/white_clay.png" alt="white-clay" class="right-clay" data-aos="fade-in" />
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
  },
  mounted() {},
  methods: {}
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
#supplements-section {
  scroll-snap-align: start;
  @media screen and (min-width: 1024px) and (max-width: 1400px) {
    margin-top: -0.2em;
    // background: blue;
  }
}

.supplements {
  padding-top: 70px;
  background-color: $dbabbf-background;

  .supplements-logo {
    position: sticky;
    position: -webkit-sticky;
    display: block;
    top: 91px;
    height: auto;
    width: 100%;
    max-width: 66px;
    margin-left: 63px;
    z-index: 10;
    opacity: 0;

    @media screen and (max-width: 767px) {
      top: 72px;
    }
  }

  .right-clay {
    position: absolute;
    bottom: 0;
    right: 0;
    height: auto;
    width: 40vw;
    max-width: 30rem;
    z-index: 0;
  }

  .supplements-images {
    position: relative;
    display: flex;
    align-items: center;

    .abs-container {
      position: relative;
      width: 60vw;
      height: 60vw;
      max-width: 30rem;
      max-height: 30rem;
      left: 5vw;
    }

    .model-container {
      position: relative;
      left: 2rem;
      overflow: hidden;
      z-index: 1;

      .pink-boy {
        position: relative;
        display: block;
        height: 60vw;
        width: 60vw;
        max-width: 30rem;
        max-height: 30rem;
        z-index: 2;
      }
    }

    .left-clay {
      position: absolute;
      display: block;
      height: auto;
      width: 60vw;
      max-width: 20rem;
      top: -3rem;
      transform: translate(-70%, 20%);
      z-index: 0;
    }

    .supplements-texture {
      position: absolute;
      display: block;
      height: auto;
      width: 40vw;
      max-width: 15rem;
      top: -4rem;
      right: -8rem;
      z-index: 0;
    }

    .gray-moist {
      position: absolute;
      display: block;
      height: auto;
      width: 30vw;
      max-width: 10rem;
      bottom: -4rem;
      right: 0;
      z-index: 2;
    }
  }

  .supplements-content {
    z-index: 3;

    .big-typography {
      font-family: 'HighSummit', serif;
      font-size: $big-typography;
      color: $white-text;
    }

    .content {
      padding: 4rem 2rem 2rem 3rem;

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
          content: 'Supplements';
          position: absolute;
          z-index: -1;
          left: -30px;
          top: -7rem;
          font-family: 'HighSummit', serif;
          font-size: $big-typography;
          color: $white-text;

          @include mediaSm {
            font-size: $medium-typography;
          }
        }
      }

      .subtitle {
        font-family: 'PublicSans', sans-serif;
        font-size: 14px;
        padding-bottom: 20px;
        line-height: 1.5;
      }
    }
  }
}
</style>
