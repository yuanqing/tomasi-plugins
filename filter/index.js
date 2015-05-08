'use strict';

var _ = require('savoy');
var get = require('jaunt').get;
var isFunction = require('cheque').isFunction;
var versus = require('versus');

var filter = function(x, op, val) {
  // filter(fn)
  if (isFunction(x)) {
    return function(cb, files) {
      _.filter(files, x, function(err, result) {
        cb(err, result);
      });
    };
  }
  // filter(key, op, val)
  return function(cb, files) {
    cb(null, _.filter(files, function(file) {
      return versus(get(file, x), op, val);
    }));
  };
};

module.exports = filter;
