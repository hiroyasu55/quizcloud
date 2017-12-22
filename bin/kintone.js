#!/usr/bin/env node

const request = require('request-promise')
const url = require('url')
const fs = require('fs')
const path = require('path')

const API_URL = 'https://1206p.cybozu.com/k/v1/'
const API_TOKEN = '9sNVc9rvzqH9LQm1eVDvvMrwwfqkNEOvifCp5uMm'
const APP_ID = 73
const MAX_LIMIT = 100
const OUTPUT_FILE = path.resolve(__dirname, '../temp/quizes.json')

process.env.NODE_ENV = 'development'

const _recordToQuiz = record => {
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
  if (record.first_answer && record.first_answer.value.length > 0) {
    quiz.standard_answer = record.first_answer.value
  } else if (quiz.answers.length > 0) {
    quiz.standard_answer = quiz.answers[0].answer
  } else {
    quiz.standard_answer = ''
  }
  if (record.first_answer_kana && record.first_answer_kana.value.length > 0) {
    quiz.standard_answer_kana = record.first_answer_kana.value
  } else if (quiz.answers.length > 0) {
    quiz.standard_answer_kana = quiz.answers[0].kana
  } else {
    quiz.standard_answer_kana = ''
  }
  return quiz
}

const _getQuizes = ({ limit, offset }) => {
  let quizes = []

  const query = `limit ${limit} offset ${offset}`
  console.log(`query="${query}"`)
  const options = {
    uri: url.resolve(API_URL, 'records.json'),
    // transform2xxOnly: true, // ステータスコード200以外のときにHTMLページを帰す
    headers: {
      'X-Cybozu-API-Token': API_TOKEN
    },
    json: true,
    qs: {
      app: APP_ID,
      query
    }
  }

  return request(options)
    .then(res => {
      for (let record of res.records) {
        const quiz = _recordToQuiz(record)
        quizes.push(quiz)
      }
      return quizes
    })
    .catch(err => {
      throw new Error(err.message)
    })
}

const getQuizes = ({ limit, offset }) => {
  limit = limit || 0
  offset = offset || 0
  let totalQuizes = []
  let count = 0

  const _loop = (o) => {
    count++
    const l = limit === 0 ? MAX_LIMIT : Math.min(limit - totalQuizes.length, MAX_LIMIT)
    console.log(`count=${count} limit=${l}/${limit} offset=${o}/${offset} current=${totalQuizes.length}`)
    return _getQuizes({
      limit: l,
      offset: o
    }).then(quizes => {
      console.log(`return ${quizes.length}`)
      if (quizes.length === 0) {
        return totalQuizes
      }
      totalQuizes = totalQuizes.concat(quizes)
      if (quizes.length < MAX_LIMIT || (limit > 0 && totalQuizes.length >= limit)) {
        return totalQuizes
      }
      o += MAX_LIMIT
      return _loop(o)
    })
  }

  return _loop(offset)
}

getQuizes({
}).then(quizes => {
  console.log(`result ${quizes.length}`)
  fs.writeFile(OUTPUT_FILE, JSON.stringify(quizes), err => {
    if (err) throw err
    console.log(`file ${OUTPUT_FILE} created.`)
  })
}).catch(err => {
  console.error(err)
})
