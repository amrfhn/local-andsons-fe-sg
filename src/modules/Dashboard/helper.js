import Icon0 from '@/assets/images/dashboard/dashboard-icon-0.svg'
import Icon1 from '@/assets/images/dashboard/dashboard-icon-1.svg'
import Icon2 from '@/assets/images/dashboard/dashboard-icon-2.svg'
import Icon3 from '@/assets/images/dashboard/dashboard-icon-3.svg'
import Icon4 from '@/assets/images/dashboard/dashboard-icon-4.svg'

export const imageArr = [Icon0, Icon1, Icon2, Icon3, Icon4]

export const statusMap = [
  {
    key: 'PAID',
    title: 'Payment',
    desc: 'Payment successful'
  },
  {
    key: 'PAID_PENDING_DOCTOR',
    title: 'Approval',
    desc: 'Pending doctor’s approval'
  },
  {
    key: 'DISPATCH',
    title: 'Dispatch',
    desc: 'Insert status'
  },
  {
    key: 'DELIVERY',
    title: 'Delivery',
    desc: 'Insert status'
  },
  {
    key: 'RECEIVED',
    title: 'Receive',
    desc: 'Insert status'
  }
]
