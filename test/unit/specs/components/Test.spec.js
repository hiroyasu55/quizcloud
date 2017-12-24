import { shallow, createLocalVue } from 'vue-test-utils'
import Vuex from 'vuex'
import Test from '@/components/Test'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('components/Test.vue', () => {
  let hello
  let store
  let wrapper

  beforeEach(() => {
    hello = {
      namespaced: true,
      getters: {
        hello: () => 'hahahaha'
      },
      actions: {
        sayHello: jest.fn()
      },
      mutations: {
        setHello: jest.fn()
      }
    }
    store = new Vuex.Store({
      modules: {
        hello
      }
    })
  })

  it('render', () => {
    wrapper = shallow(Test, { store, localVue })
    const h = wrapper.find('#hello')
    expect(h.text()).toBe('hahahaha')
  })

  it('hellobutton', () => {
    wrapper = shallow(Test, { store, localVue })
    const hellobutton = wrapper.find('#hellobutton')
    hellobutton.trigger('click')
    expect(hello.actions.sayHello).toHaveBeenCalled()
  })
})
