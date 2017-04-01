const express  = require('express');
const Feature = require('./../models/features');
const router = express.Router();


// get all features
router.get('/features', function(req, res) {
  Feature.find(function(err, features) {
    if (err)
    res.send(err);
    res.json(features);
  });
});

// get single feature
router.get('/features/:feature_id', function(req, res) {
  Feature.find({
    _id : req.params.feature_id
  }, function(err, feature) {
    if (err)
    res.send(err);
    res.json(feature);
  });
});

// create new feature
router.post('/features', function(req, res) {
  
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
router.delete('/features/:feature_id', function(req, res) {
  Feature.remove({
    _id : req.params.feature_id
  }, function(err, feature,numAffected) {
     if (err) {
      res.send(err);
    }
    res.json();
  });
});

module.exports = router;