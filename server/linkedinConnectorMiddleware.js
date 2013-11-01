'use strict';
var passport = require('passport');
var LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
var config = require('./config.json');

passport.use(new LinkedInStrategy({
    clientID: config.apiKey,
    clientSecret: config.secretKey,
    callbackURL: 'http://localhost:9000/authorize/linkedin'
  },
  function (accessToken, refreshToken, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {
      return done(null, profile);
    });
  }
));

exports.linkedinConnectorMiddleware = function (request, response, next) {
  if (request.url !== '/authorize/linkedin') {
    next();
  }

  var authenticateMiddleware;
  if (request.method === 'POST') {
    authenticateMiddleware = passport.authenticate('linkedin', { scope: ['r_basicprofile'], state: 'SOME STATE'});
  } else {
    authenticateMiddleware = passport.authenticate('linkedin', {
      successRedirect: '/',
      failureRedirect: '/login'
    });
  }
  authenticateMiddleware(request, response, next);
};