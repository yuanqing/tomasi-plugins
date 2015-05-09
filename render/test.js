'use strict';

var test = require('tape');
var plugin = require('..').render;
var join = require('path').join;

var fixturesDir = join(__dirname, 'fixtures/');

test('defaults to minifying the rendered string', function(t) {
  var render = plugin(join(fixturesDir, 'post.html'));
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
    t.looseEqual(result, [
      {
        x: 'foo',
        $content: 'foo'
      }
    ]);
    t.end();
  };
  render(cb, files, 'blog', 'post', dataTypes);
});

test('pass in `opts.minify` to disable minification', function(t) {
  var render = plugin(join(fixturesDir, 'post.html'), {
    minify: false
  });
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
    t.looseEqual(result, [
      {
        x: 'foo',
        $content: 'foo\n'
      }
    ]);
    t.end();
  };
  render(cb, files, 'blog', 'post', dataTypes);
});

test('with globals', function(t) {
  t.test('single file', function(t) {
    var render = plugin(join(fixturesDir, 'globals-single.html'));
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
      t.looseEqual(result, [
        {
          x: 'foo',
          $content: 'bar'
        }
      ]);
      t.end();
    };
    render(cb, files, 'blog', 'post', dataTypes);
  });
  t.test('multiple files', function(t) {
    var render = plugin(join(fixturesDir, 'globals-multiple.html'));
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
      t.looseEqual(result, [
        {
          x: 'foo',
          $content: 'bar baz'
        }
      ]);
      t.end();
    };
    render(cb, files, 'blog', 'post', dataTypes);
  });
});
