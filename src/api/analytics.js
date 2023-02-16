import Axios from 'axios'
import { getRequiredIds } from '@/services/identity'

export function Service(config) {
  if (!config) {
    throw ReferenceError('config')
  }

  const axiosInstance = Axios.create({
    baseURL: `${config.api.baseURL}/events`,
    timeout: config.api.timeout
  })

  const sendEvent = async (event) => {
    if (!event) {
      throw ReferenceError('event')
    }

    // grab the latest set of identifiers
    const ids = getRequiredIds()

    try {
      await axiosInstance.post(`/${event.type}`, event.data, { headers: ids })
    } catch (error) {
      return undefined
    }
  }

  async function page(eventName, properties = {}) {
    await sendEvent(createEvent(eventName, properties, 'page'))
  }

  async function track(eventName, properties = {}) {
    await sendEvent(createEvent(eventName, properties, 'track'))
  }

  function createEvent(eventName, properties, type) {
    return {
      data: {
        name: eventName,
        properties,
        timestamp: Date.now()
      },
      type
    }
  }

  return { page, track }
}
