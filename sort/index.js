'use strict';

var get = require('jaunt').get;
var cheque = require('cheque');
var isFunction = cheque.isFunction;
var isString = cheque.isString;

var sort = function(x, opts) {
  // sort(fn)
  if (isFunction(x)) {
    return function(cb, files) {
      cb(null, files.slice().sort(x));
    };
  }
  // sort(key, opts)
  return function(cb, files) {
    cb(null, files.slice().sort(function(a, b) {
      a = get(a, x);
      b = get(b, x);
      if (opts && opts.order === 'desc') {
        var temp = a;
        a = b;
        b = temp;
      }
      if (isString(a) && isString(b)) {
        return a.localeCompare(b);
      }
      return a < b ? -1 : 1;
    }));
  };
};

module.exports = sort;
