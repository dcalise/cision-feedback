 // set up ========================
 var express  = require('express');
 var app      = express();                               // create our app w/ express
 var mongoose = require('mongoose');                     // mongoose for mongodb
 var morgan = require('morgan');             // log requests to the console (express4)
 var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
 var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
 
 // configuration =================
 
 mongoose.connect('mongodb://cision:c1s10n@olympia.modulusmongo.net:27017/P8upihiw');     // connect to mongoDB database on modulus.io
 
 app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
 app.use(morgan('dev'));                                         // log every request to the console
 app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
 app.use(bodyParser.json());                                     // parse application/json
 app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
 app.use(methodOverride());
 
 // define model =================
 var Feature = mongoose.model('Feature', {
  subject : String,
  description: String,
  account: {
    name: String,
    type: String,
    id: String,
    value: Number
  },
  requester: {
    name: String,
    email: String,
    department: String
  }
});

// routes ======================================================================

// api ---------------------------------------------------------------------
// get all features
app.get('/api/features', function(req, res) {
  
  // use mongoose to get all features in the database
  Feature.find(function(err, features) {
    
    // if there is an error retrieving, send the error. nothing after res.send(err) will execute
    if (err)
    res.send(err)
    
    res.json(features); // return all features in JSON format
  });
});

// create feature and send back all features after creation
app.post('/api/features', function(req, res) {
  
  // create a feature, information comes from AJAX request from Angular
  Feature.create({
    text: req.body.text,
    subject: req.body.subject,
    description: req.body.description,
    account: {
      name: req.body.account.name,
      type: req.body.account.type,
      id: req.body.account.id,
      value: req.body.account.value
    },
    requester: {
      name: req.body.requester.name,
      email: req.body.requester.email,
      department: req.body.account.department
    }
  }, function(err, feature) {
    if (err)
    res.send(err);
    
    // get and return all the features after you create another
    Feature.find(function(err, features) {
      if (err)
      res.send(err)
      res.json(features);
    });
  });
  
});

// delete a feature
app.delete('/api/features/:feature_id', function(req, res) {
  Feature.remove({
    _id : req.params.feature_id
  }, function(err, feature) {
    if (err)
    res.send(err);
    
    // get and return all the features after you create another
    Feature.find(function(err, features) {
      if (err)
      res.send(err)
      res.json(features);
    });
  });
});


// listen (start app with node server.js) ======================================
app.listen(8080);
console.log("App listening on port 8080");