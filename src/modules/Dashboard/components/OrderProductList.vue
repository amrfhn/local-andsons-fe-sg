<style lang="scss" scoped>
.order-product-row {
  display: grid;
  grid-template-columns: auto 2fr 1fr;
  margin-bottom: 32px;
  align-items: center;

  @media screen and (max-width: 768px) {
    grid-template-columns: auto;
  }

  &:last-child {
    margin-bottom: 0;
  }
  img {
    width: 100px;
    height: 100px;
    margin-right: 32px;
    background: $springwood-background;

    @media screen and (max-width: 670px) {
      align-self: flex-start;
      margin-bottom: 1rem;
    }
  }
  .product-title {
    font-family: PublicSansExtraBold, sans-serif;
    font-size: 1.375rem;
    @media screen and (max-width: 670px) {
      font-size: 1rem;
    }
  }
  .product-desc {
    font-family: PublicSans, monospace;
    font-size: 18px;
    margin-top: 8px;
    width: 80%;

    @media screen and (max-width: 670px) {
      width: 100%;
    }

    @media screen and (max-width: 400px) {
      font-size: 0.875rem;
    }
  }

  .purchased-info {
    display: flex;
    align-items: center;
    justify-content: flex-end;

    @media screen and (max-width: 768px) {
      margin-top: 1rem;
      flex-grow: 1;
      width: 100%;
      justify-content: flex-end;
    }

    .product-qty {
      font-family: PublicSans, monospace;
      font-size: 1.125rem;
      white-space: nowrap;

      @media screen and (max-width: 768px) {
        margin-left: 0;
      }

      @media screen and (max-width: 400px) {
        font-size: 0.875rem;
      }
    }
    .product-price {
      font-family: PublicSansExtraBold, sans-serif;
      font-size: 1.375rem;
      color: #ed9075;

      @media screen and (max-width: 768px) {
        margin-left: 30px;
      }
      @media screen and (max-width: 400px) {
        font-size: 0.875rem;
      }
    }
  }
}
</style>
<script lang="jsx">
export default {
  props: ["products"],
  methods: {
    actualQuantity(quantity, product_option_price) {
      const { sku_quantity } = product_option_price;
      return quantity / sku_quantity;
    },
    convertToFloat(price, quantity, product_option_price) {
      const { sub_duration_refresh } = product_option_price;
      const calcQuantity = this.actualQuantity(quantity, product_option_price);
      if (sub_duration_refresh) {
        return price;
      } else {
        return (calcQuantity * price).toFixed(2);
      }
    },
  },
  render() {
    return (
      <div>
        {this.products.map(({ product_option_price, quantity, price }) => (
          <div class="order-product-row">
            <img
              src={
                product_option_price.product_option.product
                  .image_thumbnail_arr[0]
              }
              alt="product image"
            />
            <div>
              <div class="product-title">
                {product_option_price.product_option.product.title}
              </div>
              <div
                class="product-desc"
                domPropsInnerHTML={product_option_price.product_option.name}
              />
              <div
                class="product-desc"
                style={{ flexDirection: "row", display: "flex" }}
                domPropsInnerHTML={`${quantity} box${
                  quantity > 1 ? "es" : ""
                }&nbsp; ${product_option_price.desc}`}
              />
            </div>
            <div class="purchased-info">
              <div class="product-price">
                ${this.convertToFloat(price, quantity, product_option_price)}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  },
};
</script>
