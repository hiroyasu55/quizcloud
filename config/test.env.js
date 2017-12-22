'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"testing"',
  MONGODB_NAME: '"quizcloud"',
  MONGODB_HOST: '"localhost_"',
  MONGODB_PORT: 27017
})
