'use strict';

var test = require('tape');
var plugin = require('..').render;

var fixturesDir = __dirname + '/fixtures/';

var files = [
  { title: 'foo' },
  { title: 'bar' },
  { title: 'baz' }
];
var dataTypes = {
  blog: {
    post: files
  }
};

test('render', function(t) {
  var render = plugin(fixturesDir + 'post.ejs');
  var cb = function(err, result) {
    t.false(err);
    t.looseEquals(result, [
      { title: 'foo', $content: 'foo\nfoo\nbar\n' },
      { title: 'bar', $content: 'bar\nfoo\nbar\n' },
      { title: 'baz', $content: 'baz\nfoo\nbar\n' }
    ]);
    t.end();
  };
  render(cb, files, 'blog', 'post', dataTypes);
});
