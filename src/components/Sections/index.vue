<template>
  <div>
    <FullHeightBackgroundSection
      v-if="['FullHeightImageLeft', 'FullHeightImageRight'].indexOf(section.type) > -1"
      :category="category"
      :section="section"
      :image-position="section.type === 'FullHeightImageLeft' ? 'left' : 'right'"
    />
    <StandardSection
      v-else-if="['StandardImageLeft', 'StandardImageRight'].indexOf(section.type) > -1"
      :section="section"
      :category="category"
      :image-position="section.type === 'StandardImageLeft' ? 'left' : 'right'"
    />
    <SlimSection v-else-if="section.type == 'Slim'" :section="section" :category="category" />
    <FullBackground v-else-if="section.type == 'FullHeightImage'" :section="section" :category="category" />
    <FullBackgroundTextRight
      v-else-if="section.type == 'FullBackgroundTextRight'"
      :section="section"
      :category="category"
    />
    <TwoColsTemplate
      v-else-if="['TwoColsImageLeft', 'TwoColsImageRight'].indexOf(section.type) > -1"
      :category="category"
      :section="section"
      :image-position="section.type === 'TwoColsImageLeft' ? 'left' : 'right'"
    />
  </div>
</template>

<script>
import StandardSection from './Standard.vue'
import SlimSection from './Slim.vue'
import FullHeightBackgroundSection from './FullHeightBackground.vue'
import FullBackground from './FullBackground.vue'
import FullBackgroundTextRight from './FullBackgroundTextRight.vue'
import TwoColsTemplate from './Templates/TwoColsTemplate.vue'

export default {
  name: 'Section',
  components: {
    FullHeightBackgroundSection,
    SlimSection,
    StandardSection,
    FullBackground,
    FullBackgroundTextRight,
    TwoColsTemplate
  },
  props: ['category', 'section']
}
</script>
