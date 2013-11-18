'use strict';

angular.module('jsLinkedinConnectorApp').directive('menubar', ['$location', function(location) {
  return {
    restrict: 'A',
    templateUrl: 'views/menu.html',
    replace: true,
    link: function($scope) {
      $scope.menuClick = function(path) {
        location.path(path);
      };
    }
  };
}]);

