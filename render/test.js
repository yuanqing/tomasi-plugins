'use strict';

var test = require('tape');
var plugin = require('..').render;
var join = require('path').join;

var FIXTURES_DIR = join(__dirname, 'fixtures');

test('defaults to `swig`, and minifying the rendered string', function(t) {
  var render = plugin(join(FIXTURES_DIR, 'post.html'));
  var config = {
    $dirs: {
      $tmplDir: '.'
    }
  };
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
  render(cb, files, 'blog', 'post', dataTypes, config);
});

test('with `$dirs.$tmplDir`', function(t) {
  var render = plugin('post.html');
  var config = {
    $dirs: {
      $tmplDir: FIXTURES_DIR
    }
  };
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
  render(cb, files, 'blog', 'post', dataTypes, config);
});

test('interpolates `file` into `tmplFile`', function(t) {
  var render = plugin(join(FIXTURES_DIR, '{tmpl}.html'));
  var config = {
    $dirs: {
      $tmplDir: '.'
    }
  };
  var files = [
    {
      tmpl: 'post',
      x: 'foo'
    }
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
        tmpl: 'post',
        x: 'foo',
        $content: 'foo'
      }
    ]);
    t.end();
  };
  render(cb, files, 'blog', 'post', dataTypes, config);
});

test('pass in `opts.tmplEngine` to change the render engine', function(t) {
  var render = plugin(join(FIXTURES_DIR, 'post.ejs'), {
    tmplEngine: 'ejs'
  });
  var config = {
    $dirs: {
      $tmplDir: '.'
    }
  };
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
  render(cb, files, 'blog', 'post', dataTypes, config);
});

test('pass in `opts.minify` to disable minification', function(t) {
  var render = plugin(join(FIXTURES_DIR, 'post.html'), {
    minify: false
  });
  var config = {
    $dirs: {
      $tmplDir: '.'
    }
  };
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
  render(cb, files, 'blog', 'post', dataTypes, config);
});

test('with globals', function(t) {
  t.test('single file', function(t) {
    var render = plugin(join(FIXTURES_DIR, 'globals-single.html'));
    var config = {
      $dirs: {
        $tmplDir: '.'
      }
    };
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
    render(cb, files, 'blog', 'post', dataTypes, config);
  });
  t.test('multiple files', function(t) {
    var render = plugin(join(FIXTURES_DIR, 'globals-multiple.html'));
    var config = {
      $dirs: {
        $tmplDir: '.'
      }
    };
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
    render(cb, files, 'blog', 'post', dataTypes, config);
  });
});
