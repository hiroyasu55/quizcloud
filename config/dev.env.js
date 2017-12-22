'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  DEBUG_MODE: true,
  MONGODB_NAME: '"quizcloud"',
  MONGODB_HOST: '"localhost"',
  MONGODB_PORT: 27017
})
