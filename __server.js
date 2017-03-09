 // set up ========================
 var express  = require('express');
 var app      = express();                               // create our app w/ express
 var mongoose = require('mongoose');                     // mongoose for mongodb
 var autoIncrement = require('mongoose-auto-increment');
 var morgan = require('morgan');             // log requests to the console (express4)
 var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
 var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
 var cors = require('cors');

 var jwt = require('jsonwebtoken');
 var config = require('./config');
//  var User = require('./app/models/user');

// Firebase
var firebase = require('firebase');

// Initialize Firebase
var config = {
    apiKey: "AIzaSyCtCQXKeaDMgB82gS7oSQigLpC1C7ctHTo",
    authDomain: "cision-feedback.firebaseapp.com",
    databaseURL: "https://cision-feedback.firebaseio.com",
    storageBucket: "cision-feedback.appspot.com",
    messagingSenderId: "1051446450630"
  };
  firebase.initializeApp(config);
 
 // configuration =================
 
 var connection = mongoose.connect(config.database);     // connect to mongoDB database on modulus.io
 autoIncrement.initialize(connection);
 app.set('superSecret', config.secret);
 
 app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
 app.use(morgan('dev'));                                         // log every request to the console
 app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
 app.use(bodyParser.json());                                     // parse application/json
 app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
 app.use(methodOverride());
 app.use(cors({origin: 'http://localhost:4000'}));
 

// =====================================
// ============ FEATURE API ============
// =====================================

// define model ========================

var FeatureSchema = new mongoose.Schema({
  subject : String,
  description: String,
  status: String,
  account: {
    name: String,
    accountType: String,
    id: String,
    value: Number
  },
  requester: {
    name: String,
    email: String,
    department: String
  },
  dateCreated: { type: Date, default: Date.now }
});

FeatureSchema.plugin(autoIncrement.plugin, 'Feature');

var Feature = connection.model('Feature', FeatureSchema);

// define routes =======================
// get all features
app.get('/api/features', function(req, res) {
  Feature.find(function(err, features) {
    if (err)
    res.send(err);
    res.json(features);
  });
});

// get single feature
app.get('/api/features/:feature_id', function(req, res) {
  Feature.find({
    _id : req.params.feature_id
  }, function(err, feature) {
    if (err)
    res.send(err);
    res.json(feature);
  });
});

// create new feature
app.post('/api/features', function(req, res) {
  
  var feature = new Feature;

  feature.subject = req.body.subject;
  feature.description = req.body.description;
  feature.status = 'New';
  feature.account = {
    name: req.body.account.name,
    accountType: req.body.account.accountType,
    id: req.body.account.id,
    value: req.body.account.value
  };
  feature.requester = {
    name: req.body.requester.name,
    email: req.body.requester.email,
    department: req.body.requester.department
  }

  feature.save(function(err, feature, numAffected) {
    if (err) {
      res.send(err);
    }
    res.json();
  });

});

// delete a feature
app.delete('/api/features/:feature_id', function(req, res) {
  Feature.remove({
    _id : req.params.feature_id
  }, function(err, feature,numAffected) {
     if (err) {
      res.send(err);
    }
    res.json();
  });
});


// =====================================
// ============= USER API ==============
// =====================================

// define model ========================
var UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  username: { type: String, index: { unique: true }},
  department: String,
  password: String,
  admin: Boolean,
  dateCreated: { type: Date, default: Date.now }
});

UserSchema.plugin(autoIncrement.plugin, 'User');

var User = connection.model('User', UserSchema);

// define routes =======================
// create user

var apiRoutes = express.Router();

app.post('/api/users/new', function(req, res) {
  
  var user = new User;

  
  user.firstName = req.body.firstName;
  user.lastName = req.body.lastName;
  user.username = req.body.username;
  user.department = req.body.department;
  user.password = req.body.password;
  user.admin = req.body.admin;

  user.save(function(err, user, numAffected) {
    if (err) {
      res.send(err);
    }
    res.json();
  });

});

// route to authenticate a user (POST http://localhost:8080/api/authenticate)
apiRoutes.post('/users/authenticate', function(req, res) {

  // find the user
  User.findOne({
    username: req.body.username
  }, function(err, user) {

    if (err) throw err;

    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {

      // check if password matches
      if (user.password != req.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {

        // if user is found and password is right
        // create a token
        var token = jwt.sign(user.lastName + user.username + user.lastName, app.get('superSecret'), {
          // expiresInMinutes: 1440 // expires in 24 hours
        });

        // return the information including token as JSON
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
      }   

    }

  });
});

// route middleware to verify a token
apiRoutes.use(function(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, app.get('superSecret'), function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;    
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });
    
  }
});

// *********************************
// ALL ROUTES AFTER THIS ARE BLOCKED
// *********************************

// return all users
apiRoutes.get('/users/list', function(req, res) {
  User.find({}, function(err, users) {
    res.json(users);
  });
});  

// delete a user
app.delete('/api/users/:user_id', function(req, res) {
  User.remove({
    admin : true
  }, function(err, user,numAffected) {
     if (err) {
      res.send(err);
    }
    res.json();
  });
});

app.use('/api/', apiRoutes);

// FEATURES



// listen (start app with node server.js) ======================================
app.listen(8080);
console.log("App listening on port 8080");