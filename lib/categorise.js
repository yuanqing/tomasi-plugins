'use strict';

var _ = require('savoy');
var taxonomist = require('taxonomist');

var categorise = function(key, fn) {
  return function(cb, files) {
    var categories = taxonomist(files, key, fn);
    var result = [];
    _.each(categories, function(file, category) {
      result.push({ $content: file, $category: category });
    });
    cb(null, result);
  };
};

module.exports = categorise;
