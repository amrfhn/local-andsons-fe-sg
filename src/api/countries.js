import axios from '@/services/axios-config'

export const getCountries = () => axios.get('/api/v1/countries')
export const getStates = (countryId) => axios.get(`/api/v1/countries/${countryId}/states`)
