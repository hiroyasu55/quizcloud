import AWS from 'aws-sdk'

class S3 {
  constructor () {
    const params = {
      accessKeyId: 'AKIAITULLWVDFRP4HSTA',
      secretAccessKey: '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',
      apiVersion: process.env.S3_API_VERSION || '2006-03-01',
      region: process.env.S3_REGION
    }
    this.client = new AWS.S3(params)
  }

  getVoice (key) {
    const params = {
      Bucket: process.env.S3_BUCKET,
      Key: key
    }
    return new Promise(resolve => {
      this.client.getObject(params, (err, data) => {
        if (err) throw err
        // console.log(data)
        // const stream = data.createReadStream()
        resolve(data.Body)
      })
    })
  }
}

export default S3
