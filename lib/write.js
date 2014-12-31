'use strict';

var _ = require('savoy');
var fs = require('fs-extra');

var write = function() {
  return function(cb, files) {
    _.each(files, function(cb, file) {
      fs.outputFile(file.$outPath, file.$content, function(err) {
        cb(err);
      });
    }, function(err) {
      cb(err);
    });
  };
};

module.exports = write;
