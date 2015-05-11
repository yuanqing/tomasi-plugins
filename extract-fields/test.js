'use strict';

var test = require('tape');
var plugin = require('..').extractFields;

test('extract from `$inPath` if `opts` is a string', function(t) {
  t.test('`$inPath` is a relative path', function(t) {
    var extractFields = plugin('{a}.md');
    var config = {
      $dirs: {
        $inDir: 'in'
      },
      $dataTypes: {
        blog: {
          $inPath: '*.md'
        }
      }
    };
    var files = [
      { $inPath: 'in/foo.md' },
    ];
    var cb = function(err, result) {
      t.false(err);
      t.looseEqual(result, [
        {
          $inPath: 'in/foo.md',
          a: 'foo'
        }
      ]);
      t.end();
    };
    extractFields(cb, files, 'blog', null, null, config);
  });
  t.test('`$inPath` is an absolute path', function(t) {
    var extractFields = plugin('/{a}.md');
    var config = {
      $dataTypes: {
        blog: {
          $inPath: '/*.md'
        }
      }
    };
    var files = [
      { $inPath: '/foo.md' },
    ];
    var cb = function(err, result) {
      t.false(err);
      t.looseEqual(result, [
        {
          $inPath: '/foo.md',
          a: 'foo'
        }
      ]);
      t.end();
    };
    extractFields(cb, files, 'blog', null, null, config);
  });
});

test('extract from multiple fields', function(t) {
  var extractFields = plugin({
    x: '{a}.md',
    y: '{b}.md'
  });
  var files = [
    {
      x: 'foo.md',
      y: 'bar.md'
    }
  ];
  var cb = function(err, result) {
    t.false(err);
    t.looseEqual(result, [
      {
        x: 'foo.md',
        y: 'bar.md',
        a: 'foo',
        b: 'bar'
      }
    ]);
    t.end();
  };
  extractFields(cb, files);
});
