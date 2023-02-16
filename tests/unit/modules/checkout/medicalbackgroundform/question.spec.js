import { mount } from '@vue/test-utils'
import questionSets from 'tests/unit/fixtures/questionSets'
import Question from '@/modules/Checkout/MedicalBackgroundForm/Question.vue'

const hairLossQuestions = questionSets[0].questions

describe('Question', () => {
  it('renders the correct form options, single choice', async () => {
    const currentQuestion = hairLossQuestions[0]
    const wrapper = mount(Question, {
      stubs: {
        FontAwesomeIcon: { template: '<div></div> ' }
      },
      propsData: {
        quizType: currentQuestion.input_type.type_name,
        questionOptions: currentQuestion.question_options,
        initialAnswer: undefined
      }
    })
    expect(wrapper.findAll('.quiz-item-option').length).toBe(currentQuestion.question_options.length)
    expect(wrapper.vm.answer).toStrictEqual({ selected: [] })
    expect(wrapper.find('textarea').exists()).toBe(false)
  })
  it('renders the correct form options, free text', async () => {
    const currentQuestion = hairLossQuestions[8]
    const wrapper = mount(Question, {
      stubs: {
        FontAwesomeIcon: { template: '<div></div> ' }
      },
      propsData: {
        quizType: currentQuestion.input_type.type_name,
        questionOptions: currentQuestion.question_options,
        initialAnswer: undefined
      }
    })
    expect(wrapper.findAll('.quiz-item-option').length).toBe(currentQuestion.question_options.length)
    expect(wrapper.vm.answer).toStrictEqual('')
    expect(wrapper.find('textarea').exists()).toBe(true)
  })
  it('renders the correct form options with old answer, free text', async () => {
    const currentQuestion = hairLossQuestions[8]
    const wrapper = mount(Question, {
      stubs: {
        FontAwesomeIcon: { template: '<div></div> ' }
      },
      propsData: {
        quizType: currentQuestion.input_type.type_name,
        questionOptions: currentQuestion.question_options,
        initialAnswer: 'testanswer'
      }
    })
    expect(wrapper.findAll('.quiz-item-option').length).toBe(currentQuestion.question_options.length)
    expect(wrapper.vm.answer).toStrictEqual('testanswer')
    expect(wrapper.find('textarea').exists()).toBe(true)
  })
  it('renders the correct form options with old answer, single choice', async () => {
    const currentQuestion = hairLossQuestions[0]
    const wrapper = mount(Question, {
      stubs: {
        FontAwesomeIcon: { template: '<div></div> ' }
      },
      propsData: {
        quizType: currentQuestion.input_type.type_name,
        questionOptions: currentQuestion.question_options,
        initialAnswer: { selected: [151] }
      }
    })
    expect(wrapper.findAll('.quiz-item-option').length).toBe(currentQuestion.question_options.length)
    expect(wrapper.vm.answer).toStrictEqual({ selected: [151] })
    expect(wrapper.find('textarea').exists()).toBe(false)
  })
  it('updates answer when prop changes', async () => {
    const currentQuestion = hairLossQuestions[0]
    const wrapper = mount(Question, {
      stubs: {
        FontAwesomeIcon: { template: '<div></div> ' }
      },
      propsData: {
        quizType: currentQuestion.input_type.type_name,
        questionOptions: currentQuestion.question_options,
        initialAnswer: { selected: [151] }
      }
    })
    expect(wrapper.findAll('.quiz-item-option').length).toBe(currentQuestion.question_options.length)
    expect(wrapper.vm.answer).toStrictEqual({ selected: [151] })
    expect(wrapper.find('textarea').exists()).toBe(false)
    await wrapper.setProps({ initialAnswer: { selected: [150] } })
    expect(wrapper.vm.answer).toStrictEqual({ selected: [150] })
    await wrapper.setProps({ initialAnswer: undefined })
    expect(wrapper.vm.answer).toStrictEqual({ selected: [] })
  })
  it('updates answer when prop changes, free text', async () => {
    const currentQuestion = hairLossQuestions[8]
    const wrapper = mount(Question, {
      stubs: {
        FontAwesomeIcon: { template: '<div></div> ' }
      },
      propsData: {
        quizType: currentQuestion.input_type.type_name,
        questionOptions: currentQuestion.question_options,
        initialAnswer: ''
      }
    })
    expect(wrapper.vm.answer).toStrictEqual('')
    await wrapper.setProps({ initialAnswer: 'test' })
    expect(wrapper.vm.answer).toStrictEqual('test')
    await wrapper.setProps({ initialAnswer: undefined })
    expect(wrapper.vm.answer).toStrictEqual('')
  })

  it('emits the proper change values when answer is set', async () => {
    const currentQuestion = hairLossQuestions[8]
    const wrapper = mount(Question, {
      stubs: {
        FontAwesomeIcon: { template: '<div></div> ' }
      },
      propsData: {
        quizType: currentQuestion.input_type.type_name,
        questionOptions: currentQuestion.question_options,
        initialAnswer: ''
      }
    })
    const textarea = wrapper.find('textarea')
    await textarea.setValue('newAnswer')
    expect(wrapper.vm.answer).toStrictEqual('newAnswer')
  })
  it('emits the proper change values when answer is clicked, SINGLE_CHOICE', async () => {
    const currentQuestion = hairLossQuestions[0]
    const wrapper = mount(Question, {
      stubs: {
        FontAwesomeIcon: { template: '<div></div> ' }
      },
      propsData: {
        quizType: currentQuestion.input_type.type_name,
        questionOptions: currentQuestion.question_options,
        initialAnswer: undefined
      }
    })
    const options = wrapper.findAll('.quiz-item-option')
    await options.at(0).trigger('click')
    expect(wrapper.vm.answer.selected).toStrictEqual([146])
    await options.at(0).trigger('click')
    expect(wrapper.vm.answer.selected).toStrictEqual([146])
    await options.at(1).trigger('click')
    expect(wrapper.vm.answer.selected).toStrictEqual([147])
    await options.at(2).trigger('click')
    expect(wrapper.vm.answer.selected).toStrictEqual([148])
  })
  it('emits the proper change values when answer is clicked, MULTIPLE_CHOICE', async () => {
    const currentQuestion = hairLossQuestions[3]
    const wrapper = mount(Question, {
      stubs: {
        FontAwesomeIcon: { template: '<div></div> ' }
      },
      propsData: {
        quizType: currentQuestion.input_type.type_name,
        questionOptions: currentQuestion.question_options,
        initialAnswer: undefined
      }
    })
    expect(currentQuestion.id).toBe(45)
    expect(currentQuestion.input_type.type_name).toBe('MULTI_CHOICE')
    const options = wrapper.findAll('.quiz-item-option')
    await options.at(0).trigger('click')
    expect(wrapper.vm.answer.selected).toStrictEqual([161])
    await options.at(0).trigger('click')
    expect(wrapper.vm.answer.selected).toStrictEqual([])
    await options.at(1).trigger('click')
    expect(wrapper.vm.answer.selected).toStrictEqual([162])
    await options.at(0).trigger('click')
    expect(wrapper.vm.answer.selected).toStrictEqual([162, 161])
    await options.at(1).trigger('click')
    expect(wrapper.vm.answer.selected).toStrictEqual([161])
    await options.at(2).trigger('click')
    expect(wrapper.vm.answer.selected).toStrictEqual([161, 163])
    expect(currentQuestion.question_options[6].is_exclusive).toBe(1)
    await options.at(6).trigger('click') // Exclusive
    expect(wrapper.vm.answer.selected).toStrictEqual([167])
    await options.at(6).trigger('click') // Exclusive
    expect(wrapper.vm.answer.selected).toStrictEqual([167])
    await options.at(3).trigger('click')
    expect(wrapper.vm.answer.selected).toStrictEqual([164])
    await options.at(3).trigger('click')
    expect(wrapper.vm.answer.selected).toStrictEqual([])
  })
})
