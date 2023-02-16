<template>
  <div class="ingredients">
    <div class="header tw-mb-10 tw-text-center tw-m-auto">
      <h2 class="tw-text-3xl md:tw-text-5xl tw-font-extrabold tw-mb-3 md:tw-mb-6">
        Prescription&nbsp;ingredients, customised&nbsp;formula.
      </h2>
      <p class="tw-font-normal tw-text-base md:tw-text-xl">
        Our star ingredient to effectively treat acne and signs of aging.
      </p>
    </div>

    <div
      class="ingredient-list tw-flex tw-mh-auto tw-grid md:tw-gap-6 tw-grid-cols-1 tw-m-auto md:tw-mb-20 tw-w-full md:tw-w-3/4"
    >
      <div
        v-for="(ingredient, index) in ingredients"
        :key="index"
        class="ingredient tw-flex tw-flex-col md:tw-flex-row tw-rounded-2xl tw-border tw-bg-white tw-p-2"
      >
        <div
          class="ingredient-image tw-rounded-tl-2xl tw-rounded-bl-0 tw-rounded-tr-2xl md:tw-rounded-tr-none md:tw-rounded-bl-2xl tw-flex tw-h-40 md:tw-h-auto tw-w-full md:tw-w-6/12"
          :style="`background-image: url(${ingredient.image})`"
        />
        <div class="tw-flex tw-flex-col tw-py-6 tw-px-4 tw-h-50 md:tw-w-6/12 tw-justify-center tw-text-left">
          <h3 class="tw-text-2xl tw-font-extrabold tw-mb-1">
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
        <h4 class="tw-tracking-wider">Start&nbsp;Evaluation</h4>
      </a>
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
          image: require('../../../assets/images/product/ingredients/tretinoin.png'),
          header: 'Meet Tretinoin',
          description:
            'Our main ingredient is a retinoid that removes dead skin and opens your pores to clear trapped bacteria or irritants that may cause acne, and boosts collagen production to reduce the appearance of fine lines and wrinkles.',
          link: {
            label: 'Study: A review of tretinoin’s anti-inflammatory properties in the treatment of acne →'
          }
        }
        // {
        //   image: require("../../../assets/images/product/ingredients/clindamycin.jpg"),
        //   header: "Clindamycin Phosphate",
        //   description:
        //     "A topical antibiotic that removes acne-causing bacteria and treats existing blemishes."
        // },
        // {
        //   image: require("../../../assets/images/product/ingredients/niacinamide.jpg"),
        //   header: "Niacinamide",
        //   description:
        //     "Reduces oiliness of the skin and strengthens the skin barrier."
        // },
        // {
        //   image: require("../../../assets/images/product/ingredients/azelaic-acid.jpg"),
        //   header: "Azelaic Acid",
        //   description:
        //     "Has anti-inflammatory properties that reduces redness and manages hyperpigmentation."
        // },
        // {
        //   image: require("../../../assets/images/product/ingredients/zinc-pyrithione.jpg"),
        //   header: "Zinc Pyrithione",
        //   description:
        //     "Contains antibacterial and antifungal properties that treats acne and gives you glowing skin."
        // }
      ]
    }
  }
}
</script>

<style scoped lang="scss">
.ingredients {
  background-color: #f4f5ef;
  text-align: center;
  padding: 5rem 10rem;
  width: 100vw;

  .header {
    max-width: 740px;
  }

  @include mediaSm {
    padding: 2rem 2rem;
  }

  &,
  .flex {
    min-height: auto;
  }

  .ingredient-image {
    background-position: center center;
    background-repeat: no-repeat;
    background-size: contain;
  }
}
</style>
