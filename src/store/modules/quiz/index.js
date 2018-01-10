import Quiz from '@/models/Quiz'

const defaultList = {
  quizes: [],
  count: 0,
  total: 0,
  lastId: null
}

const quiz = {
  namespaced: true,
  state: {
    status: 'none',
    mode: 'none',
    quiz: null,
    newQuiz: null,
    list: defaultList,
    result: null
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
    newQuiz (state) {
      return state.newQuiz
    },
    list (state) {
      return state.list
    },
    result (state) {
      return state.result
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
    setNewQuiz (state, newQuiz) {
      state.newQuiz = newQuiz
    },
    setList (state, list) {
      state.list = list
    }
  },
  actions: {
    getList ({ commit, state }, params) {
      // console.log(`getList params=${JSON.stringify(params)}`)
      commit('setStatus', 'loading')
      Quiz.list(params)
        .then(result => {
          const list = state.list
          if (!list.quizes) list.quizes = []
          list.quizes = list.quizes.concat(result.quizes)
          list.count = result.count
          list.total = list.quizes.length
          list.lastId = result.lastId
          commit('setList', list)
          commit('setStatus', 'done')
        })
        .catch(err => {
          console.error(err)
          commit('setList', defaultList)
          commit('setStatus', 'error')
        })
    },
    getQuiz ({ commit }, id) {
      commit('setStatus', 'loading')
      Quiz.get(id)
        .then(quiz => {
          commit('setQuiz', quiz)
          commit('setStatus', 'done')
        })
        .catch(err => {
          console.error(err)
          commit('setQuiz', null)
          commit('setStatus', 'error')
        })
    },
    updateQuiz ({ commit }, quiz) {
      commit('setStatus', 'loading')
      quiz.update()
        .then(quiz => {
          commit('setQuiz', quiz)
          commit('setStatus', 'done')
        })
        .catch(err => {
          console.error(err)
          commit('setQuiz', null)
          commit('setStatus', 'error')
        })
    }
  }
}

export default quiz
