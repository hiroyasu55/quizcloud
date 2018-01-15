'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  DEBUG_MODE: true,
  API_URL: '"http://localhost:3000/"',
  API_TOKEN: '"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFiY2RlZmdoIiwibmFtZSI6IuOChuODvOOBluODvCIsInBhc3N3b3JkIjoiJDJhJDEwJFRFLmJITGs1ZG9OYlhpQW9aYWpkWE9hcW5TdkJOS09JYXplNnV0d0VzTC9oL2x1dTVMUkNlIiwiaWF0IjoxNTE1NTY1NTk2fQ.zktm8M4chlx4cbh8Edo7mli8KvOqgzxatCdTmh5b6Dg"',
  S3_REGION: '"ap-northeast-1"',
  S3_BUCKET: '"quizcloud-voices-dev"'
})
