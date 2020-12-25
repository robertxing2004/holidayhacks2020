//import mongoose module
var mongoose = require('mongoose');

//set up mongoose connection
var mongoDB = 'mongodb://127.0.0.1/database';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

//get default connection
var db = mongoose.connection;

//bind connection to error event for notification of connection errors
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//define a schema
var Schema = mongoose.Schema;

//constructor method
var users = new Schema({
   user_id:  Schema.Types.ObjectId,
   user_email: String,
   username: String,
   user_points: Number,
   user_githubtoken: String
});

var requests = new Schema({
    user_id: Number,
    description: String,
    maxLimit: Number
});

var users = mongoose.model('users', users);
var requests = mongoose.model('requests', requests);