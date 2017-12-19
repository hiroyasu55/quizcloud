import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from '@/store/dummy/getters'
import * as actions from '@/store/dummy/actions'
import { state, mutations } from '@/store/dummy/mutations'

Vue.use(Vuex)

describe('store/dummy', () => {
  let store
  // let mock

  beforeEach(() => {
    // mock = jest.fn()
  })

  it('getters', () => {
    const state = {
      dummy: 'test'
    }
    expect(getters.dummy(state)).toBe('test')
  })

  it('mutations', () => {
    const state = {
      dummy: 'test'
    }
    mutations.setDummy(state, 'test')
    expect(state.dummy).toBe('test')
  })

  it('actions', () => {
    expect.assertions(2)

    store = new Vuex.Store({
      state: {
        dummy: null
      },
      mutations: {
        setDummy: jest.fn(result => {
          expect(result.dummy).toBeDefined()
        })
      },
      actions
    })

    return store.dispatch('getDummy', 'test')
      .then(() => {
        expect(true).toBe(true)
      })
  })

  it('all', () => {
    store = new Vuex.Store({
      state,
      getters,
      mutations,
      actions
    })

    expect.assertions(1)

    return store.dispatch('getDummy', 'test')
      .then(() => {
        // 1
        expect(getters.dummy(state)).toBe('dummyAction:test')
      })
  })
})
