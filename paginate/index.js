'use strict';

var rampage = require('rampage');

var paginate = function(numPerPage, preProcess, postProcess) {
  if (numPerPage == null) {
    numPerPage = 1;
    preProcess = function(files) {
      return files[0];
    };
  }
  var opts = {
    preProcess: preProcess || function(files) {
      return {
        $content: files
      };
    },
    postProcess: postProcess || function(currPage, prevPage, nextPage, pageNum, totalPages) {
      currPage.page = pageNum + 1;
      currPage.totalPages = totalPages;
      currPage.previous = prevPage;
      currPage.next = nextPage;
      return currPage;
    }
  };
  return function(cb, files) {
    cb(null, rampage(files, numPerPage, opts));
  };
};

module.exports = paginate;
