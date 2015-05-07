'use strict';

var _ = require('savoy');
var versus = require('versus');

var filter = function(x, op, val) {
  if (typeof x === 'function') {
    return function(cb, files) {
      _.filter(files, x, function(err, result) {
        cb(err, result);
      });
    };
  }
  return function(cb, files) {
    cb(null, _.filter(files, function(file) {
      return versus(file[x], op, val);
    }));
  };
};

module.exports = filter;
