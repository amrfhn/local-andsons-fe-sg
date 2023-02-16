<template>
  <section class="standard-section" :style="`background-image: url(${section.image_arr[0]})`">
    <div class="container">
      <div
        :class="{
          content: true,
          bordered: !section.image_arr[0] && !section.cta
        }"
      >
        <h2 class="section_title" v-html="section.title"></h2>
        <p class="section_description" v-html="section.description"></p>
      </div>
      <div v-if="section.cta" class="cta">
        <div class="btn-submit">
          <a class="submit-button" :href="section.cta_link" v-html="section.cta"></a>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'SlimSection',
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
  background-position: bottom;
  display: flex;

  .container {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;

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
