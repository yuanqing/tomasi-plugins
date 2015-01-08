'use strict';

var _ = require('savoy');
var Remarkable = require('remarkable');
var md = new Remarkable('full');

var parseMarkdown = function(key, opts) {
  key = key || '$content';
  md.set(opts);
  return function(cb, files) {
    _.each(files, function(file) {
      file[key] = md.render(file[key]);
    });
    cb(null, files);
  };
};

module.exports = parseMarkdown;
