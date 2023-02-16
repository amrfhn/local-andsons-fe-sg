<template>
  <section
    class="standard-section tw-bg-cover md:tw-bg-bottom tw-bg-right-bottom"
    :style="`background-image: url(${section.image_arr[0]})`"
  >
    <div class="container tw-grid md:tw-grid-cols-2 tw-grid-cols-1 tw-p-4 tw-justify-items-end">
      <div class="md:tw-self-center md:tw-w-3/4 tw-w-full tw-pt-4">
        <div
          :class="{
            bordered: !section.image_arr[0] && !section.cta
          }"
        >
          <h2
            class="tw-text-3xl md:tw-text-5xl tw-text-center md:tw-text-left md:tw-mb-8 tw-mb-4 tw-font-extrabold"
            v-html="section.title"
          ></h2>
          <p class="section_description md:tw-text-left tw-text-center" v-html="section.description"></p>
        </div>
        <div v-if="section.cta">
          <div class="btn-submit">
            <a class="submit-button tw-mx-auto md:tw-mx-0" :href="section.cta_link" v-html="section.cta"></a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'FullBackgroundSection',
  props: ['section'],
  methods: {
    goToUrl() {
      window.location.href = this.section.cta_link
    }
  }
}
</script>

<style lang="scss" scoped>
.standard-section {
  height: 90vh;
  min-height: 550px;
  max-height: 650px;
  background-color: $springwood-background;
  display: flex;

  .container {
    width: 100%;
    // display: flex;
    // flex-direction: column;
    // justify-content: center;
    // align-items: flex-start;

    .content {
      padding-top: 8vh;
      width: 800px !important;
      max-width: 90% !important;

      &.bordered {
        background-color: $greenwhite-background;
        max-width: 100%;
        width: 100%;
        padding: 2rem 2rem;
        margin: 0 10rem;
        @include mediaSm {
          padding-top: 0;
        }
      }
    }

    .cta {
      width: 20%;
      max-width: 20%;
    }
  }

  @include mediaSm {
    & {
      height: 768px;
    }
    .container {
      .image,
      .content,
      .cta {
        width: 100%;
        max-width: 100%;
        padding-left: 0;
      }

      .section_title {
        font-size: 28px;
      }
    }
  }

  .section_title {
    font-family: 'PublicSansExtraBold', sans-serif;
    font-size: 2.6rem;
    padding-bottom: 2rem;
    line-height: 1.25;
  }

  .section_description {
    font-family: 'PublicSans', sans-serif;
    font-size: 18px;
    line-height: 1.4;
  }
}

a.submit-button {
  text-decoration: none;
  text-align: center;
}
</style>
