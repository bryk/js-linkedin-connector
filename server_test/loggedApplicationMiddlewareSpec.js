'use strict';

var envPath = 'envPath';
var loggedApplicationMiddleware = require('../server/loggedApplicationMiddleware').loggedApplicationMiddleware(envPath);
var util = require('../server/util');

describe('loggedApplicationMiddleware', function(){

  it('should pass to next middleware when method is not GET', function(){
    var request = {
      method: 'POST'
    };
    var next = jasmine.createSpy('next');

    loggedApplicationMiddleware(request, null, next);

    expect(next).toHaveBeenCalled();
  });

  it('should pass to next middleware when method is GET and path is not equal to /app or /app/', function(){
    var request = {
      method: 'GET'
    };
    var next = jasmine.createSpy('next');
    spyOn(util, 'isPathEqualTo').andReturn(false);

    loggedApplicationMiddleware(request, null, next);

    expect(next).toHaveBeenCalled();
    expect(util.isPathEqualTo).toHaveBeenCalledWith(request, ['/app', '/app/']);
  });

  it('should return html when method is GET and route is one of /app or /app/', function(){
    var request = {
      method: 'GET'
    };
    var response = {
      setHeader: jasmine.createSpy('response.setHeader')
    };
    var next = jasmine.createSpy('next');
    spyOn(util, 'isPathEqualTo').andReturn(true);
    spyOn(util, 'returnFile');

    loggedApplicationMiddleware(request, response, next);

    expect(next).not.toHaveBeenCalled();
    expect(util.isPathEqualTo).toHaveBeenCalledWith(request, ['/app', '/app/']);
    expect(response.setHeader).toHaveBeenCalledWith('Access-Control-Allow-Origin', '*');
    expect(util.returnFile).toHaveBeenCalledWith(response, jasmine.any(String), 'app.html');
  });

});