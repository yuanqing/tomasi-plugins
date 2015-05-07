'use strict';

var _ = require('savoy');
var fastmatter = require('fastmatter');
var extend = require('extend');

var parseFrontmatter = function(key) {
  key = key || '$content';
  return function(cb, files) {
    cb(null, _.map(files, function(file) {
      var parsed = fastmatter(file[key]);
      var body = {};
      body[key] = parsed.body;
      return extend(file, parsed.attributes, body);
    }));
  };
};

module.exports = parseFrontmatter;
