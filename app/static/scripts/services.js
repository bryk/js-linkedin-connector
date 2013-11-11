/* global IN:false */
/* jshint camelcase: false */
'use strict';

angular.module('jsLinkedinConnectorApp').factory('OAuthService', [function() {
  var oauthService = {
    loggedIn: false,
    isLoggedIn: function() {
      return this.loggedIn;
    },
    canAccess: function(next) {
      var ret = !next.$$route || !next.$$route.access || next.$$route.access && this.isLoggedIn();
      var url = next.$$route && next.$$route.templateUrl || null;
      if (ret) {
        window.console.log('Granted access to', url);
      } else {
        window.console.log('Denied access to', url);
      }
      return ret;
    },
    login: function(callback) {
      IN.User.authorize(callback, {});
    },
    getApi: function() {
      return IN.API;
    },
    getMyProfile: function(callback) {
      this.getApi().Profile('me').result(function(result) {
        callback(result.values[0]);
      });
    }
  };
  var callbackName = 'onLinkedInLoad';
  IN.init({
    onLoad: callbackName,
    api_key: '5tmpoi0a2ucp',
    authorize: true
  });
  window[callbackName] = function() {
    console.log('LinkedIn script loaded');
    IN.Event.on(IN, 'auth', function() {
      window.console.log('Authorized to LinkedIn');
      oauthService.loggedIn = true;
    });
  };
  return oauthService;
}]);

