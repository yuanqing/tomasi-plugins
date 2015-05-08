'use strict';

var test = require('tape');
var plugin = require('..').render;

var fixturesDir = __dirname + '/fixtures/';

test('default to `ejs`', function(t) {
  var render = plugin(fixturesDir + 'post.ejs');
  var files = [
    { x: 'foo' }
  ];
  var dataTypes = {
    blog: {
      post: files
    }
  };
  var cb = function(err, result) {
    t.false(err);
    t.looseEqual([
      {
        x: 'foo',
        $content: 'foo\n'
      }
    ], result);
    t.end();
  };
  render(cb, files, 'blog', 'post', dataTypes);
});

test('with globals', function(t) {
  t.test('single file', function(t) {
    var render = plugin(fixturesDir + 'globals-single.ejs');
    var files = [
      { x: 'foo' }
    ];
    var dataTypes = {
      blog: {
        post: files
      },
      globals: {
        $: [
          // single file
          { x: 'bar' }
        ]
      }
    };
    var cb = function(err, result) {
      t.false(err);
      t.looseEqual([
        {
          x: 'foo',
          $content: 'bar\n'
        }
      ], result);
      t.end();
    };
    render(cb, files, 'blog', 'post', dataTypes);
  });
  t.test('multiple files', function(t) {
    var render = plugin(fixturesDir + 'globals-multiple.ejs');
    var files = [
      { x: 'foo' }
    ];
    var dataTypes = {
      blog: {
        post: files
      },
      globals: {
        $: [
          // multiple files
          { x: 'bar' },
          { x: 'baz' }
        ]
      }
    };
    var cb = function(err, result) {
      t.false(err);
      t.looseEqual([
        {
          x: 'foo',
          $content: 'bar\nbaz\n'
        }
      ], result);
      t.end();
    };
    render(cb, files, 'blog', 'post', dataTypes);
  });
});
