'use strict';

var test = require('tape');
var plugin = require('..').parseMarkdown;

test('parses the `$content` field if no `keys` specified', function(t) {
  var parseMarkdown = plugin();
  var cb = function(err, result) {
    t.false(err);
    t.looseEqual(result, [
      { $content: '<h1>foo</h1>\n' }
    ]);
    t.end();
  };
  var files = [
    { $content: '# foo' }
  ];
  parseMarkdown(cb, files);
});

test('parse a single field', function(t) {
  var parseMarkdown = plugin('foo');
  var cb = function(err, result) {
    t.false(err);
    t.looseEqual(result, [
      { foo: '<h1>foo</h1>\n' },
    ]);
    t.end();
  };
  var files = [
    { foo: '# foo' }
  ];
  parseMarkdown(cb, files);
});

test('parse multiple fields', function(t) {
  var parseMarkdown = plugin(['foo', 'bar']);
  var cb = function(err, result) {
    t.false(err);
    t.looseEqual(result, [
      {
        foo: '<h1>foo</h1>\n',
        bar: '<h1>bar</h1>\n'
      },
    ]);
    t.end();
  };
  var files = [
    {
      foo: '# foo',
      bar: '# bar'
    }
  ];
  parseMarkdown(cb, files);
});
