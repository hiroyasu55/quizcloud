import aws from 'aws-sdk'
import moment from 'moment'
import generate from 'nanoid/generate'
// process.on('unhandledRejection', console.dir)

const _createKey = () => {
  return generate('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', 20)
}

class DynamoDB {
  constructor ({
    accessKeyId,
    secretAccessKey,
    region
  }) {
    this.accessKeyId = accessKeyId
    this.secretAccessKey = accessKeyId
    this.region = accessKeyId

    aws.config.update({
      accessKeyId: this.accessKeyId,
      secretAccessKey: this.secretAccessKey
    })
    this.dynamodb = new aws.DynamoDB({
      region: this.region
    })
    this.client = new aws.DynamoDB.DocumentClient({
      region: this.region
    })
  }

  set accessKeyId (accessKeyId) {
    this.accessKeyId = accessKeyId
  }
  get accessKeyId () {
    return this.accessKeyId
  }

  describeTable () {
    const params = {
      TableName: process.env.AWS_DYNAMODB_TABLE_NAME
    }
    return this.dynamodb.describeTable(params).promise()
  }

  scan (params) {
    const _params = Object.assign({
      TableName: process.env.AWS_DYNAMODB_TABLE_NAME
    }, params || {})

    return this.client.scan(_params).promise()
      .then(data => {
        return data.Items
      })
  }

  get (key) {
    const _params = {
      TableName: process.env.AWS_DYNAMODB_TABLE_NAME,
      Key: {
        [process.env.AWS_DYNAMODB_KEY]: key
      }
    }
    console.log(_params)
    this._client.get(_params).promise()
      .then(data => {
        return data.Item
      })
  }

  _put (quiz) {
    if (!quiz.answers || quiz.answers.length === 0) {
      throw new Error('No answers.')
    }
    const now = moment().toISOString()
    const _new = quiz.key === undefined
    let _quiz = {
      'key': _new ? _createKey() : quiz.key,
      'answers': quiz.answers,
      'standard_answer': quiz.answers[0].answer,
      'standard_answer_kana': quiz.answers[0].kana,
      'status': quiz.status === true,
      'created': quiz.created || now,
      'modified': now
    }
    if (quiz.question && quiz.question.length > 0) {
      _quiz.question = quiz.question
    }
    if (quiz.tags && quiz.tags.length > 0) {
      _quiz.tags = quiz.tags
    }
    if (quiz.note && quiz.note.length > 0) {
      _quiz.note = quiz.note
    }
    _quiz.modified = now

    let _params = {
      TableName: process.env.AWS_DYNAMODB_TABLE_NAME,
      Item: _quiz
    }

    return this._client.put(_params).promise()
      .then(data => {
        if (_new) {
          console.log(`Added. key=[${_quiz.key}]`)
        } else {
          console.log(`Updated. key=[${_quiz.key}]`)
        }
        return _quiz
      })
  }

  put (data) {
    if (Array.isArray(data)) {
      let tasks = []
      for (let quiz of data) {
        tasks.push(this._put(quiz))
      }
      return Promise.all(tasks).then(results => {
        return results.map(result => {
          return result
        })
      })
    } else {
      return this._put(data)
    }
  }
}

export default DynamoDB
