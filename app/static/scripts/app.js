'use strict';

angular.module('jsLinkedinConnectorApp', [])
  .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/user', {
        templateUrl: '/app/views/user.html',
        controller: 'UserCtrl',
        access: 'user'
      })
      .when('/oauth', {
        templateUrl: '/app/views/oauth.html',
        controller: 'OauthCtrl'
      })
      .otherwise({
        redirectTo: '/oauth'
      });
    $locationProvider.hashPrefix('!');
    $locationProvider.html5Mode(false);
  }]).run(['$rootScope', '$location', 'OAuthService', function ($rootScope, $location, oauthService) {
    $rootScope.$on('$routeChangeStart', function (event, next) {
      if (next.$$route && !oauthService.canAccess(next)) {
        $location.path('/oauth');
      }
    });
  }]);

