import _ from 'lodash';

export default class URLSet {
  constructor(initialUrls) {
    this.urls = {};

    if (initialUrls) {
      initialUrls.forEach(this.addUrl);
    }
  }


  get urlList() {
    return Object.keys(this.urls);
  }

  addUrl = (url) => {
    this.urls[url] = { nVisited: 0 };
  }

  getStatus(url) {
    return this.urls[url] || null;
  }

  markVisited(url) {
    const status = this.getStatus(url) || this.addUrl(url);
    ++status.nVisited;
  }

  hasVisited(url) {
    const status = this.getStatus(url);
    return status && status.nVisited > 0;
  }

  map(fn) {
    return _.map(this.urls, fn);
  }

  getUnvisited() {
    return _.filter(this.urls, (status, url) => !status.nVisited);
  }

  mapUnvisited(fn) {
    const unvisited = this.getUnvisited();
    return _.map(unvisited, (status,url) => fn(status, url));
  }

  toString() {
    return this.urlList.join('\n');
  }

  get [Symbol.toStringTag]() {
    return this.urlList.join('\n');
  }
}