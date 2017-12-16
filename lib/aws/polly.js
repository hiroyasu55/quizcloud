"use strict";

const AWS = require('aws-sdk');
const conf = require("./config");

let Polly = function () {
  const _params = conf.get('aws.polly');

  AWS.config.update({
    accessKeyId: conf.get('aws.accessKey'),
    secretAccessKey: conf.get('aws.secretKey')
    // region:
  });

  this._polly = new AWS.Polly({
    apiVersion: _params.apiVersion,
    region: _params.region
  });
};

Polly.prototype.toString = function () {
  return "Polly class";
}

Polly.prototype.putLexicon = function () {
  let pms = {
    Content: "file://",
    Name: "W3C"
  };
  this._polly.putLexicon(pms, (err, data) => {
    if (err) console.log(err, err.stack); // an error occurred
    else     console.log(data);           // successful response
  })
};

Polly.prototype.getLexicon = function (name) {
  return new Promise((resolve, reject) => {
    this._polly.getLexicon({'Name': name}, (err, data) => {
      if (err) return reject(err);
      resolve(data);
    });
  });
};

Polly.prototype.speakText = (text => {
  let ssml = '<speak><prosody rate="slow">' + text
    .replace(/、\n/g, '<break time="500ms" />')
    .replace(/。\n/g, '<break time="500ms" />')
    .replace(/、/g, '<break time="500ms" />')
    .replace(/。/g, '<break time="500ms" />')
    .replace(/\n/g, '<break time="500ms" />')
    + '</prosody></speak>';
//  console.log(ssml);
  let params = {
    'OutputFormat': 'mp3',
    'VoiceId': 'Mizuki',
    'Text': ssml,
    'SampleRate': '22050',
    'TextType': 'ssml',
    'LexiconNames': [
      'polly'
    ]
  };

  return new Promise((resolve, reject) => {
    Polly.synthesizeSpeech(params, (err, data) => {
      if (err) return reject(err);
      resolve(data.AudioStream);
    });
  });
});

module.exports = new Polly();
