<template>
  <div id="product-listing" class="product-listing">
    <div v-show="productList.length" class="products-container">
      <h4 class="title">
        Get healthier, fuller-looking hair with these products.
      </h4>
      <p class="description">
        Made with key ingredients to give your hair the right nutrients.
      </p>
      <div class="products">
        <VerticalProductItem v-for="p in productList" :key="p.id" v-bind="p" />
      </div>
    </div>
  </div>
</template>

<script>
import VerticalProductItem from '@/components/VerticalProductItem'

export default {
  components: { VerticalProductItem },
  props: ['productList']
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

.product-listing {
  background: $springwood-background;
  overflow: hidden;

  .products-container {
    padding-top: 4rem;
    @include mediaSm {
      padding: 4rem 1rem;
    }

    .title {
      text-align: center;
      color: $black-text;
      font-family: 'PublicSansBlack', sans-serif;
      font-size: 4rem;
      margin-bottom: 2rem;

      @include mediaSm {
        font-size: 2rem;
        margin-bottom: 1rem;
      }
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
    margin: 2rem auto 0;
    padding-bottom: 15rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    @media screen and (max-width: 768px) {
      padding-bottom: 8rem;
    }

    @media screen and (max-width: 450px) {
      padding-bottom: 0;
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
