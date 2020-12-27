var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var database = require('../database');

// Home page
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Neighbourhood Santa' });
});

// Leaderboard page
router.get('/leaderboard', async function(req, res, next) {
  let users = await database.users.find().exec();
  users.slice(0, 15); //limit 15 users max

  res.render('leaderboard', {
    title: 'Leaderboard',
    users: users
  });
});

/*
/
/
/
/
/ API urls, not meant to be accessed by user
/
/
/
/
*/

// confirm intent to submit a gift for somebody else
router.post('/addsubmission', async function(req, res, next) {
  if (!req.session.userid || !req.body.mongoId) res.send({message: "Error"});
  else {
    console.log("\n\n\n*******\ncreating gift submission");
    console.log(req.body.mongoId);
    
    let submitquery = await database.submissions.findById(mongoose.Types.ObjectId(req.body.mongoId));
    
    if (!submitquery) {
      let requestquery = await database.requests.findById(mongoose.Types.ObjectId(req.body.mongoId));
      let submission = new database.submissions({
        _id: requestquery._id,
        id: req.session.userid,
        requestid: requestquery.id,
        description: requestquery.description,
        maxCost: requestquery.maxCost,
        accepted: false
      });
      submission.save(err => {console.log(err);});

      res.send({message: "Submission added!"});
    }
    else res.send({message: "Submission already exists!"});
  }
});

// confirm submission, allocate points for id, remove submission from id, and request from requestid
router.post('/confirmsubmission', async function(req, res, next) {
  if (!req.session.userid || !req.body.mongoId) res.send({message: "Error"});
  else {
    console.log("\n\n\n*******\nconfirming gift submission");
    console.log(req.body.mongoId);

    let submitquery = await database.submissions.findById(mongoose.Types.ObjectId(req.body.mongoId));
    
    if (submitquery) {
      let giverid = submitquery.id;
      let receiverid = req.session.userid;
      
      console.log(giverid);
      console.log(receiverid);
      console.log(req.body.confirmed);
      
      await database.submissions.findByIdAndDelete(mongoose.Types.ObjectId(req.body.mongoId));
      if (req.body.confirmed) {
        await database.requests.findByIdAndDelete(mongoose.Types.ObjectId(req.body.mongoId));
        let giver = await database.users.findOne({id: giverid}).exec();
        console.log(giver);
        await database.users.findOneAndUpdate({id: giverid}, {points: giver.points + 10});
        res.send({message: "Gift submission confirmed!"});
      }
      else res.send({message: "Gift submission successfully deleted!"});

    }
    else res.send({message: "Gift submission doesn't exist!"});
  }
});

module.exports = router;
