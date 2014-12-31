'use strict';

var _ = require('savoy');
var versus = require('versus');

var filter = function(key, op, expected) {
  if (typeof key === 'function') {
    return function(cb, files) {
      _.filter(files, key, function(err, result) {
        cb(err, result);
      });
    };
  }
  return function(cb, files) {
    cb(null, _.filter(files, function(file) {
      return versus(file[key], op, expected);
    }));
  };
};

module.exports = filter;
