'use strict';

var plugin = require('..').parseMarkdown;
var test = require('tape');

var files = [
  { $content: '# Foo\n' },
  { $content: '# Bar\n' },
  { $content: '# Baz\n' }
];

test('default', function(t) {
  var parseMarkdown = plugin();
  var cb = function(err, result) {
    t.false(err);
    t.looseEqual(result, [
      { $content: '<h1>Foo</h1>\n' },
      { $content: '<h1>Bar</h1>\n' },
      { $content: '<h1>Baz</h1>\n' }
    ]);
    t.end();
  };
  parseMarkdown(cb, files);
});
