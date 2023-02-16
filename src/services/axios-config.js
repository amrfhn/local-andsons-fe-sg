import axios from 'axios'
import store from '../store'
import router from '../router'

const instance = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'X-Auth-Token': `api-key ${process.env.VUE_APP_GET_RESPONSE_API_KEY}`
  }
})

//Set interceptors here
instance.interceptors.request.use(
  function(config) {
    const token = localStorage.getItem('andsons_token') || localStorage.getItem('andsons_tmp_token')
    if (token) {
      config.headers.Authorization = token
    }
    return config
  },
  function(error) {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  function(response) {
    return response
  },
  function(error) {
    if (error.response.status === 401) {
      localStorage.removeItem('andsons_token')
      store.commit('updateAuthenticated', false)
      store.commit('updateUserProfile', undefined)
      store.commit('updateCart', {})
      router.replace('/')
    }
    return Promise.reject(error)
  }
)

export default instance
