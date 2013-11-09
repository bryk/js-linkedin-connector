'use strict';
var util = require('./util');

exports.redirectAugumentMiddleware = function(request, response, next){
  //we are adding redirect function that is required by passport.js framework
  response.redirect = function(url){
    util.redirectTo(response, url);
  };
  next();
};