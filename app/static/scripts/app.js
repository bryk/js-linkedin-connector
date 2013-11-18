'use strict';

angular.module('jsLinkedinConnectorApp', ['ngRoute'])
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
      .when('/admin', {
        templateUrl: '/app/views/admin.html',
        controller: 'AdminCtrl',
        access: 'admin'
      })
      .otherwise({
        redirectTo: '/oauth'
      });
    $locationProvider.hashPrefix('!');
    $locationProvider.html5Mode(false);
  }]).run(['$rootScope', '$location', 'OAuthService', function ($rootScope, $location, oauthService) {
    $rootScope.$on('$routeChangeStart', function (event, next, prev) {
      if (next.$$route && !oauthService.canAccess(next)) {
        event.preventDefault();
        if (prev && prev.$$route && oauthService.canAccess(prev)) {
          $location.path(prev.$$route.originalPath);
        } else {
          $location.path('/oauth');
        }
      }
    });
  }]);

