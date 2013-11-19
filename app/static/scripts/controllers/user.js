'use strict';

angular.module('jsLinkedinConnectorApp')
.controller('UserCtrl', ['$rootScope', '$scope', 'OAuthService', function($rootScope, $scope, oauth) {
  if (!$rootScope.name) {
    $rootScope.name = '';
  }
  if (!$rootScope.headline) {
    $rootScope.headline = '';
  }
  oauth.getMyProfile(function(json) {
    $rootScope.$apply(function() {
      $rootScope.name = json.firstName;
      $rootScope.headline = json.headline;
    });
  });
  if (!$rootScope.connections) {
    $rootScope.connections = [];
  }
  oauth.getMyConnections(function(json) {
    $rootScope.$apply(function() {
      $rootScope.connections = json;
    });
  });
}]);

