'use strict';

var test = require('tape');
var plugin = require('..').set;

var files = [
  { year: 2015, month: 1, day: 1 },
  { year: 2015, month: 1, day: 2 },
  { year: 2015, month: 1, day: 3 }
];

test('set', function(t) {
  var set = plugin({
    title: '{year}-{month: %02d}-{day: %02d}'
  });
  var cb = function(err, result) {
    t.false(err);
    t.looseEqual(result, [
      { year: 2015, month: 1, day: 1, title: '2015-01-01' },
      { year: 2015, month: 1, day: 2, title: '2015-01-02' },
      { year: 2015, month: 1, day: 3, title: '2015-01-03' }
    ]);
    t.end();
  };
  set(cb, files);
});
