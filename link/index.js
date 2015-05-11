'use strict';

var _ = require('savoy');
var defaults = require('defaults');
var join = require('path').join;
var pppath = require('pppath');
var strfmt = require('strfmt');

var link = function(pattern, opts) {
  var interpolate = strfmt(pattern);
  opts = defaults(opts, {
    linkPrefix: '',
    outFile: 'index.html'
  });
  return function(cb, files, dataTypeName, viewName, dataTypes, config) {
    _.each(files, function(file) {
      var link = interpolate(file);
      file.$link = pppath([opts.linkPrefix, link]);
      file.$outPath = pppath([join(config.$dirs.$outDir, link)], opts.outFile);
    });
    cb(null, files);
  };
};

module.exports = link;
