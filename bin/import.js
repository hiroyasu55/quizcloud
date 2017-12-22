#!/usr/bin/env node

const path = require('path')
const mongoose = require('mongoose')
const JSON_FILE = path.resolve(__dirname, '../temp/quizes.json')

const DB_NAME = 'quizcloud'
const DB_HOST = 'localhost'
const DB_PORT = '27017'
const data = require(JSON_FILE)

mongoose.Promise = Promise

const url = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`
mongoose.connect(url, { useMongoClient: true })

const schema = mongoose.Schema(
  {
    question: String,
    standard_answer: String,
    standard_answer_kana: String,
    answers: [{ answer: String, kana: String }],
    tags: { type: [String], index: true },
    note: String,
    status: Boolean,
    created: Date,
    modified: Date
  }, {
    collection: 'quiz'
  })

const Quiz = mongoose.model('Quiz', schema)

const addQuiz = quiz => {
  const now = Date.now()

  const q = new Quiz({
    question: quiz.question,
    standard_answer: quiz.standard_answer,
    standard_answer_kana: quiz.standard_answer_kana,
    answers: quiz.answers,
    tags: quiz.tags,
    note: quiz.note,
    status: quiz.status,
    created: now,
    modified: now
  })

  return q.save()
}

let promises = []
for (let d of data) {
  let quiz = {
    question: d.question,
    standard_answer: d.standard_answer,
    standard_answer_kana: d.standard_answer_kana,
    answers: d.answers,
    tags: d.tags,
    note: d.note,
    status: d.status
  }
  promises.push(Promise.resolve().then(() => {
    console.log(quiz.standard_answer)
    return addQuiz(quiz)
  }))
}

Promise.resolve()
  .then(() => {
    return Quiz.remove()
  })
  .then(() => {
    return Promise.all(promises)
  })
  .then(result => {
    console.log(result.length)
    return Quiz
      .where('tags').in(['スポーツ-相撲'])
      // .sort('+standard_answer_kana')
  })
  .then(quizes => {
    for (let quiz of quizes) {
      console.log(`${quiz._id} ${quiz.standard_answer} ${quiz.tags}`)
    }
    return mongoose.connection.close()
  })
  .then(() => {
    console.log('close')
  })
  .catch(err => {
    console.error(err)
    mongoose.connection.close()
  })
