import cheerio from 'cheerio';
import request from 'request-promise-native';
import contentType from 'content-type';
import _ from 'lodash';
import partialRight from 'lodash/partialRight';

function onErr(err, msg) {
  console.log();
  console.error('##########################################');
  console.error('[Error] ' + (msg || ''));
  err && console.error(err.stack || err);
  console.error('##########################################');
  console.log();
}

/**
 * 
 * nice little web crawling tool
 * uses request-promise-native + cheerio
 * @see https://www.npmjs.com/package/request-promise
 */
export function crawlUrl(url, crawlCb) {
  const options = {
    uri: url,
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

  return request(options)
  .then(crawlCb)
  .catch(function (err) {
    // Crawling failed... 
    onErr(err);
  });
}