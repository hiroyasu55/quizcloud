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

    if (data.createdAt) this.createdAt = new Date(data.createdAt)
    if (data.updatedAt) this.updatedAt = new Date(data.updatedAt)
  }

  toData () {
    const data = {}
    if (this.id) data.id = this.id
    data.question = this.question
    data.answer = this.answer
    data.answerKana = this.answerKana
    data.answers = this.answers.map(a => {
      return {
        answer: a.answer,
        kana: a.kana
      }
    })
    data.tags = this.tags
    data.note = this.note
    data.checkStatus = this.checkStatus

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

  static list (params) {
    return Model.requestGet('quizes', params)
      .then(data => {
        const quizes = data.results.map(result => {
          return (new Quiz(result)).toData()
        })
        return {
          quizes: quizes,
          count: data.count,
          limit: data.limit,
          lastId: data.lastId
        }
      })
  }

  update () {
    if (!this.id) {
      throw new Error(`Update error: id not defined.`)
    }
    const params = {
      quiz: this.toData()
    }
    return Model.requestPut(`quizes/${this.id}`, params)
      .then(data => {
        const quiz = new Quiz(data.result)
        return quiz
      })
  }
}

export default Quiz
