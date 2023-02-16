import axios from '@/services/axios-config'

export const createOrder = (params) => axios.post('/api/v1/orders', null, { params })

export const getOrders = (status) =>
  axios.get('/api/v1/orders', {
    params: {
      status: status
    }
  })

export const getOrderById = (orderId, withAppointment = false) =>
  axios.get(`/api/v1/orders/${orderId}`, {
    params: {
      withAppointment
    }
  })
