'use strict';

var test = require('tape');
var plugin = require('..').parseSmartypants;

test('parse the `$content` field if no `keys` specified', function(t) {
  var parseSmartypants = plugin();
  var cb = function(err, result) {
    t.false(err);
    t.looseEqual(result, [
      { $content: 'foo&#8217;s' }
    ]);
    t.end();
  };
  var files = [
    { $content: 'foo\'s' }
  ];
  parseSmartypants(cb, files);
});

test('parse a single field', function(t) {
  var parseSmartypants = plugin('x');
  var cb = function(err, result) {
    t.false(err);
    t.looseEqual(result, [
      { x: 'foo&#8217;s' }
    ]);
    t.end();
  };
  var files = [
    { x: 'foo\'s' }
  ];
  parseSmartypants(cb, files);
});

test('parse multiple fields', function(t) {
  var parseSmartypants = plugin(['x', 'y']);
  var cb = function(err, result) {
    t.false(err);
    t.looseEqual(result, [
      {
        x: 'foo&#8217;s',
        y: 'bar&#8217;s'
      }
    ]);
    t.end();
  };
  var files = [
    {
      x: 'foo\'s',
      y: 'bar\'s'
    }
  ];
  parseSmartypants(cb, files);
});
