import MongoDB from '@/models/MongoDB'

const STATUS_INVALID = 'invalid'
const STATUS_VALID = 'valid'

const schema = {
  question: {
    type: String,
    trim: true
  },
  standard_answer: {
    type: String,
    required: true,
    trim: true
  },
  standard_answer_kana: {
    type: String,
    required: true,
    trim: true
  },
  answers: [
    {
      answer: {
        type: String,
        trim: true
      },
      kana: {
        type: String,
        trim: true
      }
    }
  ],
  tags: {
    type: [String],
    index: true
  },
  note: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    default: STATUS_INVALID
  }
}
const collection = 'quizes'

const Quiz = MongoDB.model(name, schema, collection)

Quiz.STATUS_INVALID = STATUS_INVALID
Quiz.STATUS_VALID = STATUS_VALID

export default Quiz
