<template>
  <a href="http://legitscript.com" target="_blank" title="Verify LegitScript Approval">
    <img class="logo" :src="url" alt="LegitScript approved" />
  </a>
</template>

<script>
export default {
  name: 'LegitScriptLogo',
  data() {
    return {
      url: `${window.location.protocol}//static.legitscript.com/seals/9874934.png`
    }
  }
}
</script>

<style lang="scss" scoped>
.logo {
  width: 140px;
  height: 100px;
}
</style>
