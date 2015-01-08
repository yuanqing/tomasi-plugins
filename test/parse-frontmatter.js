'use strict';

var plugin = require('..').parseFrontmatter;
var test = require('tape');

var files = [
  { $content: '---\ntitle: foo\n---\nbar' },
  { $content: '---\ntitle: baz\n---\nqux' },
];

test('default', function(t) {
  var parseFrontmatter = plugin();
  var cb = function(err, result) {
    t.false(err);
    t.looseEqual(result, [
      { $content: 'bar', title: 'foo' },
      { $content: 'qux', title: 'baz' }
    ]);
    t.end();
  };
  parseFrontmatter(cb, files);
});
