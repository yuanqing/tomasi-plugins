'use strict';

var _ = require('savoy');
var extend = require('extend');
var mitch = require('mitch');

var extractFields = function(opts) {
  if (typeof opts === 'string') {
    opts = {
      $inPath: opts
    };
  }
  _.each(opts, function(pattern, key) {
    opts[key] = mitch(pattern);
  });
  return function(cb, files) {
    cb(null, _.map(files, function(file) {
      var fields = {};
      _.each(opts, function(matcher, key) {
        extend(fields, matcher(file[key]));
      });
      return extend(file, fields);
    }));
  };
};

module.exports = extractFields;
