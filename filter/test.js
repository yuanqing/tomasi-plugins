'use strict';

var test = require('tape');
var plugin = require('..').filter;

var files = [
  { x: { y: 'foo' } },
  { x: { y: 'bar' } }
];

test('filter by `fn`', function(t) {
  var filter = plugin(function(cb, file) {
    cb(null, file.x.y === 'foo');
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

test('filter by `key`, `op` and `val`', function(t) {
  var filter = plugin('x.y', '===', 'foo');
  var cb = function(err, result) {
    t.false(err);
    t.looseEqual(result, [
      files[0]
    ]);
    t.end();
  };
  filter(cb, files);
});
