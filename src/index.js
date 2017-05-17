import cheerio from 'cheerio';
import request from 'request-promise-native';
import contentType from 'content-type';
import _ from 'lodash';

import URLSet from './URLSet';

import {
  extractScratchURLsFromProjectPage,
  buildPopularProjectsURL
}
from './crawlTools';

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

const options = {
  uri: ,
  transform: function (body, response, resolveWithFullResponse) {
    const contentInfo = contentType.parse(response);

    try {
      if (contentInfo.type === 'application/json') {
        return JSON.parse(body);
      }
      else {
        return cheerio.load(body);
      }
    }
    catch (err) {
      onErr(err, `Could not parse website "${response.url}" - Content type: ` + 
        contentInfo.type);
      return '';
    }
  }
};

request(options)
.then(function ($) {
  
})
.then(function() {

})
.catch(function (err) {
  // Crawling failed... 
  onErr(err);
});




console.log();
console.log();