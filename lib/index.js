'use strict';

var _simplecrawler = require('simplecrawler');

var _simplecrawler2 = _interopRequireDefault(_simplecrawler);

var _cheerio = require('cheerio');

var _cheerio2 = _interopRequireDefault(_cheerio);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var crawler = (0, _simplecrawler2.default)("https://scratch.mit.edu/users/domiiii/projects/").on('crawlstart', function () {
  console.log("Starting...");
}).on('queueadd', function (queueItem) {
  console.warn('Queued: ' + queueItem.path);
}).on('fetchcomplete', function (queueItem, responseBuffer) {
  var html = responseBuffer.toString();
  var $ = _cheerio2.default.load(html);

  var projLinks = $('.media-grid .project a').get().map(function (el) {
    return $(el).attr('href');
  });
  if (projLinks.length > 0) {
    projLinks.forEach(function (link) {
      console.warn(link);
      crawler.queueURL(link, queueItem, false);
    });
  } else {}

  console.log('fetched: ' + queueItem.path);
});

crawler.maxDepth = 1;
crawler.respectRobotsTxt = false;

console.log();
console.log();
crawler.start();