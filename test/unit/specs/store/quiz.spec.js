import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from '@/store/quiz/getters'
import * as actions from '@/store/quiz/actions'
import { state, mutations } from '@/store/quiz/mutations'
import * as types from '@/store/quiz/mutation-types'

Vue.use(Vuex)

describe('store/quiz', () => {
  let store
  // let mock

  beforeEach(() => {
    // mock = jest.fn()
  })

  it('getters', () => {
    const quiz = {
      key: 'XXX'
    }
    const quizes = [
      quiz
    ]
    const state = {
      quizes,
      quiz
    }
    expect(getters.quiz(state)).toBe(quiz)
    expect(getters.quizes(state)).toBe(quizes)
  })

  it('mutations', () => {
    const state = {
      mode: null
    }
    mutations[types.SET_MODE](state, 'test')
    expect(state.mode).toBe('test')
  })

  it('actions', () => {
    expect.assertions(2)

    store = new Vuex.Store({
      state: {
        quizes: null,
        quiz: null,
        mode: null
      },
      mutations: {
        [types.SET_QUIZ]: jest.fn(result => {
          expect(result.quiz).toBe(true)
        })
      },
      actions
    })

    return store.dispatch('getQuiz', 'test')
      .then(() => {
        expect(true).toBe(true)
      })
  })

  /*
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
        expect(getters.quiz(state)).toBe('quizAction:test')
      })
  })
  */
})
