'use strict';

var categorise = require('./lib/categorise.js');

module.exports = {
  categorise: categorise,
  categorize: categorise,
  extractFields: require('./lib/extract-fields.js'),
  filter: require('./lib/filter.js'),
  link: require('./lib/link.js'),
  paginate: require('./lib/paginate.js'),
  parseFrontmatter: require('./lib/parse-frontmatter.js'),
  parseMarkdown: require('./lib/parse-markdown.js'),
  render: require('./lib/render.js'),
  set: require('./lib/set.js'),
  write: require('./lib/write.js')
};
