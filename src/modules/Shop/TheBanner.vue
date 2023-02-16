<template>
  <div :class="[`category-banner category-${catalogue}`]">
    <div class="banner-container">
      {titleMap[catalogue].bannerSubTitle ?
      <div class="banner-sub-title">{titleMap[catalogue].bannerSubTitle}</div>
      : ""}

      <div class="banner-title">{titleMap[catalogue].bannerText}</div>
      <div class="banner-info">
        <img :src="titleMap[catalogue].bannerBg" :class="[`banner-image bg category-${catalogue}`]" />
        <img
          :src="titleMap[catalogue].bannertitle"
          :class="[
            `banner-image  title
          category-${catalogue}`
          ]"
        />
        <img
          :src="titleMap[catalogue].bannerProduct1"
          :class="[
            `banner-image
          product-1
          category-${catalogue}`
          ]"
        />
        <img
          :src="titleMap[catalogue].bannerProduct2"
          :class="[
            `banner-image
        product-2 category-${catalogue}`
          ]"
        />
        <div class="view-product-button">SHOP NOW</div>
      </div>
    </div>
  </div>
</template>

<script>
import hairBannerTitle from '../../assets/images/catalogue/category-hair-header-text.png'
import sexBannerTitle from '../../assets/images/catalogue/category-sex-header-text.png'
import skinBannerTitle from '../../assets/images/catalogue/category-skin-header-text.png'
import mindBannerTitle from '../../assets/images/catalogue/category-mind-header-text.png'

import hairBannerBg from '../../assets/images/catalogue/category-hair-header-bg.png'
import hairBannerProduct1 from '../../assets/images/catalogue/category-hair-header-product-1.png'
import hairBannerProduct2 from '../../assets/images/catalogue/category-hair-header-product-2.png'
import sexBannerBg from '../../assets/images/catalogue/category-sex-header-bg.png'
import sexBannerProduct1 from '../../assets/images/catalogue/category-sex-header-product-1.png'
import sexBannerProduct2 from '../../assets/images/catalogue/category-sex-header-product-2.png'
//import ProductList from "./ProductList";
//import Post from "./Post";
// import JoinCommunity from "@/components/JoinCommunity";
//import ScrollUpComponent from "@/modules/Landing/components/ScrollUpComponent.vue";
//import dom from "@/utils/domManipulation.js";

