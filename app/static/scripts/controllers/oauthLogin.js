'use strict';

angular.module('jsLinkedinConnectorApp')
.controller('OauthCtrl', ['$scope', 'OAuthService', '$location', '$timeout', function($scope, oauthService, $location, $timeout) {
  oauthService.logout();
  $scope.working = false;
  var unwork = function() {
    if ($scope.working) {
      $scope.working = false;
    }
  };
  $scope.doLoginAsUser = function() {
    $scope.working = true;
    $timeout(unwork, 3000);
    oauthService.loginAsUser(function() {
      $scope.$apply(function() {
        unwork();
        $location.path('/user');
      });
    });
  };

  $scope.doLoginAsAdmin = function() {
    $scope.working = true;
    $timeout(unwork, 3000);
    oauthService.loginAsAdmin(function() {
      $scope.$apply(function() {
        unwork();
        $location.path('/user');
      });
    });
  };
}]);

