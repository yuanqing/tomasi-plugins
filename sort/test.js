'use strict';

var test = require('tape');
var plugin = require('..').sort;

test('sort by `fn`', function(t) {
  var files = [
    { x: { y: 3 } },
    { x: { y: 1 } },
    { x: { y: 2 } }
  ];
  var sort = plugin(function(a, b) {
    return a.x.y < b.x.y ? -1 : 1;
  });
  var cb = function(err, result) {
    t.false(err);
    t.looseEqual(result, [
      files[1],
      files[2],
      files[0]
    ]);
    t.equal(result[0], files[1]);
    t.equal(result[1], files[2]);
    t.equal(result[2], files[0]);
    t.end();
  };
  sort(cb, files);
});

test('sort by `key`', function(t) {
  t.test('numeric', function(t) {
    var files = [
      { x: { y: 3 } },
      { x: { y: 1 } },
      { x: { y: 2 } }
    ];
    t.test('ascending', function(t) {
      var sort = plugin('x.y');
      var cb = function(err, result) {
        t.false(err);
        t.looseEqual(result, [
          files[1],
          files[2],
          files[0]
        ]);
        t.equal(result[0], files[1]);
        t.equal(result[1], files[2]);
        t.equal(result[2], files[0]);
        t.end();
      };
      sort(cb, files);
    });
    t.test('descending', function(t) {
      var sort = plugin('x.y', { order: 'desc' });
      var cb = function(err, result) {
        t.false(err);
        t.looseEqual(result, [
          files[0],
          files[2],
          files[1]
        ]);
        t.equal(result[0], files[0]);
        t.equal(result[1], files[2]);
        t.equal(result[2], files[1]);
        t.end();
      };
      sort(cb, files);
    });
  });
  t.test('alphabetic', function(t) {
    var files = [
      { x: { y: 'foo' } },
      { x: { y: 'bar' } },
      { x: { y: 'baz' } }
    ];
    t.test('ascending', function(t) {
      var sort = plugin('x.y');
      var cb = function(err, result) {
        t.false(err);
        t.looseEqual(result, [
          files[1],
          files[2],
          files[0]
        ]);
        t.equal(result[0], files[1]);
        t.equal(result[1], files[2]);
        t.equal(result[2], files[0]);
        t.end();
      };
      sort(cb, files);
    });
    t.test('descending', function(t) {
      var sort = plugin('x.y', { order: 'desc' });
      var cb = function(err, result) {
        t.false(err);
        t.looseEqual(result, [
          files[0],
          files[2],
          files[1]
        ]);
        t.equal(result[0], files[0]);
        t.equal(result[1], files[2]);
        t.equal(result[2], files[1]);
        t.end();
      };
      sort(cb, files);
    });
  });
});
