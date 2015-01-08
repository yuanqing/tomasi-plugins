'use strict';

var _ = require('savoy');
var consolidate = require('consolidate');

var render = function(tmplFile, opts) {
  opts = opts || {};
  var tmplEngine = opts.tmplEngine || 'ejs';
  return function(cb, files, dataTypeName, viewName, dataTypes) {
    var $ = function(dataTypeName, viewName, index) {
      var files = dataTypes[dataTypeName][viewName];
      return typeof index === 'undefined' ? files : files[index];
    };
    _.each(files, function(cb, file) {
      var data = {
        $: $,
        $this: file
      };
      consolidate[tmplEngine](tmplFile, data, function(err, rendered) {
        file.$content = rendered;
        cb(err);
      });
    }, function(err) {
      cb(err, files);
    });
  };
};

module.exports = render;
