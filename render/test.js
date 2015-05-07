'use strict';

var test = require('tape');
var plugin = require('..').render;

test('default to `ejs`', function(t) {
  var render = plugin(__dirname + '/fixtures/post.ejs');
  var files = [
    { x: 'foo' }
  ];
  var dataTypes = {
    blog: {
      post: files
    }
  };
  var cb = function(err, result) {
    t.false(err);
    t.equals(result[0].x, 'foo');
    t.equals(result[0].$content, 'foo\nfoo\n');
    t.looseEquals(result, result[0].$('blog', 'post').unwrap());
    t.end();
  };
  render(cb, files, 'blog', 'post', dataTypes);
});
