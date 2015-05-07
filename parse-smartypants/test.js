'use strict';

var test = require('tape');
var plugin = require('..').parseSmartypants;

test('parses the `$content` field if no `keys` specified', function(t) {
  var parseSmartypants = plugin();
  var cb = function(err, result) {
    t.false(err);
    t.looseEqual(result, [
      { $content: '&#8220;foo&#8221;' }
    ]);
    t.end();
  };
  var files = [
    { $content: '"foo"' }
  ];
  parseSmartypants(cb, files);
});

test('parse a single field', function(t) {
  var parseSmartypants = plugin('foo');
  var cb = function(err, result) {
    t.false(err);
    t.looseEqual(result, [
      { foo: '&#8220;foo&#8221;' }
    ]);
    t.end();
  };
  var files = [
    { foo: '"foo"' }
  ];
  parseSmartypants(cb, files);
});

test('parse multiple fields', function(t) {
  var parseSmartypants = plugin(['foo', 'bar']);
  var cb = function(err, result) {
    t.false(err);
    t.looseEqual(result, [
      {
        foo: '&#8220;foo&#8221;',
        bar: '&#8220;bar&#8221;'
      }
    ]);
    t.end();
  };
  var files = [
    {
      foo: '"foo"',
      bar: '"bar"'
    }
  ];
  parseSmartypants(cb, files);
});
