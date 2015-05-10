'use strict';

var _ = require('savoy');
var cheque = require('cheque');
var clone = require('clone');
var extend = require('extend');
var strfmt = require('strfmt');
var traverse = require('traverse');

var set = function(obj) {
  return function(cb, files) {
    _.each(files, function(file) {
      var objCopy = clone(obj);
      traverse(objCopy).forEach(function(val) {
        if (cheque.isString(val)) {
          this.update(strfmt(val)(file));
        }
      });
      extend(file, objCopy);
    });
    cb(null, files);
  };
};

module.exports = set;
