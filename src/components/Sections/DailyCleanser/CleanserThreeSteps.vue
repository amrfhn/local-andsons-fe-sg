<template>
  <Section padding="tw-py-8" class-names="md:tw-py-12">
    <Container>
      <h4 class="tw-text-2xl tw-font-bold tw-px-4">
        Who is the 3% Niacinamide Daily Cleanser for?
      </h4>
      <Grid class-names="md:tw-grid-cols-2  lg:tw-grid-cols-3 md:tw-gap-4" gap="tw-gap-0">
        <GridItem
          v-for="({ image, title, content }, index) in steps"
          :key="index"
          :image="require(`@/assets/images${image}`)"
          :title="title"
          :content="content"
        />
      </Grid>
    </Container>
  </Section>
</template>

<script>
import Grid from '@/components/Layouts/Grid.vue'
import GridItem from '@/components/Sections/Components/GridItem.vue'
import Section from '@/components/Layouts/Section.vue'
import Container from '@/components/Layouts/Container.vue'
import CleanserThreeStepsData from './CleanerThreeStepsData.json'

export default {
  components: { Container, Grid, GridItem, Section },
  data() {
    return {
      steps: CleanserThreeStepsData
    }
  }
}
</script>
