/**
 * MongoDB connection configuration.
 * Establishes a connection to MongoDB using Mongoose and the MONGO_URI environment variable.
 * Logs a message upon successful connection.
 */
const mongoose = require('mongoose');

const connectToMongo = async () => {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
  };
  
  connectToMongo();

module.exports = connectToMongo;