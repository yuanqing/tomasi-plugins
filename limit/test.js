'use strict';

var test = require('tape');
var plugin = require('..').limit;

test('zero', function(t) {
  var limit = plugin(0);
  var cb = function(err, result) {
    t.looseEqual(result, []);
    t.end();
  };
  limit(cb, [1, 2, 3]);
});

test('positive `n`', function(t) {
  t.test('less than number of `files`', function(t) {
    var limit = plugin(4);
    var cb = function(err, result) {
      t.looseEqual(result, [1, 2, 3]);
      t.end();
    };
    limit(cb, [1, 2, 3]);
  });
  t.test('more than number of `files`', function(t) {
    var limit = plugin(2);
    var cb = function(err, result) {
      t.looseEqual(result, [1, 2]);
      t.end();
    };
    limit(cb, [1, 2, 3]);
  });
  t.test('equal to number of `files`', function(t) {
    var limit = plugin(3);
    var cb = function(err, result) {
      t.looseEqual(result, [1, 2, 3]);
      t.end();
    };
    limit(cb, [1, 2, 3]);
  });
});

test('negative `n`', function(t) {
  t.test('less than number of `files`', function(t) {
    var limit = plugin(-4);
    var cb = function(err, result) {
      t.looseEqual(result, [1, 2, 3]);
      t.end();
    };
    limit(cb, [1, 2, 3]);
  });
  t.test('more than number of `files`', function(t) {
    var limit = plugin(-2);
    var cb = function(err, result) {
      t.looseEqual(result, [2, 3]);
      t.end();
    };
    limit(cb, [1, 2, 3]);
  });
  t.test('equal to number of `files`', function(t) {
    var limit = plugin(-3);
    var cb = function(err, result) {
      t.looseEqual(result, [1, 2, 3]);
      t.end();
    };
    limit(cb, [1, 2, 3]);
  });
});
