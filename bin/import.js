#!/usr/bin/env node

const API_URL = 'https://1206p.cybozu.com/k/v1/'
const API_TOKEN = '9sNVc9rvzqH9LQm1eVDvvMrwwfqkNEOvifCp5uMm'
const APP_ID = 73

const request = require('request-promise')
const url = require('url')
const dynamodb = require('../lib/aws/dynamodb')

process.env.NODE_ENV = 'development'

let getQuizes = () => {
  let params = {
    app: APP_ID,
    query: 'order by first_answer_kana limit 500 offset 200'
  }
  let options = {
    uri: url.resolve(API_URL, 'records.json'),
    transform2xxOnly: true, // ステータスコード200以外のときにHTMLページを帰す場合はtrueにする
    headers: {
      'X-Cybozu-API-Token': API_TOKEN
    },
    json: true,
    qs: params
  }

  return request(options).then((res) => {
    let quizes = []
    for (let record of res.records) {
      let quiz = {
        question: record.question.value,
        answers: [],
        tags: record.category.value.concat(record.language.value),
        note: record.note.value,
        status: (record.status.value[0] === '有効')
      }
      for (let ans of record.answers.value) {
        quiz.answers.push({
          answer: ans.value.answer.value,
          kana: ans.value.answer_kana.value
        })
      }
      quizes.push(quiz)
    }
    return quizes
  })
}

getQuizes()
  .then(quizes => {
    console.log(quizes)
    return dynamodb.put(quizes)
  })
  .then(result => {
    console.log(result)
  })
  .catch(err => {
    console.error(err)
  })
