import * as types from './mutation-types'
import dynamodb from '@/utils/dynamodb'

export const getQuizes = ({ commit }, params) => {
  const _params = {}
  return dynamodb.scan(_params)
    .then(quizes => {
      commit(types.SET_QUIZES, quizes)
    })
}

export const getQuiz = ({ commit }, key) => {
  console.log(`getQuiz key=${key}`)
  dynamodb.get(key)
    .then(quiz => {
      commit(types.SET_QUIZ, quiz)
    })
}
