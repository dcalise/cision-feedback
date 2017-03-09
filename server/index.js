// set up ========================
const express  = require('express');
const app      = express();                               // create our app w/ express
const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const morgan = require('morgan');             // log requests to the console (express4)
const bodyParser = require('body-parser');    // pull information from HTML POST (express4)
const methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
const cors = require('cors');
const jwt = require('jsonwebtoken');
const connection = require('./services/db');
 
const Feature = require('./models/features');
const config = require('./config');


// configuration =================
app.set('superSecret', config.secret);
app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());
app.use(cors({origin: 'http://localhost:4000'}));



// Features
const featureRouter = require('./routes/features');
app.use('/api/', featureRouter);



// listen (start app with node server.js) ======================================
app.listen(8080);
console.log("App listening on port 8080");