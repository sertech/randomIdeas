const express = require('express');

// to be able to use .env file we have to require it
require('dotenv').config();

// use the PORT value of the .env or if it is not there use 8000
const port = process.env.PORT || 8000;

// bring the connection from db.js
const connectDB = require('./config/db');
connectDB();

// we have to initialize this variable
// this will be the server itself
const app = express();

// body parser middleware to access the body of a POST request
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// lets create a route
app.get('/', (req, res) => {
    res.json({ message: 'welcome to the random ideas API' });
});

// import the separate route file in to the main file
// and make the connection to the routes
const ideasRouter = require('./routes/ideas');
app.use('/api/ideas', ideasRouter);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
