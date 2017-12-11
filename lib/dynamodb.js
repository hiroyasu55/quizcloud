"use strict";

const AWS = require('aws-sdk');
const moment = require("moment");
const generate = require('nanoid/generate');

let DynamoDB = function () {
  const params = conf.get('aws.dynamodb');

  AWS.config.update({
    accessKeyId: conf.get('aws.accessKey'),
    secretAccessKey: conf.get('aws.secretKey')
    // region:
  });

  this._dynamodb = new AWS.DynamoDB({
    region: params.region
  });
  this._client = new AWS.DynamoDB.DocumentClient({
    region: params.region
  });
};

DynamoDB.prototype.describeTable = function () {
  return new Promise((resolve, reject) => {
    let _params = {
      "TableName": conf.get('aws.dynamodb.TableName')
    };
    this._dynamodb.describeTable(_params, (err, data) => {
      if (err) return reject(err);
      resolve(data);
    });
  });
}

DynamoDB.prototype.list = function (params) {
  return new Promise((resolve, reject) => {
    let _params = {
      "TableName": conf.get('aws.dynamodb.TableName')
    };
    if (params.limit) {
      _params.Limit = params.limit;
    }

    this._client.scan(_params, function(err, data) {
      if (err) return reject(err);
      resolve(data);
    });
  });
}

DynamoDB.prototype.add = function (quiz) {
  return new Promise((resolve, reject) => {
    if (!quiz.answers || quiz.answers.length === 0) {
      reject(new Error("No answers."));
      return;
    }

    let key = generate('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', 20);
    let now = moment().toISOString();
    let item = {
      "key": key,
      "answers": quiz.answers,
      "standard_answer": quiz.answers[0].answer,
      "standard_answer_kana": quiz.answers[0].kana,
      "status": quiz.status,
      "created": now,
      "modified": now
    }
    if (quiz.question.length > 0) {
      item.question = quiz.question;
    }
    if (quiz.note.length > 0) {
      item.note = quiz.note;
    }
    let params = {
      "TableName": conf.get('aws.dynamodb.TableName'),
      "Item": item
    };
    this._client.put(params, (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(true);
    });
  });

};

module.exports = new DynamoDB();
