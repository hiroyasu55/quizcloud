// import types from './mutation-types'

export const state = {
  quizes: [],
  quiz: null,
  count: 0,
  message: '',
  error: null
}

export const mutations = {
  addQuiz (state, quiz) {
    state.quizes.push(quiz)
  },
  setQuizes (state, quizes) {
    state.quizes = quizes
  },
  setQuiz (state, quiz) {
    state.quiz = quiz
  },
  clearQuizes (state) {
    state.quizes = []
  },
  increment (state, n) {
    state.count += n
  },
  setMessage (state, message) {
    state.message = message
  },
  setError (state, error) {
    state.error = error
  }
/*
  [types.SET_MESSAGE] (state, message) {
    state.message = message
  }
*/
}
