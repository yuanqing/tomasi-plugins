'use strict';

var rampage = require('rampage');

var paginate = function(numPerPage, preProcess, postProcess) {
  var opts = {
    preProcess: preProcess || function(files) {
      return {
        $content: files
      };
    },
    postProcess: postProcess || function(currPage, prevPage, nextPage, pageNum, totalPages) {
      currPage.page = pageNum + 1;
      currPage.prev = prevPage;
      currPage.next = nextPage;
      currPage.totalPages = totalPages;
      return currPage;
    }
  };
  return function(cb, files) {
    cb(null, rampage(files, numPerPage, opts));
  };
};

module.exports = paginate;
