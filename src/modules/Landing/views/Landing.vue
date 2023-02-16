<template>
  <div>
    <main>
      <ScrollUpComponent />
      <!-- <the-header></the-header> -->
      <!-- Desktop Navigation -->
      <!--
        <div class="navigation">
        <ul>
          <li id="hair-nav-item"><a href="#hair-section">HAIR</a></li>
          <li id="sex-nav-item"><a href="#sex-section">SEX</a></li>
          <li id="skin-nav-item"><a href="#skin-section">SKIN</a></li>
          <li id="mind-nav-item"><a href="#mind-section">MIND</a></li>
        </ul>
      </div>
       -->
      <div id="main-section">
        <section class="landing">
          <GlobalHeader />
          <div class="flex-wrapper">
            <div class="header-content">
              <div class="header-content-text">
                <div class="circle-wrapper">
                  <h1 class="title">Reimagining</h1>
                  <h1 class="title">Men's Health</h1>
                  <img src="../../../assets/images/title_circle.svg" alt="title circle" />
                </div>
                <p class="subtitle">
                  It's time to start taking better care of yourself. With easy<br />
                  access to the most effective treatments, all backed by<br />
                  science, we're helping make that possible.
                </p>
                <p class="subtitle">Men’s health, the way it should be.</p>
                <router-link class="submit-button" :to="'/evaluation/start'">
                  START YOUR EVALUATION
                </router-link>
              </div>
              <div class="landing-cta">
                <div class="landing-cta-grid">
                  <div
                    v-for="({ title, alt, background, label, productImage, secondImage, href }, index) in categories"
                    :key="index"
                    class="card animated fadeUpHair landing-cta-item"
                    :class="`${label} ${label}-card`"
                  >
                    <router-link :to="href" @click.native="navigate(href)">
                      <img class="card-background" :src="background" :alt="alt" />
                      <div class="menu-second-image">
                        <img :class="label" :src="secondImage" :alt="alt" />
                      </div>
                      <img v-show="productImage" class="product-image" :class="label" :src="productImage" :alt="alt" />
                      <p class="card-title">{{ title }}</p>
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <USPSection :usp-list="uspList.usp[0]" />
        <div class="hero">
          <div class="hero__description">
            <h2 class="title hero__description__title tw-leading-tight">
              Taking care of your health doesn't have to be hard.
            </h2>
            <p class="hero__description__subtitle subtitle">
              No waiting rooms, no pharmacy checkout lines. <br />Talk to a licensed doctor and get a diagnosis from the
              comfort and privacy of your home.
            </p>
            <router-link class="submit-button" :to="'/evaluation/start'">
              VIEW TREATMENTS
            </router-link>
          </div>
          <div class="hero-image">
            <img src="../../../assets/images/category-banners_ED.png" alt="hero" class="hero__image" />
          </div>
        </div>
      </div>
      <ProductStepInfo :data="steps.steps[3].data" />
      <Review />
      <TheSexSection />
      <TheHairSection />
      <TheSkinSection />
      <TheSupplementsSection />
      <MedicalTeamSection />
      <TheAdditionalSection />
      <TheMindSection />
      <TheKnowledgeSection />
      <TalkToUsSection />
      <InstagramWidget />
    </main>
  </div>
</template>

