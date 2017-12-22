import MongoDB from '@/models/MongoDB'

describe('models/MongoDB', () => {
  let db

  it('constructor', () => {
    process.env.MONGODB_NAME = 'name1'
    process.env.MONGODB_HOST = 'host1'
    process.env.MONGODB_PORT = 10000

    db = new MongoDB()
    expect(db.url).toEqual(`mongodb://host1:10000/name1`)

    db = new MongoDB({
      name: 'name2',
      host: 'host2',
      port: 20000
    })
    expect(db.url).toEqual(`mongodb://host2:20000/name2`)
  })

  it('connect - invalid host error', async () => {
    process.env.MONGODB_NAME = 'dummy'
    process.env.MONGODB_HOST = 'localhostt'
    process.env.MONGODB_PORT = 27017

    expect.assertions(1)

    try {
      await db.connect()
        .then(result => {
          db.close()
          return result
        })
    } catch (err) {
      expect(err.message).toMatch(
        /^failed to connect to server/
      )
    }
  })

  it('connect - invalid port error', async () => {
    process.env.MONGODB_NAME = 'dummy'
    process.env.MONGODB_HOST = 'localhost'
    process.env.MONGODB_PORT = 27016

    expect.assertions(1)

    db = new MongoDB()
    try {
      await db.connect()
        .then(result => {
          db.close()
          return result
        })
    } catch (err) {
      expect(err.message).toMatch(
        /^failed to connect to server/
      )
    }
  })

  it('connect', async () => {
    process.env.MONGODB_NAME = 'dummy'
    process.env.MONGODB_HOST = 'localhost'
    process.env.MONGODB_PORT = 27017

    expect.assertions(1)

    db = new MongoDB()
    await db.connect()
      .then(result => {
        expect(result).toBe(true)
        db.close()
        return result
      })
      .catch(err => {
        console.error(err)
        if (db) db.close()
      })
  })

  it('model', async () => {
    process.env.MONGODB_NAME = 'dummy'
    process.env.MONGODB_HOST = 'localhost'
    process.env.MONGODB_PORT = 27017

    db = new MongoDB()
    let Dummy
    let dummy1, dummy2

    expect.assertions(12)

    await Promise.resolve()
      .then(() => {
        db.connect()
      })
      .then(() => {
        let schema = {
          name: String
        }
        Dummy = MongoDB.model('Dummy', schema, 'dummies')

        const dummy = new Dummy({
          name: 'dummy1'
        })
        return dummy.save()
      })
      .then(result => {
        dummy1 = Object.assign(result)
        // 1 - 3
        expect(result.name).toEqual('dummy1')
        expect(result.createdAt).toBeInstanceOf(Date)
        expect(result.updatedAt).toEqual(result.createdAt)

        dummy1 = Object.assign(result)
        return Dummy.find({_id: dummy1._id})
      })
      .then(result => {
        // 4
        expect(result.length).toEqual(1)

        const dummy = result[0]
        // 5 - 6
        expect(dummy._id).toEqual(dummy1._id)
        expect(dummy.name).toEqual('dummy1')

        dummy.name = 'dummy2'
        return dummy.save()
      })
      .then(result => {
        // 7 - 8
        expect(result.name).toEqual('dummy2')
        expect(result.updatedAt > dummy1.updatedAt).toBe(true)

        dummy2 = Object.assign(result)
        return Dummy.find({_id: dummy2._id})
      })
      .then(result => {
        // 9
        expect(result.length).toEqual(1)

        const dummy = result[0]
        // 10 - 11
        expect(dummy._id).toEqual(dummy2._id)
        expect(dummy.name).toEqual('dummy2')
        expect(dummy.updatedAt).toEqual(dummy2.updatedAt)

        Dummy.remove({id: dummy2._id})
        db.close()
      })
      .catch(err => {
        console.error(err)
        db.close()
      })
  })
})
