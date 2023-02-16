<template>
  <Card padding="tw-py-0">
    <List gap="tw-gap-2">
      <FlexImage :src="image" max-width="300px" class-names="tw-mb-2" />
      <p class="tw-text-center tw-font-semibold">
        {{ roles }}
      </p>
      <p class="tw-font-bold tw-text-center tw-text-2xl md:tw-text-3xl">{{ name }}</p>
      <p v-if="subtext" class="tw-text-center tw-text-gray-500">
        {{ subtext }}
      </p>
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
    }
  }
}
</script>