<script>
import GlobalHeader from '@/components/GlobalHeader'
import ProductStepInfo from '@/components/ProductStepInfo'
import USPSection from '@/components/USP'
import stepData from '@/data/productStep.json'
import uspList from '@/data/uspList.json'
import InstagramWidget from '@/modules/Landing/components/InstagramWidgetSection'
import MedicalTeamSection from '@/components/Sections/MedicalTeam/MedicalTeam.vue'
import Review from '@/modules/Landing/components/Review'
import ScrollUpComponent from '@/modules/Landing/components/ScrollUpComponent.vue'
import TheAdditionalSection from '@/modules/Landing/components/TheAdditionalSection.vue'
import TheHairSection from '@/modules/Landing/components/TheHairSection.vue'
import TheKnowledgeSection from '@/modules/Landing/components/TheKnowledgeSection.vue'
import TheMindSection from '@/modules/Landing/components/TheMindSection.vue'
import TheSexSection from '@/modules/Landing/components/TheSexSection.vue'
import TheSkinSection from '@/modules/Landing/components/TheSkinSection.vue'
import TheSupplementsSection from '@/modules/Landing/components/TheSupplementsSection.vue'
import { trackHomePageView } from '@/utils/analytics'
import dom from '@/utils/domManipulation.js'
import { formatMetaTags } from '@/utils/prettify.js'
import TalkToUsSection from '../components/TalkToUsSection.vue'

const backgroundMap = {
  1: require('@/assets/images/hover-menus/hair-hover/background.png'),
  2: require('@/assets/images/hover-menus/sex-hover/background.png'),
  3: require('@/assets/images/hover-menus/skin-hover/background.png'),
  4: require('@/assets/images/hover-menus/supplements-hover/background.png')
}
const productImageMap = {
  1: require('@/assets/images/hover-menus/hair-hover/productSize_2.png'),
  2: require('@/assets/images/hover-menus/sex-hover/stikit.png'),
  3: require('@/assets/images/hover-menus/skin-hover/product.png'),
  4: require('@/assets/images/hover-menus/supplements-hover/product.png')
}
const secondImageMap = {
  1: require('@/assets/images/hover-menus/hair-hover/model.png'),
  2: require('@/assets/images/hover-menus/sex-hover/model-face.png'),
  3: require('@/assets/images/hover-menus/skin-hover/model.png'),
  4: require('@/assets/images/hover-menus/supplements-hover/model.png')
}
const titleMap = {
  1: 'Hair Loss',
  2: 'Sexual Health',
  3: 'Skincare',
  4: 'Supplements'
}
const labelMap = {
  1: 'hair',
  2: 'sex',
  3: 'skin',
  4: 'supplements'
}
const hrefMap = {
  1: '/treatment/hair-loss',
  2: '/treatment/sexual-health',
  3: '/treatment/skincare',
  4: '/treatment/supplements'
}

