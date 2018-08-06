// server.js

//Setup

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// Load in models
require('./models/');

// Load in routes
var router = require("./routes");

// configuring the app to use the bodyParser()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
mongoose.connect('mongodb://localhost:27017/userdb');

var port = process.env.PORT || 8080; //Setting the port


// Routes for the API
app.use('/api', router);


// Start the server
app.listen(port);
console.log('Working on port ' + port);