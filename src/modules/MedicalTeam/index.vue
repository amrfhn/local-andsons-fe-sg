<template>
  <div class="main-wrapper about-us-content">
    <div class="header">
      <GlobalHeader show-full-logo />
      <div class="medical-header">
        <div class="header-content">
          <h1 class="promises__title">Meet Your <br />Medical Team</h1>
          <p class="doctors__title_description">
            All our treatments are vetted by our team of healthcare professionals.
          </p>
        </div>
        <div class="header-image">
          <img src="@/assets/images/stethoscope.png" class="header-img" />
        </div>
        <div class="header-image-mask" />
      </div>
    </div>
    <Section id="medical-team-section" padding="tw-py-8" class-names="md:tw-py-12 tw-bg-[#eaebdf]">
      <Container>
        <Grid class="tw-my-16" class-names="md:tw-grid-cols-2 lg:tw-grid-cols-3" gap="tw-gap-8">
          <MedicalTeamProfileFull
            v-for="({ image, title, name, shortDescription, path }, index) in medicalTeam.members"
            :key="index"
            :image="require(`@/assets/images${image}`)"
            :roles="title"
            :name="name"
            :subtext="shortDescription"
            :bio-path="path"
          />
        </Grid>
        <Section class="tw-text-center tw-max-w-[600px] tw-m-auto">
          <p>
            The Medical Advisory Team is here to help ORA give patients the best experience possible, they are not
            directly endorsing any of our non medical products by being on this page.
          </p>
        </Section>
      </Container>
    </Section>
  </div>
</template>

<script>
import Container from '@/components/Layouts/Container.vue'
import GlobalHeader from '@/components/GlobalHeader'
import Grid from '@/components/Layouts/Grid.vue'
import MedicalTeamProfileFull from '@/components/Sections/MedicalTeam/MedicalTeamProfileFull.vue'
import Section from '@/components/Layouts/Section.vue'
import { formatMetaTags } from '@/utils/prettify.js'
import medicalTeam from '@/data/medicalTeam.json'

export default {
  components: {
    Container,
    GlobalHeader,
    Grid,
    MedicalTeamProfileFull,
    Section
  },
  metaInfo() {
    return formatMetaTags({
      title: 'andSons Medical Team of Telehealth Online Doctors',
      description:
        'Meet our SG medical team of telehealth online doctors. Expertise in their fields, they can provide professional consultation & treatment privately! Book now.',
      urlPath: this.$route.path
    })
  },
  data() {
    return {
      medicalTeam
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  padding: 10em 7rem 3em 7rem;
  background-color: $greenwhite-background;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;

  @include mediaTablet {
    padding: 150px 10rem 0 10rem;
  }

  @include mediaSm {
    padding: 100px 1rem 0 1rem;
  }
}
.d-flex {
  display: flex;
}
.position-relative {
  position: relative;
}
.main-wrapper {
  &.about-us-content {
    background-color: $hair-orangedark;

    .isNotLandingHeader {
      margin-top: 0;
    }
    .title {
      font-family: PublicSansExtraBold, sans-serif;
      font-size: 2rem;
      padding-bottom: 20px;
      z-index: 3;

      @include mediaSm {
        font-size: 1.5rem;
      }
    }
    .body-1 {
      line-height: 1.5;
      font-size: 18px;
    }
    .second-section {
      margin-bottom: 32px;
      .card-container {
        display: flex;
        justify-content: space-between;
        flex-direction: column;

        @include mediaMd {
          flex-direction: row;
        }
        .card-body {
          padding: 2rem;
          .card-title {
            font-size: 20px;
            mark {
              background-color: #faf377;
            }
          }
        }
      }
    }
  }
}

.header {
  text-align: center;
  background-color: $hair-orangedark;

  .medical-header {
    min-height: 80vh;
    width: 100vw;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 4rem 7rem 0rem 7rem;
    position: relative;
    overflow: hidden;

    @include mediaSm {
      padding: 0 2rem;
      flex-direction: column;
      align-items: unset;
      justify-content: space-around;
    }

    .header-content {
      text-align: left;
      width: 60vw;
      z-index: 3;

      @include mediaSm {
        width: 100%;
      }
    }
    .header-image {
      width: 40vw;

      img {
        z-index: 1;
        position: absolute;
        transform: rotate(-10deg);
        bottom: -10rem;
        right: 0rem;

        @include mediaTablet {
          right: -20rem;
          bottom: -10rem;
        }

        @include mediaSm {
          right: -5rem;
        }
      }
    }
    .header-image-mask {
      position: absolute;
      z-index: 2;
      width: 100%;
      height: 100%;
      background-color: $hair-orangedark;
      opacity: 0.04;
    }
  }
}

.promises__title {
  font-family: 'PublicSansBlack', sans-serif;
  font-size: 5rem;
  margin-bottom: 2rem;

  @include mediaSm {
    font-size: 2.3rem;
    margin-bottom: 1rem;
    padding: 3rem 0 1rem 0;
  }
}

.doctors__title_description {
  font-size: 1.8rem;
  padding-bottom: 50px;
  @include mediaSm {
    font-size: 18px;
  }
}

.doctors {
  display: flex;
  flex-direction: column;
  text-align: left;
  padding-bottom: 8rem;
  width: 30%;

  @include mediaSm {
    width: unset;
  }

  & > * {
    padding-bottom: 1rem;
  }

  &__img_container {
    height: 25rem;
    width: auto;
    background-color: $green-text;
    padding-bottom: 0;
    margin-bottom: 2rem;
    display: flex;
    overflow: hidden;

    img {
      height: auto;
      width: auto;
      max-width: initial;
      margin-left: 50%;
      transform: translateX(-50%);
    }
  }

  &__name {
    font-family: 'PublicSansExtraBold', sans-serif;
    font-size: 1.5rem;
  }
  &__title {
    font-family: 'AHAMONO', sans-serif;
  }

  &__description {
    min-height: 60px;
  }

  .submit-button {
    text-decoration: none;
    text-align: center;
  }
}

.disclaimer {
  width: 100%;
  max-width: 600px;

  @include mediaSm {
    margin: 2rem 2rem 5rem 2rem;
  }
}
</style>
