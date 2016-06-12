/**
 * UserCredit.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  schema: true,

  attributes: {

    // api consumer who created the UserCredit
    account: {
      type: 'email',
      required: true
    },

    // to identify the user we gave credits to
    // should be unique among an owner set of users
    user: {
      type: 'email',
      required: true
    },

    secret: {
      type: 'string',
      required: true
    },

    credits: {
      type: 'integer',
      required: true,
      defaultsTo: 0
    },

    // Hide internal structure
    toJSON: function () {
      var obj = this.toObject();
      delete obj.account;
      delete obj.id;
      //delete obj.createdAt;
      //delete obj.updatedAt;
      return obj;
    }
  },


};

