'use strict';

var plugin = require('..').paginate;
var test = require('tape');

var files = [
  { slug: 'foo' },
  { slug: 'bar' },
  { slug: 'baz' }
];

test('default paginate', function(t) {
  var paginate = plugin(2);
  var cb = function(err, result) {
    t.false(err);
    // page 1
    t.looseEqual(result[0].$content, [
      { slug: 'foo' },
      { slug: 'bar' }
    ]);
    t.equal(result[0].page, 1);
    t.equal(result[0].totalPages, 2);
    t.equal(result[0].previous, undefined);
    t.equal(result[0].next, result[1]);
    // page 2
    t.looseEqual(result[1].$content, [
      { slug: 'baz' }
    ]);
    t.equal(result[1].page, 2);
    t.equal(result[1].totalPages, 2);
    t.equal(result[1].previous, result[0]);
    t.equal(result[1].next, undefined);
    t.end();
  };
  paginate(cb, files);
});
