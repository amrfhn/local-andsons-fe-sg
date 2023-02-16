<template>
  <section id="other-content" class="container-fluid">
    <div class="step-info-container">
      <h2
        class="section__title tw-w-full tw-flex tw-text-3xl md:tw-text-5xl tw-justify-center md:tw-justify-start md:tw-justify-center tw-mb-8 md:tw-mb-12 tw-font-extrabold"
      >
        Here's how it works
      </h2>
      <div
        class="step-card tw-w-full tw-grid tw-grid-cols-1 md:tw-grid-cols-3 tw-gap-12 md:tw-gap-24 tw-px-0 md:tw-px-10 lg:tw-px-28"
      >
        <div
          v-for="step in data"
          :key="step.title"
          class="process tw-flex tw-flex-row md:tw-flex-col tw-items-start"
          :class="customStyle"
        >
          <img
            :src="require(`@/assets/images/${step.img}`)"
            :alt="step.alt"
            class="process__img tw-flex tw-mr-5 md:tw-mr-0"
          />

          <div class="tw-flex tw-gap-4 tw-flex-col">
            <h3 class="process__title tw-text-xl md:tw-text-2xl">
              {{ step.title }}
            </h3>
            <p class="process__description">
              {{ step.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="jsx">
export default {
  props: ["data", "customStyle"],
};
</script>

<style lang="scss" scoped>
#other-content {
  scroll-snap-align: start;
}

section {
  padding: 5rem;

  @include mediaSm {
    padding: 2rem 2rem;
  }
}

.container {
  max-width: 85rem;
  margin: 0 auto;
}

.section__title {
  padding: 3rem 5rem;

  @include mediaSm {
    padding: 2rem 0 1rem 0;
  }
}

.process {
  & > * {
    padding-bottom: 1rem;
  }

  &__img {
    height: 10rem;
    max-width: 10rem;

    @include mediaSm {
      height: 7rem;
      max-width: 7rem;
    }
  }

  &__title {
    font-family: 'PublicSansExtraBold', sans-serif;
    color: $apricot-text;

    @include mediaSm {
      padding: 0;
    }
  }

  &__description {
    font-family: 'PublicSans', sans-serif;
    color: $black-text;
    line-height: 1.4;
    font-size: 17px;

    @include mediaSm {
      text-align: left;
    }
  }
}
</style>
