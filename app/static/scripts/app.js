'use strict';

angular.module('jsLinkedinConnectorApp', ['ngRoute'])
  .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/user', {
        templateUrl: 'views/user.html',
        controller: 'UserCtrl',
        access: 'user'
      })
      .when('/oauth', {
        templateUrl: 'views/oauth.html',
        controller: 'OauthCtrl'
      })
      .when('/admin', {
        templateUrl: 'views/admin.html',
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
      oauthService.checkPrivileges(next, prev, $rootScope, $location);
    });
  }]);

