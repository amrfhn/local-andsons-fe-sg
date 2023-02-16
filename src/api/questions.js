import axios from '@/services/axios-config'

export const getQuestions = (cartId) => axios.get('/api/v1/questions', { params: { cart_id: cartId } })

export const getQuestionsByProductId = (productId) => axios.get(`/api/v1/questions/${productId}`)

export const getQuestionsByCategoryId = (categoryId) => axios.get(`/api/v1/categories/${categoryId}/questions`)

export const submitQuestions = (data) =>
  axios.post('/api/v1/questions', data).then((response) => {
    if (response.data?.response?.user_id?.length > 30) {
      localStorage.setItem('andsons_tmp_token', `Bearer ${response.data?.response?.user_id}`)
    }
  })

export const saveQuestionAnswer = (questionId, answer) =>
  axios.post(`/api/v1/question/${questionId}/answer`, {
    answer
  })

export const getAnswersByQuestionSetId = (questionSetId) => axios.get(`/api/v1/questionSet/${questionSetId}/answers`)
