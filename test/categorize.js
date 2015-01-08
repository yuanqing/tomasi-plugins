'use strict';

var test = require('tape');
var plugin = require('..').categorize;

var files = [
  { categories: ['foo', 'bar'] },
  { categories: ['baz'] },
  { categories: 'bar' }
];

test('categorize using string `key`', function(t) {
  var categorize = plugin('categories');
  var cb = function(err, result) {
    t.false(err);
    t.looseEqual(result, [
      { category: 'foo',
        $content: [ files[0] ] },
      { category: 'bar',
        $content: [ files[0], files[2] ] },
      { category: 'baz',
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

test('categorize using function `key`', function(t) {
  var categorize = plugin(function(file) {
    return file.categories;
  });
  var cb = function(err, result) {
    t.false(err);
    t.looseEqual(result, [
      { category: 'foo',
        $content: [ files[0] ] },
      { category: 'bar',
        $content: [ files[0], files[2] ] },
      { category: 'baz',
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

test('with `fn` to modify the value used for the categorisation', function(t) {
  var categorize = plugin('categories', function(category) {
    return category[0];
  });
  var cb = function(err, result) {
    t.false(err);
    t.looseEqual(result, [
      { category: 'f',
        $content: [ files[0] ] },
      { category: 'b',
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
