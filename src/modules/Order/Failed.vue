<style lang="scss" scoped>
.order-container {
  max-width: 550px;
  margin: auto;
  text-align: center;
}
.cart-logo {
  display: block;
  width: 126px;
  height: 69px;
  margin: 0 auto 45px;
  .cart {
    transform-origin: center;
    animation: rotate 600ms 300ms cubic-bezier(0.4, 0, 0.2, 1) infinite alternate;
    @keyframes rotate {
      to {
        transform: rotate(-25deg);
      }
    }
  }
  .dot {
    transform-origin: center;
    animation: scale 600ms 300ms cubic-bezier(0.4, 0, 0.2, 1) infinite alternate;
    @keyframes scale {
      to {
        transform: scale(0.7);
      }
    }
  }
}
.order-title {
  font-family: 'Public Sans', sans-serif;
  font-size: 2.5rem;
  text-align: center;
  margin: 0;
}
.order-subtitle {
  font-family: PublicSans, monospace;
  font-size: 1.125rem;
  text-align: center;
  margin: 20px 0 0;
}
.submit-button {
  margin: 40px auto auto;
  // width: 330px;
  // display: block;
  // text-align: center;
  text-decoration: none;
  // font-family: "PublicSansExtraBold", sans-serif;
  // letter-spacing: 1.8px;
  // font-size: 18px;
}
</style>
<script lang="jsx">
import { formatMetaTags } from "@/utils/prettify.js";

export default {
  metaInfo() {
    return formatMetaTags({
      title: "Order failed",
      description: "Payment failed, please try again.",
      urlPath: this.$route.path,
    });
  },
  render() {
    return (
      <div class="order-container">
        <span class="cart-logo">
          <svg
            viewBox="0 0 126 69"
            fillRule="evenodd"
            clipRule="evenodd"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <g class="cart">
              <path
                d="M51.406 19.196l34.038 5.418-3.932 24.706c-.432 2.71-3.016 4.585-5.726 4.154l-26.135-4.16a3.015 3.015 0 01-2.492-3.436l4.247-26.682z"
                fill="#ed9075"
                fillRule="nonzero"
              />
              <path
                d="M58.004 11.762l-6.882 6.666-4.217 26.493a3.85 3.85 0 003.183 4.387l26.493 4.217a3.85 3.85 0 004.387-3.182l4.217-26.493-4.472-8.474-22.71-3.614zM51.122 18.428l34.063 5.422"
                fill="none"
                stroke="#212121"
                style={{ strokeWidth: 3 }}
              />
              <path
                d="M74.518 29.913c-.66 4.153-4.622 7.026-8.774 6.365-4.153-.66-7.026-4.622-6.365-8.774"
                fill="none"
                stroke="#212121"
                style={{ strokeWidth: 3 }}
              />
            </g>

            <g class="dot">
              <circle
                cx={3}
                cy={3}
                r={3}
                fill="#9dbbc5"
                transform="translate(92 3)"
              />
              <circle
                cx={3}
                cy={3}
                r={3}
                fill="#e6b8aa"
                transform="translate(0 39)"
              />
              <circle
                cx={3}
                cy={3}
                r={3}
                fill="#feb981"
                transform="translate(82 63)"
              />
              <circle
                cx={3}
                cy={3}
                r={3}
                fill="#d5d8b1"
                transform="translate(21)"
              />
              <circle
                cx={3}
                cy={3}
                r={3}
                fill="#faf377"
                transform="translate(120 33)"
              />
              <circle
                cx={3}
                cy={3}
                r={3}
                fill="#dacbd4"
                transform="translate(30 29)"
              />
            </g>
          </svg>
        </span>
        <h3 class="order-title">Order failed.</h3>
        <p class="order-subtitle">Payment failed, please try again.</p>
        <router-link to={
          this.$route?.query?.order_id
          ? `/checkout?orderId=${this.$route?.query?.order_id}`
          : '/dashboard'
        } class="submit-button">
          TRY AGAIN
        </router-link>
      </div>
    );
  },
};
</script>
