var express = require('express');
var router = express.Router();
var axios = require('axios');
var mongoose = require('mongoose');

var properties = require('../properties');
var database = require('../database');
var radar = require('../radar');

// Users profile page
router.get('/', function(req, res, next) {
  if (!req.session.userid) res.redirect('/users/login');
  else {
    console.log(req.session.userid);
    res.render('dashboard', { id: req.session.userid });
  }
});

// Users login page
router.all('/login', function(req, res, next) {
  res.redirect(`https://github.com/login/oauth/authorize?client_id=${properties.clientID}&scope=user`);
});

// confirm login page (github callback)
router.get('/confirmlogin', function(req, res, next) {

  const body = {
    client_id: properties.clientID,
    client_secret: properties.clientSecret,
    code: req.query.code
  };
  const opts = {headers: {accept: 'application/json' }};
  var data;

  axios.post('https://github.com/login/oauth/access_token', body, opts).
  then(res => res.data.access_token).
  then(async token => {
    return (await axios.get('https://api.github.com/user', {headers: {authorization: `token ${token}`}})).data;
  }).
  then(async data => {
    let query = await database.users.findOne({id: data.login});
    if (!query) {
      let user = new database.users({
        id: data.login,
        email: data.email,
        username: data.name,
        points: 0
      });
      user.save(err => {console.log(err);});
    }
    req.session.userid = data.login;
    console.log(req.session.userid);
  }).
  then(() => {
    res.redirect('/users');
  }).
  catch(err => res.status(500).json({ message: err.message }));
})

// gift request page
router.get('/request', function(req, res, next) {
  if (!req.session.userid) res.redirect('/users/login');
  else res.render('request');
});

// gift submission page, requires data from /createsubmit
router.post('/submit', async function(req, res, next) {
  if (!req.session.userid) res.redirect('/users/login');

  let requests = [];
  let geofences = JSON.parse(req.body.geofences);
  let n = 0;

  for (gf of geofences) { // Displays max of 15 gift requests near you
    if (n >= 15) break;
    console.log(gf);
    try {
      let res = await database.requests.find({id: gf.externalId}).exec();
      for (k = 0; k < res.length && n < 15; ++k) {
        console.log(res[k]);
        requests.push(res[k]);
        ++n;
      }
    }
    catch(err) {
      console.log(err);
    }
  }

  console.log(requests);
  res.render('submit', {requests: requests});
});

// create the gift request, and Radar.io geofence if needed
router.post('/createrequest', function(req, res, next) {
  if (!req.session.userid) res.redirect('/users/login');
  
  radar.createGeofence(
    req.session.userid,
    `Geofence for ${req.session.userid}`,
    [req.query.lo, req.query.la]
  );

  let request = new database.requests({
    id: req.session.userid,
    description: req.body.description,
    maxCost: req.body.maxCost
  });
  request.save(err => {console.log(err);});

  res.redirect('/users');
});

// create the submissions page with data from the database
router.get('/createsubmit', function(req, res, next) {
  if (!req.session.userid) res.redirect('/users/login');
  else res.render('createsubmit');
});

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

module.exports = router;
