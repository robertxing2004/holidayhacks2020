//import mongoose module
var mongoose = require('mongoose');
var properties = require('./properties');

//set up mongoose connection
var mongoDB = `mongodb+srv://hackathon:${properties.databasePassword}@hackathon.lujvz.mongodb.net/hackathon?retryWrites=true&w=majority`;
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

var db = mongoose.connection;

//bind connection to error event for notification of connection errors
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//define a schema
var Schema = mongoose.Schema;

//constructor method
var userSchema = new Schema({
   id:  String, //github login username
   email: String,
   username: String,
   points: Number,
});

var requestSchema = new Schema({
    id: String,
    description: String,
    maxCost: String
});

var users = db.model('users', userSchema);
var requests = db.model('requests', requestSchema);

module.exports = {
  users: users,
  requests: requests
};