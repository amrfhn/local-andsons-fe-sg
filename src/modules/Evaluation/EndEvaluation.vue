<template>
  <div class="checkout-wrapper">
    <GlobalHeader show-full-logo />
    <div class="checkout-inner-wrapper">
      <div class="checkout-content">
        <Loading />
      </div>
    </div>
  </div>
</template>

<script>
/**
 * User will be redirected to this view from the external quiz evaluation: start.andsons.com.sg
 */
import GlobalHeader from '@/components/GlobalHeader'
import Loading from '@/components/Loading.vue'
import { getCarts } from '@/api/carts'
import { submitMedicalEvaluation } from '@/api/medical'

export default {
  name: 'EndEvaluation',
  components: {
    GlobalHeader,
    Loading
  },
  data() {
    return {
      questionSets: ''
    }
  },
  computed: {
    cartId() {
      const cart = this.$store.state.cart
      if (cart) {
        return cart.cart?.id
      }
      return undefined
    }
  },
  async mounted() {
    try {
      await this.getCarts()
      await this.submitEvaluation()
      this.saveRecommendedProduct()
      this.saveRecommendedAddon()

      let nextUrl = null
      let redirectUrl = this.determineCategorySpecificRedirectUrl()

      if (!this.$store.state.authenticated) {
        //  If the user is not authenticated
        nextUrl = `/user/register?fromEvaluation=${this.$route.params.categorySlug}${
          redirectUrl ? `&redirect=${encodeURIComponent(redirectUrl)}` : ''
        }`
      } else if (this.$store.state.authenticated) {
        if (this.$route.params.categorySlug) {
          nextUrl = redirectUrl ?? `/product/${this.$route.params.categorySlug}/select`
        } else if (this.$store.state.addToCartItem[0]) {
          nextUrl = `/product/${this.$store.state.addToCartItem[0].slug}/options`
        } else {
          nextUrl = '/checkout'
        }
      }

      if (nextUrl) {
        this.$router.push(nextUrl)
      } else {
        throw Error('No NextUrl in EndEvaluation')
      }
    } catch (error) {
      console.error(error)
      alert('An error has occurred. We will try to reload the page and try again.')
      window.location.reload()
    }
  },
  methods: {
    getCarts: async function() {
      const response = await getCarts()
      this.$store.commit('updateCart', response.data.response)
    },
    determineCategorySpecificRedirectUrl: function() {
      let redirectUrl = null
      // Reverting to sending user to select page instead of options
      // if (['skincare'].includes(this.$route.params.categorySlug)) {
      //   redirectUrl = `/product/${this.$route.params.categorySlug}/select`
      // }

      return redirectUrl
    },
    submitEvaluation: async function() {
      const answers = decodeURI(this.$route.query.evaluation)

      await submitMedicalEvaluation({
        cart_id: this.cartId,
        category_slug: this.$route.params.categorySlug,
        evaluation: answers
      })
    },
    /**
     * Saves the recommended product in a cookie
     */
    saveRecommendedProduct() {
      localStorage.setItem('recommended_product', this.$route.query.recommended)
    },
    saveRecommendedAddon() {
      localStorage.setItem('recommended_addon', this.$route.query.addon)
    }
  }
}
</script>

<style lang="scss" scoped>
.checkout-content {
  display: flex;
  height: 100vh;
  justify-content: center;
}
</style>
