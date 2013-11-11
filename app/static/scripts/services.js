/* global IN:false */
/* jshint camelcase: false */
'use strict';

angular.module('jsLinkedinConnectorApp').factory('OAuthService', [function() {
  var oauthService = {
    scriptLoaded: false,
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
      IN.User.authorize(function() {
        this.loggedIn = true;
        callback();
      }, this);
    },
    getApi: function() {
      return IN.API;
    },
    getMyProfile: function(callback) {
      this.getApi().Profile('me').result(function(result) {
        callback(result.values[0]);
      });
    },
    onLoad: function(callback) {
      if (this.scriptLoaded) {
        window.setTimeout(callback, 0);
      } else {
        this.loadCallback = callback;
      }
    }
  };
  var callbackName = 'onLinkedInLoad';
  IN.init({
    onLoad: callbackName,
    api_key: '5tmpoi0a2ucp',
    authorize: false
  });
  window[callbackName] = function() {
    console.log('LinkedIn script loaded');
    oauthService.scriptLoaded = true;
    IN.Event.on(IN, 'auth', function() {
      window.console.log('Authorized to LinkedIn for the first time');
    });
    if (oauthService.loadCallback) {
      oauthService.loadCallback();
    }
  };
  return oauthService;
}]);

