<template>
  <Card padding="tw-py-0" class="md:tw-h-full">
    <List gap="tw-gap-2">
      <FlexImage :src="image" max-width="300px" class-names="tw-mb-4" />
      <p class="tw-font-bold tw-text-2xl md:tw-text-3xl">{{ name }}</p>
      <p class="tw-font-mono tw-text-sm tw-mb-4">
        {{ roles }}
      </p>
      <p v-if="subtext">
        {{ subtext }}
      </p>
      <div class="tw-flex-grow" />
      <router-link
        :to="`/medical-team/${bioPath}`"
        class="buttonStyle tw-w-full tw-text-center"
        style="margin-left: auto; margin-right: auto"
      >
        View Full Bio
      </router-link>
    </List>
  </Card>
</template>

<script>
import Card from '@/components/Elements/Card.vue'
import FlexImage from '@/components/Elements/FlexImage.vue'
import List from '@/components/Layouts/List.vue'

export default {
  components: { Card, FlexImage, List },
  props: {
    image: {
      type: String,
      required: true,
      default: ''
    },
    roles: {
      type: String,
      required: true,
      default: ''
    },
    name: {
      type: String,
      required: true,
      default: ''
    },
    subtext: {
      type: String,
      required: false,
      default: ''
    },
    bioPath: {
      type: String,
      required: true,
      default: ''
    }
  }
}
</script>
