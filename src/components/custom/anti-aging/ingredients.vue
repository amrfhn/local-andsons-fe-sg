<template>
  <div class="ingredients tw-flex tw-flex-col tw-items-center">
    <div class="header tw-mb-10 tw-text-center">
      <h2 class="tw-text-2.5xl md:tw-text-6xl tw-font-black tw-mb-5">
        Prescription&nbsp;ingredients, customised&nbsp;formula.
      </h2>
      <p class="tw-font-normal md:tw-text-2xl tw-font-ahamono">
        The recipe for healthy skin begins with the right ingredients. And&nbsp;the&nbsp;ones we’ve used are backed by
        clinical research.
      </p>
    </div>

    <div class="ingredient-list tw-flex tw-mh-auto tw-grid tw-gap-6 tw-grid-cols-1 tw-mb-20">
      <div
        v-for="(ingredient, index) in ingredients"
        :key="index"
        class="ingredient tw-flex tw-flex-col md:tw-flex-row tw-rounded-2xl tw-border tw-bg-white"
      >
        <div
          class="ingredient-image tw-rounded-tl-2xl tw-rounded-bl-0 tw-h-60 tw-rounded-tr-2xl md:tw-rounded-tr-none md:tw-rounded-bl-2xl tw-flex md:tw-h-auto tw-w-full md:tw-w-7/12"
          :style="`background-image: url(${ingredient.image})`"
        />
        <div class="tw-flex tw-flex-col tw-py-6 tw-px-4 tw-h-60 md:tw-w-5/12 tw-justify-center">
          <h3 class="tw-text-2xl tw-font-black tw-mb-1">
            {{ ingredient.header }}
          </h3>
          <h4 v-if="ingredient.subtitle" class="tw-text-lg tw-font-bold tw-mb-4">
            {{ ingredient.subtitle }}
          </h4>
          <p>{{ ingredient.description }}</p>
        </div>
      </div>
    </div>

    <div class="cta tw-flex tw-justify-center">
      <a href="/evaluation/skincare/start" class="submit-button tw-text-white">
        <h4 class="tw-tracking-wider">GET&nbsp;STARTED</h4>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CustomAntiAgingIngredients',
  data: () => {
    return {
      ingredients: [
        {
          image: require('../../../assets/images/product/ingredients/tretinion.jpg'),
          header: 'Tretinoin',
          subtitle: '0.0125% / 0.025%',
          description:
            'An exfoliator that removes dead skin cells and keeps pores clear of bacteria. Healthy skin is just a dab away.'
        }
      ]
    }
  }
}
</script>

<style scoped lang="scss">
.ingredients {
  background-color: #f4f5ef;
  text-align: left;
  padding: 5rem 10rem;
  width: 100vw;

  .header {
    max-width: 740px;
  }

  @include mediaSm {
    padding: 3rem 1rem;
  }

  &,
  .flex {
    min-height: auto;
  }

  .ingredient-image {
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
  }
}
</style>
