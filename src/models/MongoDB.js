import mongoose from 'mongoose'

class MongoDB {
  constructor (params) {
    mongoose.Promise = Promise

    params = params || {}
    this.name = params.name || process.env.MONGODB_NAME
    this.host = params.host || process.env.MONGODB_HOST
    this.port = params.port || process.env.MONGODB_PORT
  }

  get url () {
    return `mongodb://${this.host}:${this.port}/${this.name}`
  }

  connect () {
    const params = {
      useMongoClient: true,
      connectTimeoutMS: 1000
    }
    return mongoose.connect(this.url, params)
      .then(result => {
        console.log(`[MongoDB]connected. url="${this.url}"`)
        return true
      })
  }

  close () {
    return mongoose.connection.close()
      .then(result => {
        console.log(`[MongoDB]closed. url="${this.url}"`)
        return true
      })
  }

  static Schema (schema, collection) {
    let options = {}
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
    return modelSchema
  }

  static model (name, schema, collection) {
    schema = schema || {}
    if (schema.createdAt === undefined) {
      schema.createdAt = Date
    }
    if (schema.updatedAt === undefined) {
      schema.updatedAt = Date
    }

    const modelSchema = MongoDB.Schema(schema, collection)
    const model = mongoose.model(name, modelSchema)
    return model
  }
}

export default MongoDB
