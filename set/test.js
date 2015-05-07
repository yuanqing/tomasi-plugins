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
    z: '{x} {y}'
  });
  var cb = function(err, result) {
    t.false(err);
    t.looseEqual(result, [
      {
        x: 'foo',
        y: 'bar',
        z: 'foo bar'
      }
    ]);
    t.end();
  };
  set(cb, files);
});
