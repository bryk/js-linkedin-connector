'use strict';

angular.module('jsLinkedinConnectorApp')
  .controller('OauthCtrl', ['$scope', 'OAuthService', function($scope, OAuthService) {
      $scope.doLogin = function() {
        OAuthService.login(function(error) {
          window.console.log(error);
          OAuthService.get('people/~', function() {
            window.console.log('success');
          }, function() {
            window.console.log('error');
          });
        });
      };
    }]);

