/**
 * sessionAuth
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
module.exports = function (req, res, next) {

  var token;

  // authentication via Authorization header
  if (req.headers && req.headers.authorization) {
    var parts = req.headers.authorization.split(' ');
    if (parts.length == 2) {
      var scheme = parts[0],
        credentials = parts[1];

      if (/^Bearer$/i.test(scheme)) {
        token = credentials;
      }
    }
    else {
      // User is not allowed
      // (default res.forbidden() behavior can be overridden in `config/403.js`)
      return res.forbidden('Format is Authorization: Bearer [token]');
    }
  }

  else {

    // authentication via Query Parameter
    if (req.param('token')) {
      token = req.param('token');
      // We delete the token from param to not mess with blueprints
      delete req.query.token;
    }
    else {

      // no authentication at all
      // (default res.forbidden() behavior can be overridden in `config/403.js`)
      return res.forbidden('No Authorization header was found');
    }
  }

  // Check token is valid
  jwToken.verify(token, function (err, decryptedToken) {
    if (err) return res.json(401, { err: 'Invalid Token!' });

    if (!decryptedToken.email) return res.json(401, { err: 'Invalid Token !!!' });

    // TODO Consistency : Check we have a User for this token
    User.findOne({ email: decryptedToken.email }, function (err, user) {
      if (!user) return res.json(401, { err: 'no account found for email: ' + decryptedToken.email });

      req.token = decryptedToken;

      next();
    });
  });
}

