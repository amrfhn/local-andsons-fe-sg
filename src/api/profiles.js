import axios from '@/services/axios-config'

export const submitProfile = (params) =>
  axios.post('/api/v1/profiles', null, {
    params
  })

export const updateProfileInfo = (profileId, data) => axios.put(`/api/v1/profiles/${profileId}`, data)
