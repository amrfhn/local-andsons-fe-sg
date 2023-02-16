<style lang="scss" scoped>
/deep/ .product-details {
  ul {
    list-style-type: disc;
  }
}
.back-button {
  cursor: pointer;
  display: flex;
  align-items: center;
  text-decoration: none;
  font-family: PublicSans, monospace;
  font-size: 1.125rem;
  height: 60px;
  background-color: transparent;
  border: 0;
  outline: none;
  &:hover {
    text-decoration: underline;
  }
  svg {
    margin-right: 20px;
    @media screen and (max-width: 400px) {
      margin-right: 10px;
    }
  }
  @include mediaSm {
    height: unset;
    padding-top: 0;
    padding-bottom: 20px;
    font-size: 0.8rem;
  }
}

.multisku-row {
  display: flex;
  flex-direction: row;
  @include mediaSm {
    flex-wrap: wrap;
  }

  .product-plan-option {
    flex-grow: 1;
    text-align: center;

    @include mediaSm {
      flex-basis: 50%;
    }

    * {
      width: 100%;
      text-align: center;
    }

    .multisku-duration-display {
      display: flex;
      flex-direction: column;
      width: 100%;
      margin: 10px auto;
      align-items: center;

      @include mediaSm {
        * {
          margin: 0 auto;
        }
      }

      * {
        width: fit-content;
      }
    }

    .multisku-pricedesc {
      font-size: 15px;
      color: grey;
      margin-top: 1rem;
    }
  }
}

.multisku-label {
  font-family: PublicSansBold, monospace;
  margin-top: 10px;
}

.checkout-wrapper {
  background-color: $springwood-background;
  min-height: 100vh;
}

.checkout-inner-wrapper {
  padding: 6rem 0 0;
  margin-bottom: 1.5rem;

  @media screen and (max-width: 768px) {
    padding-top: 4.5rem;
  }
}

.checkout-content {
  padding: 4rem calc(30px + 5vw);
  width: 100%;
  display: flex;
  // align-items: flex-start;
  justify-content: center;

  @media screen and (max-width: 768px) {
    padding: 0;
    flex-direction: column;
  }

  // position: relative;
  // display: flex;
  // justify-content: center;
  // padding: 4rem calc(30px + 5vw);
  //
  // @media screen and (max-width: 768px) {
  //   padding: 0 30px;
  // }
}

.step-wrapper {
  background-color: #f2f2ec;
  border-radius: 10px;
  width: 30vw;
  height: fit-content;
  padding: 20px;

  @media screen and (max-width: 768px) {
    width: 90vw;
    margin-bottom: 20px;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    flex-direction: column-reverse;
  }
  .step-title {
    padding-bottom: 20px;
    font-family: PublicSansExtraBold, monospace;
    font-size: 2rem;

    @include mediaSm {
      padding-top: 0;
      padding-bottom: 5px;
      font-size: 1.5rem;
    }
  }
  .step-description {
    padding-bottom: 20px;
    font-family: PublicSans, monospace;
    font-size: 18px;
    line-height: 1.4;

    @include mediaSm {
      padding-top: 0;
      padding-bottom: 5px;
      font-size: 0.9rem;
    }
  }
}

.plan-selection {
  width: 70vw;

  @include mediaSm {
    width: 100vw;
  }
}

