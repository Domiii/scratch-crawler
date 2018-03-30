import _ from 'lodash';
import isArrayLike from 'lodash/isArrayLike';

export default class URLSet {
  constructor(initialUrls) {
    this.urls = {};

    if (initialUrls) {
      this.addUrls(initialUrls);
    }
  }


  urlList = () => {
    return Object.keys(this.urls);
  }

  addUrl = (url) => {
    this.urls[url] = { nVisited: 0 };
  }

  addUrls = (urlArr) => {
    urlArr.forEach(this.addUrl);
  }

  addSet = (set) => {
    if (isArrayLike(set)) {
      set.forEach(this.addSet);
    }
    else {
      this.addUrls(set.urlList());
    }
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
    return this.urlList().join('\n');
  }

  get [Symbol.toStringTag]() {
    return this.urlList().join('\n');
  }
}

URLSet.union = function(...sets) {
  const set = new URLSet();
  set.addSet(sets);
  return set;
}