const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const dotenv = require('dotenv');
const connectDB = require('./server/database/dbConnection');

const app = express();

dotenv.config({path: '.env'}); 
const port = process.env.PORT || 8000;

// DB connection 
connectDB();

// MIDDLEWARES
app.use(bodyparser.urlencoded({extended: true}));

// Middlewares / Set Views
app.set('view engine', 'ejs');
 

// Middlewares / Loading Static files
app.use('/styles', express.static(path.resolve(__dirname, 'public/styles')));
app.use('/scripts', express.static(path.resolve(__dirname, 'public/scripts')));

// Load Routes
app.use('/', require('./server/routes/routers'));

// Listening
app.listen(port, () => {console.log(`Listening on port ${port}`)})
