<template>
  <div>
    <ScrollUpComponent />
    <div id="main-section">
      <section class="landing">
        <GlobalHeader />
        <div class="flex-wrapper">
          <div class="header-content">
            <div class="header-content-text">
              <h1 class="title">Tell us, how can we help you?</h1>
              <p class="subtitle">
                All of our medications are registered and prescribed by licensed doctors.<br />100% online and delivered
                discreetly.
              </p>
            </div>
            <div class="landing-cta">
              <div class="landing-cta-grid">
                <router-link
                  v-for="({ title, alt, background, label, productImage, secondImage, href }, index) in categories"
                  :key="index"
                  :class="`card animated fadeUpHair landing-cta-item ${label} ${label}-card`"
                  :to="href"
                  @click.native="navigate(href)"
                >
                  <img class="card-background" :src="background" :alt="alt" />
                  <div class="menu-second-image">
                    <img :class="label" :src="secondImage" :alt="alt" />
                  </div>
                  <img v-show="productImage" class="product-image" :class="label" :src="productImage" :alt="alt" />
                  <div class="submit-button">
                    START YOUR EVALUATION
                  </div>
                  <p class="card-title">{{ title }}</p>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <USPSection :usp-list="uspList.usp[0]" />
    <TheDoctorsSection />
    <TrustSection />
  </div>
</template>

<script>
import ScrollUpComponent from '@/modules/Landing/components/ScrollUpComponent.vue'
import USPSection from '@/components/USP'
import TrustSection from '@/components/TrustSection.vue'
import TheDoctorsSection from '@/modules/Landing/components/DoctorsSection.vue'
import dom from '@/utils/domManipulation.js'
import GlobalHeader from '@/components/GlobalHeader'
import { formatMetaTags } from '@/utils/prettify.js'
import uspList from '@/data/uspList.json'

const backgroundMap = {
  1: require('@/assets/images/hover-menus/hair-hover/background.png'),
  2: require('@/assets/images/hover-menus/sex-hover/background.png'),
  3: require('@/assets/images/hover-menus/skin-hover/background.png')
  // 4: require("@/assets/images/hover-menus/mind-hover/background.png"),
}
const productImageMap = {
  1: require('@/assets/images/hover-menus/hair-hover/productSize_2.png'),
  2: require('@/assets/images/hover-menus/sex-hover/stikit.png'),
  3: require('@/assets/images/hover-menus/skin-hover/product.png')
}
const secondImageMap = {
  1: require('@/assets/images/hover-menus/hair-hover/model.png'),
  2: require('@/assets/images/hover-menus/sex-hover/model-face.png'),
  3: require('@/assets/images/hover-menus/skin-hover/model.png')
  // 4: require("@/assets/images/hover-menus/mind-hover/model.png"),
}
const titleMap = {
  1: 'Hair Loss',
  2: 'Sexual Health',
  3: 'Skincare'
  // 4: "Mental Health",
}
const labelMap = {
  1: 'hair',
  2: 'sex',
  3: 'skin'
  // 4: "mind",
}
const hrefMap = {
  1: '/evaluation/hair-loss/start',
  2: '/evaluation/sexual-health/start',
  3: '/evaluation/skincare/start'
}

const metaTitle = 'Tell us, how can we help you? Best Telehealth Services at andSons SG'

export default {
  metaInfo: formatMetaTags({
    title: metaTitle,
    titleTemplate: '%s',
    metaTitleContent: metaTitle,
    description:
      'Fill up our evaluation form to help us find out more about you. We provide the best telehealth services here - 100% online & discreet medications delivery.',
    urlPath: ''
  }),
  components: {
    GlobalHeader,
    ScrollUpComponent,
    TheDoctorsSection,
    TrustSection,
    USPSection
  },
  data: function() {
    return {
      uspList: uspList
    }
  },
  computed: {
    categories() {
      return this.$store.state.categories.list
        .filter((category) => Object.prototype.hasOwnProperty.call(hrefMap, category.id)) // Only Display categories with target href.
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
    window.addEventListener('resize', dom.windowResize)
    this.$store.dispatch('categories/fetchCategories')
  },
  beforeDestroy() {
    window.removeEventListener('resize', dom.windowResize)
  },
  methods: {
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
  background-color: $springwood-background;
}

.landing {
  position: relative;

  .header-content {
    display: flex;
    flex-direction: column;
    margin-top: 4rem;
    padding: 2rem;

    .header-content-text {
      width: 100%;
      flex-grow: 1;
      max-width: 100vw;
      padding: 2rem 0;
      align-self: flex-start;

      .title {
        position: relative;
        font-family: 'PublicSansExtraBold', sans-serif;
        font-size: 3rem;
        z-index: 1;
        text-align: center;
        margin-bottom: 1rem;

        @include mediaSm {
          font-size: 2.5rem;
        }
      }

      .subtitle {
        font-family: 'PublicSans', sans-serif;
        font-size: 17px;
        font-weight: 100;
        text-align: center;
      }
    }

    .landing-cta {
      font-family: 'PublicSansBold', sans-serif;
      font-size: 1rem;
      letter-spacing: 2px;
      color: #000000;
      text-decoration: none;
      text-transform: uppercase;

      .landing-cta-grid {
        transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        justify-content: center;
        width: calc(100% - 10vw - 60px);
        margin-left: auto;
        margin-right: auto;

        .landing-cta-item {
          min-width: 270px;
          transform: translateY(-100%);
          aspect-ratio: 1;
          margin: 15px;
          max-width: calc(33.333% - 30px);
          flex-basis: 50%;

          @media (max-width: 768px) {
            .landing-cta-item {
              margin: 15px 0;
            }
          }

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
            font-size: 150%;
            padding: 30px;
            top: 0;
          }
          &.hair {
            background-color: $hair-orangelight;
          }
          &.sex {
            background-color: $color-sex-light;
          }
          &.skin {
            background-color: $skin-bluelight;
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
              &.hair,
              &.sex {
                left: 0;
                height: 80%;
              }
              &.skin {
                left: 0;
                height: 100%;
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
                max-height: 90%;
              }
            }
            &.skin {
              max-width: 80%;
              max-height: 80%;
              right: 0;
              top: 0;
            }
            &.sex {
              max-width: 80%;
              max-height: 80%;
              bottom: 0;
              right: 0;
            }
          }
          .submit-button {
            font-size: 12px;
            font-family: 'PublicSansBold';
            padding: 18px 20px;
            text-decoration: none;
            text-align: center;
            bottom: 30px;
            left: 20px;
            right: 20px;
            position: absolute;

            @include mediaSm {
              font-size: 10px;
            }
          }
        }
      }
    }
  }
}
</style>
