'use strict';

var test = require('tape');
var plugin = require('..').paginate;

var files = [
  { x: 'foo' },
  { x: 'bar' },
  { x: 'baz' }
];

test('no arguments', function(t) {
  var paginate = plugin();
  var cb = function(err, result) {
    t.false(err);
    // page 1
    t.equal(result[0].x, 'foo');
    t.equal(result[0].$page, 1);
    t.equal(result[0].$totalPages, 3);
    t.equal(result[0].$previous, undefined);
    t.equal(result[0].$next, result[1]);
    // page 2
    t.equal(result[1].x, 'bar');
    t.equal(result[1].$page, 2);
    t.equal(result[1].$totalPages, 3);
    t.equal(result[1].$previous, result[0]);
    t.equal(result[1].$next, result[2]);
    // page 3
    t.equal(result[2].x, 'baz');
    t.equal(result[2].$page, 3);
    t.equal(result[2].$totalPages, 3);
    t.equal(result[2].$previous, result[1]);
    t.equal(result[2].$next, undefined);
    t.end();
  };
  paginate(cb, files);
});

test('with `numPerPage`', function(t) {
  var paginate = plugin(2);
  var cb = function(err, result) {
    t.false(err);
    t.looseEqual(result[0].$content, [
      files[0],
      files[1]
    ]);
    t.equal(result[0].$page, 1);
    t.equal(result[0].$totalPages, 2);
    t.equal(result[0].$previous, undefined);
    t.equal(result[0].$next, result[1]);
    t.looseEqual(result[1].$content, [
      files[2]
    ]);
    t.equal(result[1].$page, 2);
    t.equal(result[1].$totalPages, 2);
    t.equal(result[1].$previous, result[0]);
    t.equal(result[1].$next, undefined);
    t.end();
  };
  paginate(cb, files);
});
