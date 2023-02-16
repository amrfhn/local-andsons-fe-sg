<template>
  <nav
    v-click-outside="mouseOut"
    :class="`action-header-nav tw-flex ${isNavOpen || isMobileNavOpen || isUserScrolling ? 'bg-opaque' : ''}`"
  >
    <div class="tw-flex">
      <router-link to="/">
        <Logo />
      </router-link>
    </div>

    <div class="nav-items tw-flex">
      <span class="nav-item" @mouseover="mouseOver('treatments')">
        Treatments
      </span>

      <a class="nav-item" href="https://andsons.com.sg/blog" target="_blank">
        Science
      </a>
    </div>

    <div class="action-header-sub tw-flex">
      <div
        class="action-header-sub-btn cart"
        :class="{
          dot: false,
          animate: animationState
        }"
        :style="route === 'Payment' ? { filter: 'opacity(0.5)', cursor: 'not-allowed' } : null"
        @click="route !== 'Payment' && toggleSidebar()"
      />
      <div v-show="showCart && cart.length > 0 && route !== 'Payment'" class="circle-landing">
        <p>{{ cartQuantity }}</p>
      </div>
      <router-link :to="authenticated ? '/dashboard' : '/user/login'" class="action-header-sub-btn user">
        User
      </router-link>
      <div class="burger-menu" @click="toggleMobileMenu">
        <img :src="require(`@/assets/images/menu.svg`)" alt="burger menu" />
      </div>
    </div>
    <CartSidebar :visible="visible" @toggleVisible="toggleSidebar" />

    <div :class="`dropdown-container ${isNavOpen || isMobileNavOpen ? 'opened' : ''}`" @mouseleave="mouseOut">
      <GlobalHeaderDropdown :selected-menu="selectedMenu" :close-menu="mouseOut" />
    </div>
  </nav>
</template>

<script>
import { getCarts } from '@/api/carts'
import { eventBus } from '@/main.js'
import { trackCartView } from '@/utils/analytics'
import CartSidebar from './Cart/Sidebar'
import GlobalHeaderDropdown from './GlobalHeaderDropdown.vue'
import Logo from './Logo'

export default {
  components: { GlobalHeaderDropdown, Logo, CartSidebar },
  props: {
    showFullLogo: Boolean
  },
  data() {
    return {
      observerBody: null,
      offsetTop: 0,
      visible: false,
      menuVisible: false,
      animationState: false,
      isNavOpen: false,
      isMobileNavOpen: false,
      isUserScrolling: false,
      selectedMenu: 'treatments'
    }
  },
  computed: {
    authenticated() {
      return this.$store.state.authenticated
    },
    cart() {
      return this.$store.state.cart.cart?.cart_product_option_prices || []
    },
    showCart() {
      const items = this.$store.state.cart.cart?.cart_product_option_prices || []
      let prescriptionItems = []
      items.forEach((item) => {
        if (item.product_option_price.product_option.product.prescription_based) {
          prescriptionItems.push(item.id)
        }
      })
      // only showCart if cart is not empty
      return items.length > 0
    },
    cartQuantity() {
      const items = this.$store.state.cart.cart?.cart_product_option_prices || []
      let quantity = 0

      items.forEach((item) => {
        if ('id' in item) {
          quantity += 1
        }
      })
      return quantity
    },
    route() {
      return this.$route.name
    }
  },
  watch: {
    cart() {
      this.animationState = true
      setTimeout(() => {
        this.animationState = false
      }, 900)
    }
  },
  beforeDestroy() {
    this.observerBody && this.observerBody.disconnect()
    window.removeEventListener('scroll', this.handleScroll)
  },
  mounted() {
    //  Handles the scroll event
    window.addEventListener('scroll', this.handleScroll)

    //  Handles the margin top changes due to intercom banner
    this.observerBody = new MutationObserver(this.handleBodyMarginTopChanges)
    this.observerBody.observe(document.body, { attributes: true })

    this.$store.dispatch('categories/fetchCategories')

    eventBus.$on('toggleNavBar', (toggle) => {
      this.visible = toggle
    })

    eventBus.$on('toggleCart', () => {
      this.visible = !this.visible

      if (this.visible) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = 'auto'
      }
    })

    if (this.cart.length === 0) {
      getCarts().then((response) => {
        this.$store.commit('updateCart', response.data.response)
      })
    }
  },
  methods: {
    toggleMobileMenu() {
      this.isMobileNavOpen = !this.isMobileNavOpen
    },
    mouseOver(selectedMenu) {
      this.selectedMenu = selectedMenu
      this.isNavOpen = true
    },
    mouseOut() {
      this.isNavOpen = false
      this.isMobileNavOpen = false
    },
    toggleSidebar() {
      if (this.route !== 'Payment') {
        this.visible = !this.visible
      }

      if (this.visible) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = 'auto'
      }

      // make sure we're only firing this event
      // when the sidebar is visible.
      if (this.visible && this.$store.state.cart) {
        trackCartView(this.$store.state.cart)
      }
    },
    handleScroll() {
      this.isUserScrolling = window.scrollY > 48
    },
    /**
     * Handles changes to the margin top of the body due to intercom
     */
    handleBodyMarginTopChanges() {
      this.offsetTop = document.body.style.marginTop
    }
  }
}
</script>

