<style lang="scss">
.usp-caption {
  font-family: AHAMONO;
  font-size: 0.9em;
  margin-top: 0.75em;
}
.product-details {
  ul {
    list-style-type: disc;
  }

  .product-header-title {
    color: #ed9075;
    font-size: 2rem;

    @media screen and (max-width: 450px) {
      font-size: 1.5rem;
    }
  }
  .product-reviews {
    display: flex;
    align-items: center;
    margin: 16px 0 32px 0;
    font-size: 1.125rem;
    @media screen and (max-width: 768px) {
      font-size: 1rem;
    }
    svg {
      margin-right: 6px;
    }
    .review-number {
      margin-left: 12px;
    }
  }
  .product-plan {
    .product-plan-title {
      font-size: 1.125rem;
      @media screen and (max-width: 768px) {
        font-size: 1rem;
      }
    }
    .product-plan-option {
      display: flex;
      cursor: pointer;
      justify-content: space-between;
      font-size: 1.125rem;
      margin: 8px 0;
      border: 2px solid #a3a3a3;
      transition: all 0.1s;
      position: relative;
      opacity: 0.6;
      @media screen and (max-width: 768px) {
        font-size: 1rem;
      }
      .product-plan-option-name {
        margin: auto 0;
      }
      .product-plan-option-extra {
        display: none;
        font-size: 1.125rem;

        margin-top: 16px;
        .product-plan-option-extra-info {
          margin-top: 16px;
          display: flex;
          align-items: center;
          .field {
            height: 67px;
            line-height: 67px;
            border: none;
            margin: 0 14px 0 0;
            select {
              background: $springwood-background;
            }
          }
          .discount-tag {
            margin-left: auto;
            background: #d85639;
            color: #fff;
            padding: 4px 8px;
          }
        }
      }
      .product-plan-option-discount-tag {
        position: absolute;
        right: 14px;
        top: -3px;
        background: #ed9075;
        color: #fff;
        padding: 3px 20px;
        font-size: 10px;
        text-transform: uppercase;
        font-weight: 600;
        letter-spacing: 1.5px;

        @include mediaSm {
          right: 12px;
        }
      }
      &.active,
      &:hover {
        opacity: 1;
      }
      &.active {
        border: 2px solid #ed9075;
        .product-plan-option-extra {
          display: block;
        }
      }
    }
  }

  .product-quantity {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;

    .field {
      height: 67px;
      line-height: 67px;
      margin: 0 16px 0 0;
      border: none;
    }
    .quantity {
      margin-right: 0;
      .controller,
      .increment {
        height: 67px;
        width: 40px;
        line-height: 60px;
        font-size: 1.125rem;
      }

      .controller.disabled {
        background-color: transparent;
        opacity: 0.85;

        svg {
          opacity: 0.1;
        }
      }
    }

    @media screen and (max-width: 767px) {
      align-items: center;

      .field {
        height: 57px;
        line-height: 57px;
      }
      .quantity {
        margin-right: 0;
        .controller,
        .increment {
          height: 57px;
          width: 40px;
          line-height: 50px;
          font-size: 1.125rem;
        }

        .controller.disabled {
          background-color: transparent;
          opacity: 0.85;

          svg {
            opacity: 0.1;
          }
        }
      }
    }
  }
  .price-tag {
    font-size: 1.5rem;
    padding-left: 1rem;
    padding-right: 1rem;
    background-color: $highlight;
    width: fit-content;
  }
  .product-remark {
    color: #b7b7b7;

    font-size: 1.125rem;
    margin-top: 48px;
    @media screen and (max-width: 768px) {
      font-size: 1rem;
    }
    a {
      color: #b7b7b7;

      font-size: 1.125rem;
    }
    p {
      margin-bottom: 16px;
    }
  }
}
</style>
<script lang="jsx">
import _ from "lodash";

import Quantity from "../../components/Quantity";
import Select from "@/components/Select";
import ProductTitle from "@/modules/Product/ProductTitle.vue";
import { addItemToCart, getCarts } from "@/api/carts";
import { eventBus } from "@/main.js";
import { formatMetaTags } from "@/utils/prettify.js";
import { trackAddToCart } from "@/utils/analytics.js";

