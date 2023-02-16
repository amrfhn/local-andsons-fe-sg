<template>
  <Section id="medical-team-section" padding="tw-py-8" class-names="md:tw-py-12 bg-springwood">
    <Container>
      <h2 class="tw-text-bold tw-text-center tw-text-5xl tw-mb-3 font-brand-extrabold">Meet Our Medical Team</h2>
      <p class="tw-text-center tw-text-lg tw-mb-8">
        All our treatments are vetted by our team of healthcare professionals.
      </p>
      <Grid class="tw-my-16" class-names="md:tw-grid-cols-2 lg:tw-grid-cols-3 md:tw-gap-4" gap="tw-gap-8">
        <MedicalTeamProfileShort
          v-for="({ image, title, name }, index) in medicalTeamData"
          :key="index"
          :image="require(`@/assets/images${image}`)"
          :roles="title"
          :name="name"
        />
      </Grid>
      <router-link to="/medical-team" class="buttonStyle" style="margin-left: auto; margin-right: auto">
        Meet our advisors
      </router-link>
    </Container>
  </Section>
</template>

<script>
import Container from '@/components/Layouts/Container.vue'
import Grid from '@/components/Layouts/Grid.vue'
import MedicalTeamProfileShort from './MedicalTeamProfileShort.vue'
import Section from '@/components/Layouts/Section.vue'

import medicalTeamData from '@/data/medicalTeam.json'

export default {
  components: { Container, Grid, MedicalTeamProfileShort, Section },
  data() {
    return {
      medicalTeamData: medicalTeamData.members
    }
  }
}
</script>
