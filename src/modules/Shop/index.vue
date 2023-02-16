<template>
  <div class="shop-wrapper">
    <GlobalHeader show-full-logo />
    <Carousel
      :autoplay="true"
      :loop="true"
      :autoplay-timeout="4000"
      class="carousel-height"
      :per-page="1"
      pagination-position="bottom-overlay"
      pagination-active-color="#ED9075"
      pagination-color="#EAEBDF"
    >
      <Slide v-for="item in categoryBanner" :key="item.id" :style="{ backgroundColor: item.bg_color }">
        <SliderBanner :banner="item" />
      </Slide>
    </Carousel>
    <USPSection :usp-list="uspList.usp[1]" />

    <ShowcaseProduct
      v-if="category && !['skincare', 'supplements'].includes(category.slug)"
      :showcase-products="showcaseProducts"
      :category="category"
    />
    <ShowcaseProductV2
      v-if="category && ['skincare', 'supplements'].includes(category.slug)"
      :showcase-products="showcaseProducts"
      :category="category"
    />
    <HowMedsCanHelp v-if="category && category.id == 1" :category-id="category.id" />
    <WhatIsSection v-if="category && category.id == 2" :category-id="category.id" />

    <div v-for="(section, index) in category.sections" :key="section.id">
      <Section :section="section" :category="category.slug" />
      <USPSection
        v-if="category.slug === 'supplements' && index === 0"
        :usp-list="uspList.supplements"
        :category="category.slug"
      />
    </div>
    <Review />
    <ProductStepInfo v-if="prescribedProducts.length > 0" :data="steps.steps[3].data" />
    <CustomSkincareIngredients v-if="category.slug === 'skincare'" />
    <VerticalProductList v-if="category.slug === 'hair-loss'" :product-list="nonPrescribedProducts" />
    <TrustSection v-if="prescribedProducts.length > 0 && category.slug !== 'skincare'" cta-link="/book-consultation" />
    <TrustSectionSkincare
      v-if="prescribedProducts.length > 0 && category.slug === 'skincare'"
      cta-link="/book-consultation"
    />
    <FaqSection v-if="faqs && faqs.length !== 0" :faqs="faqs" title="Frequently Asked Questions" />
    <FaqSection
      v-if="important_info && important_info.length !== 0"
      :faqs="important_info"
      title="Important Information"
    />
    <Post v-if="categories.length !== 0" :catalogue="articleMap[$route.params.catalogue]" />
    <!-- <JoinCommunity /> -->
    <ScrollUpComponent />
  </div>
</template>

<script lang="jsx">
import { getSpecificCategory } from '@/api/categories.js'
import { getProducts } from '@/api/products'
import CustomSkincareIngredients from '@/components/custom/skincare/ingredients.vue'
import FaqSection from '@/components/Faq.vue'
import GlobalHeader from '@/components/GlobalHeader'
import ProductStepInfo from '@/components/ProductStepInfo.vue'
import Section from '@/components/Sections/index.vue'
import TrustSection from '@/components/TrustSection.vue'
import TrustSectionSkincare from '@/components/TrustSectionSkincare.vue'
import USPSection from '@/components/USP'
import stepData from '@/data/productStep.json'
import uspList from '@/data/uspList.json'
import Review from '@/modules/Landing/components/Review'
import ScrollUpComponent from '@/modules/Landing/components/ScrollUpComponent.vue'
import SliderBanner from '@/modules/Shop/components/SliderBanner.vue'
import { trackCatalogView } from '@/utils/analytics.js'
import dom from '@/utils/domManipulation.js'
import { formatMetaTags } from '@/utils/prettify.js'
import { Carousel, Slide } from 'vue-carousel'
import sexArticleImage from '../../assets/images/catalogue/Article-2-max.jpg'
import hairArticleImage from '../../assets/images/catalogue/post-image.png'
import HowMedsCanHelp from './HowMedsCanHelp'
import Post from './Post'
import ShowcaseProduct from './ShowcaseProduct'
import ShowcaseProductV2 from './ShowcaseProductV2'
import VerticalProductList from './VerticalProductList'
import WhatIsSection from './WhatIsSection'

const titleArr = [
  'Understanding Male Hair Loss and Your Options',
  'Common Misconceptions about Erectile Dysfunction',
]
const descArr = [
  'As a man, the reality of suffering from hair loss is one that may be difficult to fathom. For some men, it may be easy to accept pattern baldness (MPB) as something that is fairly',
  'Approximately 1 in 10 men have been reported to suffer from erectile dysfunction (ED) on a long-term basis.',
]
const imageArr = [hairArticleImage, sexArticleImage]
const articleArr = [
  'https://andsons.com.my/blog/dht-and-male-hair-loss-explained/',
  'https://andsons.com.my/blog/5-myths-about-erectile-dysfunction-debunked/',
]

const metaTitle = {
  'hair-loss':
    'Hair Loss Treatment for Men at Home via Doctor Teleconsultation',
  'sexual-health':
    'Erectile Dysfunction & Premature Ejaculation Telemed Consultation',
  supplements: 'Buy Recommended Health Supplements from Telemedicine Provider',
}
const metaDescription = {
  'hair-loss':
    'No more feeling embarrassed! Hair loss treatment for men at the comfort of your home, via doctor teleconsultation. Get advices from hair loss specialist today!',
  'sexual-health':
    'Discreet & effective erectile dysfunction & premature telemed consultation in SG. Pay for treatments online & get them shipped to you in less than 4 hours!',
  supplements:
    'Our doctors can recommend health supplements for your stress relief & reproductive health. Non-GMO & Vegan. Formulated in the US. Made in SG. Buy online now.',
}

