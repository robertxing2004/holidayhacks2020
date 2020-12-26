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
   username: String, //name of person
   points: Number // points gained from giving gifts
});

var requestSchema = new Schema({
    id: String, //id of user who made the request
    description: String,
    maxCost: String // maximum cost allowed for the gift
});

var submitSchema = new Schema({ //pending submissions
  _id: Schema.Types.ObjectId, // _id of corresponding request
  id: String, //id of user who made the submission
  requestid: String, //id of user who made the request
  accepted: Boolean // whether a submission was accepted
});

var users = db.model('users', userSchema);
var requests = db.model('requests', requestSchema);
var submissions = db.model('submissions', submitSchema);

module.exports = {
  users: users,
  requests: requests,
  submissions: submissions
};
