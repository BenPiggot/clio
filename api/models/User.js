/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var bcrypt = require('bcrypt');

module.exports = {

  attributes: {
    email: {
      type: 'email',
      required: true,
      unique: true
    },
    firstName: {
      type: 'string',
      required: true
    },
    lastName: {
      type: 'string',
      required: true
    },
    password: {
      type: 'string',
      minLength: 6,
      required: true
    },
    project: {
      collection: 'Project',
      via: 'user'
    },
    fullName: function() {
      return this.firstName+' '+this.lastName;
    },
    toJSON: function() {
      var obj = this.toObject();
      delete obj.password;
      return obj;
    }
  },
  beforeCreate: function(values, callback) {
    bcrypt.hash(values.password, 10, function(err, hash) {
      if(err) return callback(err)
      values.password = hash;
      callback();
    })
  }
};

