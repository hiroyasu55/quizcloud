'use strict'

const fs = require('fs')
const nanoid = require('nanoid')

const polly = require('./lib/polly')

const createAudioFile = (data, filename) => {
  if (!filename) {
    filename = './tmp/' + nanoid(32) + '.mp3'
  }
  return new Promise(resolve => {
    fs.writeFile(filename, data, err => {
      if (err) throw err
      resolve(filename)
    })
  })
}

const text = `
サンスクリット語で「王都」、クメール語で「寺院」を意味する言葉をつなげた名称で呼ばれる、
世界遺産にも登録されているカンボジア北西部にあるヒンドゥー教寺院は？
`

polly.speakText(text).then(data => {
  createAudioFile(data).then(file => {
    console.log(file)
  })
}).catch(err => {
  console.error(err)
})
