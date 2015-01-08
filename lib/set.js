'use strict';

var _ = require('savoy');
var strfmt = require('strfmt');

var set = function(obj) {
  _.each(obj, function(val, key) {
    obj[key] = strfmt(val);
  });
  return function(cb, files) {
    _.each(files, function(file) {
      _.each(obj, function(interpolate, key) {
        file[key] = interpolate(file);
      });
    });
    cb(null, files);
  };
};

module.exports = set;
