import mongoose from 'mongoose'

class MongoDB {
  static STATUS_CREATED = 'created'
  static STATUS_CONNECTING = 'connecting'
  static STATUS_CONNECTED = 'connected'
  static STATUS_CLOESED = 'closed'
  static STATUS_FAILED = 'failed'

  constructor (params) {
    mongoose.Promise = Promise

    params = params || {}
    this._name = params.name || process.env.MONGODB_NAME
    this._host = params.host || process.env.MONGODB_HOST
    this._port = params.port || process.env.MONGODB_PORT
    this._status = MongoDB.STATUS_CREATED
  }
  /*

  get status () {
    return this._status
  }

  get url () {
    return `mongodb://${this._host}:${this._port}/${this._name}`
  }

  connect () {
    const params = {
      useMongoClient: true,
      connectTimeoutMS: 1000
    }
    this._status = MongoDB.STATUS_CONNECTING
    return mongoose.connect(this.url, params)
      .then(result => {
        this._status = MongoDB.STATUS_CONNECTED
        console.log(`[MongoDB]connected. url="${this.url}"`)
        return true
      })
      .catch(err => {
        this._status = MongoDB.STATUS_FAILED
        throw err
      })
  }

  close () {
    return mongoose.connection.close()
      .then(result => {
        this._status = MongoDB.STATUS_CLOESED
        console.log(`[MongoDB]closed. url="${this.url}"`)
        return true
      })
  }
  */

  static model (name, schema, collection) {
    /*
    schema = schema || {}
    if (schema.createdAt === undefined) {
      schema.createdAt = Date
    }
    if (schema.updatedAt === undefined) {
      schema.updatedAt = Date
    }

    const options = {}
    if (collection) options.collection = collection

    const modelSchema = mongoose.Schema(schema, options)
    modelSchema.pre('save', function (next) {
      const now = Date.now()
      if (this.isNew) {
        this.createdAt = now
        this.updatedAt = now
        console.log(`[MongoDB]saved as new at ${this.createdAt}`)
      } else {
        this.updatedAt = now
        console.log(`[MongoDB]saved as update at ${this.updatedAt}`)
      }

      return next()
    })

    const model = mongoose.model(name, modelSchema)
    */
    const model = {
      name, schema, collection
    }
    return model
  }
}

export default MongoDB
