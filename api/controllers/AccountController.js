/**
 * AccountsController
 *
 * @description :: Server-side logic for managing Accounts
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  create: function (req, res) {
    if (req.body.password !== req.body.confirmPassword) {
      return res.json(401, {err: 'Password doesn\'t match, What a shame!'});
    }
    Account.create(req.body).exec(function (err, account) {
      if (err) {
        return res.json(err.status, {err: err});
      }
      // If account created successfuly we return an API token
      if (account) {
        res.json(201, { token: jwToken.issue({email: account.email, tokenId: account.activeTokenId })});
      }
    });
  }



};