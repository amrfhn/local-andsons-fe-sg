<template>
  <MountingPortal mount-to="body" append>
    <div class="side-menu-wrapper" :class="{ open: isOpen }">
      <div class="side-menu">
        <div class="close-button">
          <img src="../assets/images/menu_cross.svg" alt="burger menu" @click="onClose" />
        </div>
        <ul class="menu">
          <li class="menu-item shop-hover-item">
            <a>TREATMENTS</a>
            <ul class="shop-dropdown">
              <li class="shop-menu-item">
                <a href="/treatment/hair-loss">HAIR LOSS</a>
              </li>
              <li class="shop-menu-item" @click="onClose">
                <a href="/treatment/sexual-health">SEXUAL HEALTH</a>
              </li>
              <li class="shop-menu-item">
                <a href="/treatment/skincare">SKINCARE</a>
              </li>
              <li class="shop-menu-item">
                <a href="/mental-health">
                  MENTAL HEALTH
                </a>
              </li>
            </ul>
          </li>
          <li class="menu-item" @click="onClose">
            <a href="https://andsons.com.sg/blog">SCIENCE</a>
          </li>
          <!-- <li class="menu-item" @click="onClose">
            <a href="https://andsons.com.sg/blog">ABOUT</a>
          </li> -->
        </ul>
      </div>
    </div>
  </MountingPortal>
</template>

<script>
import { MountingPortal } from 'portal-vue'

export default {
  components: {
    MountingPortal
  },
  props: ['isOpen'],
  methods: {
    onClose() {
      this.$emit('toggle-menu')
    }
  }
}
</script>

<style lang="scss">
.side-menu-wrapper {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9999999999;
  transform: translateX(100%);
  transition: all 0.5s ease-in-out;

  &.open {
    transform: translateX(0);
  }

  .side-menu {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 55vw;
    max-width: 250px;
    height: 100vh;
    background-color: $sidebar-background;

    .close-button {
      display: flex;
      justify-content: flex-end;
      margin-right: 30px;
      margin-top: 3.5rem;
      text-align: right;
      cursor: pointer;

      img {
        width: 20px;
        height: 20px;
      }
    }

    .menu {
      padding-top: 5em;
      padding-left: 1.5rem;
      display: table;

      a {
        text-decoration: none;
        color: $white-text;
        font-family: 'PublicSansBold', sans-serif;
        letter-spacing: 5px;
      }

      &-item {
        list-style-type: none;
        padding-bottom: 3rem;
        position: relative;

        .shop-menu-item {
          list-style-type: none;
          padding-top: 1.5rem;
          font-size: 14px;

          a {
            color: rgba($color: #fff, $alpha: 0.7);
          }
        }
      }
    }
  }

  ul {
    margin-left: 0;
  }

  // .shop-dropdown{
  //   height: 0;
  //   opacity: 0;
  //   touch-action: none;
  //   transition: all 0.5s ease-in-out;
  // }

  // .shop-hover-item:hover .shop-dropdown, .shop-hover-item:active .shop-dropdown{
  //   opacity: 1;
  //   height: 180px;
  //   touch-action: initial;
  // }
}
</style>
