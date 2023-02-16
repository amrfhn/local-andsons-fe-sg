import * as questionsApi from '@/api/questions'
import MedicalBackgroundForm from '@/modules/Checkout/MedicalBackgroundForm/index.vue'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import answers2complete from 'tests/unit/fixtures/answers2'
import answers2incomplete from 'tests/unit/fixtures/answers2-incomplete'
import questionSets from 'tests/unit/fixtures/questionSets'
import VueMeta from 'vue-meta'

const flushPromises = () => new Promise(setImmediate)

const title = 'Medical Questionnaire | andSons'
const $route = {
  path: 'medical-background-form'
}
describe('MedicalBackgroundForm', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  it('renders nothing at the start', async () => {
    const localVue = createLocalVue()
    localVue.use(VueMeta)

    const wrapper = shallowMount(MedicalBackgroundForm, {
      localVue,
      stubs: {
        FontAwesomeIcon: { template: '<div></div> ' },
        QuizQuestion: { template: '<div></div> ' }
      },
      mocks: {
        $store: {
          state: {
            cart: {
              cart: {
                id: 12
              }
            },
            authenticated: true
          }
        },
        $route
      },
      propsData: {
        questionSets: []
      }
    })
    expect(wrapper.vm.loading).toBe(true)
    expect(wrapper.vm.$meta().refresh().metaInfo.title).toBe(title)
    expect(wrapper.vm.cartId).toBe(12)
  })
  it('authenticated returns answers', async () => {
    const getAnswers = jest
      .spyOn(questionsApi, 'getAnswersByQuestionSetId')
      .mockImplementation(() => Promise.resolve({ data: answers2incomplete }))
    const wrapper = shallowMount(MedicalBackgroundForm, {
      stubs: {
        FontAwesomeIcon: { template: '<div></div> ' },
        QuizQuestion: { template: '<div></div> ' }
      },
      mocks: {
        getAnswersByQuestionSetId: getAnswers,
        $store: {
          state: {
            authenticated: true
          }
        }
      },
      propsData: {
        questionSets: [questionSets[1]]
      }
    })
    await flushPromises()
    expect(getAnswers).toHaveBeenCalledTimes(1)
    expect(wrapper.vm.loading).toBe(false)
    expect(wrapper.vm.currentQuestion).toBe(3)
  })
  it('authenticated with complete answers goes to question 1', async () => {
    const getAnswers = jest
      .spyOn(questionsApi, 'getAnswersByQuestionSetId')
      .mockImplementation(() => Promise.resolve({ data: answers2complete }))
    const wrapper = shallowMount(MedicalBackgroundForm, {
      stubs: {
        FontAwesomeIcon: { template: '<div></div> ' },
        QuizQuestion: { template: '<div></div> ' }
      },
      mocks: {
        getAnswersByQuestionSetId: getAnswers,
        $store: {
          state: {
            authenticated: true
          }
        }
      },
      propsData: {
        questionSets: [questionSets[1]]
      }
    })
    await flushPromises()
    expect(getAnswers).toHaveBeenCalledTimes(1)
    expect(wrapper.vm.loading).toBe(false)
    expect(wrapper.vm.currentQuestion).toBe(1)
  })
  it('handles a change in questionSets prop', async () => {
    const getAnswers = jest
      .spyOn(questionsApi, 'getAnswersByQuestionSetId')
      .mockImplementation(() => Promise.resolve({ data: answers2complete }))
    const loadAnswers = jest.spyOn(MedicalBackgroundForm.methods, 'loadAnswers')
    const wrapper = shallowMount(MedicalBackgroundForm, {
      stubs: {
        FontAwesomeIcon: { template: '<div></div> ' },
        QuizQuestion: { template: '<div></div> ' }
      },
      mocks: {
        loadAnswers: loadAnswers,
        getAnswersByQuestionSetId: getAnswers,
        $store: {
          state: {
            authenticated: true
          }
        }
      },
      propsData: {
        questionSets: []
      }
    })
    await flushPromises()
    expect(wrapper.vm.loading).toBe(true)
    expect(loadAnswers).toHaveBeenNthCalledWith(1, [])
    await wrapper.setProps({ questionSets: [questionSets[1]] })
    expect(loadAnswers).toHaveBeenCalledTimes(2)
    expect(wrapper.vm.loading).toBe(false)
    expect(loadAnswers).toHaveBeenNthCalledWith(2, [questionSets[1]])
  })
  it('sets current answer when setAnswer called', async () => {
    const loadAnswers = jest.spyOn(MedicalBackgroundForm.methods, 'loadAnswers')
    const $store = {
      state: {
        authenticated: false
      }
    }
    const wrapper = shallowMount(MedicalBackgroundForm, {
      stubs: {
        FontAwesomeIcon: { template: '<div></div> ' },
        QuizQuestion: { template: '<div></div> ' }
      },
      mocks: {
        $store,
        loadAnswers: loadAnswers
      },
      propsData: {
        questionSets: [questionSets[1]]
      }
    })
    await flushPromises()
    expect(wrapper.vm.$store.state.authenticated).toBe(false)
    expect(loadAnswers).toHaveBeenCalledTimes(1)
    expect(wrapper.vm.loading).toBe(false)
    expect(wrapper.vm.currentQuestion).toBe(1)
    expect(wrapper.vm.currentAnswer).toStrictEqual(undefined)
    await wrapper.vm.setAnswer('x')
    expect(wrapper.vm.currentAnswer).toStrictEqual('x')
  })
  it("clicking next with error doesn't scroll up and shows error", async () => {
    const loadAnswers = jest.spyOn(MedicalBackgroundForm.methods, 'loadAnswers')
    const $store = {
      state: {
        authenticated: false
      }
    }
    window.scrollTo = jest.fn()
    const wrapper = shallowMount(MedicalBackgroundForm, {
      stubs: {
        FontAwesomeIcon: { template: '<div></div> ' },
        QuizQuestion: { template: '<div></div> ' }
      },
      mocks: {
        $store,
        loadAnswers: loadAnswers
      },
      propsData: {
        questionSets: [questionSets[1]]
      }
    })
    await flushPromises()

    expect(wrapper.vm.$store.state.authenticated).toBe(false)
    expect(loadAnswers).toHaveBeenCalledTimes(1)
    expect(wrapper.vm.loading).toBe(false)
    expect(wrapper.vm.currentQuestion).toBe(1)
    expect(wrapper.vm.currentAnswer).toStrictEqual(undefined)
    expect(wrapper.vm.notAnswered).toBe(false)
    const nextButton = wrapper.find('.submit-button')
    await nextButton.trigger('click')
    expect(wrapper.vm.notAnswered).toBe(true)
    expect(wrapper.vm.currentQuestion).toBe(1)
    expect(window.scrollTo).toHaveBeenCalledTimes(0)
  })
  it('clicking next with valid answer increments question number', async () => {
    const loadAnswers = jest.spyOn(MedicalBackgroundForm.methods, 'loadAnswers')
    const $store = {
      state: {
        authenticated: false
      }
    }
    window.scrollTo = jest.fn()
    const wrapper = shallowMount(MedicalBackgroundForm, {
      stubs: {
        FontAwesomeIcon: { template: '<div></div> ' },
        QuizQuestion: { template: '<div></div> ' }
      },
      mocks: {
        $store,
        loadAnswers: loadAnswers
      },
      propsData: {
        questionSets: [questionSets[1]]
      }
    })
    await flushPromises()
    expect(wrapper.vm.$store.state.authenticated).toBe(false)
    expect(wrapper.vm.loading).toBe(false)
    expect(wrapper.vm.currentQuestion).toBe(1)
    expect(wrapper.vm.currentAnswer).toStrictEqual(undefined)
    expect(wrapper.vm.notAnswered).toBe(false)
    await wrapper.vm.setAnswer([0])
    const nextButton = wrapper.find('.submit-button')
    await nextButton.trigger('click')
    expect(wrapper.vm.notAnswered).toBe(false)
    expect(wrapper.vm.currentQuestion).toBe(2)
    expect(window.scrollTo).toHaveBeenCalledTimes(1)
  })
  it('goes to previous question when previous clicked', async () => {
    const loadAnswers = jest.spyOn(MedicalBackgroundForm.methods, 'loadAnswers')
    const $store = {
      state: {
        authenticated: false
      }
    }
    window.scrollTo = jest.fn()
    const wrapper = shallowMount(MedicalBackgroundForm, {
      stubs: {
        FontAwesomeIcon: { template: '<div></div> ' },
        QuizQuestion: { template: '<div></div> ' }
      },
      mocks: {
        $store,
        loadAnswers: loadAnswers
      },
      propsData: {
        questionSets: [questionSets[1]]
      }
    })
    await flushPromises()
    expect(wrapper.vm.$store.state.authenticated).toBe(false)
    expect(wrapper.vm.loading).toBe(false)
    await wrapper.setData({ currentQuestion: 3 })
    expect(wrapper.vm.currentQuestion).toBe(3)
    const backButton = wrapper.find('.back')
    await backButton.trigger('click')
    expect(wrapper.vm.currentQuestion).toBe(2)
    expect(window.scrollTo).toHaveBeenCalledTimes(1)
  })

  it('Goes to q1 of next set if there are multiple sets', async () => {
    const loadAnswers = jest.spyOn(MedicalBackgroundForm.methods, 'loadAnswers')
    const $store = {
      state: {
        authenticated: false
      }
    }
    window.scrollTo = jest.fn()
    const wrapper = shallowMount(MedicalBackgroundForm, {
      stubs: {
        FontAwesomeIcon: { template: '<div></div> ' },
        QuizQuestion: { template: '<div></div> ' }
      },
      mocks: {
        $store,
        loadAnswers: loadAnswers
      },
      propsData: {
        questionSets: questionSets
      }
    })
    await flushPromises()
    expect(wrapper.vm.$store.state.authenticated).toBe(false)
    expect(wrapper.vm.loading).toBe(false)
    await wrapper.setData({
      currentQuestion: questionSets[0].questions.length
    })
    expect(wrapper.vm.currentQuestion).toBe(questionSets[0].questions.length)
    expect(wrapper.vm.currentSet).toBe(1)
    await wrapper.vm.setAnswer([195])
    const nextButton = wrapper.find('.submit-button')
    await nextButton.trigger('click')
    expect(wrapper.vm.notAnswered).toBe(false)
    expect(wrapper.vm.currentQuestion).toBe(1)
    expect(wrapper.vm.currentSet).toBe(2)
    expect(window.scrollTo).toHaveBeenCalledTimes(1)
  })
  it('Goes to last question of previous set if there are multiple sets', async () => {
    const loadAnswers = jest.spyOn(MedicalBackgroundForm.methods, 'loadAnswers')
    const $store = {
      state: {
        authenticated: false
      }
    }
    window.scrollTo = jest.fn()
    const wrapper = shallowMount(MedicalBackgroundForm, {
      stubs: {
        FontAwesomeIcon: { template: '<div></div> ' },
        QuizQuestion: { template: '<div></div> ' }
      },
      mocks: {
        $store,
        loadAnswers: loadAnswers
      },
      propsData: {
        questionSets: questionSets
      }
    })
    await flushPromises()
    expect(wrapper.vm.$store.state.authenticated).toBe(false)
    expect(wrapper.vm.loading).toBe(false)
    await wrapper.setData({
      currentSet: 2,
      currentQuestion: 1
    })
    expect(wrapper.vm.currentQuestion).toBe(1)
    expect(wrapper.vm.currentSet).toBe(2)
    const backButton = wrapper.find('.back')
    await backButton.trigger('click')
    expect(wrapper.vm.currentQuestion).toBe(questionSets[0].questions.length)
    expect(wrapper.vm.currentSet).toBe(1)
    expect(window.scrollTo).toHaveBeenCalledTimes(1)
  })

  it('submits answer when last question reached', async () => {
    const loadAnswers = jest.spyOn(MedicalBackgroundForm.methods, 'loadAnswers')
    const $store = {
      state: {
        authenticated: false
      }
    }
    window.scrollTo = jest.fn()
    const wrapper = shallowMount(MedicalBackgroundForm, {
      stubs: {
        FontAwesomeIcon: { template: '<div></div> ' },
        QuizQuestion: { template: '<div></div> ' }
      },
      mocks: {
        $store,
        loadAnswers: loadAnswers
      },
      propsData: {
        questionSets: questionSets
      }
    })
    await flushPromises()
    expect(wrapper.vm.$store.state.authenticated).toBe(false)
    expect(wrapper.vm.loading).toBe(false)
    await wrapper.setData({
      currentQuestion: questionSets[0].questions.length
    })
    expect(wrapper.vm.currentQuestion).toBe(questionSets[0].questions.length)
    expect(wrapper.vm.currentSet).toBe(1)
    await wrapper.vm.setAnswer([195])
    const nextButton = wrapper.find('.submit-button')
    await nextButton.trigger('click')
    expect(wrapper.vm.notAnswered).toBe(false)
    expect(wrapper.vm.currentQuestion).toBe(1)
    expect(wrapper.vm.currentSet).toBe(2)
    expect(window.scrollTo).toHaveBeenCalledTimes(1)
  })
})
