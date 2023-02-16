<template>
  <div class="checkout-wrapper">
    <GlobalHeader />
    <div class="checkout-inner-wrapper">
      <div class="checkout-content">
        <MedicalBackgroundForm v-if="questionSets.length" :question-sets="questionSets" />
      </div>
    </div>
  </div>
</template>

<script>
import GlobalHeader from '@/components/GlobalHeader'
import MedicalBackgroundForm from '@/modules/Checkout/MedicalBackgroundForm/index.vue'
import { getCarts } from '@/api/carts'
import { getQuestionsByProductId, getQuestionsByCategoryId } from '@/api/questions'

export default {
  name: 'Questionnaire',
  components: {
    GlobalHeader,
    MedicalBackgroundForm
  },
  data() {
    return {
      questionSets: []
    }
  },
  async beforeMount() {
    await this.$store.dispatch('categories/fetchCategories')
    getCarts().then((response) => {
      this.$store.commit('updateCart', response.data.response)
      if (this.$route.params.categorySlug) {
        const categoryId = this.$store.getters['categories/slugToId'][this.$route.params.categorySlug]
        return getQuestionsByCategoryId(categoryId).then((response) => {
          if (response.data.response.questionSets.length > 0) {
            this.questionSets = response.data.response.questionSets
            return this.questionSets
          }
        })
      } else if (this.$store.state.addToCartItem !== null) {
        return getQuestionsByProductId(this.$store.state.addToCartItem[0].id)
          .then((response) => {
            if (response.data.response.questionSets.length > 0) {
              this.questionSets = response.data.response.questionSets
              return this.questionSets
            }
          })
          .catch(() => [])
      }
      return false
    })
  }
}
</script>

<style lang="scss" scoped>
.checkout-wrapper {
  background-color: $springwood-background;
  min-height: 100vh;
}

.checkout-inner-wrapper {
  padding: 6rem 0 0;
  margin-bottom: 1.5rem;

  @media screen and (max-width: 768px) {
    padding-top: 4.5rem;
  }
}

.checkout-content {
  position: relative;
  display: flex;
  justify-content: center;
  padding: 4rem calc(30px + 5vw);

  @media screen and (max-width: 768px) {
    padding: 0 30px;
  }
}
</style>
