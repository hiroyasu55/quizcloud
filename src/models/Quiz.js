import Model from './Model'
import moment from 'moment'

class Quiz extends Model {
  static CHECK_STATUS_DRAFT = 'draft'
  static CHECK_STATUS_VALID = 'valid'

  constructor (data) {
    super(data)
    data = data || {}
    if (data.id) this.id = data.id
    this.question = data.question || ''
    this.answer = data.answer || ''
    this.answerKana = data.answerKana || ''
    if (data.answers && Array.isArray(data.answers)) {
      this.answers = data.answers.map(a => {
        return {
          answer: a.answer,
          kana: a.kana
        }
      })
    }
    this.tags = data.tags || []
    this.note = data.note || ''
    this.checkStatus = data.checkStatus || Quiz.CHECK_STATUS_DRAFT

    this.voice = {
      s3key: null,
      url: null,
      latest: false
    }
    if (data.voice) {
      if (data.voice.s3key) this.voice.s3key = data.voice.s3key
      if (data.voice.url) this.voice.url = data.voice.url
      if (data.voice.latest) this.voice.latest = data.voice.latest
      if (data.voice.createdAt) this.voice.createdAt = new Date(data.voice.createdAt)
      if (data.voice.updatedAt) this.voice.updatedAt = new Date(data.voice.updatedAt)
    }

    if (data.createdAt) this.createdAt = new Date(data.createdAt)
    if (data.updatedAt) this.updatedAt = new Date(data.updatedAt)
  }

  toData () {
    const data = {}
    if (this.id) data.id = this.id
    data.question = this.question
    data.answer = this.answer
    data.answerKana = this.answerKana
    this.answers = this.answers || []
    data.answers = this.answers.map(a => {
      return {
        answer: a.answer,
        kana: a.kana
      }
    })
    data.tags = this.tags
    data.note = this.note
    data.checkStatus = this.checkStatus

    data.voice = this.voice

    data.createdAt = moment(this.createdAt).format()
    data.updatedAt = moment(this.updatedAt).format()

    return data
  }

  static get (id) {
    return Model.requestGet(`quizes/${id}`)
      .then(data => {
        const quiz = (new Quiz(data.result)).toData()
        return quiz
      })
  }

  static list (options) {
    const params = {}
    console.log(`filter=${JSON.stringify(options)}`)
    if (options) {
      if (options.tags && Array.isArray(options.tags) && options.tags.length > 0) {
        params.tags = options.tags.map(tag => {
          const escapedTag = tag.replace(/0/g, '|')
          console.log(`${tag}-${escapedTag}`)
          return tag.replace(/0/g, '|')
        }).join(',')
      }
    }
    // console.log(`params=${JSON.stringify(params)}`)

    return Model.requestGet('quizes', params)
      .then(data => {
        const quizes = data.results.map(result => {
          return (new Quiz(result)).toData()
        })
        const result = {
          quizes: quizes,
          count: data.count,
          limit: data.limit,
          lastId: data.lastId
        }
        console.log(result.count)
        return result
      })
  }

  add (options) {
    if (this.id) {
      throw new Error(`Add error: id not to be defined.`)
    }
    const data = {
      quiz: this.toData(),
      options
    }
    return Model.requestPost(`quizes`, data)
      .then(result => {
        const quiz = new Quiz(result.result)
        return quiz
      })
  }

  update (options) {
    if (!this.id) {
      throw new Error(`Update error: id not defined.`)
    }
    const data = {
      quiz: this.toData(),
      options
    }
    return Model.requestPut(`quizes/${this.id}`, data)
      .then(result => {
        const quiz = new Quiz(result.result)
        return quiz
      })
  }
}

export default Quiz
