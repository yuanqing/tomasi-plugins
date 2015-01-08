'use strict';

var test = require('tape');
var plugin = require('..').link;

var files = [
  { slug: 'foo', year: 2015, month: 1, day: 1 },
  { slug: 'bar', year: 2015, month: 1, day: 2 },
  { slug: 'baz', year: 2015, month: 1, day: 3 }
];

test('link without `opts`', function(t) {
  var link = plugin('{year}/{month: %02d}/{day: %02d}/{slug}/');
  var cb = function(err, result) {
    t.false(err);
    t.looseEqual(result, [
      { slug: 'foo', year: 2015, month: 1, day: 1, $link: '2015/01/01/foo/', $outPath: 'out/2015/01/01/foo/index.html' },
      { slug: 'bar', year: 2015, month: 1, day: 2, $link: '2015/01/02/bar/', $outPath: 'out/2015/01/02/bar/index.html' },
      { slug: 'baz', year: 2015, month: 1, day: 3, $link: '2015/01/03/baz/', $outPath: 'out/2015/01/03/baz/index.html' }
    ]);
    t.end();
  };
  link(cb, files);
});

test('link with `opts`', function(t) {
  var link = plugin('{year}/{month: %02d}/{day: %02d}/{slug}.html', {
    linkPrefix: 'http://yuanqing.sg',
    outDir: './build'
  });
  var cb = function(err, result) {
    t.false(err);
    t.looseEqual(result, [
      { slug: 'foo', year: 2015, month: 1, day: 1, $link: 'http://yuanqing.sg/2015/01/01/foo.html', $outPath: 'build/2015/01/01/foo.html' },
      { slug: 'bar', year: 2015, month: 1, day: 2, $link: 'http://yuanqing.sg/2015/01/02/bar.html', $outPath: 'build/2015/01/02/bar.html' },
      { slug: 'baz', year: 2015, month: 1, day: 3, $link: 'http://yuanqing.sg/2015/01/03/baz.html', $outPath: 'build/2015/01/03/baz.html' }
    ]);
    t.end();
  };
  link(cb, files);
});
