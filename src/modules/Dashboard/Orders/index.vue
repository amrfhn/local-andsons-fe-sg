<style lang="scss" scoped>
.orders-tabs {
  background: #fff;
  display: flex;
  overflow: auto;

  .orders-tab-option {
    cursor: pointer;
    color: #b7b7b7;
    font-family: PublicSansExtraBold, sans-serif;
    font-size: 1.375rem;
    padding: 16px 32px;
    transition: all 0.2s;
    &.active {
      color: #000;
    }

    a {
      color: inherit;
    }

    @media screen and (max-width: 768px) {
      font-size: 1.1rem;
    }

    @media screen and (max-width: 510px) {
      font-size: 1rem;
      // padding: 10px;
    }
  }
}
</style>
<style lang="scss">
.orders-notifcations {
  background-color: #fed6aa;
}
.orders-tabs a {
  text-decoration: none;
}
.order-card {
  background: #fff;
  padding: 32px;
  margin-top: 16px;

  @media screen and (max-width: 410px) {
    padding: 20px;
  }

  &.transparency {
    background: rgba(255, 255, 255, 0.6);
  }
  .order-title {
    font-family: PublicSansExtraBold, sans-serif;
    font-size: 1.375rem;
    display: flex;
    align-items: center;

    @media screen and (max-width: 410px) {
      align-items: flex-start;
    }
  }
  .order-subtitle {
    font-family: PublicSans, monospace;
    font-size: 1.125rem;
    color: #b7b7b7;
    margin-top: 16px;

    @media screen and (max-width: 400px) {
      font-size: 16px;
    }
  }

  .order-number-anchor {
    display: flex;
    justify-content: space-between;
    flex-grow: 1;
    align-items: center;

    @media screen and (max-width: 410px) {
      flex-direction: column;
      align-items: flex-end;
    }
  }
}
</style>

<script lang="jsx">
import classnames from "classnames";
import { getOrders } from "@/api/orders";
import { eventBus } from '@/main.js';
import { formatMetaTags } from "@/utils/prettify.js";

const tabOptions = ["All", "Returns", "Cancellations"];
export default {
  metaInfo() {
    let title = tabOptions[this.selectedTab];
    if (this.selectedTab === 0) {
      title = `${title} Orders`
    }
    return formatMetaTags({ title, urlPath: this.$route.path })
  },
  data() {
    return {
      selectedTab: 0,
      orders: []
    };
  },
  computed: {
    hasLatestUnfinishedOrder() {
      if (this.orders.length === 0) return null;
      const firstOrder = this.orders.find(order => order.status === "PAID_PENDING_DOCTOR" && !order.appointment);
      if (firstOrder) return firstOrder.id ?? null;
      return null;
    }
  },
  watch:{
    $route(){
      this.getOrders()
    }
  },
  async mounted(){
    await this.getOrders();
  },
  methods: {
    async getOrders(){
      const resp = await getOrders();
      this.orders = resp.data.response.data.reverse();
      eventBus.$emit('loadingOrder', false);
      eventBus.$emit('changeCurrentOrdersList', this.orders);
    }
  },
  render() {
    const onTabChange = (status, index) => () => {
      getOrders(status.toUpperCase()).then((response) => {
        this.orders = response.data.response.data;
        let orders = response.data.response.data;

        //Sort order by latest
        orders = orders.reverse();

        eventBus.$emit('changeCurrentOrdersList', orders);
      });

      this.selectedTab = index;
    };
    return (
      <div>
        {this.hasLatestUnfinishedOrder && (
          <div
            class="orders-notifcations tw-col tw-p-4 tw-font-bold tw-text-center tw-mb-4"
          >
            <span class="tw-w-6/12">
              You have unfinished transactions. Please book an appointment with the doctor to complete your transaction.
            </span>
            <div class="tw-flex tw-place-content-center">
              <router-link
                class="submit-button tw-mt-4 tw-p-4"
                to={{ name: 'Appointment', params: { orderId: this.hasLatestUnfinishedOrder } }}
              >
                Book Now
              </router-link>
            </div>
          </div>
        )}
        <div class="orders-tabs">
          {tabOptions.map((t, i) => (
            <div
              class={classnames("orders-tab-option", {
                active: i === this.selectedTab,
              })}
              onClick={onTabChange(t, i)}
            >
              <router-link to={{ name: 'OrdersList' }}>
                {t}
              </router-link>
            </div>
          ))}
        </div>
        <router-view />
      </div>
    );
  },
};
</script>
