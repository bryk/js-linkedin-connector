'use strict';

angular.module('jsLinkedinConnectorApp').factory('UserService', [function() {
    var session = {
      rights: [],

      canAccess: function(route) {
        var accessLevel = route.$$route.access;
        var ret = !accessLevel || (this.rights.indexOf(accessLevel) !== -1);
        if (!ret) {
          console.log('Denied access to', route.controller, 'to user with rights', this.rights);
        } else {
          console.log('Granted access to', route.controller, 'to user with rights', this.rights);
        }
        return ret;
      }
    };
    return session;
  }]);

