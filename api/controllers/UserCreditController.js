/**
 * CreditController
 *
 * @description :: Server-side logic for managing credits
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    create: function (req, res) {
        var token = req.token;

        // Check user does not already exists
        var credit = req.body;
        // credit.account = "steve";
        // Credit.create(credit).exec(function (err, user) {
        //     if (err) {
        //         return res.json(err.status, { err: err });
        //     }
        //     // If user created successfuly we return user and token as response
        //     if (credit) {
        //         // NOTE: payload is { id: user.id}
        //         res.json(200, { user: user, token: jwToken.issue({ id: user.id }) });
        //     }
        // });
    },

    findOne: function (req, res) {
    },

    decrement: function (req, res) {
    }

};


