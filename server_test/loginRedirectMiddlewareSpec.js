'use strict';
var loginRedirectMiddleware = require('../server/loginRedirectMiddleware').loginRedirectMiddleware;
var util = require('../server/util');

describe('loginRedirectMiddleware', function(){

  it('should redirect when request is not authenticated and path is not /login or /login/', function(){
    var request = {
      isAuthenticated : jasmine.createSpy('request.isAuthenticated').andReturn(false)
    };
    var response = {
      redirect: jasmine.createSpy('redirect.redirect')
    };
    var next = jasmine.createSpy('next');
    spyOn(util, 'isPathEqualTo').andReturn(false);

    loginRedirectMiddleware(request, response, next);

    expect(response.redirect).toHaveBeenCalled();
  });

  it('should not redirect when request is not authenticated and path is /login or /login/', function(){
    var request = {
      isAuthenticated : jasmine.createSpy('request.isAuthenticated').andReturn(false)
    };
    var response = {
      redirect: jasmine.createSpy('redirect.redirect')
    };
    var next = jasmine.createSpy('next');
    spyOn(util, 'isPathEqualTo').andReturn(true);

    loginRedirectMiddleware(request, response, next);

    expect(next).toHaveBeenCalled();
  });

  it('should not redirect when request is authenticated', function(){
    var request = {
      isAuthenticated : jasmine.createSpy('request.isAuthenticated').andReturn(true)
    };
    var next = jasmine.createSpy('next');

    loginRedirectMiddleware(request, null, next);

    expect(next).toHaveBeenCalled();
  });
});