'use strict';
var passport = require('passport');
var config = require('./config.json');
var url = require('url');
var path = require('path');
var fs = require('fs');

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});


function redirectToLoginPage(response){
  response.statusCode = 302;
  response.setHeader('Location', '/login/');
  response.end();
}

function returnFile(response, basePath){
  fs.readFile(basePath + path.sep + 'login.html', function (err, html) {
    if (err) {
      throw err;
    }
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/html');
    response.write(html);
    response.end();
  });
}

function isLoginPageRedirectRequired(request){
  var parsedUrl = url.parse(request.url);

  if (parsedUrl.path !== '/login/'){
    return true;
  }else{
    return false;
  }
}

exports.loginAppHandler = function (envPath) {
  var resolvedPath = path.resolve(envPath);

  function routeMiddleware(request, response, next) {

    //TODO(adebski) if user is authenticated - pass to next handler

    if (isLoginPageRedirectRequired(request)){
      redirectToLoginPage(response);
    }else{
      if (request.method === 'GET' && request.path === '/login/'){
        returnFile(response, resolvedPath);
      }else{
        next();
      }
    }
  }

  return routeMiddleware;
};
