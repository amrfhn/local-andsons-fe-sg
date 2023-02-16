<template>
  <header class="header">
    <p class="header__paragraph header--text-style">1ST MONTH FOR FREE</p>
    <template v-if="currentRoute === 'Landing'">
      <a href="#contact-section" class="header__anchor header--text-style">JOIN WAITLIST NOW</a>
    </template>
    <template v-else>
      <router-link class="header__anchor header--text-style" :to="{ name: 'Landing' }">
        JOIN WAITLIST NOW
      </router-link>
    </template>
  </header>
</template>

<script>
export default {
  computed: {
    currentRoute() {
      return this.$route.name
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  -webkit-transform: translateZ(0);
  display: block;
  text-align: center;
  background-color: $almond-background;
  padding: 1rem;
  width: 100vw;
  z-index: 9999;
  overflow: hidden;

  &__paragraph {
    display: inline;
    font-family: 'PublicSans', sans-serif;
    padding-right: 10px;
  }

  &__anchor {
    display: inline;
    font-family: 'PublicSansExtraBold', sans-serif;
    letter-spacing: 2px;
  }

  &--text-style {
    display: inline;
    color: $black-text;
    font-size: 10px;
    white-space: nowrap;
    letter-spacing: 2px;
  }
}
</style>
