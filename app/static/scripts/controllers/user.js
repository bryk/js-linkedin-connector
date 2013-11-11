'use strict';

angular.module('jsLinkedinConnectorApp')
  .controller('UserCtrl', ['$scope', 'OAuthService', function($scope, oauth) {
      $scope.name = 'Unknown';
      oauth.getMyProfile(function(json) {
        $scope.$apply(function() {
          $scope.name = json.headline;
        });
      });
    }]);

