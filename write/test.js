'use strict';

var test = require('tape');
var plugin = require('..').write;
var fs = require('fs-extra');

var outDir = __dirname + '/out/';

test('write', function(t) {
  var write = plugin();
  var files = [
    { $outPath: outDir + 'foo.html', $content: 'foo' }
  ];
  var cb = function(err) {
    t.false(err);
    t.equals(fs.readFileSync(outDir + 'foo.html', 'utf8'), 'foo');
    fs.deleteSync(outDir);
    t.end();
  };
  fs.ensureDirSync(outDir);
  write(cb, files);
});
