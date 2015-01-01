'use strict';

var _ = require('savoy');
var taxonomist = require('taxonomist');

var categorize = function(key, fn) {
  key = key || 'categories';
  return function(cb, files) {
    var categories = taxonomist(files, key, fn);
    var result = [];
    _.each(categories, function(files, category) {
      result.push({ $category: category, $content: files });
    });
    if (result.length === 0) {
      return cb('categorize: could not categorize using the key "' + key + '"');
    }
    cb(null, result);
  };
};

module.exports = categorize;
