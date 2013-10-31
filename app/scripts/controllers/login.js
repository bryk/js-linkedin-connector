'use strict';

angular.module('jsLinkedinConnectorApp')
  .controller('LoginCtrl', ['$scope', function($scope) {
      $scope.doLogin = function() {
        console.log($scope.login, $scope.password);
        $scope.login = '';
        $scope.password = '';
      };
    }]);

