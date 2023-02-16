<template>
  <section>
    <div id="knowledge-section" class="knowledge">
      <h2 class="knowledge__title">Knowledge is power</h2>
      <p class="knowledge__description">
        Our editorial team and panel of doctors have put together a library of articles about the medicines we carry,
        the conditions they treat and more.
      </p>
    </div>
    <FeaturedPost />

    <div class="btn-view-all">
      <a href="https://andsons.com.sg/blog/">
        <span>View all</span>
      </a>
    </div>
  </section>
</template>

<script>
import FeaturedPost from '@/components/FeaturedPost.vue'

export default {
  components: {
    FeaturedPost
  }
}
</script>

<style lang="scss" scoped>
#knowledge-section {
  scroll-snap-align: none;
}

section {
  padding: 5rem 0 10rem 0;

  @media screen and (max-width: 768px) {
    padding-bottom: 5rem;
  }
}

.spacing {
  & > * + * {
    padding-top: 1.3rem;
  }
}

.knowledge {
  padding: 2rem 2rem 4rem 2rem;
  text-align: center;

  &__title {
    font-size: 2.5rem;
    font-family: 'PublicSansExtraBold', sans-serif;
    color: $black-text;
    padding-bottom: 1.5rem;
  }

  &__description {
    font-family: 'PublicSans', sans-serif;
    color: $black-text;
    line-height: 1.5;
  }
}

.btn-view-all {
  display: flex;
  text-align: center;
  justify-content: center;
  transition: background 0.3s ease-in-out;

  a {
    font-family: 'PublicSansExtraBold', sans-serif;
    text-transform: uppercase;
    text-decoration: none;
    padding: 1.4rem 4rem;
    background: #000000;
    overflow: hidden;
    display: block;
    cursor: pointer;
    border: 1px solid black;
    color: #ffffff;
    letter-spacing: 2px;
    transition: background 0.3s ease-in-out;

    > span {
      display: block;
      color: white;
    }

    &:hover,
    &:active {
      background: transparent;

      span {
        color: black;
      }
    }
  }
}
</style>