<style lang="scss" scoped>
.action-header-nav {
  position: absolute;
  display: flex;
  z-index: 999999999;
  align-items: flex-end;
  width: 100%;
  padding: 2em calc(30px + 5vw);
  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);

  @media screen and (max-width: 1140px) {
    padding: 1em calc(5vw);
  }

  &:not(.bg-opaque) {
    transition-delay: 0.25s;
  }
  &.bg-opaque {
    // top: 0;
    padding-top: 1em;
    padding-bottom: 1em;
    box-shadow: 0 4px 7px -2px #00000029;
    background-color: $springwood-background;
  }

  .sons-logo {
    width: 100px;
    margin-left: 0 !important;
    @media screen and (max-width: 1140px) {
      width: 60px;
      height: auto;
      margin-right: 0;
      margin-top: 10px;
    }
  }
  .nav-item {
    font-family: 'PublicSansBold', sans-serif;
    font-size: 1.15rem;
    letter-spacing: 0.5px;
    color: #333;
    text-decoration: none;
    cursor: pointer;
    @media screen and (max-width: 1140px) {
      display: none;
    }
    &:not(:last-child) {
      margin-right: 3em;
    }
  }
  &.no-margin .nav-item {
    margin-top: 0;
  }
}

.dropdown-container {
  position: fixed;
  width: 100vw;
  height: 0;
  overflow: hidden;
  top: 4.7rem;
  left: 0;
  background-color: darken($springwood-background, 3%);
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  box-shadow: 0px 4px 7px 0px #00000029;
  opacity: 1;
  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;

  &.opened {
    height: 360px;
    pointer-events: auto;

    .dropdown-container-item {
      transform: translateY(0);
      @for $i from 1 through 4 {
        &:nth-child(#{$i}) {
          transition: all #{($i + 1) * 0.2}s cubic-bezier(0.4, 0, 0.2, 1);
        }
      }
    }
  }

  @media screen and (max-width: 1140px) {
    & {
      top: 3.8rem;
    }

    &.opened {
      height: 100%;
    }
  }
}

.action-header-sub {
  display: flex;
  align-items: center;
  position: relative;
  margin-left: auto;

  .action-header-sub-btn {
    content: '';
    display: block;
    width: 28px;
    height: 28px;
    background-color: transparent;
    font-size: 0;
    border: 0;
    outline: none;
    cursor: pointer;
    position: relative;

    @media screen and (max-width: 1140px) {
      width: 20px;
      height: 20px;
    }
    &.animate {
      animation: rotate 600ms 300ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
      @keyframes rotate {
        0%,
        50% {
          transform: rotate(-10deg);
        }
        25%,
        75% {
          transform: rotate(10deg) scale(1.1);
        }
      }
    }
    &.dot {
      &:before {
        content: '';
        position: absolute;
        width: 18px;
        height: 18px;
        background-color: #d85639;
        border-radius: 50%;
        top: -4px !important;
        right: 0 !important;
        left: initial !important;
        z-index: -1;
      }
    }
    &.cart {
      background: url('../assets/images/header-nav/cart.svg') center / contain no-repeat;
      &.dot {
        &:before {
          right: -4px !important;
        }
      }
    }
    &.user {
      margin-left: 25px;
      background: url('../assets/images/header-nav/user.svg') center / contain no-repeat;
      &.dot {
        &:before {
          right: 2px !important;
        }
      }

      @media screen and (max-width: 1140px) {
        margin-right: 25px;
      }
    }
  }
  .circle-not-landing {
    position: absolute;
    width: 18px;
    height: 18px;
    background-color: #d85639;
    border-radius: 50%;
    top: 47px;
    right: 70px;
    left: initial !important;
    color: #fff;
    z-index: 2;
    text-align: center;
    @media screen and(min-width: 1140px) {
      // top: -5px;
      right: 150px;
    }
  }
  .circle-landing {
    position: absolute;
    width: 18px;
    height: 18px;
    background-color: #d85639;

    border-radius: 50%;
    top: -7px;
    left: 10px;
    z-index: 2;
    text-align: center;
  }

  .circle-landing p {
    margin-top: 0.2em;
    align-content: center;
    font-size: 10px;
    color: #fff;
    bottom: -10px;
  }
  .circle-not-landing p {
    margin-top: 0.2em;
    align-content: center;
    font-size: 10px;
    color: #fff;
    bottom: -10px;
  }
}
</style>
