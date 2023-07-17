<p align="center"><img alt="logo" src="https://github.com/forreya/music-licensing-website/blob/main/logo.png" width="60px" /></p>
<h1 align="center">BeatHive - Music Licensing Website</h1>

<p align="center">
  <a href="#"><img alt="NodeJS" src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white"></a>
  <a href="#"><img alt="React" src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB"></a>
  <a href="#"><img alt="MongoDB" src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white"></a>
  <a href="#"><img alt="ExpressJS" src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge"></a>
  <a href="#"><img alt="JSON Web Token" src="https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens"></a>
  <a href="#"><img alt="Redux Toolkit" src="https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white"></a>
  <a href="#"><img alt="React Router" src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white"></a>
</p>

<h4 align="center">BeatHive is a music licensing website built with the MERN stack. Users can register and log in to buy and sell beat licenses, upload and edit beats, add beats to their shopping cart, and complete the checkout process. The website also features authorization and authentication using JSON Web Tokens (JWT).</h4>

---

Authorization & Authentication:

![DemoGif](https://github.com/forreya/music-licensing-website/blob/main/demo-1.gif)

Uploading & Buying Beats:

![DemoGif](https://github.com/forreya/music-licensing-website/blob/main/demo-2.gif)

Cart & Checkout:

![DemoGif](https://github.com/forreya/music-licensing-website/blob/main/demo-3.gif)

---

## 🕹️ Features

Here's an overview of the key functionalities of this website:

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

---

## 💾 Installation

_Note: For step 3, you need to fill in the details by referring to the .env.example file._

1. Clone Repository

```
git clone https://github.com/forreya/file-sharing-site.git
```

2. Install Dependencies (Frontend):

```
cd client
npm install
```

3. Install Dependencies (Backend):

```
cd server
npm install
```

4. Create an `.env` files and fill the environmental variables in with your own information

```
PORT = '4000'
MONGO_USER = 'donkey_kong'
MONGO_PASSWORD = 'n8osjwn0ssofa6'
MONGO_URI = 'mongodb+srv://donkey_kong:A297dnOWwbsDI2k@my-cluster.psud.mongodb.net'
```
    
5. Start Client & Server

```
// Client
npm start

// Server
npx nodemon index.js
```

This will install the necessary packages listed in the package.json file and run the application on your computer.

---

## 💻 Technologies

- [React](https://react.dev/)
- [NodeJS](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [ExpressJS](https://expressjs.com/)
- [JSON Web Token](https://jwt.io/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [React Router](https://reactrouter.com/en/main)


