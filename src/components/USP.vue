<template>
  <section :class="`usp-section ${category}`">
    <div class="container">
      <div v-for="usp in uspList.uspList" :key="usp.title" class="usp-item">
        <img v-if="usp.icon" :src="require(`@/assets/images/${usp.icon}`)" class="usp-icon" />
        <p class="title">{{ usp.title }}</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'USPSection',
  props: ['uspList', 'category']
}
</script>

<style lang="scss" scoped>
.usp-section {
  padding: 0.8rem 10vw;
  background-color: $springwood-background;
  display: flex;
  border-top: 2px solid $greenwhite-background;
  border-bottom: 2px solid $greenwhite-background;

  @include mediaSm {
    padding: 2rem;
  }

  .title {
    font-family: AHAMONO;
    width: 80%;
  }

  .container {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    @include mediaSm {
      flex-wrap: wrap;
    }

    .usp-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;

      @include mediaSm {
        min-width: 50%;
        width: 50%;
        font-size: 14px;

        &:nth-child(3),
        &:nth-child(4) {
          margin-top: 20px;
        }
      }

      img.usp-icon {
        height: 50px;
      }
    }
  }
}

.supplements {
  background-color: #f4d5b7;
  img.usp-icon {
    padding: 7px;
  }
}
</style>
