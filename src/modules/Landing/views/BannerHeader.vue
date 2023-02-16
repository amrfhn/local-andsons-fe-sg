<template>
  <div v-if="headerBanner" class="banner" :style="bannerHeaderStyle">
    <div class="banner-message" v-html="headerBanner.title"></div>
    <!-- <simple-lead-gen-form></simple-lead-gen-form> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import SimpleLeadGenForm from "@/components/SimpleLeadGenForm.vue";

export default {
  name: 'BannerHeader',
  // components: {
  //   SimpleLeadGenForm
  // },
  computed: {
    bannerHeaderStyle() {
      return {
        backgroundColor: this.headerBanner.bg_color_hex,
        color: this.title_color_hex,
        height: '48px',
        padding: '1rem',
        textAlign: 'center',
        fontWeight: '400',
        letterSpacing: '2px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
      }
    },
    testComputed() {
      return ''
    },
    ...mapGetters({
      headerBanner: 'getHeaderBanner'
    })
  },
  watch: {
    $route() {
      this.$store.dispatch('retrieveNotificationsBanner', this.$route.path)
    }
  },
  mounted() {
    this.$store.dispatch('retrieveNotificationsBanner')
  }
}
</script>

<style lang="scss" scoped>
.banner {
  line-height: 48px;
  // margin-bottom: 10px;
  // margin-top: -3rem;
  @media screen and (max-width: 767px) {
    // margin-bottom: 0;
    font-size: 0.825rem;
    // margin-top: -1.5rem;
  }
  @media screen and (max-width: 425px) {
    font-size: 0.625rem;
  }
}
</style>
