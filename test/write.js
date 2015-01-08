'use strict';

var test = require('tape');

var plugin = require('..').write;
var fs = require('fs-extra');

var outDir = __dirname + '/out/';

var files = [
  { $outPath: outDir + 'foo.html', $content: 'foo' }
];

test('write', function(t) {
  var write = plugin();
  var cb = function(err) {
    t.false(err);
    t.equals(fs.readFileSync(outDir + 'foo.html', 'utf8'), 'foo');
    fs.deleteSync(outDir);
    t.end();
  };
  fs.ensureDirSync(outDir);
  write(cb, files);
});
