import cheerio from 'cheerio';
import request from 'request-promise-native';
import contentType from 'content-type';
import _ from 'lodash';

import URLSet from './URLSet';

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
  uri: 'https://scratch.mit.edu/users/domiiii/projects/',
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
  const projLinks = $('.media-grid .project a').get().
    map((el) => $(el).attr('href'));

  const urls = new URLSet(projLinks);
  return Promise.all(urls.map());
})
.catch(function (err) {
  // Crawling failed... 
  onErr(err);
});




console.log();
console.log();