import { shallowMount } from '@vue/test-utils'
import DateTimeSelector from '@/components/DateTimeSelector.vue'

describe('DateTimeSelector.vue', () => {
  let wrapper
  let spy
  beforeEach(() => {
    spy = jest.spyOn(DateTimeSelector.methods, 'getCurrentDate').mockImplementation(() => new Date('2021-06-01 0:00'))
    wrapper = shallowMount(DateTimeSelector, {
      mocks: {
        errorState: Object.freeze({
          Success: '',
          Past: 'Please select a future timeslot',
          WorkingHours: `Our consultation hours are from 09:00 to 10:00. Please select a suitable time.`
        })
      },
      propsData: {
        minuteIncrement: 15,
        dayWindow: 2,
        openTime: [9, 0],
        closeTime: [10, 0]
      }
    })
  })
  afterEach(() => {
    spy.mockRestore()
  })
  it('sets the correct minDate (earliest slot after current time)', () => {
    expect(wrapper.vm.minDate.toLocaleString({ hour12: false })).toEqual('01/06/2021, 9:00:00 am')
  })
  it('sets the correct minDate (earliest slot after current time) with leadTime equal 60 minutes', () => {
    spy = jest.spyOn(DateTimeSelector.methods, 'getCurrentDate').mockImplementation(() => new Date('2021-06-01 10:00'))
    wrapper = shallowMount(DateTimeSelector, {
      mocks: {
        errorState: Object.freeze({
          Success: '',
          Past: 'Please select a future timeslot',
          WorkingHours: `Our consultation hours are from 09:00 to 10:00. Please select a suitable time.`
        })
      },
      propsData: {
        minuteIncrement: 15,
        dayWindow: 2,
        openTime: [9, 0],
        closeTime: [12, 0],
        leadTime: 60
      }
    })
    expect(wrapper.vm.minDate.toLocaleString({ hour12: false })).toEqual('01/06/2021, 11:00:00 am')
  })
  it('sets the correct maxDate (current time plus dayWindow days)', () => {
    expect(wrapper.vm.maxDate.toLocaleString({ hour12: false })).toEqual('03/06/2021, 9:00:00 am')
  })
  it('sets the correct selectedDate (earliest time after current time)', () => {
    expect(wrapper.vm.selectedDate.toLocaleString({ hour12: false })).toEqual('01/06/2021, 9:00:00 am')
  })

  it('is able to get the correct nextvalidtime', () => {
    expect(wrapper.vm.nextValidTime(new Date('2021-06-01 13:04')).toLocaleString()).toEqual('02/06/2021, 9:00:00 am')
    expect(wrapper.vm.nextValidTime(new Date('2021-06-01 10:00')).toLocaleString()).toEqual('01/06/2021, 10:00:00 am')
    expect(wrapper.vm.nextValidTime(new Date('2021-06-01 09:59')).toLocaleString()).toEqual('01/06/2021, 10:00:00 am')
  })

  it('is able to change time', () => {
    wrapper.vm.selectedDate = new Date('2021-06-01 13:04')
    expect(wrapper.vm.selectedDate.toLocaleString({ hour12: false })).toEqual('01/06/2021, 1:04:00 pm')
  })

  it('is able to set the correct error message', () => {
    expect(wrapper.vm.error).toEqual('')
    wrapper.vm.selectedDate = new Date('2021-06-01 13:04')
    expect(wrapper.vm.selectedDate.toLocaleString({ hour12: false })).toEqual('01/06/2021, 1:04:00 pm')
    wrapper.vm.checkTime()
    expect(wrapper.vm.error).toEqual(wrapper.vm.errorState.WorkingHours)

    wrapper.vm.selectedDate = new Date('2021-05-01 13:04')
    expect(wrapper.vm.selectedDate.toLocaleString({ hour12: false })).toEqual('01/05/2021, 1:04:00 pm')
    wrapper.vm.checkTime()
    expect(wrapper.vm.error).toEqual(wrapper.vm.errorState.Past)
  })

  it('is able to emit the correct time on submit', () => {
    wrapper.vm.selectedDate = new Date('2021-06-01 09:45')
    wrapper.vm.submit()
    expect(wrapper.vm.error).toEqual(wrapper.vm.errorState.Success)
    expect(wrapper.emitted('submit')[0]).toEqual(['2021-06-01 09:45:00'])
  })
})
