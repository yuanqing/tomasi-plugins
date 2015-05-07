'use strict';

var test = require('tape');
var plugin = require('..').filter;

var files = [
  { x: 'foo' },
  { x: 'bar' }
];

test('filter by `fn`', function(t) {
  var filter = plugin(function(cb, file) {
    cb(null, file.x === 'foo');
  });
  var cb = function(err, result) {
    t.false(err);
    t.looseEqual(result, [
      files[0]
    ]);
    t.end();
  };
  filter(cb, files);
});

test('filter by `op` and `val`', function(t) {
  var filter = plugin('x', '===', 'foo');
  var cb = function(err, result) {
    t.false(err);
    t.looseEqual(result, [
      files[0]
    ]);
    t.end();
  };
  filter(cb, files);
});
