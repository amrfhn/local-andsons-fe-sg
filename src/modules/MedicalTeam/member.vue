<template>
  <div class="main-wrapper about-us-content tw-h-[100vh]">
    <GlobalHeader show-full-logo />

    <div v-if="member" class="container">
      <Section id="medical-team-section" padding="tw-py-0" class-names="md:tw-py-4 tw-bg-[#eaebdf]">
        <Container>
          <Grid
            class="tw-my-0"
            class-names="tw-grid-cols-1 lg:tw-grid-cols-4 md:tw-grid-cols-3"
            gap="tw-gap-8"
            align-items="tw-items-center"
          >
            <div class="tw-col-span-1 tw-hidden sm:tw-flex">
              <FlexImage :src="require(`@/assets/images${member.image}`)" class-names="tw-mb-4" />
            </div>
            <div class="sm:tw-col-span-1 md:tw-col-span-2 lg:tw-col-span-3 tw-px-8">
              <FlexImage
                :src="require(`@/assets/images${member.image}`)"
                class-names="tw-mb-4"
                class="tw-flex sm:tw-hidden"
              />
              <p class="tw-font-bold tw-text-2xl md:tw-text-3xl">{{ member.nameWithShortDesc }}</p>
              <p class="tw-font-mono tw-text-sm tw-mb-4">
                {{ member.title }}
              </p>
              <p v-for="(desc, index) in member.description" :key="index" class="">
                {{ desc }}
              </p>
              <router-link to="/medical-team" class="buttonStyle tw-text-center tw-m-auto md:tw-ml-0">
                VIEW MEDICAL TEAM
              </router-link>
            </div>
          </Grid>
        </Container>
      </Section>
    </div>
  </div>
</template>

<script>
import Container from '@/components/Layouts/Container.vue'
import Grid from '@/components/Layouts/Grid.vue'
import Section from '@/components/Layouts/Section.vue'
import FlexImage from '@/components/Elements/FlexImage.vue'
import GlobalHeader from '@/components/GlobalHeader'
import { formatMetaTags } from '@/utils/prettify.js'
import medicalTeam from '@/data/medicalTeam.json'
import lodash from 'lodash'

export default {
  components: {
    Container,
    FlexImage,
    GlobalHeader,
    Grid,
    Section
  },
  metaInfo() {
    return formatMetaTags({
      title: this.member?.meta?.title,
      description: this.member?.meta?.description,
      urlPath: this.$route.path
    })
  },
  data() {
    return {
      member: undefined
    }
  },
  mounted() {
    this.setMember()
  },
  methods: {
    setMember() {
      const { params } = this.$route
      this.member = lodash.find(medicalTeam.members, function(m) {
        return m.path == params.member
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  padding-top: 8rem;
}
.d-flex {
  display: flex;
}
.position-relative {
  position: relative;
}
.main-wrapper {
  background-color: $greenwhite-background;
  padding-bottom: 3rem;

  &.about-us-content {
    .name {
      font-family: PublicSansExtraBold, sans-serif;
      font-size: 2rem;
      z-index: 3;
    }
    .title {
      font-family: 'AHAMONO', sans-serif;
      margin-bottom: 2em;
      line-height: 1.5;
      font-size: 1.1em;
    }
    .description {
      line-height: 1.5;
      font-size: 1.1em;
      margin-bottom: 1em;
    }
    .first-section {
      flex-direction: row;
      margin-bottom: 5rem;
      padding-left: calc(30px + 5vw);
      padding-right: calc(30px + 5vw);

      @include mediaSm {
        flex-direction: column;
        padding-left: 0;
        padding-right: 0;
      }

      .img-container {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 30rem;

        @include mediaSm {
          margin-bottom: 2rem;
        }

        img {
          background-color: $green-text;
        }
      }
      .copy-content {
        margin: auto;
        width: 60vw;
        margin-left: 5rem;

        @include mediaSm {
          width: 100%;
          margin-left: 0;
        }
      }
    }
  }
}
.submit-button {
  text-decoration: none;
  text-align: center;
}
</style>
