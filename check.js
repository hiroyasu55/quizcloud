'use strict';

const dynamodb = require("./lib/dynamodb");

let item = {
  "question": "刀鍛冶で、親方が槌を打つ後に弟子が槌を一連の動作が元になった言葉。\n相手の話に合わせて、うなづいたり言葉を発したりして応対することを、何を打つと言う？",
  "answers": [
    {
      "answer": "相槌",
      "kana": "あいづち"
    },
    {
      "answer": "相槌をうつ",
      "kana": "あいづちをうつ"
    }
  ],
  "note": "刀鍛冶",
  "tags": ["鍛冶"],
  "status": true
};

dynamodb.add(item)
.then(result => {
  console.log(result);
})
.catch(err => {
  console.error(err, err.stack);
});

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
