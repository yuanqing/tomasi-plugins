'use strict';

var _ = require('savoy');
var Remarkable = require('remarkable');
var markdown = new Remarkable('full').render;

var parseMarkdown = function(key) {
  key = key || '$content';
  return function(cb, files) {
    _.each(files, function(file) {
      file[key] = markdown(file[key]);
    });
    cb();
  };
};

module.exports = parseMarkdown;
