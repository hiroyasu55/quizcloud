const mongoose = require('mongoose')

const DB_NAME = 'quizcloud'
const DB_HOST = 'localhost'
const DB_PORT = '27017'

mongoose.Promise = Promise

const url = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`

mongoose.connect(url, { useMongoClient: true })
  .then(result => {
    console.log(result)
    return mongoose.f.close()
  })
  .then(result => {
    console.log(result)
    return mongoose.connection.close()
  })
  .then(result => {
    console.log(result)
  })

console.log('end')
