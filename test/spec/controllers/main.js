'use strict';

describe('OAuthService', function () {
  beforeEach(module('jsLinkedinConnectorApp'));

  var oauth;

  // Initialize the controller and a mock scope
  beforeEach(inject(['OAuthService', function (oauthService) {
    oauth = oauthService;
  }]));

  it('should not load script automatically', function () {
    expect(oauth.scriptLoaded).toEqual(false);
  });

  it('should start with no privileges', function () {
    expect(oauth.privileges).toEqual([]);
  });

  it('should grant access to valid route', function () {
    var route = {$$route: {access: 'admin'}};
    oauth.privileges = ['admin'];
    expect(oauth.canAccess(route)).toEqual(true);
  });

  it('should deny access in case of empty privileges', function () {
    var route = {$$route: {access: 'admin'}};
    expect(oauth.canAccess(route)).toEqual(false);
  });

  it('should allow access in case of empty access', function () {
    var route = {$$route: {}};
    expect(oauth.canAccess(route)).toEqual(true);
  });
});

