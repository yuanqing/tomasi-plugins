'use strict';

var _ = require('savoy');
var mitch = require('mitch');
var extend = require('extend');

var extractFields = function(opts) {
  var matchers = {};
  _.each(opts, function(pattern, key) {
    matchers[key] = mitch(pattern);
  });
  return function(cb, files) {
    var result;
    try {
      result = _.map(files, function(file) {
        var fields = {};
        _.each(matchers, function(matcher, key) {
          extend(fields, matcher(file[key]));
        });
        return extend(file, fields);
      });
    } catch(err) {
      return cb(err);
    }
    cb(null, result);
  };
};

module.exports = extractFields;
