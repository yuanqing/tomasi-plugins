'use strict';

var plugin = require('..').set;
var test = require('tape');

var files = [
  { slug: 'foo', year: 2015, month: 1, day: 1 },
  { slug: 'bar', year: 2015, month: 1, day: 2 },
  { slug: 'baz', year: 2015, month: 1, day: 3 }
];

test('set', function(t) {
  var set = plugin({
    date: '{year}-{month: %02d}-{day: %02d}'
  });
  var cb = function(err, result) {
    t.false(err);
    t.looseEqual(result, [
      { slug: 'foo', year: 2015, month: 1, day: 1, date: '2015-01-01' },
      { slug: 'bar', year: 2015, month: 1, day: 2, date: '2015-01-02' },
      { slug: 'baz', year: 2015, month: 1, day: 3, date: '2015-01-03' }
    ]);
    t.end();
  };
  set(cb, files);
});
