const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const config = require('./../config');

const connection = mongoose.connect(config.database);

autoIncrement.initialize(connection);

module.exports = connection;