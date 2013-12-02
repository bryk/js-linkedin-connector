'use strict';

//var connect = require('connect');
var underscore = require('underscore');
var path = require('path');
var redirectAugumentMiddleware = require('./server/redirectAugmentMiddleware').redirectAugmentMiddleware;
var loginRedirectMiddleware = require('./server/loginRedirectMiddleware').loginRedirectMiddleware;
var loginApplicationMiddleware = require('./server/loginApplicationMiddleware').loginApplicationMiddleware;
var loggedApplicationMiddleware = require('./server/loggedApplicationMiddleware').loggedApplicationMiddleware;
var passport = require('passport');
var serverConfig = {
  app: require('./bower.json').appPath || 'app',
  dist: 'dist',
  server: 'server',
  serverTest: 'server_test'
};
serverConfig.appStatic = serverConfig.app + path.sep + 'static';
serverConfig.distStatic = serverConfig.dist + path.sep + 'static';


var mountFolder = function (connect, dir) {
  return connect.static(path.resolve(dir));
};

function createCommonMiddlewares(connect) {
  return [
    connect.logger(),
    connect.bodyParser(),
    connect.cookieParser(),
    connect.query(),
    connect.session({secret: 'secret'}),
    passport.initialize(),
    passport.session(),
    redirectAugumentMiddleware
  ];
}

function getMiddlewares (connect, staticFolders, applicationDirectory){
  var result = createCommonMiddlewares(connect);

  underscore.each(staticFolders, function (staticFolder) {
    result.push(mountFolder(connect, staticFolder));
  });

  result = result.concat([
    loginRedirectMiddleware,
    loginApplicationMiddleware(applicationDirectory),
    loggedApplicationMiddleware(applicationDirectory)
  ]);

  return result;
}


exports.serverConfig = serverConfig;

exports.getMiddlewares = getMiddlewares;

if (require.main === module){
  var connect = require('connect');
  var app = connect();
  var middlewares = getMiddlewares(connect, [serverConfig.distStatic], serverConfig.dist);

  underscore.each(middlewares, function (middleware) {
    app.use(middleware);
  });

  app.listen(3000);
}