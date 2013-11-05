'use strict';

angular.module('jsLinkedinConnectorLoginApp', [])
  .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'login/views/login.html',
        controller: 'LoginCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
    $locationProvider.hashPrefix('!');
    $locationProvider.html5Mode(false);
  }]);

