import dynamodb from '@/utils/dynamodb'

export const actions = {
  getQuizes ({ commit }, params) {
    const _params = {}
    dynamodb.scan(_params)
      .then(quizes => {
        commit('setQuizes', quizes)
      })
      .catch(err => {
        commit('setError', err)
      })
  },

  getQuiz ({ commit }, {key, done}) {
    console.log(`getQuiz key=${key}`)
    dynamodb.get(key)
      .then(quiz => {
        commit('setQuiz', quiz)
      })
      .catch(err => {
        commit('setError', err)
      })
  }
}
