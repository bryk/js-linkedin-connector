/* global OAuth:false */
'use strict';

angular.module('jsLinkedinConnectorApp').factory('OAuthService', ['$http', function($http) {
  OAuth.initialize('rpVQPjKxrhZrn34AlKn-E0jolZg');
  return {
    loggedIn: false,
    accessToken: null,
    login: function(callback) {
      OAuth.popup('linkedin', angular.bind(this, function(error, result) {
        /* jshint camelcase: false */
        window.console.log('Got log in response, error:', error, ' result:', result);
        if (!error) {
          this.loggedIn = true;
          this.accessToken = result.oauth_token;
        }
        callback(error);
      }));
    },
    get: function(url, success, error) {
      $http({url:'http://api.linkedin.com/v1/' + url + '?oauth2_access_token=' + this.accessToken, method: 'GET'})
        .success(success).error(error);
    }
  };
}]);
