import Crawler from 'simplecrawler';
import cheerio from 'cheerio';

var crawler = Crawler("https://scratch.mit.edu/users/domiiii/projects/")
  .on('crawlstart', () => {
    console.log("Starting...");
  })
  .on('queueadd', (queueItem) => {
    console.warn('Queued: ' + queueItem.path);
  })
  .on('fetchcomplete', function(queueItem, responseBuffer){
    const html = responseBuffer.toString();
    const $ = cheerio.load(html);

    const projLinks = $('.media-grid .project a').get().map((el) => { return $(el).attr('href'); });
    if (projLinks.length > 0) {
      projLinks.forEach(link => {
        crawler.queueURL(link, queueItem, false);
      });
    }
    // else if () {
    //   // TODO: Match path, e.g.: /projects/XXXXXXXX
    // }

    console.log('fetched: ' + queueItem.path);
  });

crawler.maxDepth = 1;
crawler.respectRobotsTxt = false;


console.log();
console.log();
crawler.start();