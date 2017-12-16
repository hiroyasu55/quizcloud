"use strict";

const AWS = require('aws-sdk');

let s3 = new AWS.S3();
/*
putObject(aws_publicBucket, filename, audioStream,'audio/mp3').then( res => {
    if(!res.ETag) throw res
    else return {
      msg: 'File successfully generated.',
      ETag: res.ETag,
      url: `https://s3-eu-west-1.amazonaws.com/${aws_publicBucket}/${filename}`
    }
  })
*/
/*

let params = {Bucket: S3_BUCKET, Key: filename, Body: 'Hello!'};
s3.putObject(params, (err, data) => {
  if (err) {
    throw err;
  }
  let etag = data.ETag;
  console.log(etag);
});
*/
