var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var database = require('../database');

// Home page
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Neighbourhood Santa' });
});

/*
API urls, not meant to be accessed by user
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
        accepted: false
      });
      submission.save(err => {console.log(err);});
      res.send({message: "Submission added!"});
    }
    else {
      res.send({message: "Submission already exists!"});
    }
  }
});

//

module.exports = router;
