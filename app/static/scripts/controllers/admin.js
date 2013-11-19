'use strict';

angular.module('jsLinkedinConnectorApp')
.controller('AdminCtrl', ['$rootScope', '$scope', 'OAuthService', function($rootScope, $scope, oauth) {
  if (!$rootScope.name) {
    $rootScope.name = '';
  }
  if (!$rootScope.headline) {
    $rootScope.headline = '';
  }
  oauth.getMyProfile(function(json) {
    $rootScope.$apply(function() {
      $rootScope.name = json.firstName;
      $rootScope.headline = json.headline;
    });
  });
  $scope.$watch('search', function(search) {
    if (search) {
      oauth.searchPeople(search, function(json) {
        $scope.$apply(function() {
          $scope.searchResults = json.people.values;
        });
      });
    } else {
      $scope.searchResults = [];
    }
  });
}]);

