<template>
  <div v-if="order && userProfile" class="container">
    <div class="invoice-content tw-p-3 tw-text-lg">
      <div class="tw-flex tw-justify-center tw-flex-col">
        <div class="tw-flex tw-justify-center">
          <h2 class="invoice-title tw-text-4xl tw-mb-10 font-bold">
            Tax Invoice
          </h2>
        </div>

        <div class="tw-grid tw-grid-cols-2 tw-gap-20 tw-w-full tw-mb-8">
          <img class="logo" :src="oraLogo" alt="ORA logo" />
          <div>
            <div>PX VENTURES PTE. LTD.</div>
            <div>UEN: 202029531N</div>
            <div>
              16 RAFFLES QUAY #38-03 HONG LEONG BUILDING SINGAPORE (048581)
            </div>
          </div>
        </div>

        <div class="tw-grid tw-grid-cols-2 tw-gap-20 tw-mb-4 tw-w-full">
          <div>{{ userProfile.name }}</div>
          <div></div>
        </div>

        <div class="tw-grid tw-grid-cols-2 tw-gap-20 tw-w-full tw-mb-12">
          <div>
            <div v-if="order.address">
              {{
                [
                  order.address.address_1,
                  order.address.address_2,
                  order.address.zip,
                  order.address.city,
                  state,
                  country
                ]
                  .filter((a) => !!a)
                  .join(', ')
              }}
            </div>
          </div>
          <div>
            <div>Date: {{ invoiceDate }}</div>
            <div>Invoice No: INV-{{ order.id }}</div>
          </div>
        </div>

        <table v-if="order.order_product_option_prices.length" class="tw-w-full tw-mb-6">
          <thead>
            <tr>
              <th><span>S/No</span></th>
              <th><span>Description</span></th>
              <th><span>Qty</span></th>
              <th>
                <div>
                  <div>Unit Price</div>
                  <div>($)</div>
                </div>
              </th>
              <th>
                <div>
                  <div>Total</div>
                  <div>($)</div>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="({ product_option_price, quantity, price }, index) in order.order_product_option_prices"
              :key="index"
            >
              <td class="tw-text-center">
                <span>{{ index + 1 }}</span>
              </td>
              <td>
                <span>{{ `${product_option_price.product_option.product.title}` }} </span>
              </td>
              <td class="tw-text-center">
                <span>{{ getActualQuantity(quantity, product_option_price) }}</span>
              </td>
              <td class="tw-text-right">
                <span>{{ getUnitPrice(price, quantity, product_option_price) }}</span>
              </td>
              <td class="tw-text-right">
                <span>{{ convertToFloat(price, quantity, product_option_price) }}</span>
              </td>
            </tr>
            <!-- <tr>
              <td class="border-bottom-none"></td>
              <td class="border-bottom-none">Total Due (Excluding GST):</td>
              <td class="border-bottom-none" colspan="2"></td>
              <td class="tw-text-right border-bottom-none">
                {{ order.subtotal_amount }}
              </td>
            </tr> -->
            <tr>
              <td class="border-top-none border-bottom-none"></td>
              <td class="border-top-none border-bottom-none">
                Shipping:
              </td>
              <td class="border-top-none border-bottom-none" colspan="2"></td>
              <td class="tw-text-right border-top-none border-bottom-none">
                {{ shippingFee }}
              </td>
            </tr>
            <tr>
              <td class="border-top-none border-bottom-none"></td>
              <td class="border-top-none border-bottom-none">
                Less Discount:
              </td>
              <td class="border-top-none border-bottom-none" colspan="2"></td>
              <td class="tw-text-right border-top-none border-bottom-none">
                {{ `-${discount}` }}
              </td>
            </tr>
            <!-- <tr>
              <td class="border-top-none border-bottom-none"></td>
              <td class="border-top-none border-bottom-none">
                Taxable Amount:
              </td>
              <td class="border-top-none border-bottom-none" colspan="2"></td>
              <td class="tw-text-right border-top-none border-bottom-none">
                {{ taxableAmount }}
              </td>
            </tr> -->
            <!-- <tr>
              <td class="border-top-none border-bottom-none"></td>
              <td class="border-top-none">GST @ 7%:</td>
              <td class="border-top-none" colspan="2"></td>
              <td class="tw-text-right border-top-none">{{ GSTAmount }}</td>
            </tr> -->
            <tr>
              <td class="border-top-none"></td>
              <td>Amount Due:</td>
              <td colspan="2"></td>
              <td class="tw-text-right">{{ amountDue }}</td>
            </tr>
          </tbody>
        </table>
        <div class="tw-text-center ">
          Thank you. We look forward to being of service to you again.
        </div>
        <button class="submit-button print-button tw-flex tw-justify-center tw-items-center" @click="handlePrint">
          PRINT
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { formatMetaTags } from '@/utils/prettify.js'
import ORALogo from '@/assets/images/ora_logo.png'

