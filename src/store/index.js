import Vue from 'vue'
import Vuex from 'vuex'
import { trackUpdateCart } from '@/utils/analytics'
import { getCountries, getStates } from '@/api/countries'
import { getNotificationsBanner } from '@/api/notifications.js'
import { requestCountry, requestIp } from '@/api/requestCountry'
import categories from './modules/categories'
import featureFlags from './modules/featureFlags'
import { getOrderById } from '@/api/orders'
import { generateHash } from '@/utils/hash'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    categories,
    featureFlags
  },
  state: {
    authenticated: localStorage.getItem('andsons_token') !== null,
    userProfile: undefined,
    cart: {},
    countries: [],
    states: undefined,
    currentPendingPayment: null,
    paymentHasPrescribedItem: localStorage.getItem('paymentHasPrescribedItem'),
    headerBanner: {},
    deliveryOptionId: undefined,
    scheduleMade: false,
    addToCartItem: [
      {
        id: null,
        isMultiplePrice: false
      }
    ],
    ipCountry: (() => {
      try {
        const { country_code, country_name } = JSON.parse(localStorage.getItem('ip_country'))
        if (country_code && country_name) return { country_code, country_name }
        return null
      } catch {
        return null
      }
    })(),
    selectedAddress: undefined,
    selectedOrder: undefined
  },
  mutations: {
    updateScheduleStatus(state, payload) {
      state.scheduleMade = payload
    },
    updateAuthenticated(state, payload) {
      state.authenticated = payload
    },
    updateUserProfile(state, payload) {
      state.userProfile = payload
    },
    updateCart(state, payload) {
      state.cart = payload
      trackUpdateCart(window, { ...state.cart })
    },
    updateCountries(state, payload) {
      state.countries = payload
    },
    updateState(state, { countryId, states }) {
      state.states = {
        ...state.states,
        [countryId]: states
      }
    },
    updateSpecificProfileData(state, payload) {
      Object.entries(payload).forEach(([key, value]) => {
        state.userProfile[key] = value
      })
    },
    updateCurrentPendingPayment(state, payload) {
      state.currentPendingPayment = payload
    },
    updatePaymentHasPrescribedItem(state, payload) {
      state.paymentHasPrescribedItem = payload
    },
    retrieveNotificationsBanner(state, payload) {
      state.headerBanner = payload
    },
    updateAddToCartItem(state, payload) {
      state.addToCartItem = payload
    },
    updateIpCountry(state, ipCountry) {
      localStorage.setItem('ip_country', JSON.stringify(ipCountry))
      state.ipCountry = ipCountry
    },
    updateSelectedAddress(state, address) {
      state.selectedAddress = address
    },
    updateSelectedOrder(state, order) {
      state.selectedOrder = order
    },
    updateDeliveryOptionId(state, deliveryOptionId) {
      state.deliveryOptionId = deliveryOptionId
    }
  },
  actions: {
    retrieveCountries({ commit, state }) {
      if (state.countries.length === 0) {
        getCountries().then((response) => {
          commit('updateCountries', response.data.response.countries)
        })
      }
    },
    retrieveStates({ commit, state }, countryId) {
      if (!state.states || !state.states[countryId]) {
        getStates(countryId).then((response) => {
          commit('updateState', {
            countryId,
            states: response.data.response.states
          })
        })
      }
    },
    async retrieveNotificationsBanner(state, payload) {
      try {
        const req = await getNotificationsBanner(payload)
        let data = req.data.response.notificationBanners[0]
        state.commit('retrieveNotificationsBanner', data)
      } catch {
        state.commit('retrieveNotificationsBanner', '')
      }
    },
    async retrieveIpCountryCode({ commit }) {
      const { country_code, country_name } = await requestCountry(await requestIp())
      const ipCountry = { country_code, country_name }
      commit('updateIpCountry', ipCountry)
      return ipCountry
    },
    async retrieveOrder({ commit }, orderId) {
      try {
        const response = await getOrderById(orderId)
        commit('updateSelectedOrder', response.data.response.order)
      } catch {
        commit('updateSelectedOrder', null)
      }
    }
  },
  getters: {
    cartHasPrescribedItem(state) {
      const cart = state?.cart?.cart ?? null
      if (cart?.cart_product_option_prices) {
        const cartProductOptions = JSON.stringify(cart.cart_product_option_prices)

        if (cartProductOptions.trim().includes('"prescription_based":1')) {
          return true
        }
      }

      return false
    },
    getHeaderBanner: (state) => state.headerBanner,
    getScheduleStatus: (state) => state.scheduleMade,

    /**
     * Returns cart map for use by Cart Item. {
     *    shippingFee,
     *    subtotal,
     *    total,
     *    has_subscription,
     *    discount: {
     *      amount,
     *      code, // null for currentPendingPayment
     *      description // null for currentPendingPayment
     *    },
     *    products: [{
     *      cart_id,
     *      product_option_price_id: integer id of product obtained from cart or unique negative number if null
     *      id: unique identifier for product item in component.
     *      period_quantity: deprecated,
     *      quantity: quantity returned from server (Have to multiply by factor before use)
     *      product_option_price:{
     *        can_increment: I'm not sure what this is, returns true if product_option.id!= VUE_APP_NEW_USER_ONLY_PRODUCT_OPTION_ID,
     *        desc,
     *        factor: factor which returns value to be displayed in cart when multiplied with , equals sku_quantity*sub_duration_refresh
     *        id: same as product_option_price_id,
     *        price: returned by server, currently unused since calculated by frontend.
     *        product_option:[
     *          Refer to vue devtools for full list of options or create some API documentation for this.
     *        ]
     *      }
     *    }]
     *  }
     */
    getCartList: (state) => (route) => {
      const processProducts = (products) =>
        products.map((product, index) => {
          if (!('product_option_price_id' in product)) {
            product = Object.assign(product, {
              product_option_price_id: -(index + 1),
              id: -(index + 1)
            })
          }
          product.product_option_price = Object.assign(product.product_option_price, {
            factor:
              (product.product_option_price.sku_quantity || 1) *
              (product.product_option_price.sub_duration_refresh || 1)
          })
          return product
        })
      if (/payment/.test(route) && state.currentPendingPayment) {
        const {
          shipping_fee: shippingFee = 0,
          subtotal_amount: subtotal = 0,
          total_amount: total = 0,
          has_subscription = false,
          discount_total_amount = 0,
          order_product_option_prices: products = []
        } = state.currentPendingPayment || {}

        // Set discount as discount_total_amount from currentPendingPayment
        return {
          shippingFee,
          subtotal,
          total,
          has_subscription,
          discount: {
            amount: Number(discount_total_amount),
            code: null,
            description: null
          },
          products: processProducts(products)
        }
      } else {
        if (!state.cart.cart) {
          return {}
        }
        const {
          shippingFee = 0,
          subtotal = 0,
          total = 0,
          has_subscription = false,
          discount = {
            amount: 0,
            code: null,
            description: null
          },
          cart: { cart_product_option_prices: products = [] }
        } = state.cart || {}
        return {
          shippingFee,
          subtotal,
          total,
          has_subscription,
          discount,
          products: processProducts(products)
        }
      }
    },
    getUserHash: (state) => {
      if (!state.userProfile) {
        return undefined
      }
      return generateHash(state.userProfile.id.toString(), 'sha256')
    },
    getEmailHash: (state) => {
      if (!state.userProfile) {
        return undefined
      }
      return generateHash(state.userProfile.email.toString(), 'sha256')
    }
  }
})
