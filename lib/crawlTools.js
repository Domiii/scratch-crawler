'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.URLSet = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var URLSet = exports.URLSet = function () {
  function URLSet(initialUrls) {
    var _this = this;

    _classCallCheck(this, URLSet);

    this.urls = [];

    if (initialUrls) {
      initialUrls.forEach(function (url) {
        return _this.addUrl.bind(_this);
      });
    }
  }

  _createClass(URLSet, [{
    key: 'addUrl',
    value: function addUrl(url) {
      this.urls[urls] = { nVisited: 0 };
    }
  }, {
    key: 'getStatus',
    value: function getStatus(url) {
      return this.urls[url] || null;
    }
  }, {
    key: 'markVisited',
    value: function markVisited(url) {
      var status = this.getStatus(url) || this.addUrl(url);
      ++status.nVisited;
    }
  }, {
    key: 'hasVisited',
    value: function hasVisited(url) {
      var status = this.getStatus(url);
      return status && status.nVisited > 0;
    }
  }]);

  return URLSet;
}();