.price-options-container {
  margin: 0 8rem 40px 8rem;
  @include mediaSm {
    margin: 0 2rem 40px 2rem;
  }
  .product-name {
    font-family: PublicSansBold, sans-serif;
    font-size: 2rem;
    padding-bottom: 40px;
    @media screen and (max-width: 768px) {
      font-size: 1.8rem;
      padding-bottom: 20px;
    }
  }
  .product-description {
    font-family: PublicSans, monospace;
    font-size: 1.125rem;
    line-height: 1.4;
    @media screen and (max-width: 768px) {
      font-size: 14px;
      line-height: 1.3;
    }
  }
  .product-plan {
    margin-top: 32px;
    font-family: PublicSans, monospace;
    .product-plan-title {
      font-size: 1.125rem;
      @media screen and (max-width: 768px) {
        font-size: 1rem;
      }
    }
    .product-plan-option {
      display: flex;
      // flex-wrap: wrap;
      cursor: pointer;
      justify-content: space-between;
      padding: 25px;
      font-size: 1.125rem;
      background: #fff;
      margin: 8px 0;
      border: 3px solid #fff;
      transition: all 0.1s;
      position: relative;
      @media screen and (max-width: 768px) {
        font-size: 1rem;
      }

      &.bordered {
        border: 3px solid $greenwhite-background;
        border-left: none;

        &:first-child {
          border-left: 3px solid $greenwhite-background;

          &.active {
            border-left: 3px solid #ed9075;
          }
        }
      }

      .product-plan-option-name {
        margin: auto 0;
      }
      .product-plan-option-extra {
        display: none;
        font-size: 1.125rem;
        font-family: PublicSans, monospace;
        margin-top: 16px;
        .product-plan-option-extra-info {
          margin-top: 16px;
          display: flex;
          align-items: center;
          .field {
            height: 40px;
            line-height: 40px;
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

        &.multiSku {
          right: unset;
          left: 0;
          width: 40%;
          margin: 0 30%;

          @include mediaSm {
            width: 60%;
            margin: 0 20%;
          }
        }

        @include mediaSm {
          right: 12px;
        }
      }
      &.active {
        border: 3px solid #ed9075;
        .product-plan-option-extra {
          display: block;
        }
      }
    }
  }
  .prouduct-quantity-count {
    display: flex;
    align-items: center;
    margin-right: 32px;
  }
  .product-quantity {
    margin-top: 48px;
    display: flex;
    align-items: center;

    @media screen and (min-width: 769px) and (max-width: 1240px) {
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
    }

    @media screen and (max-width: 768px) {
      margin-top: 0;
    }

    @media screen and (max-width: 450px) {
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
    }

    .product-quantity-label {
      font-family: PublicSans, monospace;
      font-size: 1rem;
      margin-right: 16px;
    }
    .field {
      height: 40px;
      line-height: 38px;
      margin: 0 16px 0 0;
      border: none;
    }
    .quantity {
      margin-right: 0;
      .controller,
      .number-input {
        background: #fff;
        height: 40px;
        width: 40px;
        line-height: 38px;
      }

      .controller.disabled {
        opacity: 1;

        svg {
          opacity: 0.1;
        }
      }

      .number-input {
        font-family: PublicSans, monospace;
        font-size: 1rem;
      }
    }
    .submit-button {
      margin: 0;
      // height: 40px;
      // line-height: 40px;
      // font-size: 1rem;
      // width: auto;
      // padding: 0 24px;

      @media screen and (min-width: 769px) and (max-width: 1240px) {
        margin: 2rem 0 0 0;
      }

      @media screen and (max-width: 768px) {
        width: 100%;
      }

      @media screen and (max-width: 450px) {
        margin: 2rem 0 0 0;
      }
    }
  }
  .price-tag {
    background: url('../../../assets/images/catalogue/price-tag.png') right center no-repeat;
    background-size: contain;
    font-family: PublicSans, monospace;
    font-size: 1.125rem;
    padding: 8px 16px;
    width: fit-content;
    @media screen and (max-width: 768px) {
      margin: 2rem auto;
      font-size: 1rem;
    }
  }
  .product-remark {
    color: #b7b7b7;
    font-family: PublicSans, monospace;
    font-size: 1.125rem;
    margin-top: 48px;
    @media screen and (max-width: 768px) {
      font-size: 1rem;
    }
    a {
      color: #b7b7b7;
      font-family: PublicSans, monospace;
      font-size: 1.125rem;
    }
    p {
      margin-bottom: 16px;
    }
  }
}

.submit-button {
  margin-left: auto;
}

.cart-item {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  position: relative;
  border: 3px solid #ed9075;

  .cart-image {
    height: 100%;
    max-height: 120px;
    background-color: $springwood-background;
    background-size: 100% auto;

    @media screen and (max-width: 768px) {
      height: 80px;
    }
  }

  .cart-product-container {
    display: flex;
    flex-basis: 100%;

    @media screen and (max-width: 400px) {
      flex-direction: column;
    }
  }

  .cart-info {
    padding: 0 15px;
    @media screen and (max-width: 768px) {
      margin-bottom: auto;
      width: 100%;
      flex-basis: 100%;
    }

    .cart-title {
      font-weight: 900;
    }

    .cart-sku-description {
      flex-direction: row;
      display: flex;

      @include mediaSm {
        flex-direction: column;
      }
    }

    h3 {
      margin: 0 0 8px;
      font-family: 'PublicSans', sans-serif;
      font-weight: normal;
      font-size: 18px;
      @media screen and (max-width: 768px) {
        font-size: 14px;
      }
    }
    p {
      margin: 0;
      font-family: 'PublicSans', sans-serif;
      font-size: 14px;
      @media screen and (max-width: 768px) {
        font-size: 12px;
      }
    }
  }
}

.popup-header {
  font-size: 1.8rem;
  padding: 1rem 0;
  @media screen and (max-width: 768px) {
    font-size: 19px;
  }
}

.popup-body {
  max-width: 100%;

  .popup-body-text {
    font-size: 16px;
    padding-bottom: 2rem;
    @media screen and (max-width: 768px) {
      font-size: 14px;
    }
  }
}

.popup-footer {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;

  div {
    margin-right: 1rem;
    cursor: pointer;
    padding: 12px 50px;
    font-size: 20px;
    border: 4px solid black;
    @media screen and (max-width: 768px) {
      font-size: 14px;
      padding: 3px 5px;
    }
  }

  .link-button {
    text-decoration: underline;
    border: none;
    transition: color 0.5s;
    font-size: 1em;
    width: 100%;
  }

  .link-button:hover {
    color: #ed9075;
  }

  .block-button {
    width: 100%;
    background-color: #000;
    color: #fff;
    transition: background-color 0.5s, border-color 0.5s;
    margin-bottom: 0.5em;
    line-height: 1.5rem;
  }

  .block-button:hover {
    background-color: #ed9075;
    border-color: #ed9075;
  }
}
</style>

<script lang="jsx">
import classnames from "classnames";
import GlobalHeader from "@/components/GlobalHeader";
import PopUp from "@/components/PopUp";
import Loading from "@/components/Loading.vue";

import { getProductDetails } from "@/api/products";
import { addItemToCart, getCarts, deleteItemFromCart } from "@/api/carts";
import { trackAddToCart } from "@/utils/analytics.js";
import { isPrescriptionBased } from "@/utils/categories.js";

import collection from "lodash/collection";
import _ from "lodash";
import { mapGetters } from "vuex";

export default {
  name: "SelectPriceOptions",
  data() {
    return {
      productData: undefined,
      selectedPlan: undefined,
      quantity: 1,
      multiProductOptionsSku: undefined,
      selectedSku: undefined,
      productIdOrSlug: undefined,
      duplicatedCart: undefined,
    };
  },
  watch: {
    id() {
      this.getData();
    },
    multiProductOptionSku() {
      this.multiProductOptionSku;
    },
  },
  // eslint-disable-next-line vue/order-in-components
  computed: {
    ...mapGetters(["getCartList"]),
    authenticated() {
      return this.$store.state.authenticated;
    },
    isProductOptionExist() {
      return this.productData.product_options && this.productData.product_options.length > 0
    },
    multiProductOptionSku() {
      if (this.productData?.product_options && this.productData.product_options.length > 0) {
        return collection.groupBy(this.productData.product_options, "sku");
      } else {
        return {};
      }
    },
    displayMultiSku: function () {
      if (Object.keys(this.multiProductOptionSku).length === 0) {
        return false
      }

      return (
        Object.values(this.multiProductOptionSku)[0].length > 1 &&
        ["sexual-health", "skincare"].includes(this.productData.category.slug)
      );
    },
    fullDescription() {
      const descriptionQuantity =
        this.duplicatedCart?.quantity *
        (this.duplicatedCart?.product_option_price?.sub_duration_refresh || 1);
      return `${descriptionQuantity}&nbsp;${
        descriptionQuantity > 1 ? "boxes" : "box"
      }${
        this.duplicatedCart?.product_option_price?.desc
          ? `&nbsp;${this.duplicatedCart?.product_option_price?.desc}`
          : ""
      }`;
    },
  },
  async mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      this.productIdOrSlug =
        this.$store.state.addToCartItem[0].id ?? this.$route.params.slug;
      const response = await getProductDetails(this.productIdOrSlug);
      this.productData = response.data.response.product;

      this.selectedSku = response.data.response.product.product_options.length > 0
        ? response.data.response.product.product_options[0].sku 
        : null;
      this.selectedPlan = response.data.response.product.product_options.length > 0
        ? response.data.response.product.product_options[0]
        : undefined;
    },
    track(selectedOption) {
      const { category_id, title, prescription_based, order } =
        this.productData;
      trackAddToCart(
        window,
        { ...selectedOption, category_id, title, prescription_based, order },
        this.quantity
      );
    },
    trackRemoveFromCart(productOptionPriceId) {
      const items =
        this.$store.state.cart.cart?.cart_product_option_prices || [];
      const removedIndex = items.findIndex(
        (data) => data.product_option_price_id == productOptionPriceId
      );
      const removedItem = items.find(
        (data) => data.product_option_price_id == productOptionPriceId
      );

      const { price, product_option } = removedItem.product_option_price;
      const { title, prescription_based, category_id } = product_option.product;
      const category = this.$store.getters["categories/idToSlug"][category_id];

      window?.dataLayer?.push({
        event: "remove_from_cart",
        ecommerce: {
          items: [
            {
              item_name: title,
              item_id: product_option.sku,
              price: price,
              item_category: category,
              item_category_2: isPrescriptionBased(prescription_based),
              item_variant: product_option.name,
              item_list_name: category,
              item_list_id: category_id,
              quantity: removedItem.quantity,
              index: removedIndex,
            },
          ],
        },
        eventCallback: () => {
          window?.dataLayer?.push({ ecommerce: { items: undefined } });
        },
      });
    },
    /**
     * Route controller.
     * If there is `related_products` on product data, proceed to addon page.
     * Else if user is authenticated, proceed to checkout page.
     * Else, proceed to register page.
     */
    proceedNextStep() {
      if (
        this.productData.related_products &&
        this.productData.related_products.length > 0
      ) {
        return this.$router.push(`/product/${this.productIdOrSlug}/addons`);
      }

      if (this.authenticated) {
        return this.$router.push("/checkout");
      } else {
        return this.$router.push("/user/register?fromCheckout");
      }
    },
    /**
     * Add selectedPlan to cart.
     */
    async addToCart(quantity = this.quantity) {
      const {
        product_option_prices: [{ id }],
      } = this.selectedPlan;
      await addItemToCart({
        product_option_price_id: id,
        quantity,
        period_quantity: 0,
        action: this.productData.prescription_based ? "OVERRIDE" : undefined,
      });

      this.track(this.selectedPlan);

      const response = await getCarts();
      this.$store.commit("updateCart", response.data.response);
    },
    /**
     * Reduce selectedPlan count by 1 from cart.
     */
    async reduceFromCart() {
      if (this.duplicatedCart.quantity - 1 === 0) {
        this.trackRemoveFromCart(this.duplicatedCart.product_option_price_id);
        await deleteItemFromCart(
          this.duplicatedCart.cart_id,
          this.duplicatedCart.product_option_price_id
        );
      } else {
        await addItemToCart({
          product_option_price_id: this.duplicatedCart.product_option_price_id,
          // reduce 1 from cart
          quantity: this.duplicatedCart.quantity - 1,
          period_quantity: 0,
          action: this.duplicatedCart.product_option_price.product_option
            .product.prescription_based
            ? "OVERRIDE"
            : undefined,
        });
      }

      const response = await getCarts();
      this.$store.commit("updateCart", response.data.response);
    },
    /**
     * Check if similar product is added to cart.
     * Similar product can be same product with same plan or different plan.
     * If yes, trigger pop up, else process to next page.
     */
    async onSubmit() {
      const cart = await this.getCartList(this.$route.path);

      // First check if same product with same plan is existed on cart
      let duplicatedProduct = cart.products?.find(
        (product) =>
          product.product_option_price.product_option.product_id ===
            this.selectedPlan.product_id &&
          product.product_option_price_id ===
            this.selectedPlan.product_option_prices[0].id
      );

      // If same product with same plan is not existed,
      // check if same product with different plan is existed
      if (!duplicatedProduct) {
        duplicatedProduct = cart.products
          ?.reverse()
          .find(
            (product) =>
              product.product_option_price.product_option.product_id ===
              this.selectedPlan.product_id
          );
      }

      // If similar product is existed, trigger pop up.
      if (duplicatedProduct) {
        this.duplicatedCart = duplicatedProduct;
        this.$refs.duplicatedSelection.openModal();
      } else {
        await this.addToCart();
        this.proceedNextStep();
      }
    },
    /**
     * If the selected plan is same as the plan of duplicated product from cart, do nothing.
     * Else, reduce previous product plan count by 1 and add the new selected plan to cart.
     */
    async updateSelection() {
      if (
        this.duplicatedCart.product_option_price_id !==
        this.selectedPlan.product_option_prices[0].id
      ) {
        await this.reduceFromCart();
        await this.addToCart();
      }

      this.proceedNextStep();
    },
    /**
     * If the selected plan is same as the plan of duplicated product from cart,
     * increase the quantity by 1 to the duplicated product.
     * Else, add the new selected plan to cart.
     */
    async addSelection() {
      if (
        this.duplicatedCart.product_option_price_id !==
        this.selectedPlan.product_option_prices[0].id
      ) {
        await this.addToCart();
      } else {
        await this.addToCart(this.duplicatedCart.quantity + 1);
      }

      this.proceedNextStep();
    },
  },
  render() {
    const onSelectSku = (productOptionId) => () => {
      this.selectedSku = productOptionId;
    };
    const onSelectQuantity = (quantity) => () => {
      this.quantity = quantity;
    };
    const onSelectPlan = (productOptionId) => () => {
      this.selectedPlan = this.productData.product_options.find((option) => {
        return option.id === productOptionId;
      });
    };

    const calcNumBoxes = (option) => {
      return (
        this.quantity *
        (option.product_option_prices[0].sub_duration_refresh || 1)
      );
    };

    const addSelection = this.addSelection;
    const duplicatedCart = this.duplicatedCart;
    const fullDescription = this.fullDescription;
    const multiSku = this.multiProductOptionSku;
    const prescriptionBased = this.productData?.prescription_based;
    const quantityRange =
      multiSku[this.selectedSku] &&
      multiSku[this.selectedSku][0].max_prescribable_quantity;
    const range = _.range(quantityRange);
    const updateSelection = this.updateSelection;

    return (
      <div class="checkout-wrapper">
        <PopUp
          ref="duplicatedSelection"
          scopedSlots={{
            header: function () {
              return (
                <h1 class="popup-header">
                  A similar product is in your cart.{" "}
                </h1>
              );
            },
            body: function () {
              return (
                <div class="popup-body">
                  <div class="popup-body-text">
                    Would you like to update your existing selection?
                  </div>
                  <div class="cart-item">
                    <img
                      class="cart-image"
                      src={
                        duplicatedCart?.product_option_price?.product_option
                          ?.product?.image_thumbnail_arr[0]
                      }
                      alt="cart image"
                    />
                    <div class="cart-product-container">
                      <div class="cart-info">
                        <h3 class="cart-title">
                          {
                            duplicatedCart?.product_option_price?.product_option
                              ?.product.title
                          }
                        </h3>
                        <div>
                          <p>
                            {
                              duplicatedCart?.product_option_price
                                ?.product_option?.name
                            }
                          </p>
                          <p
                            class="cart-sku-description"
                            domPropsInnerHTML={fullDescription}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            },
            footer: function () {
              return (
                <div class="popup-footer">
                  <div class="block-button" onClick={updateSelection}>
                    Update Existing Selection
                  </div>
                  {prescriptionBased ? null : (
                    <div class="link-button" onClick={addSelection}>
                      Add Another
                    </div>
                  )}
                </div>
              );
            },
          }}
        />
        <GlobalHeader showFullLogo />
        <div class="checkout-inner-wrapper">
          <div class="checkout-content">
            <div class="step-wrapper">
              <div>
                <h3 class="step-title">Choose a plan</h3>
                <p class="step-description">
                  {prescriptionBased === 1
                    ? "Don't worry, your doctor will review if this is the right treatment plan for you."
                    : "Take a look at our recommended treatment plan option."}
                </p>
              </div>
              <a class="back-button" onClick={() => this.$router.go(-1)}>
                <font-awesome-icon icon={["fas", "arrow-left"]} />
                Go back
              </a>
            </div>
            <div class="plan-selection">
              {this.productData === undefined ? (
                <Loading />
              ) : (
                <div class="product-details price-options-container">
                  <div class="product-name">
                    {this.productData.active_ingredient ??
                      this.productData.title}
                  </div>
                  <div
                    class="product-description"
                    domPropsInnerHTML={this.productData.desc_1}
                  />
                  {!this.isProductOptionExist ?
                    <div class="tw-flex tw-flex-row tw-bg-white tw-my-5 tw-p-5 tw-rounded-lg">
                      <div class="tw-w-28 tw-hidden md:tw-block">
                        <img src={require(`@/assets/images/product-not-available.png`)} class="tw-h-24 tw-w-24" />
                      </div>
                      <div class="tw-my-auto tw-text-base md:tw-text-lg">
                        <p>We are sorry! This product is currently unavailable.</p>
                        {this.productData.category ?
                        <p>
                          Look at other products for &nbsp;
                          <router-link 
                            to="`/shop/${productData.category.slug}`" 
                            class="tw-text-md md:tw-text-xl tw-underline tw-font-medium hover:tw-text-secondary" 
                          >
                            { this.productData.category.name }
                          </router-link>
                        </p> : null}
                      </div>
                    </div> :
                    <div class="product-plan">
                    {this.displayMultiSku && (
                      <div>
                        <p class="multisku-label">What strength do you need?</p>
                        <div class="multisku-row">
                          {collection.map(multiSku, (value) => {
                            return (
                              <div
                                class={classnames(
                                  "product-plan-option bordered",
                                  {
                                    active: this.selectedSku === value[0].sku,
                                  }
                                )}
                                onClick={onSelectSku(value[0].sku)}
                              >
                                <p>{value[0].name}</p>
                              </div>
                            );
                          })}
                        </div>
                        {range && range.length > 0 && (
                          <div>
                            <p class="multisku-label">
                              How many boxes do you need?
                            </p>
                            <div class="multisku-row">
                              {range.map((number) => {
                                return (
                                  <div
                                    class={classnames(
                                      "product-plan-option bordered",
                                      {
                                        active: this.quantity === number + 1,
                                      }
                                    )}
                                    onClick={onSelectQuantity(number + 1)}
                                  >
                                    <p>
                                      {number + 1}{" "}
                                      {number + 1 > 1 ? "boxes" : "box"} of{" "}
                                      <br />
                                      <span
                                        domPropsInnerHTML={
                                          multiSku[this.selectedSku][0]
                                            .quantity_desc
                                        }
                                      />
                                    </p>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                        <p class="multisku-label">
                          Select your delivery schedule
                        </p>
                        <div class="multisku-row">
                          {multiSku[this.selectedSku].map((option) => {
                            return (
                              <div
                                class={classnames(
                                  "product-plan-option bordered",
                                  {
                                    active: this.selectedPlan?.id === option.id,
                                  }
                                )}
                                onClick={onSelectPlan(option.id)}
                              >
                                <div>
                                  <div class="multisku-duration-display">
                                    <p>
                                      {calcNumBoxes(option)}{" "}
                                      {calcNumBoxes(option) > 1
                                        ? "boxes"
                                        : "box"}
                                      &nbsp;
                                    </p>
                                    <p
                                      domPropsInnerHTML={
                                        option.product_option_prices[0].desc
                                      }
                                    />
                                  </div>
                                  <p
                                    domPropsInnerHTML={`$${
                                      option.product_option_prices[0].price *
                                      this.quantity
                                    }`}
                                  />
                                  <p
                                    class="multisku-pricedesc"
                                    domPropsInnerHTML={`${option.product_option_prices[0].price_desc}`}
                                  />
                                  {!!option.product_option_prices[0]
                                    .discount_desc && (
                                    <div
                                      class="product-plan-option-discount-tag multiSku"
                                      domPropsInnerHTML={
                                        option.product_option_prices[0]
                                          .discount_desc
                                      }
                                    />
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                    {!this.displayMultiSku &&
                      this.productData.product_options.map((option) => (
                        <div
                          class={classnames("product-plan-option", {
                            active: this.selectedPlan?.id === option.id,
                          })}
                          onClick={onSelectPlan(option.id)}
                        >
                          <div class="product-plan-option-name">
                            {option.name}
                          </div>
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
                        </div>
                      ))}
                  </div>
                  }
                  {this.selectedPlan !== undefined && (
                    <button
                      class={classnames("submit-button", {
                        disabled: !this.selectedPlan.cta_enabled,
                      })}
                      onClick={this.onSubmit}
                      disabled={!this.selectedPlan.cta_enabled}
                      style={
                        !this.selectedPlan.cta_enabled
                          ? { backgroundColor: "grey", cursor: "not-allowed" }
                          : null
                      }
                    >
                      NEXT
                    </button>
                  )}
                  {this.isProductOptionExist && this.productData.desc_2 && (
                    <div
                      class="product-remark"
                      domPropsInnerHTML={this.productData.desc_2}
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  },
};
</script>
