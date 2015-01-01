'use strict';

var plugin = require('..').categorize;
var test = require('tape');

var files = [
  { categories: ['foo', 'bar'] },
  { categories: ['baz'] },
  { categories: 'bar' }
];

test('invalid string `prop`', function(t) {
  var categorize = plugin('invalid');
  var cb = function(err) {
    t.true(err);
    t.end();
  };
  categorize(cb, files);
});

test('string `prop`; defaults to "categories"', function(t) {
  var categorize = plugin();
  var cb = function(err, result) {
    t.false(err);
    t.looseEqual(result, [
      { $category: 'foo',
        $content: [ files[0] ] },
      { $category: 'bar',
        $content: [ files[0], files[2] ] },
      { $category: 'baz',
        $content: [ files[1] ] }
    ]);
    t.equal(result[0].$content[0], files[0]);
    t.equal(result[1].$content[0], files[0]);
    t.equal(result[1].$content[1], files[2]);
    t.equal(result[2].$content[0], files[1]);
    t.end();
  };
  categorize(cb, files);
});

test('function `prop`', function(t) {
  var categorize = plugin(function(file) {
    return file.categories;
  });
  var cb = function(err, result) {
    t.false(err);
    t.looseEqual(result, [
      { $category: 'foo',
        $content: [ files[0] ] },
      { $category: 'bar',
        $content: [ files[0], files[2] ] },
      { $category: 'baz',
        $content: [ files[1] ] }
    ]);
    t.equal(result[0].$content[0], files[0]);
    t.equal(result[1].$content[0], files[0]);
    t.equal(result[1].$content[1], files[2]);
    t.equal(result[2].$content[0], files[1]);
    t.end();
  };
  categorize(cb, files);
});

test('`prop` and `fn`', function(t) {
  var categorize = plugin('categories', function(tag) {
    return tag[0];
  });
  var cb = function(err, result) {
    t.false(err);
    t.looseEqual(result, [
      { $category: 'f',
        $content: [ files[0] ] },
      { $category: 'b',
        $content: [ files[0], files[1], files[2] ] }
    ]);
    t.equal(result[0].$content[0], files[0]);
    t.equal(result[1].$content[0], files[0]);
    t.equal(result[1].$content[1], files[1]);
    t.equal(result[1].$content[2], files[2]);
    t.end();
  };
  categorize(cb, files);
});
