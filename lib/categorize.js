'use strict';

var _ = require('savoy');
var taxonomist = require('taxonomist');

var categorize = function(key, fn) {
  return function(cb, files) {
    var categories = taxonomist(files, key, fn);
    var result = [];
    _.each(categories, function(files, category) {
      result.push({ $category: category, $content: files });
    });
    cb(null, result);
  };
};

module.exports = categorize;
