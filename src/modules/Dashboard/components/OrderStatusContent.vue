<style lang="scss" scoped>
.order-status-content {
  display: flex;
  align-items: flex-start;
  .order-status-item {
    padding-top: 40px;
    width: calc(100% / 5);
    height: 205px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
    position: relative;
    &:before {
      content: '';
      position: absolute;
      top: 100px !important;
      background-color: #b7b7b7;
      width: 100%;
      height: 3px;
      left: 0 !important;
      opacity: 0.15;
    }
    &:after {
      content: '';
      position: absolute;
      top: 100px !important;
      background-color: #d85639;
      width: 100%;
      height: 3px;
      left: 0 !important;
      opacity: 0;
    }
    &:first-child {
      &:before,
      &:after {
        width: 50%;
        left: initial !important;
        right: 0 !important;
      }
    }
    &:last-child {
      &:before,
      &:after {
        width: 50%;
        left: 0 !important;
      }
    }
    .icon {
      height: 50px;
      width: 50px;
      margin-bottom: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      > img {
        max-width: 100%;
        filter: grayscale(100%);
      }
    }
    &.active {
      &:after {
        opacity: 1;
      }
      .icon {
        > img {
          filter: grayscale(0%);
        }
      }
      .sub-header {
        opacity: 1;
      }
      .sub-text {
        text-align: center;
        opacity: 1;
        width: min-content;
        display: table-caption;
        display: -ms-grid;
        -ms-grid-columns: min-content;
      }
    }
    .sub-header {
      font-size: 1.125rem;
      margin: 0 0 8px;
      font-family: PublicSans, monospace;
      @media screen and (max-width: 768px) {
        font-size: 0.75rem;
        opacity: 0;
        position: absolute;
        left: 20px;
        right: 20px;
        top: 115px;
        width: calc(100vw - 10vw - 20px - 20px);
      }
    }
    .sub-text {
      margin: 0;
      color: #b7b7b7;
      font-size: 1.1rem;
      font-family: PublicSans, monospace;
      width: 50%;
      text-align: center;
      @media screen and (max-width: 768px) {
        font-size: 0.75rem;
        opacity: 0;
        position: absolute;
        left: 20px;
        right: 20px;
        top: 135px;
        width: calc(100vw - 10vw - 20px - 20px);
        text-align: left;
      }
      @media screen and (max-width: 400px) {
        font-size: 0.6rem;
      }
    }
  }

  @media screen and (max-width: 450px) {
    .sub-header,
    .sub-text {
      display: none !important;
    }

    .order-status-item {
      height: auto;
    }
  }
}
</style>
<script lang="jsx">
import { imageArr } from "@/modules/Dashboard/helper";
import classnames from "classnames";

export default {
  props: ["order"],
  render() {
    // const activeStatuses = (() => {
    //   if (this.order) {
    //     const index = statusMap.findIndex(
    //       ({ key }) => key === this.order.status
    //     );
    //     return index === -1
    //       ? []
    //       : statusMap.slice(0, index + 1).map((s) => s.key);
    //   }
    //   return [];
    // })();
    return (
      <div class="order-status-content">
        {this.order.order_status.statuses.map((status, index) => (
          <div
            class={classnames("order-status-item", {
              active: this.order.order_status.order_pos >= index,
            })}
          >
            <div class="icon">
              <img src={imageArr[index]} alt="order status icon"/>
            </div>

            <h6 class="sub-header">{status.main_status}</h6>
            <p class="sub-text">{status.sub_status}</p>
          </div>
        ))}
      </div>
    );
  },
};
</script>
