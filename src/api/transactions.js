import axios from '@/services/axios-config'

export const createTransaction = (data) => axios.post('/api/v1/transactions', data)

export const getStripePaymentMethods = (defaultOnly = true) =>
  axios.get('/api/v1/transactions/stripePaymentMethods', {
    params: {
      default: defaultOnly ? 1 : 0
    }
  })

export const removeStripePaymentMethod = (params) =>
  axios.delete(`/api/v1/transactions/removeStripePaymentMethod`, { params })

export const attachStripePaymentMethod = (payload) =>
  axios.post(`/api/v1/transactions/attachStripePaymentMethod`, payload)

export const payStripePaymentMethod = (data) => axios.post('/api/v1/transactions/payStripePaymentMethod', data)
