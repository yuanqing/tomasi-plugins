'use strict';

var test = require('tape');
var plugin = require('..').link;

var files = [
  {
    x: 'foo',
    y: 'bar'
  },
  {
    x: 'baz',
    y: 'qux'
  }
];

var config = {
  $dirs: {
    $outDir: 'out'
  }
};

test('without `opts`', function(t) {
  var link = plugin('{x}/{y}');
  var cb = function(err, result) {
    t.false(err);
    t.looseEqual(result, [
      {
        x: 'foo',
        y: 'bar',
        $link: 'foo/bar',
        $outPath: 'out/foo/bar/index.html'
      },
      {
        x: 'baz',
        y: 'qux',
        $link: 'baz/qux',
        $outPath: 'out/baz/qux/index.html'
      }
    ]);
    t.end();
  };
  link(cb, files, null, null, null, config);
});

test('with `opts`', function(t) {
  var link = plugin('{x}/{y}', {
    firstPattern: '{x}/{y}/first',
    linkPrefix: 'http://yuanqing.sg/',
    outFile: 'post.html'
  });
  var cb = function(err, result) {
    t.false(err);
    t.looseEqual(result, [
      {
        x: 'foo',
        y: 'bar',
        $link: 'http://yuanqing.sg/foo/bar/first',
        $outPath: 'out/foo/bar/first/post.html'
      },
      {
        x: 'baz',
        y: 'qux',
        $link: 'http://yuanqing.sg/baz/qux',
        $outPath: 'out/baz/qux/post.html'
      }
    ]);
    t.end();
  };
  link(cb, files, null, null, null, config);
});
