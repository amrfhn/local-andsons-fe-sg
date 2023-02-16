<style lang="scss" scoped>
.howmedscanhelp-section {
  background-color: $cinderella-background;

  .list-container {
    padding: 5rem 5rem 10rem 5rem;

    @include mediaSm {
      padding: 4rem 2rem;
    }
  }

  .list-header {
    padding: 5rem 3rem;
    @include mediaSm {
      padding: 0;
    }

    .title {
      font-family: 'PublicSansBlack', sans-serif;
      font-size: 4rem;
      margin-bottom: 2rem;

      @include mediaSm {
        font-size: 2rem;
        margin-bottom: 1rem;
      }
    }

    .description {
      font-family: 'PublicSans', sans-serif;
      font-size: 1.5rem;

      @include mediaSm {
        font-size: 1rem;
      }
    }
  }

  .list {
    display: flex;
    flex-direction: row;
    padding: 0 3rem;
    flex-wrap: wrap;
    justify-content: space-around;

    @include mediaSm {
      padding: 2rem 0;
    }
  }
}
.list-item {
  position: relative;
  text-align: left;
  width: 25%;
  text-decoration: none;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  // justify-content: space-between;

  @include mediaSm {
    width: 100%;
    padding: 0;
    margin: 1rem 0;
    flex-direction: row;
    height: fit-content;
    align-items: center;
  }

  .list-image-wrapper {
    margin-bottom: 1rem;

    @include mediaSm {
      min-width: 30vw;
      width: 30vw;
    }

    .list-image {
      position: relative;
      z-index: 1;
      width: 30%;
      // max-width: 100px;
      // max-height: 100px;
      height: auto;

      @media screen and (max-width: 768px) {
        max-width: 400px;
      }

      @media screen and (max-width: 450px) {
        width: 70%;
      }
    }
  }

  .list-content {
    display: flex;
    flex-direction: column;

    @include mediaSm {
      // margin-top: -10vw;
      text-align: left;
    }
  }

  .list-title {
    font-family: PublicSansBold, sans-serif;
    font-size: 1.5rem;
    padding-bottom: 1rem;

    @include mediaSm {
      font-size: 1rem;
      padding-bottom: 0.5rem;
    }
  }
  .list-description {
    font-family: PublicSans, monospace;
    font-size: 1.125rem;
    overflow: hidden;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;

    @include mediaSm {
      font-size: 0.8rem;
      height: initial;
      line-height: 1.4;
      -webkit-line-clamp: unset;
    }

    @media screen and (max-width: 450px) {
      padding: 0;
    }
  }
}
</style>

<template>
  <div class="howmedscanhelp-section">
    <div class="list-container">
      <div class="list-header">
        <h2 class="title" v-html="this.medsList.title"></h2>
      </div>
      <div class="list">
        <div v-for="p in this.medsList.list" :key="p.title" class="list-item">
          <div class="list-image-wrapper">
            <img v-if="p.icon" class="list-image" :src="require(`@/assets/images/${p.icon}`)" alt="andsons product" />
          </div>
          <div class="list-content">
            <div class="list-title">{{ p.title }}</div>
            <div class="list-description">
              {{ p.description }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="jsx">
import medsList from "@/data/howMedsCanHelp.json";

export default {
  props: ["categoryId"],
  data() {
    return {
      medsList: medsList.howMedsCanHelp[this.categoryId-1],
    }
  },
  watch:{
    categoryId(value){
      this.medsList = medsList.howMedsCanHelp[value-1];
    },
  }
};
</script>
