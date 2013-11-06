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
      .otherwise({
        redirectTo: '/user'
      });
    $locationProvider.hashPrefix('!');
    $locationProvider.html5Mode(false);
  }]);

