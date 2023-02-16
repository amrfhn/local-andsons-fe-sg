import App from '@/App.vue'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

const flushPromises = () => new Promise(setImmediate)

describe('App.vue', () => {
  let actions, state, mutations, store

  beforeEach(() => {
    state = { ipCountry: null }
    actions = { retrieveIpCountryCode: jest.fn() }
    mutations = { updateIpCountry: jest.fn() }

    store = new Vuex.Store({ state, mutations, actions })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('Default hide modal', async () => {
    const wrapper = shallowMount(App, {
      stubs: ['banner-header', 'the-footer', 'router-link', 'router-view'],
      store,
      localVue
    })
    expect(wrapper.vm.$data.showModal).toBeFalsy()
  })

  it('can Change country shows modal', async () => {
    actions.retrieveIpCountryCode.mockReturnValueOnce({ country_code: 'MY', country_name: 'Malaysia' })

    const wrapper = shallowMount(App, {
      stubs: ['banner-header', 'the-footer', 'router-link', 'router-view'],
      store,
      localVue
    })

    await flushPromises()
    expect(wrapper.vm.$data.showModal).toBeTruthy()
  })

  it("existing country doesn't show modal", async () => {
    actions.retrieveIpCountryCode.mockReturnValueOnce({ country_code: 'MY', country_name: 'Malaysia' })

    store.state.ipCountry = { country_code: 'MY', country_name: 'Malaysia' }

    const wrapper = shallowMount(App, {
      stubs: ['banner-header', 'the-footer', 'router-link', 'router-view'],
      store,
      localVue
    })

    await flushPromises()

    expect(wrapper.vm.$data.showModal).toBeFalsy()
  })

  it('non-existing country should not trigger', async () => {
    actions.retrieveIpCountryCode.mockReturnValueOnce({ country_code: 'US', country_name: 'America' })

    const wrapper = shallowMount(App, {
      stubs: ['banner-header', 'the-footer', 'router-link', 'router-view'],
      store,
      localVue
    })

    await flushPromises()

    expect(wrapper.vm.$data.showModal).toBeFalsy()
  })

  it("invalid country doesn't show modal.", async () => {
    actions.retrieveIpCountryCode.mockReturnValueOnce({ country_code: 'XX', country_name: 'Unknown' })

    const wrapper = shallowMount(App, {
      stubs: ['banner-header', 'the-footer', 'router-link', 'router-view'],
      store,
      localVue
    })

    await flushPromises()

    expect(wrapper.vm.$data.showModal).toBeFalsy()
  })

  it('showModal actually shows modal', async () => {
    const wrapper = shallowMount(App, {
      stubs: ['banner-header', 'the-footer', 'router-link', 'router-view'],
      store,
      localVue
    })
    await flushPromises()
    expect(wrapper.find('#redirect').isVisible()).toBeFalsy()
    wrapper.vm.$data.showModal = true
    expect(wrapper.vm.$data.showModal).toBeTruthy()
    await wrapper.vm.$nextTick()
    expect(wrapper.find('#redirect').isVisible()).toBeTruthy()
  })

  it('redirectLink returns the correct url', async () => {
    expect(App.computed.redirectLink.call({ ipCountry: { country_code: 'SG' } })).toEqual('https://andsons.com.sg/')
    expect(App.computed.redirectLink.call({ ipCountry: { country_code: 'MY' } })).toEqual('https://andsons.com.my/')
  })
})
