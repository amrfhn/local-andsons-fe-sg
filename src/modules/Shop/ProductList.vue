<template>
  <div id="product-listing" class="product-listing">
    <div v-show="prescribedProducts.length" class="products-container">
      <h3 class="title">
        {{ $route.params.slug === 'hair-loss' ? 'Hair Loss' : 'ED' }}
        Treatments.
      </h3>
      <p class="description">
        Take an online consultation. Our doctors will then recommend the best treatment for you.
      </p>
      <div class="products three-column">
        <PrescriptionProductItem v-for="p in prescribedProducts" :key="p.id" v-bind="p" />
      </div>
    </div>
    <div v-show="nonPrescribedProducts.length" class="products-container">
      <h3 class="title">
        Get healthier, fuller-looking hair with these products.
      </h3>
      <p class="description">
        Made with key ingredients to give your hair the right nutrients.
      </p>
      <div class="products">
        <ProductItem v-for="p in productList" :key="p.id" v-bind="p" />
      </div>
    </div>
    <div class="trust-section">
      <p class="trust-title">
        Get access to doctor consultations and treatments.
      </p>
      <p class="trust-description">Book an <mark>online consultation</mark> with {{ "andSons' doctors." }}</p>
      <router-link
        class="view-product-button"
        :to="(`/evaluation/${$route.params.catalogue}` === 'hair-loss' ? '1' : '2') + '/start'"
      >
        GET STARTED
      </router-link>
    </div>
  </div>
</template>

<script>
// import Field from "@/components/Field";
import ProductItem from '@/components/ProductItem'

export default {
  components: { ProductItem },
  props: ['productList', 'prescribedProducts', 'nonPrescribedProducts']
}
</script>

<style lang="scss" scoped>
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
  width: 20%;
  text-decoration: none;

  @media screen and (max-width: 768px) {
    font-size: 0.9rem;
  }

  @media screen and (max-width: 450px) {
    width: 100%;
    padding: 1rem;
  }
}
.trust-section {
  text-align: center;
  padding: 100px 0;
  background-color: $greenwhite-background;
  @media screen and (max-width: 768px) {
    padding: 50px 20px;
  }
  .trust-title {
    color: $black-text;
    font-family: 'PublicSansExtraBold', sans-serif;
    font-size: clamp(2rem, 3vw, 3rem);
    padding-bottom: 1rem;
  }
  .trust-description {
    font-family: 'PublicSans', sans-serif;
    font-size: clamp(1.5rem, 3vw, 2rem);
    line-height: 1.5;

    @include mediaSm {
      font-size: 18px;
    }
  }
}
.product-listing {
  background: $springwood-background;
  overflow: hidden;

  .products-container {
    padding-top: 4rem;

    .title {
      text-align: center;
      color: $black-text;
      font-family: 'PublicSansExtraBold', sans-serif;
      font-size: clamp(2rem, 3vw, 3rem);
      padding-bottom: 1rem;
    }
    .description {
      text-align: center;
      font-family: 'PublicSans', sans-serif;
      font-size: 20px;
      line-height: 1.5;
    }
  }

  .catalogue-tabs {
    display: flex;
    padding: 32px calc(5vw + 30px);
    flex-wrap: wrap;
    @media screen and (max-width: 768px) {
      display: none;
    }
    .tab-option {
      cursor: pointer;
      background: #f5e7e3;
      color: #ed9075;
      font-family: PublicSans, monospace;
      font-size: 16px;
      padding: 1rem 1.5rem;
      margin-right: 16px;
      margin-bottom: 16px;
      transition: all 0.1s;

      &.active {
        background: #ed9075;
        color: #fff;
      }
    }

    .right {
      margin-right: auto;
    }

    .search-input {
      position: relative;
      margin-bottom: auto;

      svg {
        position: absolute;
        color: #b7b7b7;
        width: 20px;
        height: 20px;
        top: 0;
        bottom: 0;
        margin: auto;
        left: 22px;
      }

      input {
        border: 0;
        outline: none;
        font-family: PublicSans, monospace;
        font-size: 16px;
        width: 100%;
        padding: 1rem 1.5rem 1rem 4rem;

        &::placeholder {
          color: #b7b7b7;
        }
      }
    }
  }
  .products {
    max-width: calc((715px * 2) + 32px);
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 32px;
    margin: 2rem auto 0;
    padding-bottom: 15rem;
    @media screen and (max-width: 768px) {
      grid-template-columns: minmax(0, 1fr);
      padding-bottom: 8rem;
    }

    @media screen and (max-width: 450px) {
      padding-bottom: 0;
    }

    &.three-column {
      grid-template-columns: repeat(3, minmax(0, 1fr));
      padding-left: 4rem;
      padding-right: 4rem;

      @include mediaSm {
        grid-template-columns: minmax(0, 1fr);
        padding-left: 2rem;
        padding-right: 2rem;
      }
    }
    &.four-column {
      grid-template-columns: repeat(4, minmax(0, 1fr));
      padding-left: 4rem;
      padding-right: 4rem;

      @include mediaSm {
        grid-template-columns: minmax(0, 1fr);
        padding-left: 2rem;
        padding-right: 2rem;
      }
    }
  }

  .dropdown-filter {
    display: block;
    padding: 2rem 5vw;

    @media screen and (min-width: 769px) {
      display: none;
    }

    .field {
      border: none;
    }
  }

  .field {
    margin-top: 0 !important;
  }
}
</style>
