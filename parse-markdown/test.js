'use strict';

var test = require('tape');
var plugin = require('..').parseMarkdown;

test('parse the `$content` field if no `keys` specified', function(t) {
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
  var parseMarkdown = plugin('x');
  var cb = function(err, result) {
    t.false(err);
    t.looseEqual(result, [
      { x: '<h1>foo</h1>\n' },
    ]);
    t.end();
  };
  var files = [
    { x: '# foo' }
  ];
  parseMarkdown(cb, files);
});

test('parse multiple fields', function(t) {
  var parseMarkdown = plugin(['x', 'y']);
  var cb = function(err, result) {
    t.false(err);
    t.looseEqual(result, [
      {
        x: '<h1>foo</h1>\n',
        y: '<h1>bar</h1>\n'
      },
    ]);
    t.end();
  };
  var files = [
    {
      x: '# foo',
      y: '# bar'
    }
  ];
  parseMarkdown(cb, files);
});
