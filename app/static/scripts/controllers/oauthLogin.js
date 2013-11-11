'use strict';

angular.module('jsLinkedinConnectorApp')
  .controller('OauthCtrl', ['$scope', 'OAuthService', '$location', function($scope, oauthService, $location) {
    $scope.loaded = true;
    $scope.buttonLabel = 'Loading...';

    oauthService.loggedIn = false;
    oauthService.onLoad(function() {
      $scope.$apply(function() {
        $scope.loaded = false;
        $scope.buttonLabel = 'Sign in with LinkedIn';
      });
    });
    $scope.doLogin = function() {
      oauthService.login(function() {
        window.setTimeout(function() {
          $scope.$apply(function() {
            $location.path('/user');
          });
        }, 0);
      });
    };
  }]);

