'use strict';

var rampage = require('rampage');

var paginate = function(numPerPage, opts) {
  opts = opts || {};
  opts.preProcess = opts.preProcess || function(files) {
    return {
      $content: files
    };
  };
  opts.postProcess = opts.postProcess || function(currPage, prevPage,
      nextPage, pageNum, totalPages) {
    currPage.$page = pageNum + 1;
    currPage.$totalPages = totalPages;
    currPage.$previous = prevPage || null;
    currPage.$next = nextPage || null;
    return currPage;
  };
  if (numPerPage == null) {
    numPerPage = 1;
    opts.preProcess = function(files) {
      return files[0];
    };
  }
  return function(cb, files) {
    cb(null, rampage(files, numPerPage, opts));
  };
};

module.exports = paginate;
