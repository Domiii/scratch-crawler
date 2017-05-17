'use strict';

var _cheerio = require('cheerio');

var _cheerio2 = _interopRequireDefault(_cheerio);

var _requestPromiseNative = require('request-promise-native');

var _requestPromiseNative2 = _interopRequireDefault(_requestPromiseNative);

var _contentType = require('content-type');

var _contentType2 = _interopRequireDefault(_contentType);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _URLSet = require('./URLSet');

var _URLSet2 = _interopRequireDefault(_URLSet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// nice little web crawling tool
// uses request-promise-native + cheerio
// see: https://www.npmjs.com/package/request-promise

function onErr(err, msg) {
  console.log();
  console.error('##########################################');
  console.error('[Error] ' + (msg || ''));
  err && console.error(err.stack || err);
  console.error('##########################################');
  console.log();
}

var options = {
  uri: 'https://scratch.mit.edu/users/domiiii/projects/',
  transform: function transform(body, response, resolveWithFullResponse) {
    var contentInfo = _contentType2.default.parse(response);

    try {
      if (contentInfo.type === 'application/json') {
        return JSON.parse(body);
      } else {
        return _cheerio2.default.load(body);
      }
    } catch (err) {
      onErr(err, 'Could not parse website "' + response.url + '" - Content type: ' + contentInfo.type);
      return '';
    }
  }
};

(0, _requestPromiseNative2.default)(options).then(function ($) {
  var projLinks = $('.media-grid .project a').get().map(function (el) {
    return $(el).attr('href');
  });

  var urls = new _URLSet2.default(projLinks);
  return Promise.all(urls.map());
}).catch(function (err) {
  // Crawling failed... 
  onErr(err);
});

console.log();
console.log();