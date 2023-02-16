import { shallowMount } from '@vue/test-utils'
import CartItem from '@/components/Cart/CartItem.vue'
import * as cartsApi from '@/api/carts'

jest.useFakeTimers()

describe('CartItem', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallowMount(CartItem, {
      propsData: {
        title: 'The Blue Pill',
        unitDescription: '3-Monthly Subscription',
        unitPrice: 87,
        description: '<p>every 3 months</p>',
        canIncrement: false,
        initialQuantity: 6,
        summaryMode: true,
        currencyPrefix: '$',
        productOptionPriceId: 25,
        thumbnailUrl: 'https://test',
        cartId: 369
      }
    })
  })
  afterEach(() => {
    jest.clearAllMocks()
  })
  it('summaryMode', async () => {
    const title = wrapper.find('.cart-title')
    expect(title.text()).toEqual('The Blue Pill')
    expect(wrapper.find('.quantity-count').exists()).toBe(true)
    expect(wrapper.find('.quantity-count').text()).toEqual('x6')
    expect(wrapper.find('.cart-price').text()).toEqual(`$${6 * 87}.00`)
    expect(wrapper.find('.cart-image').attributes().src).toEqual('https://test')
  })
  it('preventIncrement Mode', async () => {
    await wrapper.setProps({
      summaryMode: false
    })
    const title = wrapper.find('.cart-title')
    expect(title.text()).toEqual('The Blue Pill')
    expect(wrapper.find('.quantity-count').exists()).toBe(false)
    expect(wrapper.find('.cart-price').text()).toEqual(`$${6 * 87}.00`)
    const quantity = wrapper.findComponent({ name: 'Quantity' })
    expect(quantity.exists()).toBe(true)
    expect(quantity.props().initialQuantity).toEqual(6)
    expect(quantity.props().removable).toEqual(true)
    expect(quantity.props().canDecrement).toEqual(true)
    expect(quantity.props().canIncrement).toEqual(false)
  })
  it('Normal Mode', async () => {
    await wrapper.setProps({
      canIncrement: true,
      summaryMode: false
    })
    const quantity = wrapper.findComponent({ name: 'Quantity' })
    expect(quantity.exists()).toBe(true)
    expect(quantity.props().removable).toEqual(true)
    expect(quantity.props().canDecrement).toEqual(true)
    expect(quantity.props().canIncrement).toEqual(true)
  })
  it('updates the internal quantity when update is received from server, iff no pending requests', async () => {
    await wrapper.setProps({
      canIncrement: true,
      summaryMode: false,
      initialQuantity: 8
    })
    await wrapper.setData({ pending: true, quantity: 9 })
    expect(wrapper.vm.quantity).toBe(9)

    await wrapper.setData({ pending: false })
    await wrapper.setProps({
      initialQuantity: 7
    })
    expect(wrapper.vm.quantity).toBe(7)
  })
  it('updateQuantity triggers debounced function and sets a pending variable to true to track the potential server update', async () => {
    // const addItemToCart = jest.fn();
    // const getCarts = jest.fn();
    // jest.runAllTimers();
    // let updateServerQuantity = _.debounce(async function() {
    //   addItemToCart();
    //   getCarts();
    // });
    const updateServerQuantity = jest.spyOn(CartItem.methods, 'updateServerQuantity')
    wrapper = shallowMount(CartItem, {
      propsData: {
        title: 'The Blue Pill',
        unitDescription: '3-Monthly Subscription',
        unitPrice: 87,
        description: '<p>every 3 months</p>',
        canIncrement: false,
        initialQuantity: 6,
        summaryMode: true,
        currencyPrefix: '$',
        productOptionPriceId: 25,
        thumbnailUrl: 'https://test',
        cartId: 369
      },
      stubs: ['updateServerQuantity']
      // mocks: [addItemToCart, getCarts]
    })
    wrapper.setData({
      pending: false
    })
    // wrapper.setMethods({
    //     updateServerQuantity: updateServerQuantity
    // });
    await wrapper.vm.updateQuantity(8)
    expect(wrapper.vm.pending).toBe(true)
    expect(updateServerQuantity).toBeCalledTimes(1)
  })
  it('performs debounce correctly', async () => {
    jest.useFakeTimers()
    const addItemToCart = jest.spyOn(cartsApi, 'addItemToCart').mockImplementation(() => Promise.resolve())
    const getCarts = jest
      .spyOn(cartsApi, 'getCarts')
      .mockImplementation(() => Promise.resolve({ data: { response: [] } }))
    const mockStore = { commit: jest.fn() }
    wrapper = shallowMount(CartItem, {
      propsData: {
        title: 'The Blue Pill',
        unitDescription: '3-Monthly Subscription',
        unitPrice: 87,
        description: '<p>every 3 months</p>',
        canIncrement: false,
        initialQuantity: 6,
        summaryMode: true,
        currencyPrefix: '$',
        productOptionPriceId: 25,
        thumbnailUrl: 'https://test',
        cartId: 369
      },
      mocks: {
        updateServerQuantity: jest.fn(),
        $store: mockStore,
        addItemToCart: addItemToCart,
        getCarts: getCarts
      }
    })
    wrapper.setData({
      pending: false
    })
    wrapper.vm.updateQuantity(8)
    expect(wrapper.vm.pending).toBe(true)
    jest.runAllTimers()
    // jest.advanceTimersByTime(500);
    for (let i = 0; i < 2; i++) {
      await Promise.resolve()
    }
    expect(wrapper.vm.pending).toBe(false)
    expect(addItemToCart).toBeCalledTimes(1)
    expect(getCarts).toBeCalledTimes(1)
    expect(mockStore.commit).toHaveBeenCalledWith('updateCart', [])
  })
  it('triggers proper removal of item from cart', async () => {
    const deleteItemFromCart = jest.spyOn(cartsApi, 'deleteItemFromCart').mockImplementation(() => Promise.resolve())
    const getCarts = jest
      .spyOn(cartsApi, 'getCarts')
      .mockImplementation(() => Promise.resolve({ data: { response: [] } }))
    const mockStore = { commit: jest.fn(), state: { cart: {} } }
    const mockRouter = { push: jest.fn() }
    const trackRemove = jest.spyOn(CartItem.methods, 'trackRemoveFromCart').mockImplementation(() => {})
    wrapper = shallowMount(CartItem, {
      propsData: {
        title: 'The Blue Pill',
        unitDescription: '3-Monthly Subscription',
        unitPrice: 87,
        description: '<p>every 3 months</p>',
        canIncrement: false,
        initialQuantity: 6,
        summaryMode: true,
        currencyPrefix: '$',
        productOptionPriceId: 25,
        thumbnailUrl: 'https://test',
        cartId: 369
      },
      mocks: {
        $store: mockStore,
        $route: { path: 'checkout' },
        $router: mockRouter,
        deleteItemFromCart: deleteItemFromCart,
        getCarts: getCarts,
        trackRemoveFromCart: trackRemove
      }
    })
    await wrapper.vm.removeProduct()
    expect(deleteItemFromCart).toBeCalledTimes(1)
    expect(deleteItemFromCart).toHaveBeenCalledWith(369, 25)
    expect(getCarts).toBeCalledTimes(1)
    expect(mockStore.commit).toHaveBeenCalledWith('updateCart', [])
  })
  it('redirects to home if empty in checkoutpage', async () => {
    const deleteItemFromCart = jest.spyOn(cartsApi, 'deleteItemFromCart').mockImplementation(() => Promise.resolve())
    const getCarts = jest
      .spyOn(cartsApi, 'getCarts')
      .mockImplementation(() => Promise.resolve({ data: { response: { total: 0 } } }))
    const mockStore = { commit: jest.fn(), state: { cart: {} } }
    const trackRemove = jest.spyOn(CartItem.methods, 'trackRemoveFromCart').mockImplementation(() => {})
    const mockRouter = { push: jest.fn() }
    wrapper = shallowMount(CartItem, {
      propsData: {
        title: 'The Blue Pill',
        unitDescription: '3-Monthly Subscription',
        unitPrice: 87,
        description: '<p>every 3 months</p>',
        canIncrement: false,
        initialQuantity: 6,
        summaryMode: true,
        currencyPrefix: '$',
        productOptionPriceId: 25,
        thumbnailUrl: 'https://test',
        cartId: 369
      },
      mocks: {
        $store: mockStore,
        $route: { path: 'checkout' },
        $router: mockRouter,
        deleteItemFromCart: deleteItemFromCart,
        getCarts: getCarts,
        trackRemoveFromCart: trackRemove
      }
    })
    await wrapper.vm.removeProduct()
    expect(getCarts).toBeCalledTimes(1)
    expect(mockRouter.push).toBeCalledTimes(1)
    expect(mockRouter.push).toBeCalledWith('/')
  })
})
