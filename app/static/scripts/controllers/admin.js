'use strict';
/* global $:false */

angular.module('jsLinkedinConnectorApp')
.controller('AdminCtrl', ['$rootScope', '$scope', 'OAuthService', function($rootScope, $scope, oauth) {
  oauth.getMyProfile(function(json) {
    $rootScope.$apply(function() {
      $rootScope.name = json.firstName;
      $rootScope.headline = json.headline;
    });
  });
  $scope.doSearch = function() {
    var search = $scope.search;
    if (search) {
      oauth.searchPeople(search, function(json) {
        $scope.$apply(function() {
          var goodPeople = [];
          $(json.people.values).each(function(index, user) {
            var headers = user.apiStandardProfileRequest && user.apiStandardProfileRequest.headers.values || null;
            if (headers) {
              $(headers).each(function(index, header) {
                if (header.name === 'x-li-auth-token') {
                  var values = header.value.split(':');
                  user.authToken = {key: values[0], value: values[1]};
                  user.index = goodPeople.push(user) - 1;
                }
              });
            }
          });
          $scope.searchResults = goodPeople;
        });
      });
    } else {
      $scope.searchResults = [];
    }
  };

  $scope.doConnect = function(index) {
    window.console.log(index);
  };
}]);

