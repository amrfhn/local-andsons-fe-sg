import axios from '@/services/axios-config'
import axios_original from 'axios'

export const requestCountry = (ip) =>
  axios
    .get(`/api/v1/requestCountry/${ip}`)
    .then((req) => {
      const {
        data: {
          response: { country_code = '', country_name = '' }
        }
      } = req
      return { country_code, country_name }
    })
    .catch((error) => {
      if (error.response.status === 500) {
        const { userMessage } = error.response.data
        throw new Error(userMessage)
      }
      throw error
    })

export const requestIp = () =>
  axios_original.get('https://api.ipify.org?format=json').then((req) => {
    const {
      data: { ip }
    } = req
    return ip
  })
