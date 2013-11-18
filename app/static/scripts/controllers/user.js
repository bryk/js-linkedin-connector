'use strict';

angular.module('jsLinkedinConnectorApp')
.controller('UserCtrl', ['$scope', 'OAuthService', '$location', function($scope, oauth, $location) {
  $scope.location = $location;
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
    $scope.$apply(function() {
      $scope.connections = json;
    });
  });
}]);

