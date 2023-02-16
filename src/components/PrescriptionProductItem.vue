<style lang="scss" scoped>
.rx-product-item {
  position: relative;
  text-align: center;
  max-width: 790px;
  max-height: 790px;
  text-decoration: none;
  padding: 1rem 3rem;
  // margin: 0 3rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: $greenwhite-background;

  @media screen and (max-width: 768px) {
    padding: 2.5rem 1.5rem 0;
  }

  @media screen and (max-width: 450px) {
    padding: 2rem;
    margin: 0;
  }

  // .product-link-area {
  // cursor: pointer;
  // }

  .product-image-wrapper {
    position: relative;
    margin: 2em 0;

    @include mediaSm {
      padding-bottom: 2em;
      margin-top: 0;
    }

    .product-image {
      position: relative;
      z-index: 1;
    }

    .product-background {
      position: absolute;
      margin-left: auto;
      margin-right: auto;
      left: 0;
      right: 0;
      text-align: center;
    }

    .product-image,
    .product-background {
      width: 80%;
      max-width: 500px;
      max-height: 500px;
      height: auto;

      @media screen and (max-width: 768px) {
        max-width: 400px;
      }

      @media screen and (max-width: 450px) {
        width: 70%;
      }
    }
  }

  .product-content {
    display: flex;
    flex-direction: column;
    // margin-top: -3vw;

    @media screen and (max-width: 768px) {
      margin-top: -10vw;
    }
  }

  .product-title {
    font-family: PublicSansExtraBold, sans-serif;
    font-size: 2rem;
    padding-bottom: 1rem;
  }
  .product-description {
    font-family: PublicSans, monospace;
    font-size: 16px;
    overflow: hidden;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    padding: 0 10%;

    @media screen and (max-width: 768px) {
      font-size: 1rem;
      height: initial;
      line-height: 1.4;
      -webkit-line-clamp: unset;
    }

    @media screen and (max-width: 450px) {
      padding: 0;
    }
  }

  .product-contains {
    display: flex;
    text-align: left;
    justify-content: center;
    border-top: 1px solid black;
    margin-left: auto;
    margin-right: auto;
    margin-top: 1rem;
    padding-top: 1rem;

    .product-includes {
      margin-right: 1rem;
    }
  }

  .prescription-tag-container {
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    text-align: center;

    @media screen and (max-width: 450px) {
      left: 0;
      text-align: left;
    }
  }
  .prescription-tag {
    // top: 3%;
    color: #fff;
    background: #ed9075;
    font-family: PublicSans, monospace;
    font-size: 1rem;
    padding: 8px 16px;
    //min-width: 40%;
    z-index: 10;
    border-radius: 4px 4px 4px 4px;
    display: inline-block;

    @media screen and (max-width: 768px) {
      font-size: 1rem;
    }

    @media screen and (max-width: 410px) {
      font-size: 0.8rem;
      border-radius: 0 4px 4px 0;
    }
  }
  .price {
    background: url('../assets/images/catalogue/price-tag.png') center no-repeat;
    background-size: contain;
    font-family: PublicSans, monospace;
    font-size: 1.125rem;
    padding: 8px 16px;
    align-self: center;
    display: table;
    z-index: 10;
    bottom: 0;
    right: 0;
    margin: 2rem 0;

    @media screen and (max-width: 768px) {
      position: initial;
      align-self: center;
      font-size: 1rem;
      margin: 1rem 0;
    }
  }

  .view-product-button {
    cursor: pointer;
    margin: 1rem auto 0;
    background: #000;
    color: #fff;
    text-align: center;
    font-family: PublicSansExtraBold, sans-serif;
    font-size: 1rem;
    letter-spacing: 1.2px;
    opacity: 1;
    display: flex;
    justify-content: center;
    padding: 1.4rem 2rem;
    width: 100%;

    @media screen and (max-width: 768px) {
      font-size: 0.9rem;
    }

    @media screen and (max-width: 450px) {
      width: 100%;
      padding: 1rem;
    }
  }
  .product-image,
  .product-title,
  .product-description,
  .product-image-hover,
  .view-product-button {
    transition: all 0.3s;
  }

  // @media screen and (min-width:769px) {
  //   &:hover {
  //   .product-image {
  //     transform: rotate(3deg);
  //   }
  //   .product-title,
  //   .product-description {
  //     opacity: 0;
  //   }
  //   .product-image-hover,
  //   .view-product-button {
  //     opacity: 1;
  //   }
  // }

  // }
}
</style>

<script lang="jsx">

// import { getCarts } from "@/api/carts";
// import { eventBus } from "@/main.js";
// import { getProductDetails } from "@/api/products";
import ProductItemModal from "@/components/ProductItemModal"
import { isPrescriptionBased } from "@/utils/categories.js";
// import {trackAddToCart} from "@/utils/analytics.js";

export default {
  name: "ProductItem",
  components: {
    ProductItemModal
  },
  props: ["productInfo"],
  methods:{
    trackSelectItem() {
      const {title, category_id, order, productOptions, isPrescriptionProduct} = this.productInfo;
      const {sku, product_option_prices} = productOptions[0];
      const category = this.$store.getters["categories/idToSlug"][category_id];

      window?.dataLayer?.push({
        event: 'select_item',
        ecommerce: {
          items: [{
            item_name: title,
            item_id: sku,
            price: product_option_prices[0].price,
            item_category: category,
            item_category_2: isPrescriptionBased(isPrescriptionProduct),
            item_list_name: category,
            item_list_id: category_id,
            index: order,
            quantity: 1,
          }]
        },
        eventCallback: () => {
          window?.dataLayer?.push({ecommerce: { items: undefined }});
        }
      });
    },
  },
  render() {
    const openQuestionnaire = async() => {
      /*
      getCarts().then((response) => {
        this.$store.commit("updateCart", response.data.response);
      });
      this.$store.commit('updateAddToCartItem', [{
        id: this.productInfo.id,
        isMultiplePrice: this.productInfo.isMultiplePrice,
        slug: this.productInfo.slug
      }])
      */
      await this.$router.push(`/evaluation/${this.productInfo.category_id}/start`);
    }

    const {
      isPrescriptionProduct,
      // imageThumbnail,
      // imageBg,
      title,
      short_desc,
      sub_products,
      productOptions
    } = this.productInfo;

    return (
      <div class="rx-product-item">
        <div class="product-link-area">
          <div class="product-content" style={{padding: '2rem 1rem'}}>
            <div class="product-title">{title}</div>
            <div
              class="product-description"
              domPropsInnerHTML={short_desc}
            />
            <div class="product-contains">
              <p class="product-includes">Includes:</p>
              <div>
                {sub_products && sub_products.map((sub_product) => (
                  <p>{sub_product.title}</p>
                ))}
                {sub_products.length < 1 && (
                  <p>{title}</p>
                )}
              </div>
            </div>
          </div>
        </div>
        {isPrescriptionProduct && (
          <div class="view-product-button" onClick={openQuestionnaire}>
            {productOptions[0] ? productOptions[0].cta : "START EVALUATION"}
          </div>
        )}
        {/* this.productInfo.isPrescriptionProduct && (
          <div class="prescription-tag-container">
            <div class="prescription-tag">Prescription product</div>
          </div>
        )*/}
      </div>
    );
  },
};
</script>
