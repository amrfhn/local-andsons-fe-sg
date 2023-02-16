<template>
  <div id="mountingPoint">
    <BannerHeader />
    <div id="main-view">
      <router-view />
    </div>
    <TheFooter />
  </div>
</template>

<script>
import BannerHeader from '@/modules/Landing/views/BannerHeader.vue'
import TheFooter from '@/components/TheFooter.vue'

export default {
  components: {
    BannerHeader,
    TheFooter
  }
}
</script>

<style lang="scss">
#mountingPoint {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

#main-view {
  min-height: 100vh;
}

.submit-button {
  background: #000;
  color: #fff;
  font-family: 'PublicSansExtraBold', sans-serif;
  font-size: 16px;
  outline: none;
  border: none;
  margin-top: 40px;
  cursor: pointer;
  display: table;
  padding: 1.4rem 4rem;
  letter-spacing: 1.2px;

  @media screen and (max-width: 450px) {
    font-size: 0.9rem;
    padding: 1rem 2.3rem;
  }

  &.inverted {
    color: #000 !important;
    background: transparent !important;
    border: 2px solid #000 !important;
  }
}

.disabled {
  cursor: default;
  background: rgba(0, 0, 0, 0.5);
}

.full-width {
  width: 100%;
  display: block !important;
}

.center {
  margin: 32px auto;
}

[v-cloak] {
  display: none;
}
</style>
