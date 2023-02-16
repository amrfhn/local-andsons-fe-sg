<template>
  <div class="ingredients">
    <div class="header tw-mb-10">
      <h2 class="tw-text-3xl md:tw-text-6xl tw-font-black tw-mb-10">
        How did we create it?
      </h2>
      <p class="tw-font-normal tw-text-lg md:tw-text-2xl tw-font-ahamono">
        A formula made in labs, backed by science.
      </p>
    </div>

    <div class="ingredient-list tw-flex tw-mh-auto tw-grid tw-gap-6 tw-grid-cols-1 lg:tw-grid-cols-2 tw-mb-20">
      <div
        v-for="(ingredient, index) in ingredients"
        :key="index"
        class="ingredient tw-flex tw-flex-col md:tw-flex-row tw-rounded-2xl tw-border tw-bg-white"
      >
        <div
          class="ingredient-image tw-rounded-tl-2xl tw-rounded-bl-0 tw-rounded-tr-2xl md:tw-rounded-tr-none md:tw-rounded-bl-2xl tw-flex tw-h-40 md:tw-h-auto tw-w-full md:tw-w-7/12"
          :style="`background-image: url(${ingredient.image})`"
        />
        <div class="tw-flex tw-flex-col tw-py-6 tw-px-4 tw-h-50 md:tw-w-5/12 tw-justify-center">
          <h3 class="tw-text-2xl tw-mb-1">{{ ingredient.header }}</h3>
          <h4 v-if="ingredient.subtitle" class="tw-text-lg tw-mb-4">
            {{ ingredient.subtitle }}
          </h4>
          <p>{{ ingredient.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CustomSkincareIngredients',
  data: () => {
    return {
      ingredients: [
        {
          image: require('../../../assets/images/product/ingredients/testosterone-ashwagandha.jpg'),
          header: 'Ashwagandha Root Extract',
          subtitle: '700mg',
          description: 'An Ayurvedic medicine that’s known to boost testosterone, and reduces anxiety and stress.'
        },
        {
          image: require('../../../assets/images/product/ingredients/testosterone-maca-root-extract.jpg'),
          header: 'Maca Root Extract',
          subtitle: '1200mg',
          description:
            'A Peruvian plant that’s well-known for increasing libido and fertility, and boosts energy and endurance.'
        },
        {
          image: require('../../../assets/images/product/ingredients/testosterone-copper.jpg'),
          header: 'Copper',
          subtitle: '1400mcg',
          description:
            'A trace mineral that supports the immune system, protects cells from damage and keeps cells healthy.'
        },
        {
          image: require('../../../assets/images/product/ingredients/testosterone-magnesium-glycinate.jpg'),
          header: 'Magnesium Glycinate',
          subtitle: '350mg',
          description: 'An important mineral that’s responsible for looking after the body and brain’s health.'
        },
        {
          image: require('../../../assets/images/product/ingredients/testosterone-zinc.jpg'),
          header: 'Zinc',
          subtitle: '15mg',
          description: 'An essential nutrient for good skin health and to strengthen immunity.'
        },
        {
          image: require('../../../assets/images/product/ingredients/testosterone-vitamin-d3.jpg'),
          header: 'Vitamin D3',
          subtitle: '1000IU',
          description:
            'A fat-soluble vitamin that strengthens bone and muscle health, boosts immunity and can help lower blood pressure.'
        }
      ]
    }
  }
}
</script>

<style scoped lang="scss">
.ingredients {
  background-color: #f3f3f3;
  text-align: left;
  padding: 5rem 10rem;
  width: 100vw;

  .header {
    max-width: 700px;
  }

  @include mediaSm {
    padding: 5rem 2rem;
  }

  &,
  .flex {
    min-height: auto;
  }

  h1,
  h2,
  h3 {
    font-family: 'PublicSansBlack', sans-serif;
  }

  h4,
  h5,
  h6 {
    font-family: 'PublicSansBold', sans-serif;
  }

  .ingredient-image {
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
  }
}
</style>
