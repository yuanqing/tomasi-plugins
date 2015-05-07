'use strict';

var _ = require('savoy');
var cellophane = require('cellophane');
var consolidate = require('consolidate');
var extend = require('extend');

var render = function(tmplFile, opts) {
  opts = opts || {};
  var tmplEngine = consolidate[opts.tmplEngine || 'ejs'];
  return function(cb, files, dataTypeName, viewName, dataTypes) {
    var $ = {
      $: function(dataTypeName, viewName) {
        return cellophane(dataTypes[dataTypeName][viewName]);
      }
    };
    _.each(files, function(cb, file) {
      extend(file, $);
      tmplEngine(tmplFile, file, function(err, rendered) {
        file.$content = rendered;
        cb(err);
      });
    }, function(err) {
      cb(err, files);
    });
  };
};

module.exports = render;
