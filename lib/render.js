'use strict';

var _ = require('savoy');
var consolidate = require('consolidate');

var render = function(tmplFile, opts) {
  var tmplEngine = opts.tmplEngine || 'ejs';
  return function(cb, files, dataTypeName, viewName, dataTypes) {
    _.each(files, function(cb, file) {
      var data = {
        $this: file,
        $: function(dataTypeName, viewName, index) {
          var files = dataTypes[dataTypeName][viewName];
          return typeof index === 'undefined' ? files : files[index];
        }
      };
      consolidate[tmplEngine](tmplFile, data, function(err, rendered) {
        if (err) { return cb(err); }
        file.$content = rendered;
        cb();
      });
    }, function(err) {
      cb(err);
    });
  };
};

module.exports = render;
