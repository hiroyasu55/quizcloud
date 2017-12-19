import * as types from './mutation-types'

export const state = {
  quizes: [],
  quiz: null,
  mode: 'none'
}

export const mutations = {
  [types.SET_QUIZES] (state, quizes) {
    state.quizes = quizes
  },
  [types.SET_QUIZ] (state, quiz) {
    state.quiz = quiz
  },
  /*
  clearQuizes (state) {
    state.quizes = []
  },
  */
  [types.SET_MODE] (state, mode) {
    state.mode = mode
  }
}
