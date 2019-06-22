'use strict';

const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

require('dotenv').config();


// Creates 'user' as a new mongo schema, and defines types for username and password.
const favorites = new mongoose.Schema({

    favorites: {type: String}
});

module.exports = mongoose.model('favorites', favorites);
