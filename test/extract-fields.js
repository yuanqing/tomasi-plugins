'use strict';

var test = require('tape');
var plugin = require('..').extractFields;

var files = [
  { $src: '2015/01/01/foo.html' },
  { $src: '2015/01/02/bar.html' },
  { $src: '2015/01/03/baz.html' }
];

test('extract fields', function(t) {
  var cb = function(err, result) {
    t.false(err);
    t.looseEqual(result, [
      { $src: '2015/01/01/foo.html', year: 2015, month: 1, day: 1, slug: 'foo' },
      { $src: '2015/01/02/bar.html', year: 2015, month: 1, day: 2, slug: 'bar' },
      { $src: '2015/01/03/baz.html', year: 2015, month: 1, day: 3, slug: 'baz' }
    ]);
    t.end();
  };
  var extractFields = plugin({
    $src: '{year}/{month}/{day}/{slug}.html'
  });
  extractFields(cb, files);
});
