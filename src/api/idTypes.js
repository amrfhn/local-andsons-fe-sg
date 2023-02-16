import axios from '@/services/axios-config'

export const getIdTypes = () => axios.get('/api/v1/id_types')
