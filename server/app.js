
// GETTING THE PACKAGES 
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var config = require('./config/env/development');
var path = require('path');
var jwt = require('jsonwebtoken');

//To get data from POST requests
app.use(bodyParser.urlencoded({extended: true }));
app.use(bodyParser.json());

//For CORS requests
app.use(function(req, res, next){
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});

//HTTP request logger middleware 
app.use(morgan('dev'));

//Connecting MongoDB
mongoose.connect(config.mongo.database);

//Setting up directory for frontend to utilise
app.use(express.static(__dirname+'/../client'));

//For Seeding Sample Data
if (config.seedDB) {
    console.log('Seeding Database');
    require('./config/seed');
}

//Configuring for route dir
require('./routes')(app);

//Main app route
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname + '/../client/app/main/main.html'));
});


// Running the server
app.listen(config.port);
console.log('Server running on port'+config.port);