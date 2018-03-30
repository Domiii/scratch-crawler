

import {
  extractScratchURLsFromProjectPage,
  buildPopularProjectsURL,
  getAllUserProjects
}
from './scratchCrawlTools';

const userName = 'griffpatch';

console.log("Getting user projects...");

getAllUserProjects(userName, 2).then(function(projUrlSet) {
  console.log(`user ${userName} has ${projUrlSet.urlList().length} projects!`);
})