/**
 * Access the category api via this vuex store module.
 * NOTE: the categories will persist between pages, but not on refresh of pages,
 * or on access to pages via their direct links.
 * Ensure that the store state is loaded by calling `this.$store.dispatch("categories/fetchCategories");`
 * at least once before the categories state is required.
 *
 * Retrieves custom href link from utils/categories.js hrefMap. Populated in fetchCategories.
 *
 * State:
 * this.$store.state.categories.list
 *
 * Getters:
 * Get map of {slug:id} : this.$store.getters['categories/slugToId']
 * Get map of {id:slug} : this.$store.getters['categories/idToSlug']
 * Get category length: this.$store.getters['categories/length']
 *
 * Actions:
 * Update vuex store categories from API:
 * this.$store.dispatch("categories/fetchCategories"); // Fetch all categories
 *
 * Mutations:
 * UPDATE_CATEGORIES: Update all categories
 */

import { getCategories } from '@/api/categories'
import { hrefMap } from '../../utils/categories'

export default {
  namespaced: true,
  state: () => ({
    list: []
  }),
  getters: {
    slugToId(state) {
      return Object.assign({}, ...state.list.map((item) => ({ [item.slug]: item.id })))
    },
    idToSlug(state) {
      return Object.assign({}, ...state.list.map((item) => ({ [item.id]: item.slug })))
    },
    length(state) {
      return state.list.length
    }
  },
  mutations: {
    UPDATE_CATEGORIES(state, categories) {
      state.list = categories
    }
  },
  actions: {
    fetchCategories({ commit, state }) {
      return new Promise((resolve) => {
        if (state.list === null || state.list.length === 0) {
          getCategories().then((response) => {
            const categories = response.data.response.categories
            categories.forEach((e) => (e.href = hrefMap[e.id]))
            commit('UPDATE_CATEGORIES', categories)
            resolve()
          })
        } else {
          resolve()
        }
      })
    }
  }
}
