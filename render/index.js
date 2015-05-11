'use strict';

var _ = require('savoy');
var consolidate = require('consolidate');
var extend = require('extend');
var htmlMinifier = require('html-minifier').minify;
var strfmt = require('strfmt');
var isRelative = require('is-relative');
var join = require('path').join;

var render = function(tmplFile, opts) {
  opts = opts || {};
  var tmplEngineName = opts.tmplEngine || 'swig';
  if (tmplEngineName === 'swig') {
    opts.autoescape = false;
  }
  var tmplEngine = consolidate[tmplEngineName];
  var minify = opts.minify != null ? opts.minify : true;
  return function(cb, files, dataTypeName, viewName, dataTypes, config) {
    if (isRelative(tmplFile)) {
      tmplFile = join(config.$dirs.$tmplDir, tmplFile);
    }
    var $ = {
      $: _.map(dataTypes, function(dataType) {
        if (Object.keys(dataType).length === 1 && dataType.$) {
          if (dataType.$.length === 1) {
            return dataType.$[0];
          }
          return dataType.$;
        }
        return dataType;
      })
    };
    var interpolate = strfmt(tmplFile);
    _.each(files, function(cb, file) {
      tmplEngine(interpolate(file), extend({}, opts, file, $),
          function(err, rendered) {
        if (minify) {
          rendered = htmlMinifier(rendered, {
            collapseWhitespace: true
          });
        }
        file.$content = rendered;
        cb(err);
      });
    }, function(err) {
      cb(err, files);
    });
  };
};

module.exports = render;
