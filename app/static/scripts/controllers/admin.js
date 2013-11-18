'use strict';

angular.module('jsLinkedinConnectorApp')
  .controller('AdminCtrl', ['$scope', 'OAuthService', function($scope, oauth) {
    $scope.name = '';
    $scope.headline = '';
    oauth.getMyProfile(function(json) {
      $scope.$apply(function() {
        $scope.name = json.firstName;
        $scope.headline = json.headline;
      });
    });
  }]);