//Article imports
import sexArticleImage from '../../assets/images/catalogue/article_2-min.png'
import hairArticleImage from '../../assets/images/catalogue/post-image.png'
export default {
  name: 'Banner',
  props: [],
  data() {
    return {
      banners: [
        {
          bannerText: 'Subscribe for 3 months and get the first on us',
          bannerSubTitle: 'Limited time offer',
          bannertitle: hairBannerTitle,
          bannerBg: hairBannerBg,
          bannerProduct1: hairBannerProduct1,
          bannerProduct2: hairBannerProduct2
        },
        {
          bannerText: 'It happens',
          bannertitle: sexBannerTitle,
          bannerBg: sexBannerBg,
          bannerProduct1: sexBannerProduct1,
          bannerProduct2: sexBannerProduct2
        },
        {
          bannerText: 'Get a head start',
          bannertitle: skinBannerTitle,
          bannerBg: hairBannerBg,
          bannerProduct1: hairBannerProduct1,
          bannerProduct2: hairBannerProduct2
        },
        {
          bannerText: 'Get a head start',
          bannertitle: mindBannerTitle,
          bannerBg: hairBannerBg,
          bannerProduct1: hairBannerProduct1,
          bannerProduct2: hairBannerProduct2
        }
      ],
      articles: [
        {
          title: 'Understanding Male Hair Loss and Your Options',
          description:
            'As a man, the reality of suffering from hair loss is one that may be difficult to fathom. For some men, it may be easy to accept pattern baldness (MPB) as something that is fairly',
          imageLink: hairArticleImage,
          articleLink: 'https://andsons.com.my/blog/dht-and-male-hair-loss-explained/'
        },
        {
          title: 'Common Misconceptions about Erectile Dysfunction',
          description:
            'Approximately 1 in 10 men have been reported to suffer from erectile dysfunction (ED) on a long-term basis.',
          imageLink: sexArticleImage,
          articleLink: 'https://andsons.com.my/blog/5-myths-about-erectile-dysfunction-debunked/'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.shop-wrapper {
  // background: #fdebdd;
  // padding-top: 3rem;
  // .action-header-nav {
  //   top: 33px;
  //   left: 40px;
  //   @media screen and (max-width: 768px) {
  //     top: 20px;
  //     left: 5vw;
  //     padding-left: 0;
  //     width: calc(100% - 30px - 40px);
  //   }
  // }
}
.category-banner {
  height: 930px;
  max-height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: relative;
  transition: all 300ms ease-in-out;
  @media screen and (max-width: 768px) {
    padding: 0 2rem;
  }
  &.category-1 {
    background-color: #fdebdd;
  }
  &.category-2 {
    background-color: #f5e7e3;
  }
  &.category-3 {
    background-color: #dfebef;
  }
  &.category-4 {
    background-color: #eaebdf;
  }
  .banner-container {
    max-width: 1000px;
    width: 100%;
    height: 100%;
    position: relative;
  }
  .banner-sub-title {
    position: absolute;
    font-size: 22px;
    top: 8rem;
    left: 50%;
    // text-align: center;
    transform: translateX(-50%);

    @media screen and (max-width: 768px) {
      top: 8rem;
      width: 100%;
      font-size: 14px;
    }
    // transform: translateX(-35%);
  }
  .banner-title {
    font-family: 'PublicSansBold', sans-serif;
    // font-size: 2.8125rem;
    font-size: 40px;
    width: 100%;
    position: absolute;
    top: 10rem;
    left: 50%;
    transform: translateX(-50%);
    @media screen and (max-width: 768px) {
      top: 10rem;
      width: 100%;
      font-size: 1.5rem;
    }
  }
  .view-product-button {
    cursor: pointer;
    position: absolute;
    top: 80%;
    left: 40%;
    margin: 0 auto;
    margin-top: 1rem;
    background: #000;
    color: #fff;
    text-align: center;
    font-family: PublicSansExtraBold, sans-serif;
    font-size: 1rem;
    letter-spacing: 1.2px;
    opacity: 1;
    display: flex;
    justify-content: center;
    padding: 1.4rem 4rem;
    width: 250px;

    @media screen and (max-width: 768px) {
      padding: 1rem 12rem;
      font-size: 0.9rem;
    }

    @media screen and (max-width: 767px) {
      top: 85%;
      width: 100%;
      left: 2%;
    }
  }
  .banner-info {
    display: flex;
    align-items: center;
    @media screen and (max-width: 768px) {
      /* flex-direction: column; */
    }
    .banner-image {
      position: absolute;
      @keyframes fadeInUp {
        from {
          transform: translateY(5rem);
          opacity: 0;
        }
        to {
          transform: translateY(0);
          opacity: 1;
        }
      }
      @keyframes rotateFadeUpLeft {
        from {
          transform: rotate(-3deg) translateY(5rem);
          opacity: 0;
        }
        to {
          transform: rotate(0deg) translateY(0);
          opacity: 1;
        }
      }
      @keyframes rotateFadeUpRight {
        from {
          transform: rotate(3deg) translateY(5rem);
          opacity: 0;
        }
        to {
          transform: rotate(0deg) translateY(0);
          opacity: 1;
        }
      }
      &.title {
        z-index: 1;
        width: 65%;
        top: 25%;
        left: 0;
        animation: fadeInUp 1s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        @media screen and (max-width: 768px) {
          width: 100%;
          top: 25%;
        }
      }
      &.bg {
        z-index: 0;
        width: 65%;
        left: 20%;
        top: 25%;
        animation: fadeInUp 400ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
        @media screen and (max-width: 768px) {
          width: 100%;
          left: 0;
          right: 0;
          top: 35%;
        }
      }
      &.product-1 {
        width: 25%;
        z-index: 2;
        left: 30%;
        top: 25%;
        animation: rotateFadeUpRight 800ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
        @media screen and (max-width: 768px) {
          width: 50%;
          top: 35%;
          left: 11%;
          max-width: 250px;
        }
        &.category-2 {
          top: 45%;
          @media screen and (max-width: 768px) {
            top: 52%;
            width: 45%;
            left: 15%;
          }
        }
      }
      &.product-2 {
        width: 35%;
        z-index: 2;
        left: 40%;
        top: 30%;
        animation: rotateFadeUpLeft 900ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
        @media screen and (max-width: 768px) {
          width: 70%;
          top: 35%;
          right: 1%;
          left: initial;
        }
        &.category-2 {
          top: 38%;
          left: 53%;
          width: 25%;

          @media screen and (max-width: 768px) {
            top: 40%;
            width: 45%;
            left: 45%;
          }
        }
      }
    }
    /* .banner-details {
      text-align: left;
      width: 28%;
      right: 0;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      @media screen and (max-width: 768px) {
        text-align: center;
        width: 100%;
        top: 13rem;
        transform: translateY(0);
      }
      .banner-details-title {
        font-family: PublicSans, monospace;
        font-size: 1.125rem;
        @media screen and (max-width: 768px) {
          font-size: 1rem;
        }
      }
      .banner-details-body {
        font-family: PublicSansExtraBold, sans-serif;
        font-size: 1.375rem;
        margin: 4px 0 18px 0;
        @media screen and (max-width: 768px) {
          font-size: 1rem;
        }
      }
      a {
        font-family: PublicSans, monospace;
        font-size: 1.125rem;
        svg {
          font-size: 0.625rem;
          margin-left: 32px;
        }
      }
    } */
  }
}
</style>
