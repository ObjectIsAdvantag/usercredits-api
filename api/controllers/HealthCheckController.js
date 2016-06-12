/**
 * HealthCheckController
 *
 * @description :: Server-side logic for health check
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    check: function (req, res) {
        res.json(200, { uptime : new Date(sails.uptime) })
    }

}