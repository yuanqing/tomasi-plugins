'use strict';

var test = require('tape');
var plugin = require('..').link;

var files = [
  {
    x: 'foo',
    y: 'bar'
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
      }
    ]);
    t.end();
  };
  link(cb, files, null, null, null, config);
});

test('with `opts`', function(t) {
  var link = plugin('{x}/{y}', {
    linkPrefix: 'http://yuanqing.sg/',
    outFile: 'index.txt'
  });
  var cb = function(err, result) {
    t.false(err);
    t.looseEqual(result, [
      {
        x: 'foo',
        y: 'bar',
        $link: 'http://yuanqing.sg/foo/bar',
        $outPath: 'out/foo/bar/index.txt'
      }
    ]);
    t.end();
  };
  link(cb, files, null, null, null, config);
});
