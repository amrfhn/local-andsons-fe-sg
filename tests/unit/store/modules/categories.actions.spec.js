import categories from '@/store/modules/categories'

jest.mock('api/categories')
import { getCategories } from '@/api/categories'

const {
  actions: { fetchCategories }
} = categories

describe('fetchCategories', () => {
  let store
  beforeEach(() => {
    store = {
      commit: jest.fn(),
      dispatch: jest.fn(),
      state: {
        list: []
      }
    }
  })
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('Creates api call if state is empty.', async () => {
    getCategories.mockReturnValue(Promise.resolve({ data: { response: { categories: [{ id: 1 }] } } }))

    await fetchCategories(store)
    expect(getCategories).toBeCalledTimes(1)
    expect(store.commit.mock.calls[0][0]).toBe('UPDATE_CATEGORIES')
    expect(store.commit.mock.calls[0][1]).toMatchObject([{ id: 1, href: '/treatment/hair-loss' }])
  })

  it('Does not create api call if state is not empty.', async () => {
    store.state.list = ['test']

    await fetchCategories(store)
    expect(getCategories).toBeCalledTimes(0)
  })
})
