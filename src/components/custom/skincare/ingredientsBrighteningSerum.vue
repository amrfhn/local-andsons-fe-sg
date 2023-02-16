<template>
  <div class="ingredients tw-flex tw-flex-col tw-items-center">
    <div class="tw-mb-10 tw-text-center">
      <h2 class="tw-text-3xl md:tw-text-5xl tw-font-extrabold tw-mb-4">
        Highly concentrated, powerful formula.
      </h2>
      <p class="tw-font-normal tw-text-lg md:tw-text-xl md:tw-mb-10">
        Effective results starts with effective ingredients. This is what we use. <br />Our formula is alcohol-free,
        fragrance-free, dye -free, paraben-free & silicone-free.
      </p>
    </div>

    <div class="ingredient-list tw-flex tw-grid tw-gap-6 tw-grid-cols-1 md:tw-grid-cols-2 tw-mb-12">
      <div
        v-for="(ingredient, index) in ingredients"
        :key="index"
        class="tw-filter tw-drop-shadow-lg tw-bg-white tw-rounded-3xl tw-grid tw-grid-cols-3 tw-gap-4 tw-p-4 tw-items-center"
      >
        <div
          class="tw-rounded-xl tw-aspect-w-1 tw-aspect-h-1 tw-bg-no-repeat tw-bg-center md:tw-col-span-1 tw-col-span-3 tw-bg-contain tw-mx-2 md:tw-mx-0"
          :style="`background-image: url(${ingredient.image})`"
        ></div>
        <div class="md:tw-col-span-2 tw-col-span-3 md:tw-py-6 tw-px-4">
          <h3 class="tw-text-2xl tw-mb-2 tw-font-extrabold">
            {{ ingredient.header }}
          </h3>
          <h4 v-if="ingredient.subtitle" class="tw-text-lg tw-font-bold tw-mb-4">
            {{ ingredient.subtitle }}
          </h4>
          <p>{{ ingredient.description }}</p>
        </div>
      </div>
    </div>

    <!-- <div class="cta tw-flex tw-justify-center">
      <a href="" class="submit-button tw-text-white">
        <h4 class="tw-tracking-wider">Add to Cart</h4>
      </a>
    </div>-->
  </div>
</template>

<script>
export default {
  name: 'CustomSkincareBrighteningSerumIngredients',
  data: () => {
    return {
      ingredients: [
        {
          image: require('@/assets/images/product/ingredients/brightening-hyaluronic-acid.png'),
          header: 'Hyaluronic Acid',
          description: 'Creates a hydrating layer on the skin surface to reduce the appearance of fine lines.'
        },
        {
          image: require('@/assets/images/product/ingredients/brightening-ascorbic-acid.png'),
          header: '23% Ascorbic Acid Suspension',
          description:
            'High concentration of Vitamin C boosts skin radiance, plumps texture and improves skin texture to reduce the appearance of acne scars and marks.'
        },
        {
          image: require('@/assets/images/product/ingredients/brightening-bakuchiol.png'),
          header: 'Bakuchiol',
          description:
            'A natural Retinol alternative with antioxidant properties that evens skin tone, reduces fine lines and wrinkles.'
        },
        {
          image: require('@/assets/images/product/ingredients/brightening-squalane.png'),
          header: 'Squalane',
          description: 'Super hydrating and bioidentical to skin moisture for fast absorption. '
        }
      ]
    }
  }
}
</script>

<style scoped lang="scss">
.ingredients {
  background-color: #ffffff;
  text-align: left;
  padding: 5rem 10rem;
  width: 100vw;

  .header {
    max-width: 740px;
  }

  @include mediaSm {
    padding: 5rem 2rem;
  }

  &,
  .flex {
    min-height: auto;
  }
}
</style>
