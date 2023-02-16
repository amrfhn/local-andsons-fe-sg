import { mount } from '@vue/test-utils'
import Quantity from '@/components/Quantity.vue'

describe('Quantity', () => {
  it('is able to increment', async () => {
    const wrapper = mount(Quantity, {
      stubs: {
        FontAwesomeIcon: { template: '<div></div> ' }
      },
      propsData: {
        initialQuantity: 5,
        maxQuantity: 6
      }
    })
    const input = wrapper.find('input')
    const increment = wrapper.find('[data-testid="increment"]')
    const decrement = wrapper.find('[data-testid="decrement"]')
    expect(input.attributes('readonly')).toBe(undefined)
    expect(increment.isVisible()).toBe(true)
    expect(decrement.isVisible()).toBe(true)

    expect(wrapper.vm.quantity).toEqual(5)

    wrapper.vm.increment() // increment works
    expect(wrapper.vm.quantity).toEqual(6)

    wrapper.vm.increment() // cannot increase above maxQuantity
    expect(wrapper.vm.quantity).toEqual(6)

    await wrapper.setData({ quantity: 1 }) // decrement works
    expect(wrapper.vm.quantity).toEqual(1)

    // cannot decrease below minQuantity===1
    wrapper.vm.decrement()
    expect(wrapper.vm.quantity).toEqual(1)
    await wrapper.setData({ quantity: 0 })
    expect(wrapper.vm.quantity).toEqual(1)
  })

  it('not canIncrement works', async () => {
    const wrapper = mount(Quantity, {
      stubs: {
        FontAwesomeIcon: { template: '<div></div> ' }
      },
      propsData: {
        initialQuantity: 5,
        minQuantity: 4,
        maxQuantity: 6,
        canIncrement: false
      }
    })
    const input = wrapper.find('input')
    const increment = wrapper.find('[data-testid="increment"]')
    const decrement = wrapper.find('[data-testid="decrement"]')
    expect(input.attributes('readonly')).toBe(undefined)
    expect(increment.isVisible()).toBe(false)
    expect(decrement.isVisible()).toBe(true)

    // Increment should be prevented
    wrapper.vm.increment()
    expect(wrapper.vm.quantity).toEqual(5)

    // Decrement should work
    await wrapper.setData({ quantity: 1 })
    expect(wrapper.vm.quantity).toEqual(4)

    // Increment above initial quantity should return initial quantity
    await wrapper.setData({ quantity: 6 })
    expect(wrapper.vm.quantity).toEqual(5)
  })

  it('not canDecrement works', async () => {
    const wrapper = mount(Quantity, {
      stubs: {
        FontAwesomeIcon: { template: '<div></div> ' }
      },
      propsData: {
        minQuantity: 3,
        initialQuantity: 5,
        maxQuantity: 6,
        canDecrement: false
      }
    })
    const input = wrapper.find('input')
    const increment = wrapper.find('[data-testid="increment"]')
    const decrement = wrapper.find('[data-testid="decrement"]')
    expect(input.attributes('readonly')).toBe(undefined)
    expect(increment.isVisible()).toBe(true)
    expect(decrement.isVisible()).toBe(false)

    // Increment should work
    wrapper.vm.increment()
    expect(wrapper.vm.quantity).toEqual(6)

    // Decrement below initialQuantity should return initialQuantity
    await wrapper.setData({ quantity: 1 })
    expect(wrapper.vm.quantity).toEqual(5)
    wrapper.vm.decrement()
    expect(wrapper.vm.quantity).toEqual(5)
  })

  it('cannot increment or decrement works', async () => {
    const wrapper = mount(Quantity, {
      stubs: {
        FontAwesomeIcon: { template: '<div></div> ' }
      },
      propsData: {
        initialQuantity: 5,
        minQuantity: 3,
        maxQuantity: 6,
        canDecrement: false,
        canIncrement: false
      }
    })
    const input = wrapper.find('input')
    const increment = wrapper.find('[data-testid="increment"]')
    const decrement = wrapper.find('[data-testid="decrement"]')
    expect(input.attributes('readonly')).toBe('readonly')
    expect(increment.isVisible()).toBe(false)
    expect(decrement.isVisible()).toBe(false)

    // Increment should be prevented
    wrapper.vm.increment()
    expect(wrapper.vm.quantity).toEqual(5)

    await wrapper.setData({ quantity: 7 })
    expect(wrapper.vm.quantity).toEqual(5)

    // Decrement should be prevented
    await wrapper.setData({ quantity: 1 })
    expect(wrapper.vm.quantity).toEqual(5)

    wrapper.vm.decrement()
    expect(wrapper.vm.quantity).toEqual(5)
  })
})
