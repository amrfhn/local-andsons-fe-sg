<style lang="scss">
.welcome {
  font-family: PublicSans, monospace;
  font-size: 20px;
  margin: 0;
  @media screen and (max-width: 768px) {
    font-size: 1rem;
  }
}

.order-wrapper {
  display: flex;
  align-items: flex-start;
  overflow: hidden;
  .left-wrapper {
    width: 100%;
  }
  .title {
    font-size: 22px;
    font-family: PublicSansExtraBold, sans-serif;
    margin: 0;
    @media screen and (max-width: 768px) {
      font-size: 1.125rem;
    }
  }
}
.order-status-wrapper {
  background: white;
  padding-bottom: 2rem;

  .submit-button {
    text-decoration: none;
    margin: 0 auto;
  }
}

.order-status {
  margin-top: 30px;
  margin-bottom: 40px;
  @media screen and (max-width: 768px) {
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .order-tab {
    display: flex;
    align-items: center;
    height: 60px;
    overflow: auto;
    @media screen and (max-width: 768px) {
      height: 40px;
    }
    .order-tab-item {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 20px;
      height: 100%;
      cursor: pointer;
      &.active {
        background-color: #fff;
      }
      .title {
        font-size: 1.375rem;
        font-weight: normal;
        white-space: nowrap;
        @media screen and (max-width: 768px) {
          font-size: 1rem;
        }
      }
    }
    .order-number {
      background-color: #d85639;
      color: #fff;
      height: 26px;
      border-radius: 4px;
      margin-left: 20px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 0 12px;
      font-family: 'PublicSans', sans-serif;
      @media screen and (max-width: 768px) {
        font-size: 0.75rem;
      }
    }
  }
  .order-status-header {
    //height: 80px;
    display: flex;
    align-items: flex-start;
    padding: 20px 30px;
    background-color: #fff;
    @media screen and (max-width: 768px) {
      padding: 20px;
    }
    .order-item-list {
      display: flex;
      align-items: center;
      > .order-item {
        width: 100px;
        height: 100px;
        background-color: $springwood-background;
        display: flex;
        align-items: center;
        justify-content: center;
        &:not(:last-child) {
          margin-right: 20px;
        }
      }
    }
  }
  .order-status-content {
    background-color: #fff;
  }
}

.notification {
  background-color: #fff;
  .notification-header {
    display: flex;
    align-items: center;
    padding: 30px;
    @media screen and (max-width: 768px) {
      padding: 20px;
    }
    .see-all-notification {
      margin-left: auto;
      font-size: 18px;
      font-family: PublicSans, monospace;
      @media screen and (max-width: 768px) {
        font-size: 0.75rem;
      }

      svg {
        font-size: 13px;
      }
    }
  }
  .notification-content {
    padding: 0 30px 30px;

    @media screen and (max-width: 768px) {
      padding: 0 20px 20px;
    }

    .notification-item {
      display: grid;
      grid-template-columns: 110px auto 210px;
      gap: 20px;
      align-items: center;
      margin-bottom: 20px;
      @media screen and (max-width: 768px) {
        display: block;
        text-align: left;
      }
      &.active {
        .label {
          background-color: #faf377;
        }
      }
      .label {
        width: 110px;
        padding: 10px 0;
        text-align: center;
        background-color: #f4f4f3;
        font-size: 16px;
        font-family: PublicSans, monospace;
        @media screen and (max-width: 768px) {
          font-size: 14px;
          margin-bottom: 8px;
        }
      }
      &:not(:last-child) {
        margin-bottom: 30px;
      }
      .sub-title {
        font-size: 16px;
        font-family: PublicSans, monospace;
        @media screen and (max-width: 768px) {
          font-size: 14px;
          margin-bottom: 8px;
        }
      }
      .date {
        margin-left: auto;
        color: #b7b7b7;
        font-size: 1rem;
        font-family: PublicSans, monospace;
        text-align: right;
        @media screen and (max-width: 768px) {
          text-align: left;
          font-size: 1rem;
        }
      }
    }
  }
}

.mobile-status {
  display: none;
  margin-left: 20px;
  margin-bottom: 20px;

  @media screen and (max-width: 450px) {
    display: block;
  }

  .main-status {
    font-family: 'PublicSans', sans-serif;
    font-size: 0.9rem;
  }

  .sub-status {
    font-family: 'PublicSans', sans-serif;
    color: #b7b7b7;
    font-size: 0.8rem;
    margin-top: 5px;
  }
}
</style>
<script lang="jsx">
import dayjs from "dayjs";
import classnames from "classnames";
import { getOrders } from "@/api/orders";
import { getNotifications } from "@/api/notifications";
import OrderStatusContent from "@/modules/Dashboard/components/OrderStatusContent";
import { formatMetaTags } from "@/utils/prettify.js";

export default {
  metaInfo() {
    return formatMetaTags({
      title: "Dashboard",
      urlPath: this.$route.path,
    });
  },
  components: { OrderStatusContent },
  data() {
    return {
      tabIndex: 0,
      orders: [],
      notifications: [],
      loadingOrders: true,
      loadingNotifications: true,
      selectedOrderStatusPos: undefined,
      orderStatusContent: undefined
    };
  },
  computed: {
    userProfile() {
      return this.$store.state.userProfile;
    },
  },
  mounted() {
    getOrders().then((response) => {
      let orders = response.data.response.data;

      //Sort order by latest
      orders = orders.reverse();

      this.loadingOrders = false;
      this.orders = orders;
    });
    getNotifications().then((response) => {
      this.notifications = response.data.response.notifications.data;
      this.loadingNotifications = false;
    });
  },
  methods: {
    payNow(selectedOrder) {
      this.$store.commit('updateCurrentPendingPayment', selectedOrder);

      this.$router.push(`/checkout?orderId=${selectedOrder.id}`);
    }
  },
  render() {
    const setTab = (tabIndex) => {
      this.tabIndex = tabIndex;
    };

    const selectedOrder = this.orders[this.tabIndex] || null;
    if(selectedOrder !== null){
      this.selectedOrderStatusPos = selectedOrder.order_status.order_pos;
      this.orderStatusContent = selectedOrder.order_status.statuses[this.selectedOrderStatusPos];
    }

    return (
      <div>
        <p class="welcome">
          Welcome, {this.userProfile.first_name}.
        </p>
        <div class="order-wrapper">
          <div class="left-wrapper">
            <div class="order-status">
              {
                !this.loadingOrders ?
                  this.orders?.length?
                    <div class="order-tab">
                      {this.orders.map((item, index) => {
                        const { reference } = item;
                        return (
                          <div
                            class={classnames("order-tab-item", {
                              active: this.tabIndex === index,
                            })}
                            onClick={() => setTab(index)}
                          >
                            <h3 class="title">Order</h3>
                            <span class="order-number">#{reference}</span>
                          </div>
                        );
                      })}
                    </div>
                  : <div style={{textAlign: 'center'}} class="order-summary-button">
                    <p>You have not placed any orders yet. Click <router-link to='/treatment/hair-loss'>here</router-link> to go to shop.</p>
                  </div>
                : null
              }

              {selectedOrder && (
                <div class="order-status-wrapper">
                  <div class="order-status-header">
                    <div class="order-item-list">
                      {/**items.map((item) => {
                      return <div class="order-item">#{item.id}</div>;
                    })**/}
                    </div>
                    <router-link
                      class="order-summary-button"
                      to={`/dashboard/orders/${selectedOrder.id}`}
                    >
                      See order summary{" "}
                      <font-awesome-icon icon={["fas", "arrow-right"]} />
                    </router-link>
                  </div>
                  <OrderStatusContent order={selectedOrder} />
                  <div class="mobile-status">
                    <p class="main-status">{this.orderStatusContent.main_status}</p>
                    <p class="sub-status">{this.orderStatusContent.sub_status}</p>
                  </div>

                  {selectedOrder.order_status.order_pos == 0 && (
                    <div class="submit-button" onClick={() => this.payNow((selectedOrder))}>PAY NOW</div>
                  )}
                </div>
              )}
            </div>
            <div class="notification">
              <div class="notification-header">
                <h3 class="title">Notifications</h3>
                <router-link
                  class="see-all-notification"
                  to="/dashboard/orders"
                >
                  See all <font-awesome-icon icon={["fas", "arrow-right"]} />
                </router-link>
              </div>
              <div class="notification-content">
                {
                  !this.loadingNotifications ?
                    this.notifications?.length?
                      this.notifications.map((item) => {
                        return (
                          <div class="notification-item">
                            <div class="label">{item.type}</div>
                            <h6 class="sub-title">{item.desc}</h6>
                            <p class="date">
                              {dayjs(item.created_at).format("DD MMM YYYY, h.mma")}
                            </p>
                          </div>
                        );
                      })
                    :
                      <div style={{textAlign: 'center'}} class="order-summary-button">
                        <p>You have no notifications.</p>
                      </div>
                  : null
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
};
</script>
