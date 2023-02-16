<template>
  <div class="shop-banner">
    <template v-if="banner.type == 'A'">
      <BannerTypeA :banner-details="banner" />
    </template>
    <template v-if="banner.type == 'B'">
      <BannerTypeB :banner-details="banner" />
    </template>
    <template v-if="banner.type == 'C'">
      <BannerTypeC :banner-details="banner" />
    </template>
    <template v-if="banner.type == 'D'">
      <BannerTypeD :banner-details="banner" />
    </template>
  </div>
</template>

<script>
import BannerTypeA from '@/modules/Shop/components/BannerTypeA'
import BannerTypeB from '@/modules/Shop/components/BannerTypeB'
import BannerTypeC from '@/modules/Shop/components/BannerTypeC'
import BannerTypeD from '@/modules/Shop/components/BannerTypeD'

export default {
  components: {
    BannerTypeA,
    BannerTypeB,
    BannerTypeC,
    BannerTypeD
  },
  props: ['banner']
}
</script>

<style lang="scss" scoped>
.shop-banner {
  height: 100%;
}
</style>
