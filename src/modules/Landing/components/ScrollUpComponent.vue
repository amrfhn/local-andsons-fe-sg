<template>
  <div class="scroll-up-container" @click="window.scrollTo(0, 0)"></div>
</template>

<style lang="scss" scoped>
.scroll-up-container {
  position: fixed;
  -webkit-transform: translateZ(0);
  display: none;
  bottom: 100px;
  right: 20px;
  width: 30px;
  height: 30px;
  background: center / contain no-repeat url('../../../assets/images/up_arrow.svg');
  cursor: pointer;
  z-index: 20;

  @media screen and (min-width: 1024px) {
    bottom: 100px;
    right: 35px;
    width: 30px;
    height: 30px;
  }
}
</style>
