<style lang="scss" scoped>
.order-subtitle {
  &.address {
    color: #000;
    > div {
      margin-bottom: 6px;
    }
  }
}
.order-summary-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 16px;
  .label {
    font-family: PublicSans, monospace;
    font-size: 1.125rem;

    @media screen and (max-width: 450px) {
      font-size: 1.05rem;
    }
  }
  .title {
    font-family: PublicSansBold, sans-serif;
    font-size: 2.5rem;

    @media screen and (max-width: 450px) {
      font-size: 1.375rem;
    }

    &.price {
      color: #ed9075;
    }
  }
}
.divider {
  height: 1px;
  background: #f0d4cc;
  width: 100%;
  padding: 0;
  margin: 32px 0;
}
.pay-button {
  margin-bottom: 15px;
  @media screen and (max-width: 410px) {
    margin-top: 0;
  }
}
.tag {
  margin-left: 0;
}
.order-title-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}
.print-button {
  margin-top: 0px;
  padding: 1rem 4rem;
}
</style>
<script lang="jsx">
import { getOrderById } from "@/api/orders";
import OrderStatusContent from "@/modules/Dashboard/components/OrderStatusContent";
import dayjs from "dayjs";
import OrderProductList from "@/modules/Dashboard/components/OrderProductList";
import { formatMetaTags } from "@/utils/prettify.js";

const paymentMapping = {
  card: "credit/debit card",
  fpx: "FPX",
  grabpay: "GrabPay",
  atome: "Atome",
};

export default {
  components: { OrderProductList, OrderStatusContent },
  metaInfo() {
    return formatMetaTags({
      title: `Order ${this.$route.params.orderId}`,
      urlPath: this.$route.path,
    });
  },
  data() {
    return { order: undefined };
  },
  computed: {
    userProfile() {
      return this.$store.state.userProfile;
    },
    countries() {
      return this.$store.state.countries;
    },
    states() {
      return this.$store.state.states;
    },
  },
  mounted() {
    getOrderById(this.$route.params.orderId).then((response) => {
      this.order = response.data.response.order;
      if (response.data.response.order.bill_country_id) {
        this.$store.dispatch(
          "retrieveStates",
          response.data.response.order.bill_country_id
        );
      }
    });
    this.$store.dispatch("retrieveCountries");
  },
  methods: {
    payNow(selectedOrder) {
      this.$store.commit("updateCurrentPendingPayment", selectedOrder);

      this.$router.push(`/checkout?orderId=${selectedOrder.id}`);
    },
  },
  render() {
    const country = (() => {
      if (
        this.order &&
        this.order.address &&
        this.order.address.country &&
        this.order.address.country.name
      ) {
        return this.order.address.country.name;
      }
      return undefined;
    })();
    const state = (() => {
      if (
        this.order &&
        this.order.address &&
        this.order.address.country_id &&
        this.states
      ) {
        return this.states[this.order.address.country_id].find(
          (s) => s.id === this.order.address.state_id
        ).name;
      }
      return undefined;
    })();
    return this.order ? (
      <div>
        <div class="order-card transparency">
          <div class="order-title tw-justify-between">
            {this.order.has_consult_only && (
              <h3>Paid - Payment Successful&nbsp;</h3>
            )}
            <div class="tag">#{this.order.reference}</div>
            {this.order.approved_at && dayjs(this.order.approved_at).isValid() && (
              <a
                class="submit-button print-button"
                href={`/invoice/${this.order.id}`}
                target="_blank"
              >
                VIEW INVOICE
              </a>
            )}
          </div>
          <div class="order-subtitle">
            Placed on{" "}
            {dayjs(this.order.created_at).format("DD MMM YYYY, hh.mma")}
          </div>
          {!this.order.has_consult_only && (
            <div>
              <div style={{ marginBottom: "20px" }}>
                <OrderStatusContent order={this.order} />
                {this.order.order_status.order_pos == 0 && (
                  <div
                    style={{
                      display: "flex",
                      flex: 1,
                      justifyContent: "center",
                    }}
                  >
                    <div
                      class="submit-button pay-button"
                      onClick={() => this.payNow(this.order)}
                    >
                      PAY NOW
                    </div>
                  </div>
                )}
              </div>
              <div class="order-title">Delivery details</div>
              <div class="order-subtitle address">
                <div>
                  {[
                    this.userProfile.name,
                    [this.userProfile.country_code, this.userProfile.phone]
                      .filter((p) => !!p)
                      .join(" "),
                  ]
                    .filter((n) => !!n)
                    .join(", ")}
                </div>
                {this.order.address && (
                  <div>
                    {[
                      this.order.address.address_1,
                      this.order.address.address_2,
                      this.order.address.zip,
                      this.order.address.city,
                      state,
                      country,
                    ]
                      .filter((a) => !!a)
                      .join(", ")}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        <div class="order-card transparency">
          <div class="order-title-container">
            <div class="order-title">
              Items{" "}
              <div class="tag" style="margin-left:10px;">
                {this.order.order_product_option_prices.length}
              </div>
            </div>
          </div>
          <OrderProductList products={this.order.order_product_option_prices} />
        </div>
        <div class="order-card">
          <div class="order-title" style={{ marginBottom: "32px" }}>
            Total summary
          </div>
          <div class="order-summary-row">
            <div class="label">Subtotal</div>
            <div class="label">${this.order.subtotal_amount}</div>
          </div>
          <div class="order-summary-row">
            <div class="label">Standard shipping</div>
            <div class="label">
              {Number(this.order.shipping_fee) === 0
                ? "$0.00"
                : `$${this.order.shipping_fee}`}
            </div>
          </div>
          {this.order.discount_total_amount !== "0.00" && (
            <div class="order-summary-row">
              <span class="label">Discount</span>
              <span class="price">
                {this.order.discount_total_amount
                  ? "- $" + this.order.discount_total_amount
                  : "N/A"}
              </span>
            </div>
          )}
          <div class="divider" />
          <div class="order-summary-row">
            <div class="title">Total</div>
            <div class="title price">${this.order.total_amount}</div>
          </div>
          {this.order.latest_transaction &&
            this.order.latest_transaction.payment_method_type && (
              <div class="order-summary-row">
                <div class="label">
                  {this.order.status === "PAID_CANCELLED" ? (
                    <p>Payment refunded</p>
                  ) : (
                    <p>
                      Paid with{" "}
                      {
                        paymentMapping[
                          this.order.latest_transaction.payment_method_type
                        ]
                      }
                    </p>
                  )}
                </div>
              </div>
            )}
        </div>
      </div>
    ) : null;
  },
};
</script>
