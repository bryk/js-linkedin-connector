/* global IN:false */
/* jshint camelcase: false */
'use strict';


angular.module('jsLinkedinConnectorApp').factory('OAuthService', ['$rootScope', function($rootScope) {
  var oauthService = {
    privileges: [],
    scriptLoaded: false,
    checkPrivileges: function(next, prev, $rootScope, $location) {
      var url = next.$$route && next.$$route.templateUrl || null;
      if (next.$$route && !oauthService.canAccess(next)) {
        $rootScope.lastError = 'Cannot access this page, because you need "' + next.$$route.access + '" privilege';
        window.console.log('Denied access to', url + ',', 'current privileges:', oauthService.privileges);
        if (prev && prev.$$route && oauthService.canAccess(prev)) {
          $location.path(prev.$$route.originalPath);
        } else {
          $location.path('/oauth');
        }
      } else {
        if ($rootScope.lastError) {
          $rootScope.authError = $rootScope.lastError;
          $rootScope.lastError = null;
        } else {
          $rootScope.authError = null;
        }
        window.console.log('Granted access to', url + ',', 'current privileges:', oauthService.privileges);
      }
    },
    canAccess: function(next) {
      var ret = !next.$$route || !next.$$route.access;
      if (next.$$route.access) {
        ret = this.privileges.indexOf(next.$$route.access) !== -1;
      }
      return ret;
    },
    invite: function() {
     
    },
    searchPeople: function(firstName, callback) {
      IN.API.PeopleSearch()
        .fields(['first-name', 'last-name', 'headline', 'picture-url', 'public-profile-url', 'id', 'api-standard-profile-request'])
        .params({'keywords': firstName})
        .result(callback);
    },
    logout: function() {
      this.privileges = [];
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
    getMyConnections: function(callback) {
      IN.API.Connections('me').result(function(json) {
        callback(json.values);
      });
    },
    loadApiInternal: function(scope, callback) {
      var callbackName = 'onLinkedInLoad';
      var config = {
        onLoad: callbackName,
        api_key: '5tmpoi0a2ucp',
        authorize: true
      };
      if (window.APP_DEBUG !== undefined) {
        config.scope = scope;
      }
      IN.init(config);

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
          $rootScope.$apply(function() {
            $rootScope.name = '';
            $rootScope.headline = '';
            oauthService.getMyProfile(function(json) {
              $rootScope.$apply(function() {
                $rootScope.name = json.firstName;
                $rootScope.headline = json.headline;
              });
            });
          });
          callback();
        });
      });
    },
  };
  return oauthService;
}]);

