'use strict';

describe('Controller: LoginCtrl', function () {

  // load the controller's module
  beforeEach(module('jsLinkedinConnectorLoginApp'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('LoginCtrl', {
      $scope: scope
    });
  }));

  it('should do something', function () {
    // TODO(bryk): Write tests.
  });
});
