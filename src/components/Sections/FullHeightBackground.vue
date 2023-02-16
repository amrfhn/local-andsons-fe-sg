<template>
  <section
    :class="`tw-flex full-height-background-section ${category}`"
    :style="`${section.background_color && `background-color: ${section.background_color}`}`"
  >
    <div
      :class="
        `tw-flex tw-flex-col tw-w-full
        ${imagePosition == 'left' ? 'lg:tw-flex-row' : 'lg:tw-flex-row-reverse'}`
      "
    >
      <div
        class="tw-flex tw-pb-0 md:tw-mb-0 md:tw-w-1/2 tw-bg-none md:tw-bg-cover tw-h-full tw-w-full tw-bg-no-repeat tw-bg-center tw-bg-bottom"
        :style="
          `background-image: url(${
            imageFileInAssetsFolder ? require(`@/assets/images/${section.image_arr[0]}`) : section.image_arr[0]
          }`
        "
      >
        <img
          class="tw-flex md:tw-hidden"
          :src="
            `${imageFileInAssetsFolder ? require(`@/assets/images/${section.image_arr[0]}`) : section.image_arr[0]}`
          "
          :alt="section.title"
        />
      </div>
      <div
        class="tw-flex tw-justify-center tw-w-1/1 lg:tw-w-1/2 tw-flex-col tw-py-8 tw-mb-8 md:tw-mb-0 md:tw-py-28 tw-px-5vw"
      >
        <h2
          class="tw-text-center md:tw-text-left tw-text-2xl md:tw-text-4xl md:tw-mb-4 tw-mb-2 tw-font-extrabold"
          v-html="section.title"
        />
        <p
          class="section_description md:tw-text-lg tw-text-base tw-text-center md:tw-text-left"
          v-html="section.description"
        />
        <div v-if="section.cta" class="btn-submit tw-m-auto md:tw-m-0">
          <a class="submit-button" :href="section.cta_link" v-html="section.cta"></a>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'FullHeightBackgroundSection',
  props: ['category', 'section', 'imagePosition', 'imageFileInAssetsFolder']
}
</script>

<style lang="scss" scoped>
.full-height-background-section {
  min-height: 60vh;

  .section_title {
    font-family: 'PublicSans', sans-serif;
    line-height: 1;
  }

  .section_description {
    /deep/ strong {
      font-family: 'PublicSansBold';
    }
    /deep/ table {
      & {
        margin-left: 20px;
      }
      td {
        vertical-align: text-top;
      }
    }
  }
}

a.submit-button {
  text-decoration: none;
  text-align: center;
}
</style>
