'use strict';

var test = require('tape');
var plugin = require('..').filter;

var files = [
  { title: 'foo' },
  { title: 'bar' },
  { title: 'baz' }
];

test('filter by function', function(t) {
  var filter = plugin(function(cb, file) {
    cb(null, file.title !== 'foo');
  });
  var cb = function(err, result) {
    t.false(err);
    t.looseEqual(result, [
      files[1],
      files[2]
    ]);
    t.end();
  };
  filter(cb, files);
});

test('filter by operator and value', function(t) {
  var filter = plugin('title', '!==', 'foo');
  var cb = function(err, result) {
    t.false(err);
    t.looseEqual(result, [
      files[1],
      files[2]
    ]);
    t.end();
  };
  filter(cb, files);
});
