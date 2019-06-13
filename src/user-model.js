'use strict';

const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

require('dotenv').config();


// Creates 'user' as a new mongo schema, and defines types for username and password.
const user = new mongoose.Schema({
  username: {type:String, required:true, unique:true},
  password: {type:String, required:true},
    email: {type: String}
});

// Hashes given password
user.pre('save', function(next) {
  bcrypt.hash(this.password,10)
      .then(hashedPassword => {
        this.password = hashedPassword;
        next();
      }).catch(error => {throw error});
});


// Run authenticateBasic based on...
// auth - compares username with what's in Schema
// - call comparePassword function to verify password

user.statics.authenticateBasic = function(auth) {
  let query = {username:auth.username};
  return this.findOne(query)
      .then(user => user && user.comparePassword(auth.password))
      .catch(console.error);
};


// This function compares the password with what's in the schema
// uses bcrypt to compare the this.password with what's in the Schema

user.methods.comparePassword = function(password) {
  return bcrypt.compare(password, this.password)
      .then(valid => valid ? this : null);
};
// Jerome - validating the email of a user
user.statics.creatFromOauth = function(email) {
    if(!email) {
        return Promise.reject('Validation Error');
    }
    return this.findOne({email})
        .then(user => {
            if(!user) {
                throw new error('User Not Found');
                // Jerome - Here someone wants to log in
            }
            console.log('Welcome Back', user.username);
            return user;
        })
        .catch(error => {
            //Jerome - Here someone wants to create a new account
            console.log('Creating new user');
            let username = email;
            let password = 'none';
            return this.create({username, password, email});
        });
};

// Function that generates a token and assigns it to an _id in the Schema
// uses jsonwebtoken to sign the tokenData and salts it with our .env file's SECRET

user.methods.generateToken = function() {
  let tokenData = {
    id: this._id,
  };
  return jwt.sign(tokenData, process.env.SECRET);
};

// Exports user-model for use outside of this file.

module.exports = mongoose.model('user', user);
