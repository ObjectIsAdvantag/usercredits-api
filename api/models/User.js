/**
 * Users.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

// We don't want to store password with out encryption
var bcrypt = require('bcrypt');

module.exports = {
  
  schema: true,

  autoPK: false,
  
  attributes: {
    email: {
      type: 'email',
      unique: true
    },

    encryptedPassword: {
      type: 'string'
    },

    activeTokenId: {
      type: 'string',
      required: true,
      defaultsTo : function () {
         return Date.now();
      }
    },

    // We don't wan't to send back encrypted password either
    toJSON: function () {
      var obj = this.toObject();
      obj.memberSince = obj.createdAt;
      delete obj.encryptedPassword;
      delete obj.createdAt;
      delete obj.updatedAt;
      //delete obj.activeTokenId;
      return obj;
    }
  },

  // Here we encrypt password before creating a User
  beforeCreate : function (values, next) {
    bcrypt.genSalt(10, function (err, salt) {
      if(err) return next(err);
      bcrypt.hash(values.password, salt, function (err, hash) {
        if(err) return next(err);
        values.encryptedPassword = hash;
        next();
      })
    })
  },

  comparePassword : function (password, user, cb) {
    bcrypt.compare(password, user.encryptedPassword, function (err, match) {

      if(err) cb(err);
      if(match) {
        cb(null, true);
      } else {
        cb(err);
      }
    })
  }
};