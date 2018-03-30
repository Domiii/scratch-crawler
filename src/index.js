

import {
  extractScratchURLsFromProjectPage,
  buildPopularProjectsURL,
  getAllUserProjects
}
from './scratchCrawlTools';

const userName = 'domiiii';

console.log("Getting user projects...");

getAllUserProjects(userName).then(function(projUrlSet) {
  console.log(`user ${userName} has ${projUrlSet.urlList.length} projects!`);
})