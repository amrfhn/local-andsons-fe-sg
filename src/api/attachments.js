import axios from '@/services/axios-config'

export const uploadAttachments = (data) =>
  axios.post('/api/v1/attachments', data, {
    headers: {
      'content-type': 'multipart/form-data'
    }
  })
