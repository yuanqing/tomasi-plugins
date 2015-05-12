'use strict';

var limit = function(n) {
  return function(cb, files) {
    cb(null, n < 0 ? files.slice(n) : files.slice(0, n));
  };
};

module.exports = limit;
