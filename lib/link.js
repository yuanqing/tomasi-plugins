'use strict';

var _ = require('savoy');
var strfmt = require('strfmt');
var pppath = require('pppath');
var join = require('path').join;

var link = function(pattern, opts) {
  var interpolate = strfmt(pattern);
  return function(cb, files) {
    _.each(files, function(file) {
      var link = interpolate(file);
      file.$link = pppath([opts.linkPrefix, link]);
      file.$outPath = pppath(join(opts.outDir, link), opts.outFile);
    });
    cb();
  };
};

module.exports = link;
