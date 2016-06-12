/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  reissueToken: function (req, res) {
    var email = req.param('email');
    var password = req.param('password');
    if (!email || !password) return res.json(401, { err: 'email and password required' });

    Account.findOne({ email: email }, function (err, account) {
      if (!account) return res.json(401, { err: 'invalid email or password' });

      Account.comparePassword(password, account, function (err, valid) {
        if (err) return res.json(403, { err: 'forbidden' });
        if (!valid) return res.json(401, { err: 'invalid email or password' });

        // Create new token id
        // [WORKAROUND] update and not save Object as we want this code to work against ORM without primary key support (ie, in-memory)
        Account.update({ email: account.email }, { activeTokenId: Date.now().toString() }).exec(function afterwards(err, updatedRows) {
          if (err) return res.json(500, { err: 'could not issue a new token for email: ' + account.email });

          res.json(200, { token: jwToken.issue({ email: account.email, tokenId: updatedRows[0].activeTokenId }) });
        });
      });
    })
  }
};