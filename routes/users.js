var express = require('express');
var router = express.Router();
var axios = require('axios');

var properties = require('../properties');
var database = require('../database');
var radar = require('../radar');

// Users profile page
router.get('/', async function(req, res, next) {
  if (!req.session.userid) res.redirect('/users/login');
  else {
    let confirms = [];
    let submissions = [];
    let requests = [];

    let userid = req.session.userid
    let user;

    try {
      let res = await database.submissions.find({requestid: userid}).exec();
      for (conf of res) {
        confirms.push(conf);
      }
    }
    catch(err) {
      console.log(err);
    }

    try {
      let res = await database.submissions.find({id: userid}).exec();
      for (sub of res) {
        submissions.push(sub);
      }
    }
    catch(err) {
      console.log(err);
    }

    try {
      let res = await database.requests.find({id: userid}).exec();
      for (req of res) {
        requests.push(req);
      }
    }
    catch(err) {
      console.log(err);
    }

    try{
      user = await database.users.findOne({id: userid}).exec();
    }
    catch(err) {
      console.log(err);
    }

    res.render('dashboard', {
      id: user.id,
      name: user.username,
      points: user.points,
      confirms: confirms,
      submissions: submissions,
      requests: requests
    });
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

  let nearrequests = [];
  let allrequests = [];

  let nearexists = [];
  let allexists = [];

  let neargeofences = JSON.parse(req.body.geofences);
  let allgeofences = await radar.getGeofences();
  
  let n = 0;
  for (gf of neargeofences) { // Displays max of 15 gift requests near you
    if (n >= 15) break;
    try {
      let res = await database.requests.find({id: gf.externalId}).exec();
      for (k = 0; k < res.length && n < 15; ++k) {
        let submitquery = await database.submissions.findOne({
          request_id: res[k]._id,
          id: req.session.userid
        }).exec();
        if (submitquery) nearexists.push(true);
        else nearexists.push(false);
        nearrequests.push(res[k]);
        ++n;
      }
    }
    catch(err) {
      console.log(err);
    }
  }

  for (gf of allgeofences) { // Displays all gift requests
    try {
      let res = await database.requests.find({id: gf.externalId}).exec();
      for (sub of res) {
        let submitquery = await database.submissions.findOne({
          request_id: sub._id,
          id: req.session.userid
        }).exec();
        if (submitquery) allexists.push(true);
        else allexists.push(false);
        allrequests.push(sub);
      }
    }
    catch(err) {
      console.log(err);
    }
  }

  console.log(nearrequests);
  console.log(nearexists);
  console.log(allrequests);
  console.log(allexists);
  res.render('submit', {
    nearrequests: nearrequests,
    nearexists: nearexists,
    allrequests: allrequests,
    allexists: allexists
  });
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

// shows the address of the gift recipient and directions to get there
router.post('/directions', function(req, res, next) {
  if (!req.session.userid) res.redirect('/users/login');
  
  console.log(req.body.lo);
  console.log(req.body.la);
  res.render('directions', {
    userid: req.body.id,
    lo: req.body.lo,
    la: req.body.la
  });
})

module.exports = router;
