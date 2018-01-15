// import S3 from './S3'
// import fs from 'fs'
// import path from 'path'

/*
const HAVE_METADATA = 1
const HAVE_CURRENT_DATA = 2
const HAVE_FUTURE_DATA = 3
const HAVE_ENOUGH_DATA = 4
*/

/*
const createAudioFile = (data, filename) => {
  return new Promise(resolve => {
    console.log(filename)
    return fs.writeFile(filename, data, (err) => {
      console.log(filename)
      if (err) throw err
      resolve(filename)
    })
  })
}
*/

class Speaker {
  constructor () {
    // this.s3 = new S3()
    this.context = new AudioContext()
    this.source = null
    this.status = 'stop'
  }

  getAudioBuffer (url) {
    return new Promise((resolve, reject) => {
      const req = new XMLHttpRequest()
      req.responseType = 'arraybuffer'
      req.onreadystatechange = () => {
        if (req.readyState === 4) {
          if (req.status === 0 || req.status === 200) {
            resolve(req.response)
          } else {
            reject(new Error(`getAudioBuffer Error, req.status=${req.status}`))
          }
        }
        // else {
        //  console.log(`req.readyState=${req.readyState}`)
        // }
      }
      req.open('GET', url, true)
      req.send('')
    })
      .then(data => {
        return this.context.decodeAudioData(data)
      })
      .then(buffer => {
        return buffer
      })
  }

  onended (event) {
    console.log(`- Speaker ended on ${event.type}.`)
  }

  play (url) {
    // const url = `https://s3-ap-northeast-1.amazonaws.com/quizcloud-server-dev/${key}`
    // url = `https://s3-ap-northeast-1.amazonaws.com/quizcloud-voices-dev/xxx1.mp3`
    console.log(url)
    return this.getAudioBuffer(url)
      .then(audioBuffer => {
        const source = this.context.createBufferSource()
        source.buffer = audioBuffer
        source.loop = false
        source.loopStart = 0
        source.loopEnd = audioBuffer.duration
        source.connect(this.context.destination)
        source.onended = (event) => {
          source.onended = null
          this.status = 'stop'
          console.log(`Speaker ended on ${event.type}.`)
          this.onended(event)
        }
        return source
      })
      .then(source => {
        this.source = source
        this.source.start(0)
        this.status = 'play'
        return true
      })
  }
  stop () {
    if (!this.source) {
      console.log('no source')
      return
    }
    this.source.stop(0)
  }
  speak1 (key) {
    // key = `2ebfe99ac1bef30ea80de560_question.mp3`
    key = `xxx1.mp3`
    return this.s3.getVoice(key)
      .then(data => {
        console.log(data.buffer)
        // const ab = new Uint8Array(buffer)
        const source = this.context.createBufferSource()
        // for (let )
        /*
        var frameCount = this.context.sampleRate * 2.0
        const audioBuffer = this.context.createBuffer(2, frameCount, this.context.sampleRate)
        for (var channel = 0; channel < 2; channel++) {
          var nowBuffering = audioBuffer.getChannelData(channel)
          for (var i = 0; i < frameCount; i++) {
            nowBuffering[i] = Math.random() * 2 - 1
          }
        }
        */
        // const audioBuffer = this.context.decodeAudioData(data.buffer)
        // source.buffer = audioBuffer
        source.buffer = data.buffer
        source.connect(this.context.destination)
        source.start(0)
        return true
      })
      .catch(err => {
        console.error(err)
        throw err
      })
      /*
      console.log(buffer.toString('hex').substring(0, 8))
      const file = path.join(__dirname, `../temp/${key}.mp3`)
      console.log(`dir=${__dirname}`)
      return createAudioFile(buffer, file)
        .then(file => {
          console.log(file)
          return file
        })
      */
  }
}

export default Speaker
