'use strict';

var _ = require('savoy');
var consolidate = require('consolidate');
var extend = require('extend');

var render = function(tmplFile, opts) {
  opts = opts || {};
  var tmplEngine = consolidate[opts.tmplEngine || 'ejs'];
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
        file.$content = rendered;
        cb(err);
      });
    }, function(err) {
      cb(err, files);
    });
  };
};

module.exports = render;
