import axios from '@/services/axios-config'

export const addItemToCart = (data) =>
  axios.post('/api/v1/carts', data).then((response) => {
    const tmpToken = response.data.response.session_token
    if (tmpToken) {
      localStorage.setItem('andsons_tmp_token', `Bearer ${tmpToken}`)
    }
    return response
  })

export const getCarts = () => axios.get('/api/v1/carts')

export const deleteItemFromCart = (cartId, productOptionPriceId) =>
  axios.delete(`/api/v1/carts/${cartId}`, {
    params: {
      product_option_price_id: productOptionPriceId
    }
  })

export const getCartDeliveryOptions = (cartId, address_id) =>
  axios.get(`/api/v1/carts/${cartId}/deliveryOptions`, {
    params: { address_id }
  })

export const emptyCart = (cartId) => axios.delete(`/api/v1/carts/${cartId}`)

export const mergeTempCart = (data) => axios.post('/api/v1/carts/merge', data)

export const applyVoucher = (cartId, code) =>
  axios
    .post(`/api/v1/carts/${cartId}/applyDiscount`, {
      code
    })
    .then((response) => {
      const { apply_discounts } = response.data.response

      const formattedRes = {
        ...response.data
      }

      formattedRes.response.apply_discounts.discount_amount = parseFloat(apply_discounts.discount_amount)
      formattedRes.response.apply_discounts.subtotal = parseFloat(apply_discounts.subtotal)
      formattedRes.response.apply_discounts.total = parseFloat(apply_discounts.total)
      formattedRes.response.apply_discounts.discount = parseFloat(apply_discounts.discount)

      return formattedRes
    })
    .catch((error) => {
      return error.response.data
    })

export const removeVoucher = (cartId) =>
  axios
    .put(`/api/v1/carts/${cartId}/removeDiscount`)
    .then((response) => {
      const { apply_discounts } = response.data.response

      const formattedRes = {
        ...response.data
      }

      formattedRes.response.apply_discounts.discount_amount = parseFloat(apply_discounts.discount_amount)
      formattedRes.response.apply_discounts.subtotal = parseFloat(apply_discounts.subtotal)
      formattedRes.response.apply_discounts.total = parseFloat(apply_discounts.total)
      formattedRes.response.apply_discounts.discount = parseFloat(apply_discounts.discount)

      return formattedRes
    })
    .catch((error) => {
      return error.response.data
    })
