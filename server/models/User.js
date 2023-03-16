// Import the Mongoose library
const mongoose = require('mongoose');

// Define a new Mongoose schema for the "users" collection
const UserSchema = new mongoose.Schema({
  username: {                     // String field for the username of the user
    type: String,                 // Stored as a String
    required: true,               // Field is required and must be present
    min: 4,                       // Minimum length of the field is 4 characters
    max: 20,                      // Maximum length of the field is 20 characters
    unique: true                  // Field must be unique across all documents in the collection
  },
  password: {                     // String field for the password of the user
    type: String,                 // Stored as a String
    required: true                // Field is required and must be present
  }
});

// Create a Mongoose model called "UserModel" for the "users" collection
const UserModel = mongoose.model('User', UserSchema);

// Export the "UserModel" object from the module
module.exports = UserModel;
