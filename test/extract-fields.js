'use strict';

var plugin = require('..').extractFields;
var test = require('tape');

var files = [
  { $inPath: '2015/01/01/foo/' },
  { $inPath: '2015/01/02/bar/' },
  { $inPath: '2015/01/03/baz/' }
];

test('extractFields', function(t) {
  var extractFields = plugin({
    $inPath: '{ year }/{ month }/{ day }/{ slug }/'
  });
  var cb = function(err, result) {
    t.false(err);
    t.looseEqual(result, [
      { $inPath: '2015/01/01/foo/', year: 2015, month: 1, day: 1, slug: 'foo' },
      { $inPath: '2015/01/02/bar/', year: 2015, month: 1, day: 2, slug: 'bar' },
      { $inPath: '2015/01/03/baz/', year: 2015, month: 1, day: 3, slug: 'baz' }
    ]);
    t.end();
  };
  extractFields(cb, files);
});
