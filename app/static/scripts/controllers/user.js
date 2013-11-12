'use strict';

angular.module('jsLinkedinConnectorApp')
  .controller('UserCtrl', ['$scope', 'OAuthService', function($scope, oauth) {
    $scope.name = '';
    $scope.headline = '';
    oauth.getMyProfile(function(json) {
      $scope.$apply(function() {
        $scope.name = json.firstName;
        $scope.headline = json.headline;
      });
    });
    $scope.connections = [];
    oauth.getMyConnections(function(json) {
      window.console.log(json);
      $scope.$apply(function() {
        $scope.connections = json;
      });
    });
  }]);

