// Import the Mongoose library
const mongoose = require('mongoose');

// Destructure the Schema and model properties from the Mongoose object
const {Schema, model} = mongoose;

// Define a new Mongoose schema for the "orders" collection
const OrderSchema = new mongoose.Schema({
  totalPrice: Number,                  // Number field for the total price of the order
  email: String,                       // String field for the buyer's email address
  phoneNumber: String,                 // String field for the buyer's phone number
  buyer: {                              // Object field for the buyer of the order
    type: Schema.Types.ObjectId,        // Stored as an ObjectId reference
    ref:'User'                          // References the "User" model in the database
  }
}, {
  timestamps: true                      // Automatically add createdAt and updatedAt fields to each document
});

// Create a Mongoose model called "OrderModel" for the "orders" collection
const OrderModel = mongoose.model('Order', OrderSchema);

// Export the "OrderModel" object from the module
module.exports = OrderModel;
