<template>
  <div class="dropdown-content tw-flex tw-flex-col">
    <div class="tw-flex">
      <div v-if="selectedMenu === 'treatments'" class="tw-flex tw-w-full tw-flex-col">
        <div class="tw-flex md:tw-hidden tw-text-gray-500 tw-font-bold tw-px-5 tw-pt-4 tw-pb-2">
          WE CAN HELP WITH
        </div>
        <div :class="`tw-w-full tw-flex tw-grid tw-gap-0 md:tw-gap-4 ${menuColumnsClass}`">
          <div
            v-for="(treatment, index) in treatments"
            :key="index"
            class="dropdown-content-column tw-flex tw-flex-col tw-border-t md:tw-border-0"
            @click="closeMenu"
          >
            <router-link
              :to="treatment.route"
              class="tw-font-black hover:tw-bg-gray-200 tw-flex tw-w-full tw-items-center tw-justify-between tw-flex-row tw-text-lg tw-font-bold tw-mb-0 lg:tw-mb-5 tw-px-5 tw-py-3"
            >
              <span class="tw-flex">{{ treatment.title }}</span>
              <IconArrowRight root-class="tw-flex tw-text-xl" />
            </router-link>

            <router-link
              v-for="(link, indexLinks) in treatment.links"
              :key="indexLinks"
              class="tw-hidden md:tw-flex hover:tw-bg-gray-200 hover:tw-text-black tw-w-full tw-items-center tw-justify-between tw-flex-row tw-text-gray-700 tw-px-5 tw-py-4"
              :to="link.route"
            >
              <span class="tw-flex">{{ link.title }}</span>
              <IconArrowRight root-class="tw-flex tw-text-xl tw-text-black" />
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="tw-flex tw-border-t tw-border-b md:tw-border-0" @click="closeMenu">
      <router-link
        to="/book-consultation"
        class="hover:tw-bg-gray-200 tw-flex tw-w-full tw-items-center tw-justify-between tw-flex-row tw-text-lg tw-px-5 tw-py-4"
      >
        <div class="tw-flex">
          <span class="tw-flex tw-font-bold tw-mr-5">Book a consultation</span>
          <span class="tw-hidden md:tw-flex">Discuss your options with a medical professional now</span>
        </div>
        <IconArrowRight root-class="tw-flex tw-text-xl tw-text-black" />
      </router-link>
    </div>

    <div class="tw-flex lg:tw-hidden tw-flex-col tw-pb-10">
      <div class="tw-flex md:tw-hidden tw-text-gray-500 tw-font-bold tw-px-5 tw-pt-8 tw-pb-2">
        MORE
      </div>
      <div
        v-for="(link, index) in more.links"
        :key="index"
        class="tw-flex tw-w-full tw-flex-row tw-mb-0 tw-px-5 tw-pt-2"
        @click="closeMenu"
      >
        <a v-if="link.route.indexOf('http') > -1" :href="link.route">
          <span class="tw-flex">{{ link.title }}</span>
        </a>
        <router-link v-else :to="link.route" class="">
          <span class="tw-flex">{{ link.title }}</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['selectedMenu', 'closeMenu'],
  data() {
    return {
      windowWidth: window.innerWidth,
      more: {
        links: [
          {
            title: 'Discover the Science',
            route: 'https://andsons.com.sg/blog'
          },
          {
            title: 'Medical Team',
            route: '/medical-team'
          },
          {
            title: 'Login',
            route: '/user/login'
          }
        ]
      },
      treatments: [
        {
          title: 'Hair',
          route: '/treatment/hair-loss',
          links: [
            {
              title: 'Start an Evaluation',
              route: '/evaluation/hair-loss/start'
            },
            {
              title: 'Complete Hair Loss Plan',
              route: '/evaluation/hair-loss/start'
            },
            {
              title: 'Non-Prescription Options',
              route: '/treatment/hair-loss#product-listing'
            }
          ]
        },
        {
          title: 'Sexual Health',
          route: '/treatment/sexual-health',
          links: [
            {
              title: 'Start an Evaluation',
              route: '/evaluation/sexual-health/start'
            },
            {
              title: 'Premature Ejaculation',
              route: '/treatment/sexual-health#showcase-listing'
            },
            {
              title: 'Erectile Dysfunction',
              route: '/treatment/sexual-health#showcase-listing'
            }
          ]
        },
        {
          title: 'Supplements',
          route: '/treatment/supplements',
          links: [
            {
              title: 'Prostate Health',
              route: '/product/prostate-health'
            },
            {
              title: 'Testosterone Support',
              route: '/product/testosterone-support'
            },
            {
              title: 'Stress Relief',
              route: '/product/stress-relief'
            }
          ]
        },
        {
          title: 'Skincare',
          route: '/treatment/skincare',
          links: [
            {
              title: 'Start an Evaluation',
              route: '/evaluation/skincare/start'
            },
            {
              title: 'Acne Cream',
              route: '/product/acne-cream'
            },
            {
              title: 'Anti-Aging',
              route: '/product/anti-aging'
            }
          ]
        }
      ]
    }
  },
  computed: {
    menuColumnsClass() {
      if (window.innerWidth >= 1140) {
        return 'tw-grid-flow-col tw-auto-cols-auto'
      } else if (window.innerWidth >= 992) {
        return 'tw-grid-flow-col tw-grid-rows-2'
      }
      return 'tw-grid-rows-1'
    }
  }
}
</script>

<style lang="scss" scoped>
.dropdown-content {
  padding: 2em 5vw 1em 5vw;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  overflow-y: scroll;

  @media screen and (max-width: 1140px) {
    padding: 1em 2vw;
  }
}
.dropdown-content-column {
  height: 260px;

  @media screen and (max-width: 1140px) {
    height: auto;
  }
}
</style>
