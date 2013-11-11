'use strict';

angular.module('jsLinkedinConnectorApp')
  .controller('OauthCtrl', ['$scope', 'OAuthService', '$location', function($scope, oauthService, $location) {
    $scope.doLogin = function() {
      oauthService.login(function() {
        $location.path('/user');
      });
    };
  }]);

