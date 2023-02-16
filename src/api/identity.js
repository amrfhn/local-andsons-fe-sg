import * as Axios from 'axios'

const axiosInstance = Axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL_V2 || '',
  headers: {
    'Content-Type': 'application/json'
  }
})

export async function hello(inputHeaders = {}) {
  try {
    const { headers, data } = await axiosInstance.get('/hello', { headers: inputHeaders })
    if (data.location?.countryCode === 'unknown') {
      return Promise.reject()
    }

    return { ...data, headers }
  } catch (error) {
    return undefined
  }
}

export async function storeIdentities(inputHeaders, identities) {
  try {
    const { status } = await axiosInstance.post('/users/me/identities', identities, {
      headers: inputHeaders
    })
    return status === 200
  } catch (error) {
    return false
  }
}
