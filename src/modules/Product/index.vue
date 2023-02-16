<template>
  <div v-if="productData" class="product-container">
    <GlobalHeader show-full-logo />
    <div class="product-wrapper tw-w-full tw-grid md:tw-grid-cols-12 md:tw-gap-8 tw-mb-10">
      <ProductCoverPhoto :product-data="productData" />
      <ProductDetails :product-data="productData" />
    </div>
    <USPSection :usp-list="uspList.usp[0]" />

    <IngredientsAntiAging v-if="productData.slug === 'anti-aging'" />
    <IngredientsAcne v-if="productData.slug === 'acne-cream'" />
    <IngredientsBrighteningSerum v-if="productData.slug === 'brightening-serum'" />
    <IngredientsDailyMoisturiser v-if="productData.slug === 'daily-moisturiser'" />
    <template v-if="productData.sections">
      <Section
        v-for="section in sectionsHead"
        :key="section.id"
        :category="productData.category.slug"
        :section="section"
      />
    </template>

    <IngredientsTestosteroneSupport v-if="productData.slug === 'testosterone-support'" />
    <IngredientsProstateHealth v-if="productData.slug === 'prostate-health'" />
    <IngredientsStressRelief v-if="productData.slug === 'stress-relief'" />

    <USPSection
      v-if="['testosterone-support', 'prostate-health', 'stress-relief'].indexOf(productData.slug) > -1"
      :usp-list="uspList.supplements"
      category="supplements"
    />
    <CleanserThreeSteps v-if="productData.slug === 'daily-cleanser'" />
    <DailyMaintenanceKitComponents v-if="productData.slug === 'daily-maintenance-kit'" />
    <template v-if="productData.sections">
      <Section
        v-for="section in sectionsTail"
        :key="section.id"
        :category="productData.category.slug"
        :section="section"
      />
    </template>

    <HowItWorksSection v-if="productData.prescription_based" :product-data="productData" />
    <FaqSection v-if="important_info.length > 0" :faqs="important_info" title="Important Information" />
    <Suggestion :suggested-products="suggestedData" />
    <!-- <Reviews /> -->
    <FaqSection v-if="faqs.length > 0" :faqs="faqs" title="Frequently Asked Questions" />
    <!-- <JoinCommunity /> -->
  </div>
</template>
<script>
import { getProductDetails } from '@/api/products'
import {
  IngredientsAcne,
  IngredientsAntiAging,
  IngredientsBrighteningSerum,
  IngredientsDailyMoisturiser,
  IngredientsProstateHealth,
  IngredientsStressRelief,
  IngredientsTestosteroneSupport
} from '@/components/custom/'
import FaqSection from '@/components/Faq.vue'
import GlobalHeader from '@/components/GlobalHeader'
import Section from '@/components/Sections/index.vue'
import USPSection from '@/components/USP'
import HowItWorksSection from '@/modules/Product/HowItWorksSection'
import ProductCoverPhoto from '@/modules/Product/ProductCoverPhoto'
import ProductDetails from '@/modules/Product/ProductDetails.vue'
import Suggestion from '@/modules/Product/Suggestion'
import CleanserThreeSteps from '@/components/Sections/DailyCleanser/CleanserThreeSteps.vue'
import DailyMaintenanceKitComponents from '@/components/Sections/DailyMaintenanceKit/DailyMaintenanceKitComponents.vue'
import { trackProductView } from '@/utils/analytics.js'

import uspList from '@/data/uspList.json'

export default {
  components: {
    CleanserThreeSteps,
    DailyMaintenanceKitComponents,
    IngredientsTestosteroneSupport,
    IngredientsProstateHealth,
    IngredientsStressRelief,
    IngredientsAcne,
    IngredientsAntiAging,
    IngredientsBrighteningSerum,
    IngredientsDailyMoisturiser,
    // Reviews,
    Suggestion,
    HowItWorksSection,
    ProductCoverPhoto,
    ProductDetails,
    // Quantity,
    // JoinCommunity,
    GlobalHeader,
    Section,
    FaqSection,
    USPSection
  },
  data() {
    return {
      productData: undefined,
      suggestedData: [],
      productSlug: this.$route.params.slug,
      faqs: undefined,
      important_info: undefined,
      uspList
    }
  },
  computed: {
    sectionsHead: function() {
      return this.productData.sections.filter((section) => section.order < 10)
    },
    sectionsTail: function() {
      return this.productData.sections.filter((section) => section.order >= 10)
    }
  },
  watch: {
    '$route.params': {
      immediate: true,
      handler(n) {
        // make sure product details get updated when user clicks on suggested products
        if (n.slug !== this.productSlug) {
          this.productSlug = n.slug
          this.getData()
        }
      }
    }
  },
  async mounted() {
    await this.$store.dispatch('categories/fetchCategories')
    this.getData()
  },
  methods: {
    filterFaqSection(faqsList) {
      this.faqs = faqsList.filter((item) => item.type == 'faq')
      this.important_info = faqsList.filter((item) => item.type == 'important_info')
    },

    async getData() {
      const response = await getProductDetails(this.productSlug)
      this.productData = response.data.response.product
      this.filterFaqSection(response.data.response.product.faqs)

      // track view with analytics
      trackProductView(window, this.productData)

      this.suggestedData = response.data.response.product.related_products.map((data) => ({
        id: data.id,
        title: data.title,
        description: data.desc_1,
        short_desc: data.short_desc,
        priceDesc: data.price_desc,
        isPrescriptionProduct: data.prescription_based === 1,
        imageThumbnail: data.image_thumbnail_arr[0],
        imageBg: data.image_bg_arr[0],
        isMultiplePrice:
          data.product_options && data.product_options.length > 0
            ? data.product_options.length > 1
              ? true
              : data.product_options[0].product_option_prices.length > 1
            : false,
        price:
          data.product_options && data.product_options.length > 0
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
        category: this.$store.state.categories.list.find((category) => category.id === data.category_id),
        sub_products: data.sub_products,
        type: data.type
      }))
    }
  }
}
</script>

<style lang="scss" scoped>
.product-container {
  background: $springwood-background;

  .product-wrapper {
    justify-content: space-evenly;
    padding: 8em calc(30px + 5vw) 0;

    @media screen and (max-width: 768px) {
      padding: 80px 5vw 0;
      flex-direction: column;
    }
  }
}
</style>
