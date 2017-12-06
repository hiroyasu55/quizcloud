/**
 * config
 */
'use strict';

const convict = require("convict");
const path = require("path");
const _filepath = path.join(__dirname, '../config.json');

const _default = {
  "env": {
    format: String,
    default: "develop"
  },
  "aws": {
    "accessKey": {
      format: String,
      default: ""
    },
    "secretKey": {
      format: String,
      default: ""
    },
    "region": {
      format: String,
      default: ""
    },
    "s3": {
      "bucket": {
        format: String,
        default: ""
      }
    },
    "polly": {
      "apiVersion": {
        format: String,
        default: "2016-06-10"
      },
      "region": {
        format: String,
        default: ""
      },
      "LanguageCode": {
        format: String,
        default: "ja-JP"
      },
      "OutputFormat": {
        format: String,
        default: "mp3"
      },
      "VoiceId": {
        format: String,
        default: "Mizuki"
      },
      "SampleRate": {
        format: Number,
        default: "22050"
      },
      "LexiconNames": {
        format: Array,
        default: []
      }
    }
  },
};

let _conf = null;
const _load = () => {
  if (!_conf) {
//    _conf = convict(_default).loadFile(_filepath).validate();
    _conf = convict(_default).loadFile(_filepath);
  }
  return _conf;
}

module.exports = {
  get: (key) => {
    let conf = _load();
    return conf.get(key);
  },

  list: () => {
    let conf = _load();
    return conf.getProperties();
  },

  set: (key, value) => {
    let conf = _load();
    return conf.set(key, value);
  },
};
