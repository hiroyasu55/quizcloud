'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  DEBUG_MODE: true,
  aws: {
    accessKey: 'AKIAIIJBB7A553LF364A',
    secretKey: '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',
    region: 'ap-northeast-1',
    s3: {
      bucket: 'logicheart-quiz'
    },
    polly: {
      apiVersion: '2016-06-10',
      region: 'ap-northeast-1',
      OutputFormat: 'mp3',
      VoiceId: 'Mizuki',
      SampleRate: '22050',
      LexiconNames: [
        'polly'
      ]
    },
    dynamodb: {
      region: 'ap-northeast-1',
      TableName: 'quizes',
      Key: 'key'
    }
  }
})
