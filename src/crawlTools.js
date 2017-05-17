
// possibilities for q: 'animations', 'games', 'art' etc...
export function buildPopularProjectsURL(from = 0, limit = 20, q = '*') {
  if (limit > 20) {
    console.warn('limit (> 20) is probably too high (the query will probably fail): ' + limit);
  }
  return `https://api.scratch.mit.edu/search/projects?limit=${limit}&offset=${from}&language=en&mode=popular&q=${q}`;
}


  // const urls = extractScratchURLsFromProjectPage($);
  // return Promise.all(urls.mapUnvisited(...));

export function buildUserProjectsUrl(username) {
  return `https://scratch.mit.edu/users/${username}/projects/`;
}

export function extractScratchURLsFromProjectPage($) {
  const projLinks = $('.media-grid .project a').get().
    map((el) => $(el).attr('href'));

  const urls = new URLSet(projLinks);
  return urls;
}

/*
project data:

const proj = {
  id,
  title,
  description,
  instructions,
  image,
  author: {
    id,
    username
  },
  history: {
    created,
    modified,
    shared
  },
  stats: {
    views,
    loves,
    favorites,
    comments (seems always to be 0)
  },
  remix: {
    root (seems always to be null)
  }
}
*/