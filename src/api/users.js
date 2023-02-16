import axios from '@/services/axios-config'
import validator from 'validator'

export const userLogin = (data) =>
  axios.post('/api/v1/users/login', data).then((response) => {
    localStorage.removeItem('andsons_tmp_token')
    return response
  })

export const userSignup = (data) => axios.post(`/api/v1/users/signup`, data)

/**
 * Check User Email
 * @param {string} email
 * @returns {Promise<axios.response>}
 */
export const checkUserEmail = async (email) => {
  // Check email format
  if (!validator.isEmail(email, { blacklisted_chars: '' })) {
    throw new Error('Please enter a valid email.')
  }

  // Validate email via backend service
  return axios
    .get('/api/v1/users/email_check', {
      params: { email }
    })
    .then((res) => res)
    .catch((error) => {
      throw new Error(error.response.data?.userMessage || error.message || 'Email validation failed')
    })
}

export const getMyProfile = () => axios.get('/api/v1/users/me')

export const requestOTP = (data) => axios.post('/api/v1/users/request_otp', data)

export const verifyOTP = (data) => axios.post('/api/v1/users/verify_otp', data)

export const userLogout = () => axios.post('/api/v1/users/logout')

export const updateProfile = async (data) =>
  await axios.put(`/api/v1/users/${data.userId}`, data.params).catch((err) => err.response.data)

export const fbLogin = (access_token) =>
  axios.post('/api/v1/users/social_login_facebook', null, {
    params: { provider: 'facebook', access_token }
  })

export const socialLogin = (provider) => axios.post(`/api/v1/oauth/${provider}`)

export const forgotPassword = (email) =>
  axios.post(`/api/v1/password_resets`, null, {
    params: {
      email: email
    }
  })

export const resetPassword = (params) =>
  axios.post(`/api/v1/password_resets/reset`, null, {
    params: params
  })

export const checkSkipAppointment = () => axios.get('/api/v1/users/checkAppointmentSkip')
