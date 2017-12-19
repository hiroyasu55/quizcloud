'use strict'

const dynamodb = require('../lib/aws/dynamodb')
process.env.NODE_ENV = 'development'

const setTag = (word, tag) => {
  dynamodb.scan({
    FilterExpression: 'contains(#question,:word) and not contains(#tags,:tag)',
    ExpressionAttributeNames: {
      '#question': 'question',
      '#tags': 'tags'
    },
    ExpressionAttributeValues: {
      ':word': word,
      ':tag': tag
    }
  }).then(quizes => {
    for (let quiz of quizes) {
      quiz.tags = quiz.tags || []
      if (!quiz.tags.includes(tag)) {
        quiz.tags.push(word)
      }
    }
    return dynamodb.put(quizes)
  }).then(result => {
    console.log(result)
  }).catch(err => {
    console.error(err)
  })
}

const wordTags = [
  { word: '芝居', tag: '演劇' },
  { word: '歌舞伎', tag: '演劇' },
  { word: '弁当', tag: '食' },
  { word: '寿司', tag: '食' }
]
wordTags.forEach(wordTag => {
  setTag(wordTag.word, wordTag.tag)
})

/*
const xml2js = require("xml2js");

const polly = require("./lib/polly");

polly.getLexicon('polly').then(data => {
  console.log(data);
  let content = data.Lexicon.Content;
  xml2js.parseString(content, (err, result) => {
    if (err) return;
    data.Lexicon.Json = result;
  });

});
*/
