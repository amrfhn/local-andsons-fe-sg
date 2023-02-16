import axios from '@/services/axios-config'

const AtomeService = () => {
  const makePayment = async (orderId) => {
    const data = await axios.post(`/api/v1/transactions/atome/payment/${orderId}`)
    const { status, appPaymentUrl } = data.data
    // Check with GY on other statuses
    if (status === 'PROCESSING') {
      return appPaymentUrl
    } else {
      // send error
    }
    return data
  }
  return {
    makePayment
  }
}

export { AtomeService }
