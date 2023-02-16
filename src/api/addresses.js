import axios from '@/services/axios-config'

export const getAddresses = () => axios.get('/api/v1/addresses')

export const addAddress = (data) => axios.post('/api/v1/addresses', data)

export const updateAddress = (addressId, params) => axios.put(`/api/v1/addresses/${addressId}`, null, { params })

export const deleteAddress = (addressId) => axios.delete(`/api/v1/addresses/${addressId}`)
