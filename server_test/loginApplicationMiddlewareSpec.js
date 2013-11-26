'use strict';

var passport = require('passport');
var util = require('../server/util');
var envPath = 'envPath';
var loginApplicationMiddleware = require('../server/loginApplicationMiddleware').loginApplicationMiddleware(envPath);

describe('loginApplicationMiddleware', function(){

  it('should pass to next middleware when path is not equal to /login or /login/ ', function(){
    var request = {
      path: 'path'
    };
    var next = jasmine.createSpy('next');
    spyOn(util, 'isPathEqualTo').andReturn(false);

    loginApplicationMiddleware(request, null, next);

    expect(util.isPathEqualTo).toHaveBeenCalledWith(request, ['/login', '/login/']);
    expect(next).toHaveBeenCalled();
  });

  it('should pass to next middleware when path is equal to /login or /login/ and method is not GET or POST', function(){
    var request = {
      path: 'path',
      method: 'PUT'
    };
    var next = jasmine.createSpy('next');
    spyOn(util, 'isPathEqualTo').andReturn(true);

    loginApplicationMiddleware(request, null, next);

    expect(util.isPathEqualTo).toHaveBeenCalledWith(request, ['/login', '/login/']);
    expect(next).toHaveBeenCalled();
  });

  it('should return html when path is equal to /login or /login/ and method is GET', function(){
    var request = {
      path: 'path',
      method: 'GET'
    };
    var response = {};
    var next = jasmine.createSpy('next');
    spyOn(util, 'isPathEqualTo').andReturn(true);
    spyOn(util, 'returnFile');

    loginApplicationMiddleware(request, response, next);

    expect(util.isPathEqualTo).toHaveBeenCalledWith(request, ['/login', '/login/']);
    expect(util.returnFile).toHaveBeenCalledWith(response, jasmine.any(String), 'login.html');
    expect(next).not.toHaveBeenCalled();
  });

  it('should authenticate user when path is equal to /login or /login/ and method is POST', function(){
    var request = {
      path: 'path',
      method: 'POST'
    };
    var response = {};
    var next = jasmine.createSpy('next');
    var authenticateMiddleware = jasmine.createSpy('authenticateMiddleware');
    spyOn(passport, 'authenticate').andReturn(authenticateMiddleware);
    spyOn(util, 'isPathEqualTo').andReturn(true);
    spyOn(util, 'returnFile');

    loginApplicationMiddleware(request, response, next);

    expect(util.isPathEqualTo).toHaveBeenCalledWith(request, ['/login', '/login/']);
    expect(passport.authenticate).toHaveBeenCalledWith('local', {
      successRedirect: '/app',
      failureRedirect: '/login'
    });
    expect(authenticateMiddleware).toHaveBeenCalledWith(request, response, next);
    expect(next).not.toHaveBeenCalled();
  });

});