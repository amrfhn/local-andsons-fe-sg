<!-- eslint-disable vue/no-v-html -->
<template>
  <Section padding="tw-py-0" :style="`${section.background_color && `background-color: ${section.background_color}`}`">
    <Grid cols="tw-grid-cols-1" class="md:tw-grid-cols-2 tw-px-4 md:tw-px-12">
      <Flex align-items="tw-items-center" class="tw-py-8">
        <List>
          <h2
            class="tw-text-center md:tw-text-left tw-text-2xl md:tw-text-4xl md:tw-mb-4 tw-mb-2 tw-font-extrabold"
            v-html="section.title"
          />
          <p
            class="section_description md:tw-text-lg tw-text-base tw-text-center md:tw-text-left"
            v-html="section.description"
          />
          <div v-if="section.cta" class="btn-submit tw-m-auto md:tw-m-0">
            <a class="submit-button" :href="section.cta_link" v-html="section.cta"></a>
          </div>
        </List>
      </Flex>
      <Flex
        align-items="tw-items-end"
        class-names="tw-w-fit tw-h-full"
        direction="tw-flex-col"
        :class="{ 'tw-order-first': imagePosition === 'left' }"
      >
        <FlexImage
          v-if="section.image_arr.length > 0"
          class-names="xs:tw-object-scale-down sm:tw-object-cover md:tw-object-contain lg:tw-object-cover"
          background-position="tw-object-bottom"
          background-size="tw-object-cover"
          :src="section.image_arr[0]"
        />
      </Flex>
    </Grid>
  </Section>
</template>

<script>
import { Flex, Grid, List, Section } from '@/components/Layouts'
import FlexImage from '@/components/Elements/FlexImage.vue'

export default {
  components: {
    Flex,
    Grid,
    List,
    Section,
    FlexImage
  },
  props: {
    category: {
      type: String,
      default: ''
    },
    imagePosition: {
      type: String,
      default: 'left',
      validator: function(value) {
        return ['left', 'right'].includes(value)
      }
    },
    section: {
      type: Object,
      default: () => ({ background_color: '', cta: false, cta_link: '', description: '', image_arr: [], title: '' })
    }
  }
}
</script>
