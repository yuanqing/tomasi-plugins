'use strict';

var _ = require('savoy');
var extend = require('extend');
var isString = require('cheque').isString;
var mitch = require('mitch');
var join = require('path').join;
var isRelative = require('is-relative');

var extractFields = function(opts) {
  if (isString(opts)) {
    // Default to extracting from `$inPath`.
    opts = {
      $inPath: opts
    };
  }
  var hasInPath = false;
  opts = _.map(opts, function(pattern, key) {
    if (key === '$inPath') {
      hasInPath = true;
      return pattern;
    }
    return mitch(pattern);
  });
  return function(cb, files, dataTypeName, viewName, dataTypes, config) {
    if (hasInPath) {
      if (isRelative(config.$dataTypes[dataTypeName].$inPath)) {
        opts.$inPath = mitch(join(config.$dirs.$inDir, opts.$inPath));
      } else {
        opts.$inPath = mitch(opts.$inPath);
      }
    }
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
