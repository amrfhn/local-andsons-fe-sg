<template>
  <div class="our-featured">
    <div v-for="(post, index) in this.blogs" :key="index" class="feature spacing">
      <a class="tw-inline-block feature__img tw-mb-6" :href="post.url">
        <img
          :src="post.externalImage ? post.externalImage : require(`@/assets/images/${post.image}`)"
          :alt="post.title"
        />
      </a>
      <p class="feature__date tw-mb-2">{{ post.date }}</p>
      <a class="tw-inline-block" :href="post.url">
        <h3 class="feature__title tw-font-bold tw-leading-9 tw-mb-6">
          {{ post.title }}
        </h3>
        <p class="feature__description tw-mb-6">
          {{ post.description }}
        </p>
      </a>
      <a class="tw-inline-block read_more tw-font-bold tw-flex tw-items-center" :href="post.url">
        <span class="tw-flex tw-items-center">Read&nbsp;on</span>
      </a>
    </div>
  </div>
</template>

<script>
import featuredPosts from '@/data/featuredPosts.json'

export default {
  props: ['posts'],
  data() {
    return {
      blogs: this.posts
    }
  },
  mounted() {
    if (this.posts == undefined) {
      this.blogs = featuredPosts.posts
    }
  }
}
</script>

<style lang="scss" scoped>
.our-featured {
  padding: 2rem 0 3rem 2rem;
  display: flex;
  position: relative;
  overflow: auto;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE 10+ */
  &::-webkit-scrollbar {
    width: 0;
    background: transparent; /* Chrome/Safari/Webkit */
  }
}
.feature {
  position: relative;
  height: auto;
  min-width: 300px;
  width: 85vw;
  padding-right: 2rem;
  max-width: 30rem;

  &:first-child::before {
    content: '';
    background: url('../assets/images/featured_logo.png');
    position: absolute;
    display: block;
    height: 50px;
    width: 150px;
    background-size: contain;
    background-repeat: no-repeat;
    z-index: 1;
    top: -2rem !important;
    left: -1rem !important;
  }

  &__img {
    height: 280px;
    overflow: hidden;

    & > img {
      width: 100%;
      object-fit: cover;
    }
  }

  &__title {
    font-size: 1.8rem;
  }

  &__description {
    line-height: 1.5rem;
    font-size: 0.95rem;
  }

  .read_more {
    span::after {
      content: '';
      margin-left: 1rem;
      display: flex;
      background-image: url('../assets/images/right_arrow.svg');
      background-size: contain;
      background-repeat: no-repeat;
      width: 15px;
      height: 10px;
    }
  }
}
</style>
