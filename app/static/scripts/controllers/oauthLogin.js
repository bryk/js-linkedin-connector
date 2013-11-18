'use strict';

angular.module('jsLinkedinConnectorApp')
.controller('OauthCtrl', ['$scope', 'OAuthService', '$location', function($scope, oauthService, $location) {
  oauthService.logout();
  $scope.doLoginAsUser = function() {
    oauthService.loginAsUser(function() {
      $scope.$apply(function() {
        $location.path('/user');
      });
    });
  };

  $scope.doLoginAsAdmin = function() {
    oauthService.loginAsAdmin(function() {
      $scope.$apply(function() {
        $location.path('/user');
      });
    });
  };
}]);

