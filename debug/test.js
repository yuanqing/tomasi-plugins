'use strict';

var test = require('tape');
var plugin = require('..').debug;

test('call `fn` with four arguments', function(t) {
  var debug = plugin(function(files, dataTypeName, viewName, dataTypes) {
    t.equal(arguments.length, 4);
    t.equal(files, 'foo');
    t.equal(dataTypeName, 'bar');
    t.equal(viewName, 'baz');
    t.equal(dataTypes, 'qux');
  });
  var cb = function(err, result) {
    t.false(err);
    t.equal(result, 'foo');
    t.end();
  };
  debug(cb, 'foo', 'bar', 'baz', 'qux');
});
