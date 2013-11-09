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

function isAuthenticated(request){
  return false;
}

function redirectToLoginPage(response){
  response.statusCode = 302;
  response.setHeader('Location', '/login/');
  response.end();
}

function isLoginPageRedirectRequired(request){
  var parsedUrl = url.parse(request.url);

  if (isAuthenticated(request) === false && parsedUrl.path !== '/login/'){
    return true;
  }else{
    return false;
  }
}

exports.loginRedirectMiddleware = function(request, response, next){
  if (isLoginPageRedirectRequired(request)){
    redirectToLoginPage(response);
  }else{
    next();
  }
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

exports.loginAppHandler = function (envPath) {
  var resolvedPath = path.resolve(envPath);

  function routeMiddleware(request, response, next) {
    var parsedUrl = url.parse(request.url);

    if(parsedUrl.path === '/login/'){
      switch(request.method){
        case 'GET':
          returnFile(response, resolvedPath);
          break;
        case 'POST':
          //TODO(adebski) - handle login request
          break;
        default:
          next();
      }
    }else{
      next();
    }
  }

  return routeMiddleware;
};
