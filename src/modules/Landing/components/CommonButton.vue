<template>
  <router-link
    v-if="Object.keys(this.sectionRoutes).length !== 0"
    :tag="tag"
    class="buttonStyle"
    :to="linkRoute"
    :disabled="disabled"
  >
    <slot></slot>
  </router-link>
</template>

<script>
import Vue from 'vue'
export default {
  props: {
    route: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      required: false
    },
    tag: {
      default: 'a',
      type: String,
      required: false
    }
  },
  data() {
    return {
      sectionRoutes: {},
      sections: ['hairSection', 'sexSection', 'skinSection', 'mindSection']
    }
  },
  computed: {
    linkRoute() {
      return this.sectionRoutes[this.route]
    },
    categories() {
      return this.$store.state.categories.list
    }
  },
  watch: {
    categories: {
      handler: function(data) {
        this.repopulateCategory(data)
      }
    }
  },
  mounted() {
    this.repopulateCategory(this.categories)
  },
  methods: {
    repopulateCategory: function(data) {
      const vm = this
      data.forEach(function(element, index) {
        // vm.sectionRoutes[vm.sections[index]] = `shop/${element.slug}`;
        Vue.set(vm.sectionRoutes, vm.sections[index], `shop/${element.slug}`)
      })
    }
  }
}
</script>

<style lang="scss">
.buttonStyle {
  margin-top: 2rem;
  display: table;
  text-transform: uppercase;
  padding: 1.4rem 4rem;
  font-size: 14px;
  letter-spacing: 2px;
  background-color: black;
  color: white;
  border: 1px solid black;
  font-family: 'PublicSansExtraBold', sans-serif;
  text-decoration: none;
  transition: all 0.4s ease-in-out;

  &:hover {
    background-color: transparent;
    color: black;
  }

  @media screen and (max-width: 768px) {
    margin-top: 1rem;
    font-size: 0.9rem;
    padding: 1rem 2rem;
  }
}
</style>
