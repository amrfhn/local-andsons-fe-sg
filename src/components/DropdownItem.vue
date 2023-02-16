<template>
  <div class="footer-col" @click="toggleDropdown">
    <div class="head">
      <p>{{ content.title }}</p>
      <img :src="toggleIcon" alt="icon" />
    </div>
    <ul :class="{ expand: toggle }">
      <li v-for="item in content.contentItem" :key="item.title">
        <router-link v-if="item.isSubRoute" tag="a" :to="item.link" :class="{ disabled: !item.link }">{{
          item.title
        }}</router-link>
        <a
          v-else
          :href="item.link"
          :target="route === 'Payment' || item.title === 'Science' || item.isSocial ? '_blank' : null"
          :class="{ 'social-links': item.isSocial }"
        >
          <font-awesome-icon v-if="item.isSocial" :icon="['fab', item.title]" />
          <div v-else class="tw-row">
            <img
              v-if="item.icon"
              :src="item.icon"
              :alt="item.iconAlt"
              class="tw-w-12 tw-inline tw-mr-2"
              :class="item.iconClass"
            />
            <span>{{ item.title }}</span>
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import PlusIcon from '@/assets/images/plus.svg'
import MinusIcon from '@/assets/images/minus.svg'

export default {
  props: ['content'],
  data() {
    return {
      plus: PlusIcon,
      minus: MinusIcon,
      toggle: false
    }
  },
  computed: {
    toggleIcon() {
      if (this.toggle) return this.minus
      return this.plus
    },
    route() {
      return this.$route.name
    }
  },
  methods: {
    toggleDropdown() {
      this.toggle = !this.toggle
    }
  }
}
</script>

<style lang="scss" scoped>
ul {
  list-style: none;
  margin-left: 0;
}

.head {
  display: flex;
  justify-content: space-between;
  cursor: pointer;

  h4 {
    font-family: 'PublicSansExtraBold', sans-serif;
  }

  img {
    height: 10px;
    width: 10px;
    display: none;

    @media screen and (max-width: 510px) {
      display: block;
    }
  }
}
.footer-col {
  width: 20%;
  padding: 0 15px;
  min-width: 198px;
  max-width: 250px;

  @include mediaSm {
    max-width: 100%;
  }
}
.footer-col p {
  font-size: 18px;
  color: #ffffff;
  text-transform: capitalize;
  /* margin-bottom: 35px; */
  font-weight: 500;
  font-family: 'PublicSansExtraBold', sans-serif;
  position: relative;
}
a.disabled {
  pointer-events: none;
  cursor: default;
}

@media screen and (max-width: 510px) {
  .footer-col ul {
    height: auto;
    max-height: 0;
    opacity: 0;
    transition: all 0.5s ease-in-out;
    touch-action: none;

    li a {
      touch-action: none;
      pointer-events: none;
    }

    &.expand {
      max-height: 200px;
      touch-action: initial;
      opacity: 1;

      li a {
        touch-action: initial;
        pointer-events: initial;
      }
    }
  }
}

.footer-col ul li {
  list-style-type: none;
  margin-top: 25px;
}

.footer-col ul li a {
  font-size: 16px;
  color: #ffffff;
  text-decoration: none;
  font-weight: 300;
  display: block;
  transition: all 0.3s ease;
}
.footer-col ul li a:hover {
  color: #ffffff;
  padding-left: 8px;
}

/*responsive*/
@media (max-width: 976px) {
  .footer-col {
    width: 33%;
    margin-bottom: 30px;
  }
}
@media (max-width: 767px) {
  .footer-col {
    width: 50%;
    margin-bottom: 30px;
  }
}
@media (max-width: 574px) {
  .footer-col {
    width: 100%;
  }
}

.footer-col .social-links {
  display: inline-block;
  font-size: 26px;
  height: 40px;
  width: 40px;
  margin: 0 10px 10px 0;
  text-align: center;
  /* line-height: 40px; */
  color: #ffffff;
}

.social {
  @media screen and (max-width: 510px) {
    width: 100%;
  }
}

.footer-col .social-links {
  @media screen and (max-width: 510px) {
    display: flex;
    justify-content: center;
  }
}
</style>
