'use strict';

const User = require('./user-model');

module.exports = (req, res, next) => {

  try {
    let [authType, encodedString] = req.headers.authorization.split(/\s+/);

    switch (authType.toLowerCase()) {
      case 'basic':
        return _authBasic(encodedString);
      default:
        return _authError();
    }

  } catch(err){
    next(err);
  }

  function _authBasic(authString) {

    let base64Buffer = Buffer.from(authString, 'base64');
    let bufferString = base64Buffer.toString();
    let [username, password] = bufferString.split(':');
    let auth = {username: username, password: password}; //{username: 'jerome', password: 'isitworking'}

    return User.authenticateBasic(auth)
        .then (user => _authenticate(user));
  }

  function _authenticate(user) {
    if(user) {
      req.user = user;
      req.token = user.generateToken();
    console.log(user);

      next();
    }
    else {
      _authError();
    }
  }

  function _authError() {
    next({status: 401, statusMessage: 'Unauthorized', message: 'Invalid User ID/Password'});
  }
};
