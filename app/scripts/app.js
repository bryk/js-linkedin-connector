'use strict';

angular.module('jsLinkedinConnectorApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize'
])
  .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/user', {
        templateUrl: 'views/user.html',
        controller: 'UserCtrl',
        access: 'user'
      })
      .otherwise({
        redirectTo: '/login'
      });
    $locationProvider.html5Mode(false);
  }]).run(['$rootScope', '$location', 'UserService', function ($rootScope, $location, userService) {
    $rootScope.$on('$routeChangeStart', function (event, next) {
        if (next.$$route && !userService.canAccess(next)) {
          $location.path('/login');
        }
      });
  }]);

