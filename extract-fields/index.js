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
  opts = _.map(opts, function(pattern) {
    return mitch(pattern);
  });
  return function(cb, files) {
    _.each(files, function(file) {
      var fields = {};
      _.each(opts, function(matcher, key) {
        extend(fields, matcher(file[key]));
      });
      extend(file, fields);
    });
    cb(null, files);
  };
};

module.exports = extractFields;
