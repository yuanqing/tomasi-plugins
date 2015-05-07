'use strict';

var test = require('tape');
var plugin = require('..').parseFrontmatter;

test('parse the `$content` field if no `keys` specified', function(t) {
  var parseFrontmatter = plugin();
  var cb = function(err, result) {
    t.false(err);
    t.looseEqual(result, [
      {
        a: 'foo',
        $content: 'bar'
      }
    ]);
    t.end();
  };
  var files = [
    { $content: '---\na: foo\n---\nbar' }
  ];
  parseFrontmatter(cb, files);
});

test('parse a single field', function(t) {
  var parseFrontmatter = plugin('x');
  var cb = function(err, result) {
    t.false(err);
    t.looseEqual(result, [
      {
        a: 'foo',
        x: 'bar'
      }
    ]);
    t.end();
  };
  var files = [
    { x: '---\na: foo\n---\nbar' }
  ];
  parseFrontmatter(cb, files);
});

test('parse multiple fields', function(t) {
  var parseFrontmatter = plugin(['x', 'y']);
  var cb = function(err, result) {
    t.false(err);
    t.looseEqual(result, [
      {
        a: 'foo',
        b: 'bar',
        x: 'baz',
        y: 'qux'
      },
    ]);
    t.end();
  };
  var files = [
    {
      x: '---\na: foo\n---\nbaz',
      y: '---\nb: bar\n---\nqux'
    }
  ];
  parseFrontmatter(cb, files);
});
