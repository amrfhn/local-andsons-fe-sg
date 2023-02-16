import axios from '@/services/axios-config'

/**
 * Submits raw questions to the medical evaluation
 *
 * @param {*} data
 * @returns
 */
export const submitMedicalEvaluation = (data) =>
  axios.post('/api/v1/medical/evaluations', data).then((response) => {
    if (response.data?.response?.user_id?.length > 30) {
      localStorage.setItem('andsons_tmp_token', `Bearer ${response.data?.response?.user_id}`)
    }
  })
