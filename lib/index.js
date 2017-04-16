'use strict';

var _cheerio = require('cheerio');

var _cheerio2 = _interopRequireDefault(_cheerio);

var _requestPromiseNative = require('request-promise-native');

var _requestPromiseNative2 = _interopRequireDefault(_requestPromiseNative);

var _contentType = require('content-type');

var _contentType2 = _interopRequireDefault(_contentType);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// nice little web crawling tool
// uses request-promise-native + cheerio
// see: https://www.npmjs.com/package/request-promise


var options = {
  uri: 'https://scratch.mit.edu/users/domiiii/projects/',
  transform: function transform(body, response, resolveWithFullResponse) {
    var contentInfo = _contentType2.default.parse(response);
    console.log(_lodash2.default.keys(response));

    if (contentInfo.type === 'application/json') {
      return JSON.parse(body);
    } else if (contentInfo.type === 'text/html') {
      return _cheerio2.default.load(body);
    } else {
      console.error('could not parse website. Invalid content type: ' + contentInfo.type);
      return '';
    }
  }
};

(0, _requestPromiseNative2.default)(options).then(function ($) {
  var projLinks = $('.media-grid .project a').get().map(function (el) {
    return $(el).attr('href');
  });

  if (projLinks.length > 0) {
    projLinks.forEach(function (link) {
      console.log(link);
    });
  }
}).catch(function (err) {
  // Crawling failed... 
  console.error('Crawling failed: ');
  console.error(err.stack);
});

console.log();
console.log();