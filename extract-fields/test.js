'use strict';

var test = require('tape');
var plugin = require('..').extractFields;

test('extract from `$inPath` if `opts` is a string', function(t) {
  var extractFields = plugin('{a}.md');
  var files = [
    { $inPath: 'foo.md' },
  ];
  var cb = function(err, result) {
    t.false(err);
    t.looseEqual(result, [
      {
        $inPath: 'foo.md',
        a: 'foo'
      }
    ]);
    t.end();
  };
  extractFields(cb, files);
});

test('extract from multiple fields', function(t) {
  var extractFields = plugin({
    x: '{a}.md',
    y: '{b}.md'
  });
  var files = [
    {
      x: 'foo.md',
      y: 'bar.md'
    }
  ];
  var cb = function(err, result) {
    t.false(err);
    t.looseEqual(result, [
      {
        x: 'foo.md',
        y: 'bar.md',
        a: 'foo',
        b: 'bar'
      }
    ]);
    t.end();
  };
  extractFields(cb, files);
});
