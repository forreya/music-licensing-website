# Fullstack MERN Beat Licensing Website

This is a full-stack MERN (MongoDB, Express, React, Node.js) application that allows users to buy and sell beat licenses. This README file will provide you with the necessary information to get started with the application.

## Features

### Authorization & Authentication
- Users can register and login to the application.
- Passwords are hashed before being stored in the database
- User authentication is handled using JSON Web Tokens (JWT).

### Beats
- Users can upload beats to sell to other users
- Users can edit the details of existing beats (name, description, tags, etc) if they are the creator of it
- Home page includes all of the beats that are available for purchase on the website. Each beat has a thumbnail image, a name, description, tags, and more.

### Cart & Checkout
- Users can select beats they want to purchase, and add them to their shopping cart
- Users can edit their shopping cart, including removing beats or changing the quantity of a beat
- Cart updates the total cost of the beats automatically
- Checkout process includes steps for entering their billing & contact information
- Confirmation message after each successful order

## Installation

To run this app, you will need to have **Node.js** and **npm** installed on your machine. 

1. Clone the repository to your local machine:

```
$ git clone https://github.com/forreya/music-licensing-website.git
```

2. Install the required dependencies for the server:

```
$ cd server
$ npm install
```

3. Install the required dependencies for the client:

```
$ cd client
$ npm install
```

This will install the necessary packages listed in the `package.json` file for the client.

## Creating your `.env` file

Create a `.env` file in the root directory of the server folder and copy the following code into the file:

```
MONGO_BEATSTORE_USER = "???"
MONGO_BEATSTORE_PASSWORD = "???"
MONGO_BEATSTORE_URI = "???"
SECRET_KEY = "???"
```

Replace the `SECRET_KEY` with anything you want, this is used to sign and verify JSON Web Tokens (JWTs) for authentication purposes in the application.
The other 3 environmental variables will be retrieved from your MongoDB cluster in the next section.

## Database Configuration

To use the application, you will need to create a MongoDB account. Here are the steps:

1. Go to the [MongoDB website](https://www.mongodb.com/) and click the "Sign Up" button in the top right corner of the page.
2. Follow the prompts to create a new account with your email and password.
3. Once you are signed in to your account, click on the "New Project" button on the MongoDB dashboard.
4. Enter a name for your new project and select a region to host your data. Click the "Create Project" button to proceed.
5. Once your project is created, click on the "Clusters" tab in the left sidebar and click the "Create a New Cluster" button.
6. Follow the prompts to select your cloud provider, region, and cluster tier. Select the free tier option to test the application. Click the "Create Cluster" button to proceed.
7. Once your cluster is created, click on the "Connect" button on the cluster overview page.
8. Select "Connect Your Application" and choose "Node.js" as the driver to connect to MongoDB.
9. Follow the instructions to copy your connection string and change the MONGO_BEATSTORE_URI value in your `.env` file to your connection string. Be sure to replace the _password_ part of your URI with your MongoDB password.

## Usage

1. Start the server

```
$ cd server
$ npx nodemon index.js
```

2. Start the client

```
$ cd client
$ npm start
```

3. Access the application by navigating to [http://localhost:3000](http://localhost:3000) in your web browser.

## Extra Info
The app was built using the MERN stack, and various other libraries such as React Router, Material UI, Formik, Yup, and Redux Toolkit.