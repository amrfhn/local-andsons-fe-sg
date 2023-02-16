import axios from '@/services/axios-config'

export const getSubscriptions = (status) =>
  axios.get('/api/v1/subscriptions', {
    params: {
      status: status
    }
  })

export const getSubscriptionById = (subscriptionId) => axios.get(`/api/v1/subscriptions/${subscriptionId}`)

export const cancelSubscriptionById = (subscriptionId) => axios.post(`/api/v1/subscriptions/${subscriptionId}/cancel`)

export const updateSubscriptionDateById = async (subscriptionId, data) =>
  axios
    .put(`/api/v1/subscriptions/${subscriptionId}`, data)
    .catch((err) => err.response?.data ?? 'No Response Received')
