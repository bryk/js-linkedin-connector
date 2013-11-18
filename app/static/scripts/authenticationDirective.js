'use strict';

angular.module('jsLinkedinConnectorApp').directive('authenticationError', ['OAuthService', function(oauth) {
  return {
    restrict: 'A',
    template: '<div ng-show="alertVisible" ng-if="authError" class="alert alert-danger alert-dismissable"><button type="button" class="close" ng-click="dismissAlert()" aria-hidden="true">&times;</button>{{authError}}</div>',
    replace: true,
    link: function(scope) {
      scope.authError = oauth.getAndClearLastError();
      scope.alertVisible = true;
      scope.dismissAlert = function() {
        scope.alertVisible = false;
      };
    }
  };
}]);

