'use strict';

angular.module('jsLinkedinConnectorApp').directive('authenticationError', [function() {
  return {
    restrict: 'A',
    template: '<div ng-show="alertVisible" ng-if="authError" class="alert alert-danger alert-dismissable"><button type="button" class="close" ng-click="dismissAlert()" aria-hidden="true">&times;</button><p>{{authError}}</p></div>',
    replace: true,
    link: function(scope) {
      scope.alertVisible = true;
      scope.dismissAlert = function() {
        scope.alertVisible = false;
      };
    }
  };
}]);

