'use strict';
var path = require('path');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var util = require('./util');
var userDatasource = require('./userDatasource');


passport.use(new LocalStrategy({
    usernameField: 'login',
    passwordField: 'password'
  },
  function (login, password, done) {
    var user = userDatasource.authenticateUser(login, password);

    if (!user) {
      return done(null, false);
    } else {
      return done(null, user);
    }
  }
));

passport.serializeUser(function (user, done) {
  done(null, user.login);
});

passport.deserializeUser(function (login, done) {
  done(null, userDatasource.findUser(login));
});

exports.loginApplicationMiddleware = function (envPath) {
  var resolvedPath = path.resolve(envPath);
  var authenticationMiddleware;

  function routeMiddleware(request, response, next) {

    if (util.isPathEqualTo(request, ['/login', '/login/'])) {
      switch (request.method) {
      case 'GET':
        util.returnFile(response, resolvedPath, 'login.html');
        break;
      case 'POST':
        authenticationMiddleware =  passport.authenticate('local', {
          successRedirect: '/app',
          failureRedirect: '/login'
        });
        authenticationMiddleware(request, response, next);
        break;
      default:
        next();
      }
    } else {
      next();
    }
  }

  return routeMiddleware;
};



