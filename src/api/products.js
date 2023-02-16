import axios from '@/services/axios-config'

export const getProducts = (params) => axios.get('/api/v1/products', { params })

export const getProductDetails = (productId) => axios.get(`/api/v1/products/${productId}`)
