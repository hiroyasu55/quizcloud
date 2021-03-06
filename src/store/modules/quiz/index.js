import Quiz from '@/models/Quiz'
import Speaker from '@/models/Speaker'

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
    speaker: new Speaker(),
    // playerSource: null,
    playerStatus: 'none',
    message: ''
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
    speaker (state) {
      return state.speaker
    },
    playerStatus (state) {
      return state.playerStatus
    },
    message (state) {
      return state.message
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
    },
    setSpeaker (state, speaker) {
      state.speaker = speaker
    },
    setPlayerStatus (state, playerStatus) {
      state.playerStatus = playerStatus
    },
    setMessage (state, message) {
      state.message = message
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
    addQuiz ({ commit }, quiz) {
      commit('setStatus', 'loading')
      quiz.add()
        .then(quiz => {
          commit('setQuiz', quiz)
          commit('setStatus', 'done')
          commit('setMode', 'show')
        })
        .catch(err => {
          console.error(err)
          commit('setStatus', 'error')
        })
    },
    updateQuiz ({ commit }, quiz) {
      commit('setStatus', 'loading')
      quiz.update()
        .then(quiz => {
          commit('setQuiz', quiz)
          commit('setStatus', 'done')
          commit('setMode', 'show')
        })
        .catch(err => {
          console.error(err)
          commit('setStatus', 'error')
        })
    },
    speakQuestion ({ commit }, {speaker, quiz}) {
      Promise.resolve()
        .then(() => {
          quiz = new Quiz(quiz)
          console.log(`quiz.voice.latest=${quiz.voice.latest}`)
          if (quiz.voice && quiz.voice.url && quiz.voice.latest) {
            return quiz
          } else {
            commit('setMessage', 'loading...')
            return quiz.update({refreshSound: true})
              .then(quiz => {
                console.log(quiz.voice)
                commit('setQuiz', quiz)
                commit('setMessage', 'loaded.')
                return quiz
              })
          }
        })
        .then(quiz => {
          speaker.onended = (event) => {
            commit('setMessage', 'stop.')
          }
          return speaker.play(quiz.voice.url)
        })
        .then(result => {
          commit('setMessage', 'playing...')
        })
        .catch(err => {
          commit('setMessage', err.message)
        })
    },
    stopSpeaker ({ commit }, speaker) {
      console.log(`stopSpeaker`)
      commit('setMessage', 'stoping...')
      speaker.stop()
    },
    suspendSpeaker ({ commit }, speaker) {
      console.log(`suspendSpeaker`)
      commit('setMessage', 'suspending...')
      speaker.suspend()
    },
    resumeSpeaker ({ commit }, speaker) {
      console.log(`resumeSpeaker`)
      commit('setMessage', 'resumeing...')
      speaker.resume()
    }
  }
}

export default quiz
