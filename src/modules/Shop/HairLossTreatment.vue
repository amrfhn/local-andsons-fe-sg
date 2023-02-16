<template>
  <full-height-background-section
    :category="category"
    :section="section"
    :image-position="section.type === 'FullHeightImageLeft' ? 'left' : 'right'"
  />
</template>

<script>
import FullHeightBackgroundSection from '../../components/Sections/FullHeightBackground.vue'
export default {
  name: 'HairLossTreatment',
  components: {
    FullHeightBackgroundSection
  },
  data() {
    return {
      category: 'hair-loss',
      section: {
        background_color: '#f6b370',
        image_arr: [require('@/assets/images/hairloss-section.jpeg')],
        title: 'Hair Loss Treatments: What to expect',
        description:
          'Male pattern baldness is treatable in 90% of cases, however, it may take 3-6 months of treatment to prevent hair loss and start hair regrowth. Speak to our doctors today to find suitable treatment for you',
        cta_link: '/evaluation/hair-loss/start',
        cta: 'TALK TO A DOCTOR'
      },
      imagePosition: 'left',
      imageFileInAssetsFolder: true
    }
  }
}
</script>
