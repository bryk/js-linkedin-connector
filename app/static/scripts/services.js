/* global IN:false */
/* jshint camelcase: false */
'use strict';

angular.module('jsLinkedinConnectorApp').factory('OAuthService', [function() {
  var oauthService = {
    privileges: [],
    canAccess: function(next) {
      var ret = !next.$$route || !next.$$route.access;
      if (next.$$route.access) {
        ret = this.privileges.indexOf(next.$$route.access) !== -1;
      }
      var url = next.$$route && next.$$route.templateUrl || null;
      if (ret) {
        window.console.log('Granted access to', url + ',', 'current privileges:', this.privileges);
      } else {
        window.console.log('Denied access to', url + ',', 'current privileges:', this.privileges);
      }
      return ret;
    },
    loginAsUser: function(callback) {
      this.loginInternal('r_basicprofile r_network', ['user'], callback);
    },
    loginAsAdmin: function(callback) {
      this.loginInternal('r_basicprofile r_network w_messages', ['user', 'admin'], callback);
    },
    getMyProfile: function(callback) {
      IN.API.Profile('me').result(function(result) {
        callback(result.values[0]);
      });
    },
    loadApiInternal: function(scope, callback) {
      var callbackName = 'onLinkedInLoad';
      IN.init({
        onLoad: callbackName,
        api_key: '5tmpoi0a2ucp',
        authorize: false,
        scope: scope
      });
      window[callbackName] = function() {
        console.log('LinkedIn script loaded');
        IN.Event.on(IN, 'auth', function() {
          window.console.log('Authorized to LinkedIn for the first time');
        });
        callback();
      };
    },
    loginInternal: function(scope, privileges, callback) {
      var self = this;
      this.loadApiInternal(scope, function() {
        IN.User.authorize(function() {
          self.privileges = privileges;
          callback();
        });
      });
    },
  };
  return oauthService;
}]);

