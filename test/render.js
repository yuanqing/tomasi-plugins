'use strict';

var plugin = require('..').render;
var test = require('tape');

var inDir = __dirname + '/fixtures/';

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
  var render = plugin(inDir + 'post.ejs');
  var cb = function(err, result) {
    t.false(err);
    t.looseEquals(result, [
      { title: 'foo', $content: '<h1>foo</h1>\n<p>foo, bar</p>\n' },
      { title: 'bar', $content: '<h1>bar</h1>\n<p>foo, bar</p>\n' },
      { title: 'baz', $content: '<h1>baz</h1>\n<p>foo, bar</p>\n' }
    ]);
    t.end();
  };
  render(cb, files, 'blog', 'post', dataTypes);
});
