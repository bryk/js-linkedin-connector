'use strict';

angular.module('jsLinkedinConnectorApp')
  .controller('LoginCtrl', ['$scope', '$location', 'UserService', function($scope, $location, userService) {
      $scope.doLogin = function() {
        // TODO(bryk): Implement this.
        $scope.password = '';
        userService.rights = ['user'];
        $location.path('/user');
      };
    }]);

