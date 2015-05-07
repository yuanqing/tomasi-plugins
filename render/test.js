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
    t.equals(result[0].title, 'foo');
    t.equals(result[0].$content, 'foo\nfoo\n');
    t.equals(result[1].title, 'bar');
    t.equals(result[1].$content, 'bar\nfoo\n');
    t.equals(result[2].title, 'baz');
    t.equals(result[2].$content, 'baz\nfoo\n');
    t.looseEquals(result, result[0].$('blog', 'post').unwrap());
    t.end();
  };
  render(cb, files, 'blog', 'post', dataTypes);
});
