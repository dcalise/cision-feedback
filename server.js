 // set up ========================
 var express  = require('express');
 var app      = express();                               // create our app w/ express
 var mongoose = require('mongoose');                     // mongoose for mongodb
 var autoIncrement = require('mongoose-auto-increment');
 var morgan = require('morgan');             // log requests to the console (express4)
 var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
 var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
 var cors = require('cors');
 
 // configuration =================
 
 var connection = mongoose.connect('mongodb://cision:c1s10n@olympia.modulusmongo.net:27017/P8upihiw');     // connect to mongoDB database on modulus.io
 autoIncrement.initialize(connection);
 
 app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
 app.use(morgan('dev'));                                         // log every request to the console
 app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
 app.use(bodyParser.json());                                     // parse application/json
 app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
 app.use(methodOverride());
 app.use(cors({origin: 'http://localhost:4000'}));
 
 // define model =================
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

// routes ======================================================================

// api ---------------------------------------------------------------------
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


// listen (start app with node server.js) ======================================
app.listen(8080);
console.log("App listening on port 8080");