'use strict';

var test = require('tape');
var plugin = require('..').extractFields;

var files = [
  { $inPath: '2015-01-01-foo.md' },
  { $inPath: '2015-01-02-bar.md' },
  { $inPath: '2015-01-03-baz.md' }
];

var expected = [
  {
    $inPath: '2015-01-01-foo.md',
    year: 2015,
    month: 1,
    day: 1,
    slug: 'foo'
  },
  {
    $inPath: '2015-01-02-bar.md',
    year: 2015,
    month: 1,
    day: 2,
    slug: 'bar'
  },
  {
    $inPath: '2015-01-03-baz.md',
    year: 2015,
    month: 1,
    day: 3,
    slug: 'baz'
  }
];

test('string `opts`', function(t) {
  var cb = function(err, result) {
    t.false(err);
    t.looseEqual(result, expected);
    t.end();
  };
  var extractFields = plugin('{year}-{month}-{day}-{slug}.md');
  extractFields(cb, files);
});

test('object `opts`', function(t) {
  var cb = function(err, result) {
    t.false(err);
    t.looseEqual(result, expected);
    t.end();
  };
  var extractFields = plugin({
    $inPath: '{year}-{month}-{day}-{slug}.md'
  });
  extractFields(cb, files);
});
