<template>
  <div @click="$router.go(-1)">
    <button class="close">
      <font-awesome-icon :icon="['fas', 'arrow-left']" />
    </button>
    <span class="title">Back</span>
  </div>
</template>

<script>
export default {
  name: 'BackButton'
}
</script>

<style lang="scss" scoped>
div {
  cursor: pointer;
}
.title {
  font-size: 36px;
  margin: 0 auto;
  @media screen and (max-width: 768px) {
    font-size: 24px;
  }
}
.close {
  cursor: pointer;
  background: transparent;
  width: 30px;
  height: 30px;
  border: 0;
  outline: none;
  @media screen and (max-width: 768px) {
    width: 16px;
    height: 16px;
  }
  > svg {
    width: 100%;
    height: 100%;
  }
}
</style>
