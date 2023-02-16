<template>
  <section class="standard-section">
    <div class="container">
      <div v-if="imagePosition == 'left'" class="image">
        <img
          :src="imageFileInAssetsFolder ? require(`@/assets/images/${section.image_arr[0]}`) : section.image_arr[0]"
          alt="banner"
        />
      </div>
      <div class="content">
        <h2 class="section_title" v-html="section.title"></h2>
        <p class="section_description" v-html="section.description"></p>
        <div v-if="section.cta" class="btn-submit">
          <a class="submit-button" :href="section.cta_link" target="_blank" v-html="section.cta"></a>
        </div>
      </div>
      <div v-if="imagePosition == 'right'" class="image">
        <img
          :src="imageFileInAssetsFolder ? require(`@/assets/images/${section.image_arr[0]}`) : section.image_arr[0]"
          alt="banner"
        />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'StandardSection',
  props: ['category', 'section', 'imagePosition', 'imageFileInAssetsFolder']
}
</script>

<style lang="scss" scoped>
.standard-section {
  padding: 5rem calc(5vw + 30px);
  background-color: $springwood-background;
  display: flex;

  @include mediaSm {
    padding: 5rem 3rem;
  }

  .container {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    .image,
    .content {
      width: 50%;
      max-width: 50%;
    }

    .content,
    .image {
      padding-left: 3rem;
      padding-right: 3rem;
    }
  }

  @include mediaSm {
    .container {
      flex-direction: column;

      .image,
      .content {
        width: 100%;
        max-width: 100%;
        padding-left: 0;
        padding-right: 0;
      }

      .image {
        order: -1;
      }
      .content {
        order: 2;
      }

      .section_title {
        padding-top: 2rem;
        font-size: 1.8rem;
      }
    }
  }

  .section_title {
    font-family: 'PublicSansExtraBold', sans-serif;
    font-size: 3rem;
    padding-bottom: 2rem;
    padding-right: 2rem;
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
