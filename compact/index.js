'use strict';

var _ = require('savoy');
var extend = require('extend');

var compact = function() {
  return function(cb, files) {
    cb(null, _.fold(files, {}, function(acc, file) {
      return extend(acc, file);
    }));
  };
};

module.exports = compact;
