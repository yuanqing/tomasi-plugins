'use strict';

var _ = require('savoy');
var smartypants = require('typogr').smartypants;

var parseSmartypants = function(keys) {
  keys = keys ? [].concat(keys) : ['$content'];
  return function(cb, files) {
    _.each(files, function(file) {
      _.each(keys, function(key) {
        file[key] = smartypants(file[key]);
      });
    });
    cb(null, files);
  };
};

module.exports = parseSmartypants;
