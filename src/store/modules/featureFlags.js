export const mapReduceFlags = (flags, phrase) => {
  return Object.keys(flags)
    .filter((key) => key.indexOf(phrase) === 0)
    .reduce((obj, key) => {
      return {
        ...obj,
        [key.replace(phrase, '')]: flags[key]
      }
    }, {})
}

export default {
  namespaced: true,
  state: {
    enabled: false,
    flags: {
      //  Categories
      'category-skincare': true,

      // Products
      'product-acne-cream': true,
      'product-anti-aging': true
    }
  },
  getters: {
    enabled: (state) => state.enabled,
    flags: (state) => state.flags,
    categoryFlags: (state) => mapReduceFlags(state.flags, 'category-'),
    productFlags: (state) => mapReduceFlags(state.flags, 'product-')
  },
  mutations: {
    // eslint-disable-next-line no-unused-vars
    update(state, flags) {
      flags.forEach((flag) => (state.flags[flag] = true))
      state.enabled = true
    }
  },
  actions: {
    async update({ commit }, flags) {
      commit('update', flags)
    }
  }
}
