import dynamodb from '@/utils/dynamodb'

export const getQuizes = ({ commit, params }) => {
  dynamodb.scan({})
    .then(quizes => {
      commit('setQuizes', quizes)
    })
    .catch(err => {
      commit('setError', err)
    })
}

export const getQuiz = ({ commit, key }) => {
  dynamodb.get(key)
    .then(quiz => {
      commit('setQuiz', quiz)
    })
    .catch(err => {
      commit('setError', err)
    })
}
