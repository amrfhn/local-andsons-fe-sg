<script lang="jsx">
import GlobalHeader from "@/components/GlobalHeader";
import Loading from "@/components/Loading";
import { getProducts } from "@/api/products";
// import { trackAddToCart } from "@/utils/analytics.js";
import { formatMetaTags } from "@/utils/prettify.js";

export default {
  name: "CategoryPrescriptionItemSelection",
  metaInfo() {
    let metaInfo = {};
    if (this.$route.params.categorySlug === "supplements") {
      metaInfo = {
        title: "Select a Plan from Our Recommended Supplement Options",
        description:
          "From $49/month, you can get our recommended supplement options as part of your well-being improvement plans. Choose between our 3 or 6 months packages now.",
        urlPath: this.$route.path,
      };
    }

    return formatMetaTags(metaInfo);
  },
  data() {
    return {
      prescriptionProducts: undefined,
      selectedProduct: undefined,
      hiddenProducts: undefined,
      showcaseProducts: undefined,
      stepTitle: "Select a plan",

      kitOptions: [],
      nonKitOptions: [],
    };
  },
  computed: {
    authenticated: function () {
      return this.$store.state.authenticated;
    },
    recommendedProduct: function () {
      let recommended = "hair-loss-essential-kit";
      //  Sets the list of recommended products
      switch (this.$route.categorySlug) {
        case "hair-loss":
          recommended = "hair-loss-essential-kit";
          break;
      }

      if (this.getRecommendedProduct()) {
        recommended = this.getRecommendedProduct();
      }

      return recommended;
    },
    hasKitOptions: function () {
      return this.kitOptions?.length > 0;
    },
    hasNonKitOptions: function () {
      return this.nonKitOptions?.length > 0;
    },
    isLoading: function () {
      return this.kitOptions?.length === 0 && this.nonKitOptions?.length === 0;
    },
  },
  watch: {
    id() {
      this.getData();
    },
    prescriptionProducts() {
      // const hairlossEssential = this.prescriptionProducts.find(p => p.id == 4);
      // this.selectedProduct = hairlossEssential ?? this.prescriptionProducts[0];
      // this.selectedProduct = this.prescriptionProducts.find(product => product.slug === this.recommendedProduct) ?? this.prescriptionProducts[0];
      // this.selectedProduct = this.hasKitOptions ? this.kitOptions[0] : this.nonKitOptions[0];
      const recommendedProduct = this.prescriptionProducts.find(
        (product) => product.slug === this.recommendedProduct
      );
      if (recommendedProduct) {
        this.selectedProduct = recommendedProduct;
      } else {
        this.selectedProduct = this.hasKitOptions
          ? this.kitOptions[0]
          : this.nonKitOptions[0];
      }
    },
  },
  async mounted() {
    await this.$store.dispatch("categories/fetchCategories");
    this.getData();
  },
  methods: {
    getRecommendedProduct() {
      return (
        this.$route.query.recommended ||
        localStorage.getItem("recommended_product")
      );
    },
    async getData() {
      /**
       * Keep this code temporarily for posterity
       *
       * const response = await getProducts({ type: "ALL", category_id: this.$store.getters['categories/slugToId'][this.$route.params.categorySlug] })
       */
      const response = await getProducts({
        type: "ALL",
        category_id: this.$route.params.categorySlug,
      });
      if (response.data.response.data) {
        //const products = response.data.response.data.filter((item) => item.type !== "Consultation" && item.product_options?.length > 0);
        const products = response.data.response.data.filter((item) => {
          //  Only display non consultation and non addon products with product options
          return (
            !["Consultation", "addon-product"].includes(item.type) &&
            item.product_options?.length > 0
          );
        });
        this.prescriptionProducts = products;

        /*
        this.hiddenRxProducts = products.filter((item) => item.type == "Hidden Product");
        this.hiddenNonRxProducts = products.filter((item) => !item.title.match(/Kit/) && item.type !== "Hidden Product");

        if (this.$route.params.categorySlug == "hair-loss") {
          this.showcaseProducts =  products.filter((item) => item.title.match(/Kit/));
        } else {
          this.showcaseProducts =  products.filter((item) => !["Hidden Product", "addon-product"].includes(item.type));
        }

        //  sort by recommended
        this.showcaseProducts.sort((firstProduct) => {
          return firstProduct.slug === this.recommendedProduct ? -1 : 1
        })
        */

        this.kitOptions = products.filter((item) => item.title.match(/Kit|Bundle/));
        this.nonKitOptions = products.filter(
          (item) => !item.title.match(/Kit|Bundle/)
        );

        this.kitOptions.sort((firstProduct) => {
          return firstProduct.slug === this.recommendedProduct ? -1 : 1;
        });
        this.nonKitOptions.sort((firstProduct) => {
          return firstProduct.slug === this.recommendedProduct ? -1 : 1;
        });
      }
    },
  },
  render() {
    const onSelectProduct = (productId) => () => {
      this.selectedProduct = this.prescriptionProducts.find((product) => {
        return product.id === productId;
      });
    };
    const onSubmit = () => {
      return this.$router.push(`/product/${this.selectedProduct.slug}/options`);
    };
    // const track = (selectedOption) => {
    //   const {category_id, title, prescription_based, order} = this.productData;
    //   trackAddToCart(
    //     window,
    //     {...selectedOption, category_id, title, prescription_based, order},
    //     this.quantity
    //   );
    // }
    const productSelection = (product) => {
      return (
        <div
          class={`product-plan-option ${
            this.selectedProduct?.id === product.id ? "active" : ""
          } ${product.slug === this.recommendedProduct ? "recommended" : ""}`}
          onClick={onSelectProduct(product.id)}
        >
          {product.sub_products?.length < 1 && (
            <div class="product-image tw-hidden md:tw-flex tw-mr-4 tw-mt-1">
              <img src={product.image_thumbnail_arr} width="70px" />
            </div>
          )}
          <div class="product-deets">
            <div class="product-plan-details tw-flex-col md:tw-flex-row md:tw-items-center">
              <h2 class="product-plan-option-name tw-flex">
                {product.active_ingredient ?? product.title}
              </h2>
              <div
                class="product-plan-option-price tw-flex"
                domPropsInnerHTML={product.price_desc}
              />
            </div>
            <div
              style={{ fontSize: "16px" }}
              domPropsInnerHTML={product.short_desc}
            />
            {product.sub_products?.length > 1 && (
              <div class="product-contains">
                <p class="product-includes">Includes:</p>
                <div>
                  {product.sub_products &&
                    product.sub_products.map((sub_product) => (
                      <div class="product-includes-list">
                        <img
                          src={sub_product.image_thumbnail_arr}
                          width="50px"
                          class="tw-mr-2"
                        />
                        <p>
                          {sub_product.active_ingredient || sub_product.title}
                        </p>
                      </div>
                    ))}
                </div>
              </div>
            )}
            {product.slug === this.recommendedProduct && (
              <div class="tag">Recommended For You</div>
            )}
          </div>
        </div>
      );
    };
    return (
      <div class="checkout-wrapper">
        <GlobalHeader showFullLogo />
        <div class="checkout-inner-wrapper">
          <div class="checkout-content d-column">
            <div class="step-wrapper">
              <h3 class="step-title">{this.stepTitle}</h3>
              <p class="step-description">
                {this.showcaseProducts?.some(
                  (product) => product.prescription_based === 1
                )
                  ? "Don't worry, your doctor will review if this is the right treatment plan for you."
                  : "Take a look at our recommended treatment plan options."}
              </p>
            </div>
            <div class="product-details price-options-container">
              <div class="product-plan">
                {
                  /* Loading */
                  this.isLoading && (
                    <div id="loading-container">
                      <Loading />
                    </div>
                  )
                }
                {
                  /* Kit Options */
                  this.hasKitOptions &&
                    this.kitOptions.map((product) => productSelection(product))
                }
              </div>

              {/* Non Kit Options */}
              <div class="non-kit-options-list">
                {this.hasKitOptions && this.hasNonKitOptions && (
                  <div class="tw-text-3xl tw-font-bold tw-mb-3 tw-mt-10">
                    Non-Kit Options
                  </div>
                )}
                {this.hasNonKitOptions &&
                  this.nonKitOptions.map((product) =>
                    productSelection(product)
                  )}
              </div>
              {this.selectedProduct !== undefined && (
                <button class="submit-button" onClick={onSubmit}>
                  NEXT
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  },
};
</script>

<style lang="scss" scoped>
/deep/ .product-details {
  ul {
    list-style-type: disc;
  }
}
.non-kit-options-list {
  .description {
    font-size: 16px;
    display: flex;
    margin-bottom: 20px;

    @include mediaSm {
      margin-bottom: 0;
      flex-direction: column;
    }
  }

  .option {
    font-size: 1.75rem;
    font-family: PublicSansBold, sans-serif;
    margin: 2em 0.5rem 0.5rem 0.5rem;
  }
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

  @media screen and (max-width: 991px) {
    padding: 4rem calc(30px);
  }

  @media screen and (max-width: 768px) {
    padding: 0;
    flex-direction: column;
  }

  .product-plan {
    display: flex;
    flex-direction: column;
  }

  #loading-container {
    min-height: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &.d-row {
    flex-direction: column;
    justify-content: center;

    .product-plan {
      display: flex;
      flex-direction: row;

      @include mediaSm {
        flex-direction: column;
      }

      .product-plan-option {
        justify-content: space-between;
        display: flex;
        flex-direction: column;

        .product-deets {
          margin-left: 0;
        }

        .product-plan-details {
          padding-bottom: 1.5rem;

          @include mediaSm {
            flex-direction: column;
          }
        }
      }
    }

    .step-wrapper {
      width: 100%;
      text-align: center;
      margin-bottom: 2rem;
    }

    .price-options-container {
      margin: 0 1rem 40px 1rem;
    }
  }
}

.step-wrapper {
  max-width: 330px;
  background-color: #f2f2ec;
  border-radius: 10px;
  height: fit-content;

  @media screen and (max-width: 768px) {
    & {
      max-width: 100%;
      width: 90%;
      margin-bottom: 20px;
      margin-left: auto;
      margin-right: auto;
    }
  }
  .step-title {
    padding: 20px;
    font-family: PublicSansExtraBold, monospace;
    font-size: 2rem;
  }
  .step-description {
    padding: 0 20px 20px 20px;
    font-family: PublicSans, monospace;
    font-size: 18px;
    line-height: 1.4;

    @include mediaSm {
      padding-top: 0;
    }
  }
}

.price-options-container {
  width: 100%;
  margin: 0 0 40px 8rem;

  @include mediaMd {
    margin: 0 0 40px 4rem;
  }
  @include mediaSm {
    width: auto;
    margin: 0 1.7rem 40px 1.7rem;
  }

  .product-plan,
  .non-kit-options-list {
    font-family: PublicSans, monospace;

    .product-plan-title {
      font-size: 1.125rem;
      @media screen and (max-width: 768px) {
        font-size: 1rem;
      }
    }
    .product-plan-option {
      flex-basis: 50%;
      cursor: pointer;
      // justify-content: space-between;
      padding: 25px;
      margin: 0px 0 12px 0;
      font-size: 1.125rem;
      background: #fff;
      border: 3px solid #fff;
      transition: all 0.1s;
      position: relative;
      flex-direction: row;
      display: flex;

      @include mediaSm {
        padding: 10px;
        font-size: 1rem;
        flex-direction: column;
      }

      .product-deets {
        width: 100%;
        @include mediaSm {
          margin-left: 0.5rem;
        }
      }
      .product-plan-details {
        display: flex;
        justify-content: space-between;
        padding-bottom: 10px;
      }

      .product-plan-option-price {
        text-align: right;
      }

      .product-plan-option-name {
        font-size: 1.5rem;
        font-family: PublicSansBold, sans-serif;
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

        @include mediaSm {
          right: 12px;
        }
      }
      &.active {
        border: 3px solid $apricot-text;
        .product-plan-option-extra {
          display: block;
        }
      }
      &.recommended {
        padding-top: 2.6rem;

        &.active {
          border: 3px solid $apricot-text;
        }

        /deep/.tag {
          font-family: PublicSansBold, sans-serif;
          width: calc(100% + 6px);
          position: absolute;
          left: -3px;
          top: -4px;
          background: $apricot-text;
          color: #fff;
          padding: 5px 20px;
          font-size: 0.8rem;
          text-transform: uppercase;
          text-align: center;
          letter-spacing: 1.5px;
        }
      }
    }
  }
}

.product-contains {
  display: flex;
  text-align: left;
  border-top: 1px solid black;
  margin-top: 1.5rem;
  padding-top: 1rem;
  font-size: 1rem;
  width: fit-content;

  .product-includes {
    margin-right: 1rem;
  }
  .product-includes-list {
    display: flex;
    // justify-content: center;
    align-items: center;
    flex-direction: row;
  }
}

.submit-button {
  margin-left: auto;
}
</style>
