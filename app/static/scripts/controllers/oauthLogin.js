'use strict';

angular.module('jsLinkedinConnectorApp')
  .controller('OauthCtrl', ['$scope', 'OAuthService', '$location', function($scope, oauthService, $location) {
    oauthService.loggedIn = false;
    $scope.doLogin = function() {
      oauthService.login(function() {
        $location.path('/user');
      });
    };
  }]);

