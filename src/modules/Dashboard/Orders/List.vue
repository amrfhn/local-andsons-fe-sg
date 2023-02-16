<script lang="jsx">
import dayjs from "dayjs";
import OrderProductList from "@/modules/Dashboard/components/OrderProductList";
import { eventBus } from '@/main.js';

export default {
  components: { OrderProductList },
  data() {
    return {
      orders: [],
      loadingOrders: true,
    };
  },
  mounted(){
    eventBus.$on('loadingOrder', (loading) => {
      this.loadingOrders = loading;
    });
    eventBus.$on('changeCurrentOrdersList', (currentOrder) => {
      this.orders = currentOrder;
    });
  },
  render() {
    return (
      <div>
        {
          !this.loadingOrders ?
            !this.orders?.length ?
            (
              <div style={{textAlign: 'center', marginTop: '20px'}} class="order-summary-button">
                <p>You have nothing here. Click <router-link to='/treatment/hair-loss'>here</router-link> to go to shop.</p>
              </div>
            )
          :
          (
            this.orders.map((o) => (
              <div class="order-card">
                <div class="order-title">
                  {o.has_consult_only && (
                    <span>Paid - Payment Successful</span>
                  )}
                  {!o.has_consult_only && (
                    <span>
                      {o.order_status.statuses[o.order_status.order_pos].main_status + ' - ' + o.order_status.statuses[o.order_status.order_pos].sub_status}
                    </span>
                  )}
                  <div class="order-number-anchor">
                    <div class="tag">#{o.reference}</div>

                    { o.status === 'PAID_PENDING_DOCTOR' && !o.appointment
                      ? <router-link
                          class="order-summary-button"
                          to={{ name: 'Appointment', params: { orderId: o.id} }}
                        >
                          Book Appointment{" "}
                          <font-awesome-icon icon={["fas", "arrow-right"]} />
                        </router-link>
                      : <router-link
                          class="order-summary-button"
                          to={`/dashboard/orders/${o.id}`}
                        >
                          See order summary{" "}
                          <font-awesome-icon icon={["fas", "arrow-right"]} />
                        </router-link>
                    }
                  </div>
                </div>
                <div class="order-subtitle" style={{ marginBottom: "32px" }}>
                  Placed on {dayjs(o.created_at).format("DD MMM YYYY, hh.mma")}
                </div>
                <OrderProductList products={o.order_product_option_prices || []} />
              </div>
            ))
          )
          : null
        }
      </div>
    );
  },
};
</script>

<style lang="scss" scoped>
.order-title {
  @media screen and (max-width: 768px) {
    font-size: 1rem;
  }
}
</style>
