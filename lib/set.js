'use strict';

var _ = require('savoy');
var strfmt = require('strfmt');
var cheque = require('cheque');
var extend = require('extend');

var set = function(key, fn) {
  if (cheque.isObject(key)) {
    return function(cb, files) {
      _.each(files, function(file) {
        extend(file, key);
      });
      cb();
    };
  }
  if (typeof fn !== 'function') {
    fn = strfmt(fn);
  }
  return function(cb, files) {
    _.each(files, function(file) {
      file[key] = fn(file);
    });
    cb();
  };
};

module.exports = set;
