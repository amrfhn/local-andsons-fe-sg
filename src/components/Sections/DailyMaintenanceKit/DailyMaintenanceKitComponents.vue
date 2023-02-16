<template>
  <Section padding="tw-py-8" class-names="md:tw-py-12 bg-white">
    <Container>
      <h4 class="tw-text-2xl tw-font-bold tw-px-4">
        Cleanse, treat, and care.
      </h4>
      <p class="tw-px-4">3 easy steps for better skin health.</p>
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
import DailyMaintenanceKitData from './DailyMaintenanceKitData.json'

export default {
  components: { Container, Grid, GridItem, Section },
  data() {
    return {
      steps: DailyMaintenanceKitData
    }
  }
}
</script>