export default {
  metaInfo() {
    let metaInfo = {}
    if (this.$route.hash === '#skin-section') {
      metaInfo = {
        title: 'Buy Skin Care Products for Men through Dermatology Telemedicine',
        description:
          "Buy your personalized skin care products for men through dermatology telemedicine. Don't have to keep stock or visit outlets to get them. Check out now.",
        urlPath: this.$route.hash,
        metaTitleContent: 'Buy Skin Care Products for Men through Dermatology Telemedicine'
      }
    } else {
      metaInfo = {
        title: 'Reimagining Men’s Health by Teleconsultation with Doctor',
        titleTemplate: '%s | andSons',
        urlPath: '',
        description:
          "Easy access to discreet men's health care services through teleconsultation with doctors. Book now for hair loss, skincare & sexual or mental health solutions."
      }
    }

    return formatMetaTags(metaInfo)
  },
  components: {
    GlobalHeader,
    TheHairSection,
    TheAdditionalSection,
    TheSexSection,
    TheSkinSection,
    TheSupplementsSection,
    TheMindSection,
    TheKnowledgeSection,
    ScrollUpComponent,
    MedicalTeamSection,
    ProductStepInfo,
    USPSection,
    InstagramWidget,
    Review,
    TalkToUsSection
},
  data: function() {
    return { steps: stepData, uspList }
  },
  computed: {
    categories() {
      return this.$store.state.categories.list
        .filter((category) => Object.keys(hrefMap).includes(category.id.toString()))
        .map((category) => {
          const { name, id } = category
          const alt = name.toLowerCase()
          const background = backgroundMap[id]
          const title = titleMap[id]
          const label = labelMap[id]
          const productImage = productImageMap[id]
          const secondImage = secondImageMap[id]
          const href = hrefMap[id]
          return {
            title,
            alt,
            background,
            label,
            productImage,
            secondImage,
            href
          }
        })
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleLogoOpacity)
    window.addEventListener('resize', dom.windowResize)

    trackHomePageView(window)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleLogoOpacity)
    window.removeEventListener('resize', dom.windowResize)
  },
  methods: {
    handleLogoOpacity() {
      dom.logoOpacity()
      dom.parallaxEffect()
      dom.scrollTop()
    },
    toggleMenu() {
      dom.toggleSideNav()
    },
    navigate(href) {
      if (href.indexOf('#') >= 0 && this.$router.currentRoute.fullPath.split('#')[0] === href.split('#')[0]) {
        document.getElementById(href.split('#')[1]).scrollIntoView({ behavior: 'smooth' })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.flex-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}

#main-section {
  scroll-snap-align: start;
  background-color: $springwood-background;
}

.landing {
  position: relative;

  .header-content {
    display: flex;
    width: 100%;
    margin: 8rem calc(30px + 5vw) 0 calc(30px + 5vw);
    flex-direction: row;

    @include mediaSm {
      margin-top: 5rem;
      max-width: calc(90vw);
      flex-direction: column;
    }

    .header-content-text {
      @include mediaSm {
        width: 100%;
        flex-grow: 1;
        padding: 0 0 2rem 0;
        min-width: unset;
      }

      min-width: 300px;
      padding: 2rem 0;

      .title {
        position: relative;
        font-family: 'PublicSansExtraBold', sans-serif;
        font-size: 2.2rem;
        z-index: 1;
      }

      .circle-wrapper {
        position: relative;
        margin-bottom: 2rem;
        width: fit-content;

        img {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 110%;
          z-index: 0;
        }
      }

      .subtitle {
        font-family: 'PublicSans', sans-serif;
        font-size: 17px;
        line-height: 1.5;
        font-weight: 100;
        margin-bottom: 20px;
      }

      .submit-button {
        margin-top: 20px;
        text-align: center;
        text-decoration: none;

        @media screen and (max-width: 768px) {
          width: 100%;
          margin: 30px auto 0px auto;
        }
      }
    }

    .landing-cta {
      display: flex;
      flex-grow: 1;
      font-family: 'PublicSansBold', sans-serif;
      font-size: 1rem;
      letter-spacing: 2px;
      color: #000000;
      text-decoration: none;
      text-transform: uppercase;

      @include mediaSm {
        align-self: center;
      }

      .landing-cta-grid {
        transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
        display: inline-grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 25px;
        margin-left: auto;

        @media screen and (max-width: 1140px) {
          min-width: 40vw;
        }

        @include mediaSm {
          width: 90vw;
          max-width: 100vw;
          margin-right: auto;
        }

        .landing-cta-item {
          max-height: 230px;
          max-width: 230px;
          aspect-ratio: 1;

          &:hover {
            &::before {
              transition: 0.3s;
              opacity: 1;
            }

            .card-background {
              transition: 0.3s;
              opacity: 0;
            }

            .menu-second-image {
              transition: 0.5s ease-out;
              opacity: 1;
            }
          }

          & img.card-background {
            width: 100%;
            bottom: -1.5rem;
            right: 0;
          }

          & p.card-title {
            font-family: 'PublicSansBlack';
            position: absolute;
            font-size: 100%;
            padding: 10px;
            top: 0;
          }

          &.hair {
            background-color: $hair-orangelight;
          }

          &.sex {
            background-color: $color-sex-light;
          }

          &.supplements {
            background-color: $dbabbf-background;
          }

          &.skin {
            background-color: $skin-bluelight; // #c3bca0;
          }

          &.mind {
            background-color: #9eb1b6;
          }

          .menu-second-image {
            opacity: 0;

            & img {
              position: absolute;
              right: 0;
              bottom: 0;
              opacity: 0.8;

              &.mind,
              &.skin {
                height: 100%;
              }

              &.hair,
              &.sex,
              &.supplements {
                left: 0;
                height: 80%;
              }
            }
          }

          .product-image {
            position: absolute;

            &.hair {
              max-width: 35%;
              max-height: 80%;
              bottom: 0;
              right: 10%;

              @media screen and (min-width: 1045px) {
                max-width: 30%;
                max-height: 80%;
              }
            }

            &.sex,
            &.skin,
            &.supplements {
              max-width: 65%;
              max-height: 75%;
              bottom: 0;
              right: 0;
            }
          }
        }
      }
    }
  }
}

.grid {
  padding: 5rem 0 2rem 0;
  display: grid;
  grid-template-columns: repeat(13, 1fr);
  grid-template-rows: auto;
  width: 100%;
  overflow: hidden;
}

.card__img {
  position: relative;
  overflow: hidden;

  .smear {
    position: absolute;
    bottom: -2rem;
    left: 0;
    transform: scale(2.5);
    opacity: 0;
  }

  .card__content {
    position: absolute;
    bottom: 0;
    left: 0;
    padding: 1.5rem;
    opacity: 0;

    p {
      font-family: 'PublicSans', sans-serif;
      padding-bottom: 5px;
      font-size: 0.8rem;
    }
  }
}

.subtitle {
  font-family: 'PublicSans', sans-serif;
  font-size: 17px;
  line-height: 1.5;
  font-weight: 100;
  margin-bottom: 20px;
}

.grid {
  padding: 5rem 0 2rem 0;
  display: grid;
  grid-template-columns: repeat(13, 1fr);
  grid-template-rows: auto;
  width: 100%;
  overflow: hidden;
}

.card__img {
  position: relative;
  overflow: hidden;

  .smear {
    position: absolute;
    bottom: -2rem;
    left: 0;
    transform: scale(2.5);
    opacity: 0;
  }

  .card__content {
    position: absolute;
    bottom: 0;
    left: 0;
    padding: 1.5rem;
    opacity: 0;

    p {
      font-family: 'PublicSans', sans-serif;
      padding-bottom: 5px;
      font-size: 0.8rem;
    }
  }
}

.card {
  position: relative;
}

.hero {
  height: 100vh;
  max-height: 1000px;
  padding-top: 4vh;
  background: $sex-pinklight;
  position: relative;

  @media screen and (max-width: 768px) and (max-aspect-ratio: 5/6) {
    height: 100vh;
  }

  &__description {
    position: absolute;
    margin-left: 55vw;
    margin-right: 5vw;
    text-align: left;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1;

    &__title {
      position: relative;
      font-family: 'PublicSansExtraBold', sans-serif;
      font-size: $title;
      padding-bottom: 20px;
      z-index: 3;
    }

    &__subtitle {
      font-family: 'PublicSans', sans-serif;
      font-size: $fontsize-15;
      padding-bottom: 20px;
      line-height: 1.5;
    }

    @media screen and (max-width: 768px) and (max-aspect-ratio: 5/6) {
      margin-left: 8vw;
      margin-right: 8vw;
      top: 0;
      transform: none;
      padding-top: 5vh;
    }

    .submit-button {
      text-decoration: none;
    }
  }

  &__image {
    transform: scaleX(-1);
    overflow: hidden;
    max-height: 100%;
    margin-top: auto;
    margin-left: auto;
    margin-right: auto;
    bottom: 0;
    left: 0;
  }

  .hero-image {
    position: absolute;
    display: flex;
    height: 90%;
    left: 4vw;
    bottom: 0;

    @media screen and (max-width: 768px) and (max-aspect-ratio: 5/6) {
      height: 60%;
      width: 80vw;
    }
  }
}
</style>