export default {
  name: 'OrderInvoice',
  components: {},
  metaInfo() {
    return formatMetaTags({
      title: 'Invoice',
      urlPath: this.$route.path
    })
  },
  data() {
    return { country: '', state: '', oraLogo: ORALogo }
  },
  computed: {
    order() {
      return this.$store.state.selectedOrder
    },
    userProfile() {
      return this.$store.state.userProfile
    },
    states() {
      return this.$store.state.states
    },
    invoiceDate() {
      return dayjs(this.order.approved_at).format('DD/MM/YYYY')
    },
    shippingFee() {
      return this.order || Number(this.order.shipping_fee) === 0 ? '0.00' : `${this.order.shipping_fee}`
    },
    discount() {
      return this.order && this.order.discount_total_amount ? this.order.discount_total_amount : '0.00'
    },
    taxableAmount() {
      return (Number(this.order.subtotal_amount) + Number(this.shippingFee) - Number(this.discount)).toFixed(2)
    },
    // GSTAmount() {
    //   return (0.07 * Number(this.taxableAmount)).toFixed(2);
    // },
    amountDue() {
      //return (Number(this.taxableAmount) + Number(this.GSTAmount)).toFixed(2);
      return this.taxableAmount
    }
  },
  watch: {
    states(newValue) {
      if (this.order && this.order.address && this.order.address.country_id && newValue) {
        this.state = newValue[this.order.address.country_id].find((s) => s.id === this.order.address.state_id).name
      }
    }
  },
  mounted() {
    if (this.order && this.order.address && this.order.address.country && this.order.address.country.name) {
      this.country = this.order.address.country.name
    }
    if (this.order.bill_country_id) {
      this.$store.dispatch('retrieveStates', this.order.bill_country_id)
    }
  },
  methods: {
    getActualQuantity(quantity, product_option_price) {
      const { sku_quantity } = product_option_price
      return quantity / sku_quantity
    },
    convertToFloat(price, quantity, product_option_price) {
      const { sub_duration_refresh } = product_option_price
      const calcQuantity = this.getActualQuantity(quantity, product_option_price)
      if (sub_duration_refresh) {
        return price
      } else {
        return (calcQuantity * price).toFixed(2)
      }
    },
    getUnitPrice(price, quantity, product_option_price) {
      const calcQuantity = this.getActualQuantity(quantity, product_option_price)
      return (Number(price) / calcQuantity).toFixed(2)
    },
    handlePrint() {
      window.print()
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
}

.logo {
  width: 110px;
  height: 110px;
}

.invoice-content {
  margin-top: 85px;
  margin-bottom: 85px;
  max-width: 800px;

  @include mediaLg {
    width: 600px;
  }
  @include mediaXL {
    width: 800px;
  }
}
@media print {
  .invoice-content {
    margin-top: 0px;
    margin-bottom: 0px;
  }
  .print-button {
    display: none;
  }
}

.invoice-title {
  text-decoration: underline;
}

td,
th {
  border: 2px solid #000000;
  padding: 8px;
}

.border-top-none {
  border-top: none;
}

.border-bottom-none {
  border-bottom: none;
}

.print-button {
  padding: 1rem 4rem;
  max-width: 150px;
}
</style>
