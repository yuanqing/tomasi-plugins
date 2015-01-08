'use strict';

var plugin = require('..').filter;
var test = require('tape');

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
      { title: 'bar' },
      { title: 'baz' }
    ]);
    t.end();
  };
  filter(cb, files);
});

test('filter by value', function(t) {
  var filter = plugin('title', '!==', 'foo');
  var cb = function(err, result) {
    t.false(err);
    t.looseEqual(result, [
      { title: 'bar' },
      { title: 'baz' }
    ]);
    t.end();
  };
  filter(cb, files);
});
