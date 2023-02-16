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

    <ShowcaseBuilderProduct :showcase-products="showcaseProducts" :category="category" />

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

    <TrustSection
      v-if="prescribedProducts.length > 0 && category.slug !== 'skincare'"
      :cta-link="`/evaluation/${catalogue}/start`"
    />
    <TrustSectionSkincare
      v-if="prescribedProducts.length > 0 && category.slug === 'skincare'"
      :cta-link="`/evaluation/${catalogue}/start`"
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

<script>
import GlobalHeader from '@/components/GlobalHeader'
import ScrollUpComponent from '@/modules/Landing/components/ScrollUpComponent.vue'
import dom from '@/utils/domManipulation.js'
import Section from '@/components/Sections/index.vue'
import FaqSection from '@/components/Faq.vue'
import TrustSection from '@/components/TrustSection.vue'
import USPSection from '@/components/USP'
import uspList from '@/data/uspList.json'
import HowMedsCanHelp from './HowMedsCanHelp'
import WhatIsSection from './WhatIsSection'
import ShowcaseBuilderProduct from './ShowcaseBuilderProduct.vue'
import ProductStepInfo from '@/components/ProductStepInfo'
//Article imports
import sexArticleImage from '../../assets/images/catalogue/Article-2-max.jpg'
import hairArticleImage from '../../assets/images/catalogue/post-image.png'
import stepData from '@/data/productStep.json'
import { getSpecificCategory } from '@/api/categories.js'
import { getCategories } from '@/api/categories.js'
import { Carousel, Slide } from 'vue-carousel'
import SliderBanner from '@/modules/Shop/components/SliderBanner.vue'
import { titleize, formatMetaTags, STRING_FORMAT } from '@/utils/prettify.js'
import { getProducts } from '@/api/products'
import { trackCatalogView } from '@/utils/analytics.js'
import { getCategoryProducts } from '@/api/builder'
import Review from '@/modules/Landing/components/Review'
const titleArr = ['Understanding Male Hair Loss and Your Options', 'Common Misconceptions about Erectile Dysfunction']
const descArr = [
  'As a man, the reality of suffering from hair loss is one that may be difficult to fathom. For some men, it may be easy to accept pattern baldness (MPB) as something that is fairly',
  'Approximately 1 in 10 men have been reported to suffer from erectile dysfunction (ED) on a long-term basis.'
]
const imageArr = [hairArticleImage, sexArticleImage]
const articleArr = [
  'https://andsons.com.sg/blog/dht-and-male-hair-loss-explained/',
  'https://andsons.com.sg/blog/5-myths-about-erectile-dysfunction-debunked/'
]
const metaDescription = [
  'Pre-empt hair loss with the best treatments science has to offer.',
  'Give yourself the confidence you need with clinically proven treatments for erectile dysfunction.'
]
export default {
  metaInfo() {
    return formatMetaTags({
      title: this.category.meta_title ?? titleize(this.$route.params.slug),
      titleTemplate: STRING_FORMAT,
      description: this.category.meta_description ?? metaDescription[this.$route.params.slug == 'hair-loss' ? 0 : 1],
      urlPath: this.$route.path
    })
  },
  components: {
    GlobalHeader,
    ScrollUpComponent,
    Review,
    SliderBanner,
    Carousel,
    Slide,
    Section,
    FaqSection,
    USPSection,
    TrustSection,
    HowMedsCanHelp,
    WhatIsSection,
    ShowcaseBuilderProduct,
    ProductStepInfo
  },
  data() {
    return {
      categoryBanner: undefined,
      category: {},
      faqs: undefined,
      important_info: undefined,
      categories: [],
      titleArr: ['Understanding Male Hair Loss and Your Options', 'Common Misconceptions about Erectile Dysfunction'],
      descArr: [
        'As a man, the reality of suffering from hair loss is one that may be difficult to fathom. For some men, it may be easy to accept pattern baldness (MPB) as something that is fairly',
        'Approximately 1 in 10 men have been reported to suffer from erectile dysfunction (ED) on a long-term basis.'
      ],
      imageArr: [hairArticleImage, sexArticleImage],
      articleArr: [
        'https://andsons.com.sg/blog/dht-and-male-hair-loss-explained/',
        'https://andsons.com.sg/blog/5-myths-about-erectile-dysfunction-debunked/'
      ],
      metaDescription: [
        'hair-loss',
        'No more feeling embarrassed! Hair loss treatment for men at the comfort of your home, via doctor teleconsultation. Get advices from hair loss specialist today!'
      ],
      showcaseProducts: [],
      steps: stepData,
      uspList: uspList,
      productList: [],
      prescribedProducts: [],
      nonPrescribedProducts: [],
      productListTitle: [
        'Get healthier, fuller-looking hair with these products.',
        'Clinically proven treatments for ED and PE.'
      ],
      productListDesc: [
        'Made with key ingredients to give your hair the right nutrients.',
        'Give yourself the confidence you need.'
      ]
    }
  },
  computed: {
    articleMap: function() {
      let articles = []
      if (Array.isArray(this.categories)) {
        articles = Object.fromEntries(
          this.categories.map((element, index) => [
            element.slug,
            {
              title: this.titleArr[index],
              description: this.descArr[index],
              imageLink: this.imageArr[index],
              articleLink: this.articleArr[index]
            }
          ])
        )
      }
      return articles
    },
    sectionsOrderUnder5() {
      return this.category.sections?.filter((section) => section.order < 5)
    },
    sectionsOrderUnder10() {
      return this.category.sections?.filter((section) => section.order >= 5 && section.order <= 9)
    },
    sectionsOrderUnder15() {
      return this.category.sections?.filter((section) => section.order >= 10)
    }
  },
  watch: {
    categoryBanner(value) {
      this.categoryBanner = value
    },
    '$route.params.slug': {
      handler: function(catalogue) {
        getSpecificCategory(catalogue).then((response) => {
          const { category } = response.data.response
          this.category = category
          this.categoryBanner = category.category_banners
          this.filterFaqSection(category.faqs)
          this.getData(this.$route.params.slug)
        })
        this.getCategoryDetails(catalogue)
      },
      immediate: true
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleLogoOpacity)
    // Call API is store categories is empty
    this.getCategoryDetails(this.$route.params.slug)
    getCategories().then((response) => {
      this.categories = response.data.response.categories
      this.categories.forEach((element, index) => {
        this.articleMap[element.slug] = {
          title: titleArr[index],
          description: descArr[index],
          imageLink: imageArr[index],
          articleLink: articleArr[index]
        }
      })
    })
    getSpecificCategory(this.$route.params.slug).then((response) => {
      const { category } = response.data.response
      this.category = category
      this.categoryBanner = category.category_banners
      this.filterFaqSection(category.faqs)
      this.getData(this.$route.params.slug)
    })
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
      this.important_info = faqsList.filter((item) => item.type == 'important_info')
    },
    getData: async function(catalogue) {
      const response = await getProducts({
        type: 'ALL',
        category_id: catalogue
      })
      const showcaseProducts = await this.getShowcaseDetails(catalogue)
      const products = response.data.response.data.filter((item) => item.product_options.length > 0)
      this.productList = products.map((data) => ({
        id: data.id,
        title: data.title,
        description: data.desc_1,
        isPrescriptionProduct: data.prescription_based === 1,
        imageThumbnail: data.image_thumbnail_arr[0],
        imageBg: data.image_bg_arr[0],
        short_desc: data.short_desc,
        priceDesc: data.price_desc,
        isMultiplePrice: data.product_options
          ? data.product_options.length > 1
            ? true
            : data.product_options[0]?.product_option_prices.length > 1
          : false,
        price: data.product_options
          ? data.product_options.reduce((r1, { product_option_prices }) => {
              const lowestPrice = product_option_prices.reduce(
                (r2, { price }) => (r2 === undefined ? Number(price) : Math.min(r2, Number(price))),
                undefined
              )
              return r1 === undefined ? lowestPrice : Math.min(r1, lowestPrice)
            }, undefined)
          : undefined,
        productOptions: data.product_options,
        slug: data.slug,
        order: data.order,
        category_id: data.category_id,
        sub_products: data.sub_products,
        type: data.type
      }))
      this.prescribedProducts = this.productList.filter((p) => p.isPrescriptionProduct === true)
      this.nonPrescribedProducts = this.productList.filter((p) => p.isPrescriptionProduct === false)
      this.showcaseProducts = showcaseProducts
      trackCatalogView(window, response.data.response.data, catalogue)
    },
    getCategoryDetails(category) {
      getSpecificCategory(category).then((response) => {
        const { category } = response.data.response
        this.category = category
        this.categoryBanner = category.category_banners
        this.filterFaqSection(category.faqs)
      })
    },
    async getShowcaseDetails(category) {
      const products = await getCategoryProducts(category)
      return products
    }
  }
}
</script>
<style lang="scss" scoped>
/deep/ .VueCarousel-pagination--bottom-overlay {
  bottom: 20px !important;
}
/deep/ .VueCarousel-wrapper {
  flex-grow: 1;
  min-height: 70vh;
}
/deep/ .VueCarousel-inner {
  height: 85vh !important;
  min-height: 70vh;
}
.carousel-height {
  min-height: 70vh;
}
</style>
