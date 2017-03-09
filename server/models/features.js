const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const connection = require('./../services/db');

const FeatureSchema = new mongoose.Schema({
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

module.exports = connection.model('Feature', FeatureSchema);