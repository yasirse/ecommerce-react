/**
 * Product schema definition for MongoDB.
 * Defines the structure for product documents including name, description, price, quantity, and picture.
 * @property {String} name - Product name (required)
 * @property {String} description - Product description (required)
 * @property {Number} price - Product price
 * @property {Number} quantity - Available quantity
 * @property {String} picture - Product image file name
 */
const mongoose = require('mongoose');
const { Schema } = mongoose;
//name, price, quantity, description, pictureName
const ProductSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true, 
    },
    price:{
        type: Number,
        default: "General"
    },
    quantity:{
        type: Number,
    },
    picture:{
        type:String,
    },
    date:{
        type: Date,
        default: Date.now
    },
  });

  module.exports = mongoose.model('Products', ProductSchema);