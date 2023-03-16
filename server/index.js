// import required dependencies
const express = require('express')
const cors = require('cors')
const app = express()
const UserModel = require('./models/User')
const BeatModel = require('./models/Beat')
const OrderModel = require('./models/Order')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')
const multer = require('multer')

// set up multer upload middleware
const uploadMiddleware = multer({ dest: './uploads'})

// import required file system module
const fs = require('fs')

// load environment variables from .env file
require('dotenv').config()

// extract environment variables
const mongoURI = process.env.MONGO_BEATSTORE_URI;
const secretKey = process.env.SECRET_KEY;

// set up middleware
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));

// connect to MongoDB database
mongoose.connect(mongoURI);

// set up bcrypt salt
const salt = bcrypt.genSaltSync(4);

// Handles user registration
app.post('/register', async (req,res) => {
  const {username, password} = req.body;
  try {
    // Create a new user document in the database with hashed password
    const userDoc = await UserModel.create({
      username, 
      password: bcrypt.hashSync(password, salt)
    })
    // Return the newly created user document as JSON response
    res.json(userDoc)
  } catch(e) {
    // Return a 400 error status code and the error message as JSON response if error is caught
    res.status(400).json(e.message)
  }
})

// handle user login
app.post('/login', async (req,res) => {
  const {username, password} = req.body;
  // Find a user document in the database with the given username
  const userDoc = await UserModel.findOne({username});
  if (!userDoc) {
    // Return a 400 error status code and error message if the user doesn't exist
    res.status(400).json("Username doesn't exist.")
  } else {
    // Check if the provided password matches the hashed password in the user document
    const doesPassMatch = bcrypt.compareSync(password, userDoc.password)
    if (doesPassMatch) {
      // If the password matches, sign a JWT token and set it as a cookie in the response
      jwt.sign({username, id:userDoc._id}, secretKey, {}, (err,token) => {
        if (err) throw err;
        // Return the user ID and username in the JSON response
        res.cookie('token', token).json({
          id: userDoc._id,
          username,
        })
      })
    } else {
      // Return a 400 error status code and error message if the password is incorrect
      res.status(400).json('Incorrect password.')
    }
  }
})

// handle profile requests
app.get('/profile', async (req,res) => {
  const {token} = req.cookies
  // Verify the JWT token in the cookie and return the user information in the JSON response
  jwt.verify(token, secretKey, {}, (error, userInfo) => {
    if (error) {
      // If there's an error, return null for the user information
      res.json({userInfo: null})
    } else {
      res.json(userInfo);
    }
  })
})

// handle user logout
app.post('/logout', (req, res) => {
  // Clear the JWT token cookie and return a success message in the JSON response
  res.cookie('token', '').json('Succesfully logged out.')
})

// Handles beat creation
// Processes the image file upload and adds the file object to the req object
app.post('/create-beat', uploadMiddleware.single('image'), async (req, res) => {
  const {originalname, path} = req.file;
  // Get the file extension
  const parts = originalname.split('.')
  const extension = parts[parts.length - 1]
  const newPath = path + '.' + extension
  // Rename the uploaded file path with the correct file extension
  fs.renameSync(path, newPath)

  const {token} = req.cookies
  // Verify the JWT token in the cookie and create a new beat document in the database 
  jwt.verify(token, secretKey, {}, async (error, userInfo) => {
    if (error) {
      throw error;
    } else {
      const {beatName, description, tags, price} = req.body;
      const beatDoc = await BeatModel.create({
        beatName,
        description,
        price,
        tags: tags.split(", "),
        image: newPath,
        creator: userInfo.id
      })
      // Return the newly created beat document as JSON response
      res.json(beatDoc)
    }
  })
})

// This route returns a single beat document based on the beatId parameter passed in the URL.
// The creator field of the document is populated with the username property of the user who created the beat.
app.get('/beats/:beatId', async (req,res) => {
  const {beatId} = req.params
  const beatDoc = await BeatModel.findById(beatId).populate('creator', ['username'])
  res.json(beatDoc)
})

// Handles a PUT request to update a specific beat's information, including its name, price, description, tags, and optional image
app.put('/beats/:beatId', uploadMiddleware.single('image'), async (req, res) => {
  const { beatId } = req.params; // Retrieves the beat ID from the URL parameter

  // If a new image file is included in the request, rename it and set its path
  let newPath = null;
  if (req.file) {
    const { originalname, path } = req.file;
    const parts = originalname.split('.')
    const extension = parts[parts.length - 1]
    newPath = path + '.' + extension
    fs.renameSync(path, newPath)
  }

  const { token } = req.cookies; // Retrieves the authentication token from the cookies
  jwt.verify(token, secretKey, {}, async (error, userInfo) => {
    if (error) throw error; // Throws an error if there's a problem with the authentication token

    // Retrieves the beat's name, price, description, and tags from the request body
    const { beatName, price, description, tags } = req.body;

    // Finds the beat in the database using its ID
    const beatDoc = await BeatModel.findById(beatId);

    // Verifies that the user making the request is the creator of the beat
    const isCreator = JSON.stringify(beatDoc.creator) === JSON.stringify(userInfo.id)
    if (!isCreator) {
      // Returns a 400 error response if the user is not the creator
      return res.status(400).json('You are not the creator of this beat.') 
    }

    // Updates the beat's information in the database, including the image file if a new one was provided
    await beatDoc.updateOne({
      beatName,
      price,
      description,
      tags,
      // Sets the beat's image file to the new path if provided, or keeps the old path if not
      image: newPath ? newPath : beatDoc.image, 
    })

    // Sends a JSON response containing the updated beat information back to the client
    res.json({ beatDoc })
  })
})

// This route returns an array of beat documents, sorted by the createdAt field in descending order.
// The creator field of each document is populated with the username property of the user who created the beat.
// A limit of 20 beats is set.
app.get('/beats', async (req,res) => {
  const beats = await BeatModel.find()
    .populate('creator', ['username'])
    .sort({createdAt: -1})
    .limit(20)
  res.json(beats)
})

// This route creates a new order document based on the request body, which contains the total price, email and phone number of the buyer.
// The buyer field of the document is set to the id of the user who made the request, which is obtained by decoding the JWT token in the request cookies.
app.post('/create-order', async (req, res) => {
  const {token} = req.cookies
  jwt.verify(token, secretKey, {}, async (error, userInfo) => {
    if (error) {
      throw error;
    } else {
      const {totalPrice, email, phoneNumber} = req.body;
      const orderDoc = await OrderModel.create({
        totalPrice,
        email,
        phoneNumber,
        buyer: userInfo.id
      })
      res.json(orderDoc)
    }
  })
})

// The server starts listening on port 4000.
app.listen(4000, () => {
  console.log('Server is running on port 4000...')
});