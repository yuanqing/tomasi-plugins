'use strict';

var test = require('tape');
var plugin = require('..').parseFrontmatter;

test('defaults to parsing `$content`', function(t) {
  var parseFrontmatter = plugin();
  var cb = function(err, result) {
    t.false(err);
    t.looseEqual(result, [
      { title: 'foo', $content: 'x' },
      { title: 'bar', $content: 'y' },
      { title: 'baz', $content: 'z' },
    ]);
    t.end();
  };
  var files = [
    { $content: '---\ntitle: foo\n---\nx' },
    { $content: '---\ntitle: bar\n---\ny' },
    { $content: '---\ntitle: baz\n---\nz' },
  ];
  parseFrontmatter(cb, files);
});

test('parse a custom field', function(t) {
  var parseFrontmatter = plugin('body');
  var cb = function(err, result) {
    t.false(err);
    t.looseEqual(result, [
      { title: 'foo', body: 'x' },
      { title: 'bar', body: 'y' },
      { title: 'baz', body: 'z' },
    ]);
    t.end();
  };
  var files = [
    { body: '---\ntitle: foo\n---\nx' },
    { body: '---\ntitle: bar\n---\ny' },
    { body: '---\ntitle: baz\n---\nz' },
  ];
  parseFrontmatter(cb, files);
});
