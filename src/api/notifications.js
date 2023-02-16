import axios from '@/services/axios-config'

export const getNotifications = () => axios.get('/api/v1/notifications')
export const getNotificationsBanner = (params = '/') => axios.get(`/api/v1/notification_banners?slug=${params}`)
