<template>
  <div id="akil">
    <div
      class="view-product-button tw-w-full tw-text-center tw-px-5 tw-py-3 md:tw-py-5 tw-mt-2 md:tw-mt-3 md:tw-mx-auto"
      :style="
        productOptions && !productOptions[0].cta_enabled ? { backgroundColor: 'grey', cursor: 'not-allowed' } : null
      "
      @click="productOptions[0].cta_enabled ? (showModal = true) : null"
    >
      {{ isPrescriptionProduct || productOptions.length === 0 ? 'START EVALUATION' : productOptions[0].cta }}
    </div>
    <transition name="fade" appear>
      <div v-if="showModal" id="overlay" @click="showModal = false"></div>
    </transition>
    <transition name="slide" appear>
      <div v-if="showModal" class="modal">
        <div class="modal-header">
          <span v-if="isPrescriptionProduct" class="modal-header-title">Prescription Product</span>
          <span class="close-button" @click="showModal = false"><img src="./../assets/images/close.svg" alt="X"/></span>
        </div>
        <div class="item">
          <h1 class="item-title">{{ title }}</h1>
          <div class="item-subtitle" v-html="short_desc"></div>
        </div>
        <div v-for="(option, index) in productOptions" :key="option.id">
          <div
            v-if="option.status"
            :class="{ 'product-plan-option': true, active: index === selected }"
            @click="selectChoice(option, index)"
          >
            <div class="product-name">{{ option.name }}</div>
            <div v-html="option.product_option_prices[0].price_desc"></div>

            <div
              v-if="!!option.product_option_prices[0].discount_desc"
              class="product-plan-option-discount-tag"
              v-html="option.product_option_prices[0].discount_desc"
            ></div>
          </div>
        </div>
        <button
          class="view-product-button tw-w-full tw-text-center tw-px-5 tw-py-3 md:tw-py-5 tw-mt-2 md:tw-mt-3 md:tw-mx-auto"
          :style="!productOptions[selected].cta_enabled ? { backgroundColor: 'grey', cursor: 'not-allowed' } : null"
          @click="productOptions[selected].cta_enabled ? submitItem() : null"
        >
          {{ productOptions[selected].cta }}
        </button>
      </div>
    </transition>
  </div>
</template>

<script>
import { addItemToCart, getCarts } from '@/api/carts'
import { eventBus } from '@/main.js'
import { trackAddToCart } from '@/utils/analytics.js'
import _ from 'lodash'

export default {
  name: 'ProductItemModal',
  props: {
    id: { required: true, type: Number },
    category_id: { required: true, type: Number },
    order: { required: true, type: Number },
    title: { required: true, type: String },
    short_desc: { required: true, type: String },
    isPrescriptionProduct: { required: true, type: Boolean },
    productOptions: { default: () => [] }
  },
  data() {
    return {
      showModal: false,
      selected: 0,
      item: {}
    }
  },
  computed: {
    getCloseIcon() {
      return './../assets/images/close.svg'
    }
  },
  methods: {
    selectChoice(item, index) {
      this.selected = index
      this.item = item
    },
    submitItem: _.debounce(
      async function() {
        const selectedOption = this.productOptions[this.selected]
        const productOptionPriceId = selectedOption.product_option_prices[0].id
        await addItemToCart({
          product_option_price_id: productOptionPriceId,
          quantity: 1,
          period_quantity: 0
        })
        getCarts().then((response) => {
          this.$store.commit('updateCart', response.data.response)
          this.showModal = false
          eventBus.$emit('toggleNavBar', true)
        })
        trackAddToCart(window, {
          ...selectedOption,
          category_id: this.category_id,
          title: this.title,
          prescription_based: this.prescription_based,
          order: this.order
        })
      },
      1000, //Debounce 1 second
      {
        leading: true,
        trailing: false
      }
    )
  }
}
</script>

<style lang="scss" scoped>
#overlay {
  position: fixed;
  display: block;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 98;
  cursor: pointer;
}
.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 99;
  padding: 25px;
  width: 100%;
  max-width: 450px;
  background-color: #fff;
  border-radius: 5px;
  max-height: 90vh;
  overflow: auto;

  @media screen and (max-width: 450px) {
    width: 90vw;
  }
  //   transition: ;
}

.modal-header {
  text-align: left;
  font-size: 22px;
  margin-bottom: 5px;
  @media screen and (max-width: 400px) {
    font-size: 16px;
  }
}
img {
  height: 15px;
  width: 15px;
  cursor: pointer;
}
.modal-header-title {
  color: #ed9075;
  font-size: 18px;

  @media screen and (max-width: 450px) {
    font-size: 15px;
  }
}
.close-button {
  position: absolute;
  cursor: pointer;
  top: 3%;
  right: 2%;
  @media screen and (max-width: 400px) {
    right: 5%;
  }
}
.item {
  text-align: left;
  margin: 1.5rem 0;
}

.item-title {
  font-size: 1.8rem;
  @media screen and (max-width: 450px) {
    font-size: 1.3rem;
  }
}

.item-subtitle {
  margin-top: 1rem;
}

.item-subtitle,
.item-description {
  font-size: 16px;

  @media screen and (max-width: 450px) {
    font-size: 14px;
  }
}

.item-description {
  text-align: left;
  margin-bottom: 2rem;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.product-plan-option {
  display: flex;
  // flex-wrap: wrap;
  cursor: pointer;
  justify-content: space-between;
  align-items: center;
  padding: 25px;
  font-size: 16px;
  background: fff(221, 221, 221);
  margin: 8px 0;
  border: 3px solid #e0e0e0;
  transition: all 0.1s;
  position: relative;
  @media screen and (max-width: 450px) {
    font-size: 14px;
    padding: 15px;
  }

  .product-name {
    text-align: left;
    margin-right: 1rem;
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
    border: 3px solid #ed9075;
    .product-plan-option-extra {
      display: block;
    }
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
  // width: max-content; //Uncomment this.
  border: none;

  // Comment this out
  // &.inverted {
  //   width: 80%;
  //   margin: 1rem 0;
  // }

  &.disabled {
    background: rgba(56, 56, 56, 0.863);
    cursor: default;
  }

  @media screen and (max-width: 768px) {
    font-size: 0.9rem;
    width: 100%;
  }
}
</style>
