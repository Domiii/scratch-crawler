import cheerio from 'cheerio';
import request from 'request-promise-native';
import contentType from 'content-type';
import _ from 'lodash';
import partialRight from 'lodash/partialRight';

import URLSet from './URLSet';
import {
  crawlUrl
 } from './crawlTools';


/**
 * possibilities for q: 'animations', 'games', 'art' etc...
 */
export function buildPopularProjectsURL(from = 0, limit = 20, q = '*') {
  if (limit > 20) {
    console.warn('limit (> 20) is probably too high (the query might fail): ' + limit);
  }
  return `https://api.scratch.mit.edu/search/projects?limit=${limit}&offset=${from}&language=en&mode=popular&q=${q}`;
}


/**
 * The url that contains all projects of a user
 */
export function buildUserProjectsUrl(userName, page = 1) {
  return `https://scratch.mit.edu/users/${userName}/projects/?page=${page}`;
}

export function buildProjectUrl(projectId) {
  return `https://scratch.mit.edu/projects/${projectId}`;
}

export function extractScratchURLsFromProjectPage($) {
  const projLinks = $('.media-grid .project > a').get().
    map((el) => $(el).attr('href'));
  const urls = new URLSet(projLinks);
  return urls;
}


export function getAllUserProjects(userName, pages = 1) {
  const promises = [];
  const crawl1 = partialRight(crawlUrl, extractScratchURLsFromProjectPage);
  for (let p = 1; p <= pages; ++p) {
    const url = buildUserProjectsUrl(userName, p);

    promises.push(crawl1(url).then(function(urls) {
      // TODO: next: crawl each project individually
      return urls;
    }));
  }

  return Promise.all(promises).then(URLSet.union);
}