import MongoDB from '@/models/MongoDB'
import Quiz from '@/models/Quiz'

let db

beforeAll(async () => {
  process.env.MONGODB_NAME = 'quizcloud'
  process.env.MONGODB_HOST = 'localhost'
  process.env.MONGODB_PORT = 27017
  db = new MongoDB()
})

describe('models/Quiz', () => {
  beforeEach(async () => {
  //  await db.connect()
  })

  afterEach(async () => {
  //  await db.close()
  })

  it('quiz', async () => {
    let _id

    expect.assertions(2)
    await db.connect()
      .then(() => {
        const quiz = new Quiz({
          question: '問題',
          standard_answer: '標準正解',
          standard_answer_kana: 'ひょうじゅんせいかい',
          answers: [
            { answer: '標準正解1', kana: 'ひょうじゅんせいかい1' },
            { answer: '標準正解2', kana: 'ひょうじゅんせいかい2' }
          ],
          tags: [
            'タグ1', 'タグ2'
          ],
          note: '備考',
          status: Quiz.STATUS_VALID
        })
        return quiz.save()
      })
      .then(result => {
        expect(result.question).toEqual('問題')
        _id = result._id
        return Quiz.findById(_id)
      })
      .then(result => {
        expect(result.question).toEqual('問題')
        Quiz.findByIdAndRemove(result._id)
        db.close()
      })
      .catch(err => {
        console.error(err)
        if (_id) Quiz.remove({_id: _id})
        db.close()
      })
  })
})
