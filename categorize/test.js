'use strict';

var test = require('tape');
var plugin = require('..').categorize;

var files = [
  { x: ['foo', 'bar'] },
  { x: 'foo' }
];

test('categorize by a `key`', function(t) {
  var categorize = plugin('x');
  var cb = function(err, result) {
    t.false(err);
    t.looseEqual(result, [
      {
        x: 'foo',
        $content: [ files[0], files[1] ]
      },
      {
        x: 'bar',
        $content: [ files[0] ]
      }
    ]);
    t.equal(result[0].$content[0], files[0]);
    t.equal(result[0].$content[1], files[1]);
    t.equal(result[1].$content[0], files[0]);
    t.end();
  };
  categorize(cb, files);
});

test('categorize by a `key` with an `fn` to customize the category',
    function(t) {
  var categorize = plugin('x', function(x) {
    return x[0];
  });
  var cb = function(err, result) {
    t.false(err);
    t.looseEqual(result, [
      {
        x: 'f',
        $content: [ files[0], files[1] ]
      },
      {
        x: 'b',
        $content: [ files[0] ]
      }
    ]);
    t.equal(result[0].$content[0], files[0]);
    t.equal(result[0].$content[1], files[1]);
    t.equal(result[1].$content[0], files[0]);
    t.end();
  };
  categorize(cb, files);
});
