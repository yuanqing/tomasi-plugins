'use strict';

var test = require('tape');
var plugin = require('..').parseMarkdown;

test('defaults to parsing `$content`', function(t) {
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
  var files = [
    { $content: '# Foo' },
    { $content: '# Bar' },
    { $content: '# Baz' }
  ];
  parseMarkdown(cb, files);
});

test('parse a custom field', function(t) {
  var parseMarkdown = plugin('body');
  var cb = function(err, result) {
    t.false(err);
    t.looseEqual(result, [
      { body: '<h1>Foo</h1>\n' },
      { body: '<h1>Bar</h1>\n' },
      { body: '<h1>Baz</h1>\n' }
    ]);
    t.end();
  };
  var files = [
    { body: '# Foo' },
    { body: '# Bar' },
    { body: '# Baz' }
  ];
  parseMarkdown(cb, files);
});
