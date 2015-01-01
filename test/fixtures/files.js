module.exports = [
  { $inPath: 'in/1-foo.txt', $content: 'foo', tags: ['foo', 'bar'] },
  { $inPath: 'in/2-bar.txt', $content: 'bar', tags: ['baz'] },
  { $inPath: 'in/3-baz.txt', $content: 'baz', tags: 'bar' }
];
