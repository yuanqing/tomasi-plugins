'use strict';

var _ = require('savoy');
var fastmatter = require('fastmatter');
var extend = require('extend');

var parseFrontmatter = function(keys) {
  keys = keys ? [].concat(keys) : ['$content'];
  return function(cb, files) {
    _.each(files, function(file) {
      _.each(keys, function(key) {
        var parsed = fastmatter(file[key]);
        var body = {};
        body[key] = parsed.body;
        extend(file, parsed.attributes, body);
      });
    });
    cb(null, files);
  };
};

module.exports = parseFrontmatter;
