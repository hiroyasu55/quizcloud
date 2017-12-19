import DynamoDB from '@/utils/DynamoDB'

describe('utils/DynamoDB', () => {
  // let mock
  let dynamodb

  beforeEach(() => {
    // mock = jest.fn()
  })

  it('constructor', () => {
    dynamodb = new DynamoDB({
      accessKeyId: '',
      secretAccessKey: '',
      region: ''
    })
    expect(dynamodb).toBeInstanceOf(DynamoDB)
  })

  it('describeTable', () => {
    expect.assertions(1)

    dynamodb = new DynamoDB({
      accessKeyId: '',
      secretAccessKey: '',
      region: ''
    })
    // console.log(dynamodb)
    dynamodb.describeTable('x')
      .then(table => {
        expect(table).toBeDefined()
      })
      .catch(err => {
        console.error(err)
      })
  })
})
