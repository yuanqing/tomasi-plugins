'use strict';

var _ = require('savoy');
var Remarkable = require('remarkable');
var md = new Remarkable('full');

var parseMarkdown = function(keys, opts) {
  keys = keys ? [].concat(keys) : ['$content'];
  md.set(opts);
  return function(cb, files) {
    _.each(files, function(file) {
      _.each(keys, function(key) {
        file[key] = md.render(file[key]);
      });
    });
    cb(null, files);
  };
};

module.exports = parseMarkdown;