export default {
  metaInfo() {
    return formatMetaTags({
      title:
        this.category.meta_title ?? metaTitle[this.$route.params.catalogue],
      description:
        this.category.meta_description ??
        metaDescription[this.$route.params.catalogue],
      urlPath: this.$route.path,
    })
  },
  components: {
    CustomSkincareIngredients,
    // JoinCommunity,
    // ProductList,
    VerticalProductList,
    ShowcaseProduct,
    ShowcaseProductV2,
    HowMedsCanHelp,
    WhatIsSection,
    GlobalHeader,
    ScrollUpComponent,
    Post,
    Review,
    TrustSection,
    TrustSectionSkincare,
    // Slider,
    // SliderItem,
    SliderBanner,
    Carousel,
    Slide,
    Section,
    FaqSection,
    ProductStepInfo,
    USPSection,
  },
  data() {
    return {
      catalogue: this.$route.params.catalogue,
      categoryBanner: undefined,
      category: {},
      faqs: undefined,
      important_info: undefined,
      categories: [],
      steps: stepData,
      uspList: uspList,
      prescribedProducts: [],
      nonPrescribedProducts: [],
      showcaseProducts: [],
      productList: [],
    }
  },
  computed: {
    articleMap: function () {
      return Object.fromEntries(
        this.$store.state.categories.list.map((element, index) => [
          element.slug,
          {
            title: titleArr[index],
            description: descArr[index],
            imageLink: imageArr[index],
            articleLink: articleArr[index],
          },
        ]),
      )
    },
  },
  watch: {
    categoryBanner(value) {
      this.categoryBanner = value
    },
    '$route.params.catalogue': {
      handler: function (catalogue) {
        this.getCategoryDetails(catalogue)
      },
      immediate: true,
    },
  },
  mounted() {
    window.addEventListener('scroll', this.handleLogoOpacity)

    //Will fetch from API if store categories is empty
    this.$store.dispatch('categories/fetchCategories')

    this.getCategoryDetails(this.$route.params.catalogue)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleLogoOpacity)
  },
  methods: {
    handleLogoOpacity() {
      dom.scrollTop()
    },
    filterFaqSection(faqsList) {
      this.faqs = faqsList.filter((item) => item.type == 'faq')
      this.important_info = faqsList.filter(
        (item) => item.type == 'important_info',
      )
    },
    getCategoryDetails(category) {
      getSpecificCategory(category).then((response) => {
        const { category } = response.data.response
        this.category = category
        this.categoryBanner = category.category_banners
        this.filterFaqSection(category.faqs)
        this.getData(this.$route.params.catalogue)
      })
    },
    getData: async function (catalogue) {
      const response = await getProducts({ type: 'ALL', category_id: catalogue })

      const products = response.data.response.data.filter(
        (item) => item.type !== 'Consultation' && item.product_options.length > 0
      )

      this.productList = products.map((data) => ({
        id: data.id,
        title: data.title,
        description: data.desc_1,
        isPrescriptionProduct: data.prescription_based === 1,
        imageThumbnail: data.image_thumbnail_arr[0],
        imageBg: data.image_bg_arr && data.image_bg_arr[0],
        short_desc: data.short_desc,
        priceDesc: data.price_desc,
        isMultiplePrice: data.product_options
          ? data.product_options.length > 1
            ? true
            : data.product_options[0].product_option_prices.length > 1
          : false,
        price: data.product_options
          ? data.product_options.reduce((r1, { product_option_prices }) => {
            const lowestPrice = product_option_prices.reduce(
              (r2, { price }) =>
                r2 === undefined
                  ? Number(price)
                  : Math.min(r2, Number(price)),
              undefined,
            )
            return r1 === undefined ? lowestPrice : Math.min(r1, lowestPrice)
          }, undefined)
          : undefined,
        productOptions: data.product_options,
        slug: data.slug,
        order: data.order,
        category_id: data.category_id,
        sub_products: data.sub_products,
        type: data.type,
      }))

      this.prescribedProducts = this.productList.filter((p) => p.isPrescriptionProduct)
      this.nonPrescribedProducts = this.productList.filter((p) => !p.isPrescriptionProduct)
      this.showcaseProducts = this.productList.filter((p) => p.type === 'Showcase' || p.type !== 'Hidden Product')

      trackCatalogView(window, response.data.response.data, catalogue)
    },
  },
}
</script>

<style lang="scss" scoped>
/deep/ .VueCarousel-pagination--bottom-overlay {
  bottom: 20px !important;
}

/deep/ .VueCarousel-wrapper {
  flex-grow: 1;
  min-height: 70vh;

  // @media screen and (max-width:768px){
  //   min-height: unset !important;
  // }
}

/deep/ .VueCarousel-inner {
  height: 80vh !important;
  min-height: 70vh;

  // @media screen and (max-width:768px){
  //   height: 80vh !important;
  // }
}

.carousel-height {
  min-height: 85vh;

  // @media screen and (max-width:768px){
  //   min-height: initial;
  // }
}
</style>
