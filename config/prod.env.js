'use strict'
module.exports = {
  NODE_ENV: '"production"',
  DEBUG_MODE: false,
  AWS_ACCESS_KEY: '"AKIAIIJBB7A553LF364A"',
  AWS_SECRET_KEY: '"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"',
  AWS_REGION: '"ap-northeast-1"',
  AWS_S3_BUCKET: '"logicheart-quiz"',
  AWS_POLLY: {
    apiVersion: '"2016-06-10"',
    region: '"ap-northeast-1"',
    OutputFormat: '"mp3"',
    VoiceId: '"Mizuki"',
    SampleRate: '"22050"',
    LexiconNames: [
      '"polly"'
    ]
  },
  AWS_DYNAMODB_REGION: '"ap-northeast-1"',
  AWS_DYNAMODB_TABLE_NAME: '"quizes"',
  AWS_DYNAMODB_KEY: '"key"'
}
