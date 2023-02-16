<template>
  <Card>
    <List>
      <FlexImage :src="image" max-width="300px" />
      <p class="tw-font-bold tw-text-center">{{ title }}</p>
      <p class="tw-text-center">
        {{ content }}
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
    title: {
      type: String,
      required: true,
      default: 'title'
    },
    content: {
      type: String,
      required: true,
      default: 'Enter content here'
    }
  }
}
</script>
