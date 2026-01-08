/**
 * User schema definition for MongoDB.
 * Defines the structure for user documents including authentication and profile information.
 * @property {String} name - User's full name (required)
 * @property {String} email - User's email address (required, unique)
 * @property {String} password - User's hashed password (required)
 * @property {String} token - JWT authentication token (required)
 */
const mongoose = require('mongoose');
const { Schema } = mongoose;
const UserSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    token:{
        type:String,
        required:true,
    },
  });

  const User = mongoose.model('user', UserSchema);
 // User.createIndexes();
  module.exports = User;