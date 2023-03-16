// Import the Mongoose library
const mongoose = require('mongoose');

// Destructure the Schema and model properties from the Mongoose object
const {Schema, model} = mongoose;

// Define a new Mongoose schema for the "beats" collection
const BeatSchema = new Schema({
  beatName: String,                // String field for the beat name
  image: String,                   // String field for the image URL
  description: String,             // String field for the beat description
  price: Number,                   // Number field for the beat price
  tags: [String],                  // Array of strings for the beat tags
  creator: {                       // Object field for the creator of the beat
    type: Schema.Types.ObjectId,   // Stored as an ObjectId reference
    ref:'User'                     // References the "User" model in the database
  }
}, {
  timestamps: true                 // Automatically add createdAt and updatedAt fields to each document
});

// Create a Mongoose model called "BeatModel" for the "beats" collection
const BeatModel = model('Beat', BeatSchema);

// Export the "BeatModel" object from the module
module.exports = BeatModel;
