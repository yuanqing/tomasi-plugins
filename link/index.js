'use strict';

var _ = require('savoy');
var defaults = require('defaults');
var join = require('path').join;
var pppath = require('pppath');
var strfmt = require('strfmt');

var link = function(pattern, opts) {
  opts = defaults(opts, {
    firstPattern: pattern,
    linkPrefix: '',
    outFile: 'index.html'
  });
  var interpolate = strfmt(pattern);
  var firstInterpolate = strfmt(opts.firstPattern);
  return function(cb, files, dataTypeName, viewName, dataTypes, config) {
    _.each(files, function(file, i) {
      var link = (i === 0 ? firstInterpolate : interpolate)(file);
      file.$link = pppath([opts.linkPrefix, link]);
      file.$outPath = pppath([join(config.$dirs.$outDir, link)], opts.outFile);
    });
    cb(null, files);
  };
};

module.exports = link;