export default {
  components: { ProductTitle, Select },
  props: ["productData"],
  metaInfo() {
    // strip html tags from description string
    const desc = this.productData.desc_1.replace(/(<([^>]+)>)/gi, "");

    return formatMetaTags({
      title: this.productData.meta_title ?? this.productData.title,
      description: this.productData.meta_description ?? desc,
      urlPath: this.$route.path,
      image: this.productData.image_thumbnail_arr[0],
    });
  },
  data() {
    return {
      selectedPlan: undefined,
      quantity: 1,
      monthlyOption: undefined,
      periodQuantity: undefined,
    };
  },
  mounted() {
    this.selectedPlan = 0;
  },
  methods: {
    onSubmit: _.debounce(
      async function () {
        const selectedOption =
          this.productData.product_options[this.selectedPlan];

        //  If this is a prescription based product, we will redirect them to complete evaluation
        if (this.productData.prescription_based) {
          await this.$router.push(
            `/evaluation/${this.productData.category.slug}/start`
          );
        } else if (selectedOption.type === "MONTHLY") {
          const productOptionPriceId =
            selectedOption.product_option_prices[this.monthlyOption].id;
          await addItemToCart({
            product_option_price_id: productOptionPriceId,
            quantity: this.quantity,
            period_quantity: 0,
          });
          getCarts().then((response) => {
            this.$store.commit("updateCart", response.data.response);
            eventBus.$emit("toggleNavBar", true);
          });
          this.track(selectedOption);
        } else {
          const productOptionPriceId =
            selectedOption.product_option_prices[0].id;
          await addItemToCart({
            product_option_price_id: productOptionPriceId,
            quantity: this.quantity,
            period_quantity: 0,
          });
          getCarts().then((response) => {
            this.$store.commit("updateCart", response.data.response);
            if (!this.productData.prescription_based) {
              this.$store.commit("updateAddToCartItem", [
                {
                  id: null,
                  isMultiplePrice: false,
                  slug: null,
                },
              ]);
              eventBus.$emit("toggleNavBar", true);
            }
          });
          this.track(selectedOption);
        }
      },
      1000,
      { leading: true, trailing: false }
    ),
    track(selectedOption) {
      const { category_id, title, prescription_based, order } =
        this.productData;
      trackAddToCart(
        window,
        { ...selectedOption, category_id, title, prescription_based, order },
        this.quantity
      );
    },
  },
  render() {
    const onSelectPlan = (newPlan) => () => {
      this.selectedPlan = newPlan;
    };
    const onQuantityChange = (newValue) => {
      this.quantity = newValue;
    };
    const onMonthlyOptionChange = (newValue) => {
      this.monthlyOption = Number(newValue);
    };

    return (
      <div class="product-details tw-max-w-2xl tw-col-span-1 md:tw-col-span-6 lg:tw-col-span-7">
        <div class="tw-flex tw-flex-col">
          <ProductTitle productData={this.productData} />
        </div>
        <div
          class="product-description tw-text-lg tw-mb-6"
          domPropsInnerHTML={this.productData.desc_1}
        />
        {this.productData.prescription_based !== 1 && (
          <div class="product-plan tw-max-w-2xl tw-my-10">
            {/*<div class="product-plan-title">Select your plan</div>*/}
            {this.productData.product_options.length > 1 ? (
              this.productData.product_options.map((option, index) => {
                const isMonthly = option.type === "MONTHLY";
                return (
                  <div
                    class={`product-plan-option tw-px-6 tw-py-4 ${
                      this.selectedPlan === index ? "active" : ""
                    }`}
                    onClick={onSelectPlan(index)}
                  >
                    <div class="product-plan-option-name">{option.name}</div>
                    <div
                      domPropsInnerHTML={
                        option.product_option_prices[0].price_desc
                      }
                    />
                    {!!option.product_option_prices[0].discount_desc && (
                      <div
                        class="product-plan-option-discount-tag"
                        domPropsInnerHTML={
                          option.product_option_prices[0].discount_desc
                        }
                      />
                    )}
                    {/*isMonthly && this.monthlyOption !== undefined
                      ? `RM${Number(
                          option.product_option_prices[this.monthlyOption].price
                        )}`
                      : getPrice(option.product_option_prices)
                    */}
                    {isMonthly && (
                      <div class="product-plan-option-extra">
                        <div domPropsInnerHTML={option.desc} />
                        <div class="product-plan-option-extra-info">
                          <Select
                            on-change={onMonthlyOptionChange}
                            value={
                              this.monthlyOption !== undefined
                                ? this.monthlyOption.toString()
                                : undefined
                            }
                            id={`monthly-option-${index}`}
                          >
                            {option.product_option_prices.map(
                              ({ price_desc }, index) => (
                                <option value={index}>{price_desc}</option>
                              )
                            )}
                          </Select>
                          <div domPropsInnerHTML={option.quantity_desc} />
                          {this.monthlyOption !== undefined && (
                            <div
                              class="discount-tag"
                              domPropsInnerHTML={
                                option.product_option_prices[this.monthlyOption]
                                  .discount_desc
                              }
                            />
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div class="price-tag">
                $
                {Number(
                  this.productData.product_options[0].product_option_prices[0]
                    .price
                )}
              </div>
            )}
          </div>
        )}
        {this.selectedPlan !== undefined && (
          <div class="product-quantity tw-max-w-2xl md:tw-flex-row">
            {this.productData.prescription_based !== 1 && (
              <div class="tw-flex tw-flex-col tw-mr-4 tw-border tw-border-black">
                <Quantity
                  initialQuantity={1}
                  removable={false}
                  on-change={onQuantityChange}
                />
              </div>
            )}
            <button
              class={`tw-mt-0 submit-button tw-text-lg md:tw-text-lg tw-w-full tw-py-4 md:tw-py-5 ${
                this.disabled
                  ? !this.productData.product_options[this.selectedPlan]
                      .cta_enabled
                  : ""
              }`}
              onClick={this.onSubmit}
              disabled={
                !this.productData.product_options[this.selectedPlan].cta_enabled
              }
              style={
                !this.productData.product_options[this.selectedPlan].cta_enabled
                  ? { backgroundColor: "grey", cursor: "not-allowed", marginTop: "0px !important" }
                  : { marginTop: "0px !important" }
              }
            >
              {this.productData.prescription_based
                ? "START EVALUATION"
                : this.productData.product_options[this.selectedPlan].cta}
            </button>
          </div>
        )}
        {this.productData.desc_2 && (
          <div
            class="product-remark"
            domPropsInnerHTML={this.productData.desc_2}
          />
        )}
      </div>
    );
  },
};
</script>
