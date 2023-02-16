<template>
  <section class="faq-section">
    <h2
      class="tw-w-full tw-flex tw-text-3xl md:tw-text-5xl tw-font-black tw-justify-start md:tw-justify-center tw-mb-4 md:tw-mb-20"
    >
      {{ title }}
    </h2>
    <vsa-list>
      <div v-for="item in this.faqs" :key="item.id">
        <vsa-item>
          <vsa-heading>
            <h3>{{ item.question }}</h3>
          </vsa-heading>

          <vsa-content>
            <div class="faq-description" v-html="item.answer"></div>
          </vsa-content>
        </vsa-item>
      </div>
    </vsa-list>
  </section>
</template>

<script>
import {
  VsaList,
  VsaItem,
  VsaHeading,
  VsaContent
  // VsaIcon
} from 'vue-simple-accordion'

export default {
  name: 'FaqSection',
  components: {
    VsaList,
    VsaItem,
    VsaHeading,
    VsaContent
  },
  props: ['faqs', 'title']
}
</script>

<style lang="scss" scoped>
.container {
  margin: 0 auto;
  width: 1000px;
  max-width: 100%;
}

.faq-section {
  background-color: #f4f5ef;
  padding: 5rem calc(5vw + 30px) 8rem calc(5vw + 30px);

  @media screen and (max-width: 767px) {
    padding-left: 5vw;
    padding-right: 5vw;
    padding-top: 2rem;
    padding-bottom: 4rem;
  }
}

.vsa-list {
  --vsa-max-width: 100%;
  --vsa-min-width: 300px;
  --vsa-text-color: rgba(55, 55, 55, 1);
  --vsa-highlight-color: rgba(0, 0, 0, 0);
  --vsa-bg-color: transparent;
  // --vsa-border-color: rgba(0, 0, 0, 0.2);
  --vsa-border-width: 0;
  // --vsa-border-style: solid;
  --vsa-heading-padding: 1rem 1rem;
  --vsa-content-padding: 1rem 1rem 3rem 1rem;
  --vsa-default-icon-size: 0.5;
}

.vsa-item {
  border-bottom: 1px solid grey;
}

.vsa-item__trigger {
  &__content {
    max-width: 90%;
  }

  h4 {
    color: black;
    text-align: left;
  }

  &__icon--is-default:after,
  &__icon--is-default:before {
    background-color: black;
  }
  &:focus,
  &:hover {
    h4 {
      color: $bismark-text;
    }
  }
}
</style>
