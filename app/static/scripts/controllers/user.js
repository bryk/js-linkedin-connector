'use strict';

angular.module('jsLinkedinConnectorApp')
.controller('UserCtrl', ['$rootScope', '$scope', 'OAuthService', function($rootScope, $scope, oauth) {
  oauth.getMyConnections(function(json) {
    $rootScope.$apply(function() {
      $rootScope.connections = json;
    });
  });
}]);

