<template>
  <div></div>
</template>
<script>
import { formatMetaTags } from '@/utils/prettify.js'
import { getOrderById } from '@/api/orders'

export default {
  name: 'AtomeCallback',
  metaInfo() {
    return formatMetaTags({
      title: 'AtomeCallback',
      urlPath: this.$route.path
    })
  },
  async mounted() {
    const { order_id, atome_status } = this.$route.query
    if (atome_status === 'success') {
      // get order status
      const order = await getOrderById(order_id)
      const orderDetails = order.data.response.order
      const hasPrescription = this.containsPrescription(orderDetails)
      if (!hasPrescription) {
        this.$router.push({ name: 'Success', query: { order_id: order_id } })
      } else if (hasPrescription) {
        this.$router.push({
          name: 'Appointment',
          params: { orderId: order_id }
        })
      }
    }
  },
  methods: {
    containsPrescription(order) {
      const orderProductOptionPrices = order.order_product_option_prices
      return orderProductOptionPrices.some((optionPrices) => {
        const {
          product_option_price: {
            product_option: {
              product: { prescription_based }
            }
          }
        } = optionPrices
        return prescription_based
      })
    }
  }
}
</script>
