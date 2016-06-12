/**
 * CreditController
 *
 * @description :: Server-side logic for managing credits
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    create: function (req, res) {

        if (!req.body.user) return res.json(400, { err: 'user is missing' });
        if (!req.body.secret) return res.json(400, { err: 'secret is missing' });

        UserCredit.find({ account: req.token.email, user: req.body.user }, function (err, createdOrFoundRecords) {
            if (err) return res.json(500, { err: 'could not create Credits for user:' + req.body.user });

            if (createdOrFoundRecords.length > 0) return res.json(400, { err: 'credits already exist for user: ' + req.body.user });

            UserCredit.create({ account: req.token.email, user: req.body.user, secret: req.body.secret }, function (err, newUserCredit) {
                if (err) return res.json(500, { err: 'could not create Credits for user:' + req.body.user });

                return res.json(201, newUserCredit);
            });
        });
    },

    find: function (req, res) {
        // List credits owned
        UserCredit.find({ account: req.token.email }, function (err, credits) {
            if (err) return res.json(500, { err: "Impossible to retrieve credits" });

            res.json(200, credits);
        });
    },

    consumeOneCredit: function (req, res) {
        // Check args
        var user = req.param('user');
        if (!user) return res.json(400, { err: 'wrong path, no user specified' });

        var secret = req.param('secret');
        if (!secret) return res.json(400, { err: 'secret parameter is missing, please specify ?secret=XXXXXXXX' });

        // Decrement User Credit
        UserCredit.find({ account: req.token.email, user: user }, function (err, createdOrFoundRecords) {
            if (err) return res.json(500, { err: 'could not retreive Credits for user:' + user });

            UserCredit.find({ account: req.token.email, user: user, secret: secret }, function (err, createdOrFoundRecords) {
                if (err) return res.json(500, { err: 'could not retreive Credits for user/secret:' + user });

                if (createdOrFoundRecords.length != 1) return res.json(403, { err: 'wrong secret' });

                UserCredit.update({ account: req.token.email, user: user }, { credits: createdOrFoundRecords[0].credits - 1 }, function (err, newUserCredit) {
                    if (err) return res.json(500, { err: 'could not decrement Credits for user:' + user });

                    if (newUserCredit.length != 1) return res.json(500, { err: 'could not decrement Credits for user:' + user });

                    return res.json(200, newUserCredit[0]);
                });
            });
        });
    },

    addCredits: function (req, res) {

        // Check args
        var user = req.param('user');
        if (!user) return res.json(400, { err: 'wrong path, no user specified' });

        if (!req.param('credits')) return res.json(400, { err: 'credits parameter is missing, please specify ?credits=XX' });
        var credits = parseInt(req.param('credits'));
        if (!credits) return res.json(400, { err: 'credits parameter should be an integer' });
        
        // Increment User Credit
        UserCredit.find({ account: req.token.email, user: user }, function (err, createdOrFoundRecords) {
            if (err) return res.json(500, { err: 'could not retreive Credits for user:' + user });

            if (createdOrFoundRecords.length != 1) return res.json(500, { err: 'cannot update Credits for user: ' + user });

            UserCredit.update({ account: req.token.email, user: user }, { credits: createdOrFoundRecords[0].credits + credits }, function (err, newUserCredit) {
                if (err) return res.json(500, { err: 'could not add Credits for user:' + user });

                if (newUserCredit.length != 1) return res.json(500, { err: 'could not add Credits for user:' + user });

                return res.json(200, newUserCredit[0]);
            });
        });
    }

};


