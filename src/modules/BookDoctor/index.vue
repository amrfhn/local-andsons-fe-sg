<template>
  <div>
    <GlobalHeader show-full-logo />

    <div class="tw-flex tw-flex-col tw-items-center tw-justify-center tw-min-h-screen tw-gap-10 tw-p-5 tw-text-center">
      <h1 class="tw-font-bold tw-text-2.5xl sm:tw-text-5xl">Chat with our Doctors online</h1>
      <p>
        If you're not sure about your options, have a question, or are just unsure where to start, you can book a time
        to speak to one of our doctor online.
      </p>
      <p>
        A teleconsultation with one of our doctors costs $20. During the video consultation, you will have the
        opportunity to ask any questions and discuss your needs and preferences.
      </p>
      <button class="buttonStyle tw-w-fit tw-cursor-pointer" :disabled="loading" @click="bookDoctor">
        {{ loading ? 'LOADING...' : 'SCHEDULE CONSULT' }}
      </button>
      <div v-show="errorMessage" class="tw-text-red-600 tw-font-bold">{{ errorMessage }}</div>
    </div>
  </div>
</template>

<script>
import { addItemToCart, getCarts } from '@/api/carts'
import { getProductDetails } from '@/api/products'
import GlobalHeader from '@/components/GlobalHeader.vue'
import { trackAddProductToCart } from '@/utils/analytics'

export default {
  components: { GlobalHeader },
  data() {
    return {
      errorMessage: null,
      loading: false
    }
  },
  methods: {
    bookDoctor: async function() {
      this.errorMessage = null
      this.loading = true
      const { data } = await getProductDetails('doctor-consultation')

      const product_option_price_id = data?.response?.product?.product_options[0]?.product_option_prices[0]?.id || null
      if (product_option_price_id) {
        await addItemToCart({
          product_option_price_id,
          quantity: 1,
          period_quantity: 0,
          action: 'OVERRIDE'
        })

        const response = await getCarts()
        this.$store.commit('updateCart', response.data.response)

        const { product } = data.response
        const productOption = product.product_options[0] || null
        const productOptionPrice = productOption?.product_option_prices[0] || null

        trackAddProductToCart(window, product, productOption, productOptionPrice, 1)

        this.loading = false
        this.navigateUser()
      } else {
        this.errorMessage = 'Something went wrong. Please contact support'
      }
    },
    navigateUser: function() {
      if (this.$store.state.authenticated) {
        return this.$router.push('/checkout')
      } else {
        return this.$router.push('/user/register?fromCheckout')
      }
    }
  }
}
</script>

<style></style>
