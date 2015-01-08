'use strict';

var plugin = require('..').link;
var test = require('tape');

var files = [
  { slug: 'foo', year: 2015, month: 1, day: 1 },
  { slug: 'bar', year: 2015, month: 1, day: 2 },
];

test('link with default `opts`', function(t) {
  var link = plugin('{ year }/{ month : %02d }/{ day : %02d }/{ slug }/');
  var cb = function(err, result) {
    t.false(err);
    t.looseEqual(result, [
      { slug: 'foo', year: 2015, month: 1, day: 1, $link: '2015/01/01/foo/', $outPath: 'out/2015/01/01/foo/index.html' },
      { slug: 'bar', year: 2015, month: 1, day: 2, $link: '2015/01/02/bar/', $outPath: 'out/2015/01/02/bar/index.html' },
    ]);
    t.end();
  };
  link(cb, files);
});

test('link with `opts`', function(t) {
  var link = plugin('{ year }/{ month : %02d }/{ day : %02d }/{ slug }/', {
    linkPrefix: 'http://yuanqing.sg',
    outDir: './build/',
    outFile: 'index.htm',
  });
  var cb = function(err, result) {
    t.false(err);
    t.looseEqual(result, [
      { slug: 'foo', year: 2015, month: 1, day: 1, $link: 'http://yuanqing.sg/2015/01/01/foo/', $outPath: 'build/2015/01/01/foo/index.htm' },
      { slug: 'bar', year: 2015, month: 1, day: 2, $link: 'http://yuanqing.sg/2015/01/02/bar/', $outPath: 'build/2015/01/02/bar/index.htm' },
    ]);
    t.end();
  };
  link(cb, files);
});
