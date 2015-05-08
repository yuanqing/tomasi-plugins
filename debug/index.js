'use strict';

var debug = function(fn) {
  return function(cb, files, dataTypeName, viewName, dataTypes) {
    fn(files, dataTypeName, viewName, dataTypes);
    cb(null, files);
  };
};

module.exports = debug;
