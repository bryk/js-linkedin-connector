'use strict';
var userDatasource = require('../server/userDatasource');

describe('userDataSource', function () {
  it('should find user with login exampleLogin', function () {
    var exampleUser= userDatasource.findUser('exampleLogin');
    expect(exampleUser.login).toBe('exampleLogin');
    expect(exampleUser.password).toBe('examplePassword');
  });

  it('should authenticate user exampleLogin:examplePassword and return object with details', function(){
    var exampleUser = userDatasource.authenticateUser('exampleLogin', 'examplePassword');
    expect(exampleUser.login).toBe('exampleLogin');
    expect(exampleUser.password).toBe('examplePassword');
  });

  it('should not authenticate user wrongLogin:wrongPassword', function(){
    expect(userDatasource.authenticateUser('wrongLogin', 'wrongPassword')).toBe(null);
  });

  it('should not find user with login exampleLogin', function(){
    expect(userDatasource.findUser('wrongLogin')).toBe(null);
  });
});

