'use strict';
var underscore = require('underscore');
var users = require('./config.json').users;

exports.authenticateUser = function(login, password){
  var result = null;

  underscore.some(users, function(element){
    if (element.login === login && element.password === password){
      result = {login: login, password: password};
      return true;
    }
  });

  return result;
};

exports.findUser = function(login){
  var result = null;

  underscore.some(users, function(element){
    if (element.login === login ){
      result = {login: login, password: element.password};
    }
  });

  return result;
};
