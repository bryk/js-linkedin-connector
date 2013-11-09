'use strict';
var path = require('path');
var fs = require('fs');
var url = require('url');
var underscore = require('underscore');

exports.redirectTo = function (response, page) {
  response.statusCode = 302;
  response.setHeader('Location', page);
  response.end();
};

exports.returnFile = function(response, basePath, fileName) {
  fs.readFile(basePath + path.sep + fileName, function (err, html) {
    if (err) {
      throw err;
    }
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/html');
    response.write(html);
    response.end();
  });
};

exports.isPathEqualTo = function(request, paths){
  var parsedUrl = url.parse(request.url);
  var result = false;

  underscore.some(paths, function(path){
    if(parsedUrl.pathname ===  path){
      result = true;
      return true;
    }
  });

  return result;
};