'use strict';
var util = require('../server/util');
var path = require('path');
var fs = require('fs');

describe('util module', function(){
  it('redirectTo should set statusCode and header for redirection', function(){
    var response = {
      setHeader: jasmine.createSpy('response.setHeader'),
      end: jasmine.createSpy('response.end')
    };
    var page = 'pageToRedirect';

    util.redirectTo(response, page);

    expect(response.statusCode).toBe(302);
    expect(response.setHeader).toHaveBeenCalledWith('Location', page);
    expect(response.end).toHaveBeenCalled();
  });

  it('returnFile should fetch file from file system, set header for html and write file content to response', function(){
    var basePath = 'basePath';
    var fileName = 'fileName';
    var htmlContent ='<html></html>';
    var response = {
      setHeader: jasmine.createSpy('response.setHeader'),
      write: jasmine.createSpy('response.write'),
      end: jasmine.createSpy('response.end')
    };
    spyOn(fs, 'readFile');

    util.returnFile(response, basePath, fileName);
    var pathPassed = fs.readFile.mostRecentCall.args[0];
    var callback = fs.readFile.mostRecentCall.args[1];

    expect(pathPassed).toBe(basePath + path.sep + fileName);
    callback(null, htmlContent);
    expect(response.statusCode).toBe(200);
    expect(response.setHeader).toHaveBeenCalledWith('Content-Type', 'text/html');
    expect(response.write).toHaveBeenCalledWith(htmlContent);
    expect(response.end).toHaveBeenCalled();
  });

  it('isPathEqualTo should return true when current path is equal to one of passed ones', function(){
    var url = 'http://localhost/login';
    var paths = ['aaa', 'bbb', '/login'];
    var  request = {
      url: url
    };

    expect(util.isPathEqualTo(request, paths)).toBe(true);
  });

  it('isPathEqualTo should return false when current path does not match any in passed ones', function(){
    var url = 'http://localhost/login';
    var paths = ['aaa', 'bbb', 'ccc'];
    var  request = {
      url: url
    };

    expect(util.isPathEqualTo(request, paths)).toBe(false);
  })
});