<style lang="scss" scoped>
.order-wrapper {
  background-color: $springwood-background;
  min-height: 100vh;
  padding: calc(30px + 5vw);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  .logo {
    cursor: pointer;
    position: absolute;
    top: 0;
    left: 0;
    padding: 0 50px 0 calc(30px + 5vw);
    margin-top: 3rem;

    @media screen and (max-width: 410px) {
      margin-top: 1.5rem;
      padding-left: 30px;
    }
  }

  @media screen and (max-width: 410px) {
    padding: 30px;
  }
}
</style>
<script lang="jsx">
import Logo from "../../components/Logo";
import { getOrderById } from "@/api/orders";
import { trackPurchase } from "@/utils/analytics.js";

export default {
  data() {
    return {
      loading: true,
    };
  },
  created() {
    const query = this.$route.query;
    if (query?.order_id !== undefined && query?.redirect_status !== 'failed') {
      this.getOrderInfo(query.order_id)
    }
  },
  mounted(){
    const query = this.$route.query;
    this.loading = this.$route.name === 'PaymentProcessing' ? false : this.loading;

    if (query) {
      if(query.redirect_status === 'failed'){
        this.loading = false
        this.$router.push(`/order/failed?order_id=${this.$route.query.order_id}`);
      } else if (this.$route.name !== 'PaymentProcessing') {
        this.loading = false
        this.$router.push(`/order/success?order_id=${this.$route.query.order_id}`);
      }
    } else {
      this.loading = false
      this.$router.push(`/order/success?order_id=${this.$route.query.order_id}`);
    }
  },
  methods: {
    async getOrderInfo(orderId){
      let order = await getOrderById(orderId).then(rsp => {
        return rsp?.data?.response?.order ?? null;
      })

      await trackPurchase(window, order, order.latest_transaction.transaction_ref);

      this.loading = false
      this.$router.push(`/order/success?order_id=${order.id}`);
    },
  },
  render() {
    return (
      <div class="order-wrapper">
        <Logo />
        <p style={{display: this.loading ? 'block' : 'none'}}>Loading ...</p>
        <router-view />
      </div>
    );
  },
};
</script>
