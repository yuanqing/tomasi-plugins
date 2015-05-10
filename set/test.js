'use strict';

var test = require('tape');
var plugin = require('..').set;

var files = [
  {
    x: 'foo',
    y: 'bar'
  }
];

test('set', function(t) {
  var set = plugin({
    a: {
      b: '{x} {y}',
      c: 42
    }
  });
  var cb = function(err, result) {
    t.false(err);
    t.looseEqual(result, [
      {
        x: 'foo',
        y: 'bar',
        a: {
          b: 'foo bar',
          c: 42
        }
      }
    ]);
    t.end();
  };
  set(cb, files);
});
