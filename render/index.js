'use strict';

var _ = require('savoy');
var consolidate = require('consolidate');
var extend = require('extend');
var htmlMinifier = require('html-minifier').minify;

var render = function(tmplFile, opts) {
  opts = opts || {};
  var minify = opts.minify != null ? opts.minify : true;
  var tmplEngine = consolidate[opts.tmplEngine || 'swig'];
  return function(cb, files, dataTypeName, viewName, dataTypes) {
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
    _.each(files, function(cb, file) {
      tmplEngine(tmplFile, extend({}, opts, file, $), function(err, rendered) {
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
