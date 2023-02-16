<style lang="scss" scoped>
.subscription-product-row {
  display: grid;
  grid-template-columns: auto 2fr;
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
    @media screen and (max-width: 768px) {
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
    justify-content: space-between;

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
        font-size: 15px;
      }
    }
    .product-price {
      font-family: PublicSansExtraBold, sans-serif;
      font-size: 1.375rem;
      color: #ed9075;

      @media screen and (max-width: 768px) {
        margin-left: 30px;
      }
    }
  }
}
</style>
<script lang="jsx">
export default {
  props: ["products"],
  methods:{
  },
  render() {
    return (
      <div>
        {this.products.map(({ product_option_price }) => (
          <div class="subscription-product-row">
            <img
              src={product_option_price.product_option.product.image_thumbnail_arr[0]}
              alt="product images"
            />
            <div>
              <div class="product-title">
                {product_option_price.product_option.product.title}
              </div>
              <div
                class="product-desc"
                domPropsInnerHTML={
                  product_option_price.product_option.product.desc_1
                }
              />
            </div>
          </div>
        ))}
      </div>
    );
  },
};
</script>
