import { mount } from '@vue/test-utils'
import RadioCheckbox from '@/components/RadioCheckbox.vue'

describe('RadioCheckbox', () => {
  it('renders the correct elements', async () => {
    const wrapper = mount(RadioCheckbox, {
      stubs: {
        FontAwesomeIcon: { template: '<div></div> ' }
      },
      propsData: {
        modelValue: [1],
        value: 1,
        showCheckbox: false,
        groupName: 'group',
        isExclusive: false
      }
    })
    const radio = wrapper.find("input[type='radio']")
    expect(radio.attributes('hidden')).toBe('hidden')
    const checkbox = wrapper.find('.checkbox-icon')
    expect(checkbox.element.style.display).toBe('none')
    const selected = wrapper.vm.isChecked
    expect(selected).toBe(true)
  })
  it('is true when isExclusive, value == modelValue', async () => {
    const wrapper = mount(RadioCheckbox, {
      stubs: {
        FontAwesomeIcon: { template: '<div></div> ' }
      },
      propsData: {
        modelValue: 1,
        value: 1,
        groupName: 'group',
        isExclusive: true
      }
    })
    const selected = wrapper.vm.isChecked
    expect(selected).toBe(true)
  })
  it('is false when modelValue!=value', async () => {
    const wrapper = mount(RadioCheckbox, {
      stubs: {
        FontAwesomeIcon: { template: '<div></div> ' }
      },
      propsData: {
        modelValue: 2,
        value: 1,
        groupName: 'group',
        isExclusive: true
      }
    })
    const selected = wrapper.vm.isChecked
    expect(selected).toBe(false)
  })
  it('is true when modelValue and value are objects', async () => {
    const wrapper = mount(RadioCheckbox, {
      stubs: {
        FontAwesomeIcon: { template: '<div></div> ' }
      },
      propsData: {
        modelValue: { test: 1, '1': ['hello'] },
        value: { test: 1, 1: ['hello'] },
        groupName: 'group',
        isExclusive: true
      }
    })
    const selected = wrapper.vm.isChecked
    expect(selected).toBe(true)
  })
  it('is fails when exclusive, modelValue and value are arrays ', async () => {
    const wrapper = mount(RadioCheckbox, {
      stubs: {
        FontAwesomeIcon: { template: '<div></div> ' }
      },
      propsData: {
        modelValue: ['hello'],
        value: ['hello'],
        groupName: 'group',
        isExclusive: true
      }
    })
    const selected = wrapper.vm.isChecked
    expect(selected).toBe(false)
  })
  it('is true when exclusive, value is the only item in modelValue array', async () => {
    const wrapper = mount(RadioCheckbox, {
      stubs: {
        FontAwesomeIcon: { template: '<div></div> ' }
      },
      propsData: {
        modelValue: ['hello'],
        value: 'hello',
        groupName: 'group',
        isExclusive: true
      }
    })
    const selected = wrapper.vm.isChecked
    expect(selected).toBe(true)
  })
  it('is true when !exclusive, value is in modelValue array', async () => {
    const wrapper = mount(RadioCheckbox, {
      stubs: {
        FontAwesomeIcon: { template: '<div></div> ' }
      },
      propsData: {
        modelValue: ['hello', 33],
        value: 33,
        groupName: 'group'
      }
    })
    const selected = wrapper.vm.isChecked
    expect(selected).toBe(true)
  })
  it('is false when !exclusive, value is not in modelValue array', async () => {
    const wrapper = mount(RadioCheckbox, {
      stubs: {
        FontAwesomeIcon: { template: '<div></div> ' }
      },
      propsData: {
        modelValue: ['hello', 33],
        value: 10,
        groupName: 'group'
      }
    })
    const selected = wrapper.vm.isChecked
    expect(selected).toBe(false)
  })
  it('is true when exclusive, value is undefined and modelValue is []', async () => {
    const wrapper = mount(RadioCheckbox, {
      stubs: {
        FontAwesomeIcon: { template: '<div></div> ' }
      },
      propsData: {
        modelValue: [],
        groupName: 'group',
        isExclusive: true
      }
    })
    const selected = wrapper.vm.isChecked
    expect(selected).toBe(true)
  })
  it('isExclusive option with undefined returns []', async () => {
    const wrapper = mount(RadioCheckbox, {
      stubs: {
        FontAwesomeIcon: { template: '<div></div> ' }
      },
      propsData: {
        modelValue: [55, 'x'],
        groupName: 'group',
        isExclusive: true
      }
    })
    await wrapper.trigger('click')
    await wrapper.trigger('click')
    expect(wrapper.emitted().change[0][0]).toStrictEqual([])
    expect(wrapper.emitted().change[1][0]).toStrictEqual([])
  })
  it('not isExclusive option toggles value', async () => {
    const wrapper = mount(RadioCheckbox, {
      stubs: {
        FontAwesomeIcon: { template: '<div></div> ' }
      },
      propsData: {
        modelValue: [55, 'x'],
        groupName: 'group',
        value: 23
      }
    })
    await wrapper.trigger('click')
    await wrapper.setProps({ modelValue: [55, 'x', 23] })
    await wrapper.trigger('click')
    expect(wrapper.emitted().change[0][0]).toStrictEqual([55, 'x', 23])

    expect(wrapper.emitted().change[1][0]).toStrictEqual([55, 'x'])
  })
  it('when isChecked becomes false, it should emit an array with the value omited', async () => {
    const wrapper = mount(RadioCheckbox, {
      stubs: {
        FontAwesomeIcon: { template: '<div></div> ' }
      },
      propsData: {
        modelValue: [23],
        groupName: 'group',
        value: 23,
        isExclusive: true
      }
    })
    const selected = wrapper.vm.isChecked
    expect(selected).toBe(true)
    await wrapper.setProps({ modelValue: [55] })
    expect(wrapper.emitted().change[0][0]).toStrictEqual([55])
  })
  it('when modelValue is not array and exclusive, it should emit the value directly', async () => {
    const wrapper = mount(RadioCheckbox, {
      stubs: {
        FontAwesomeIcon: { template: '<div></div> ' }
      },
      propsData: {
        modelValue: 22,
        groupName: 'group',
        value: 23,
        isExclusive: true
      }
    })
    const selected = wrapper.vm.isChecked
    expect(selected).toBe(false)
    await wrapper.trigger('click')
    expect(wrapper.emitted().change[0][0]).toStrictEqual(23)
  })
  it('when modelValue is not array and notexclusive, it should emit the value directly if true or falseValue if false', async () => {
    const wrapper = mount(RadioCheckbox, {
      stubs: {
        FontAwesomeIcon: { template: '<div></div> ' }
      },
      propsData: {
        modelValue: 22,
        groupName: 'group',
        value: 23,
        isExclusive: false
      }
    })
    const selected = wrapper.vm.isChecked
    expect(selected).toBe(false)
    await wrapper.trigger('click')
    expect(wrapper.emitted().change[0][0]).toStrictEqual(23)
  })
  it('when modelValue is not array and notexclusive, it should emit the value directly if true or falseValue if false', async () => {
    const wrapper = mount(RadioCheckbox, {
      stubs: {
        FontAwesomeIcon: { template: '<div></div> ' }
      },
      propsData: {
        modelValue: 23,
        groupName: 'group',
        value: 23,
        isExclusive: false
      }
    })

    const selected = wrapper.vm.isChecked
    expect(selected).toBe(true)
    await wrapper.trigger('click')
    expect(wrapper.emitted().change[0][0]).toStrictEqual(false)
  })
  it('when overrideSelected is true, it should fix isChecked with overrideSelected value', async () => {
    const wrapper = mount(RadioCheckbox, {
      stubs: {
        FontAwesomeIcon: { template: '<div></div> ' }
      },
      propsData: {
        modelValue: [23],
        overrideSelected: true,
        groupName: 'group',
        value: 23,
        isExclusive: true
      }
    })
    const selected = wrapper.vm.isChecked
    expect(selected).toBe(true)
    await wrapper.setProps({ modelValue: [55] })
    expect(selected).toBe(true)
    await wrapper.trigger('click')
    expect(selected).toBe(true)
  })
  it('when overrideSelected is false, it should fix isChecked with overrideSelected value', async () => {
    const wrapper = mount(RadioCheckbox, {
      stubs: {
        FontAwesomeIcon: { template: '<div></div> ' }
      },
      propsData: {
        modelValue: [23],
        overrideSelected: false,
        groupName: 'group',
        value: 23,
        isExclusive: true
      }
    })
    const selected = wrapper.vm.isChecked
    expect(selected).toBe(false)
    await wrapper.setProps({ modelValue: [55] })
    expect(selected).toBe(false)
    await wrapper.trigger('click')
    expect(selected).toBe(false)
  })
})
