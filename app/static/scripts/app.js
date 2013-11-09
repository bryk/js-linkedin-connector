'use strict';

angular.module('jsLinkedinConnectorApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize'
])
  .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/user', {
        templateUrl: 'app/views/user.html',
        controller: 'UserCtrl',
        access: 'user'
      })
      .when('/oauth', {
        templateUrl: 'app/views/oauth.html',
        controller: 'OauthCtrl'
      })
      .otherwise({
        redirectTo: '/oauth'
      });
    $locationProvider.hashPrefix('!');
    $locationProvider.html5Mode(false);
  }]);

