'use strict';
var path = require('path');
var util = require('./util');


exports.loggedApplicationMiddleware = function (envPath) {
  var resolvedPath = path.resolve(envPath);

  function routeMiddleware(request, response, next) {
    if (util.isPathEqualTo(request, ['/app', '/app/']) && request.method === 'GET') {
      response.setHeader('Access-Control-Allow-Origin', '*');
      util.returnFile(response, resolvedPath, 'app.html');
    } else {
      next();
    }
  }

  return routeMiddleware;
};