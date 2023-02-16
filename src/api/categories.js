import axios from '@/services/axios-config'

export const getCategories = () => axios.get('/api/v1/categories')

export const getSpecificCategory = (id) => axios.get(`/api/v1/categories/${id}`)
