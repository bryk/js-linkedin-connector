'use strict';
var util = require('./util');

function isLoginPageRedirectRequired(request) {

  if (request.isAuthenticated() === false && util.isPathEqualTo(request, ['/login', '/login/']) === false) {
    return true;
  } else {
    return false;
  }
}

exports.loginRedirectMiddleware = function (request, response, next) {
  if (isLoginPageRedirectRequired(request)) {
    response.redirect('/login');
  } else {
    next();
  }
};
