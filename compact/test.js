'use strict';

var test = require('tape');
var plugin = require('..').compact;

test('compacts files', function(t) {
  var compact = plugin();
  var cb = function(err, result) {
    t.looseEqual(result, {
      x: 'bar',
      y: 'baz',
    });
    t.end();
  };
  var files = [
    { x: 'foo', y: 'baz' },
    { x: 'bar' }
  ];
  compact(cb, files);
});
