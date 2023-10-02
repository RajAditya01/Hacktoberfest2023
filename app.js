const dotenv =require("dotenv");
const mongoose = require('mongoose');
const express = require('express');
const app = express();

app.use(express.json());

dotenv.config({path: './config.env'})
require('./DB/conn');
// const User =require('./models/userSchema');

// we link the router files to make our routes easy
app.use(require('./router/auth'));

const PORT=process.env.PORT;



// Middleware
const middleware = (req, res, next) => {
    console.log(`Hello my Middleware`);
    next(); // Don't forget to call next to continue to the next middleware or route handler
}

app.get('/', (req, res) => {
    res.send(`Hello world from the server`)
});
app.get('/register', (req, res) => {
    res.send(`Hello world from the server`)
});

app.get('/about', middleware, (req, res) => {
    res.send(`Hello world from about the server`);
});

app.get('/contact', (req, res) => {
    res.send(`Hello world from contact the server`)
});

app.get('/signin', (req, res) => {
    res.send(`Hello world from the server`)
});

app.get('/signup', (req, res) => {
    res.send(`Hello world from the server`)
});


app.listen(3000, () => {
    console.log(`Server is running at Port no ${PORT}`);
});
