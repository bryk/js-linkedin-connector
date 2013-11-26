'use strict';
var redirectAugmentMiddleware = require('../server/redirectAugmentMiddleware').redirectAugmentMiddleware;

describe('redirectAugmentMiddleware', function(){

  it('should add redirect function to response object and pass to next middleware', function(){
    var response = {};
    var next = jasmine.createSpy('next');

    redirectAugmentMiddleware(null, response, next);

    expect(typeof response.redirect).toBe('function');
    expect(next).toHaveBeenCalled();
  });


});