const quiz = {
  namespaced: true,
  state: {
    status: 'none',
    mode: 'none',
    quiz: null,
    quizes: []
  },
  getters: {
    status (state) {
      return state.status
    },
    mode (state) {
      return state.mode
    },
    quiz (state) {
      return state.quiz
    },
    quizes (state) {
      return state.quizes
    }
  },
  mutations: {
    setStatus (state, status) {
      state.status = status
    },
    setMode (state, mode) {
      state.mode = mode
    },
    setQuiz (state, quiz) {
      state.quiz = quiz
    },
    setQuizes (state, quizes) {
      state.quizes = quizes
    }
  },
  actions: {
    getQuiz ({ commit }, _id) {
      return Promise.resolve()
        .then(() => {
          console.log(`getQuiz _id=${_id}`)
          const quiz = {
            _id: _id,
            question: 'qqq'
          }
          commit('setQuiz', quiz)
        })
    },
    getQuizes ({ commit }, params) {
      return Promise.resolve()
        .then(() => {
          console.log(`getQuiz params=${params}`)
          commit('setQuizes', [])
        })
    }
  }
}

export default quiz
