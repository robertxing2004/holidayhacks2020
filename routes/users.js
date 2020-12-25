var express = require('express');
var router = express.Router();
var axios = require('axios');

var properties = require('../properties');
var database = require('../database');

// Users profile page
router.get('/', function(req, res, next) {
  if (!req.session.username) res.redirect('/users/login');
  else res.render('profile');
});

// Users login page
router.get('/login', function(req, res, next) {
  res.redirect(`https://github.com/login/oauth/authorize?client_id=${properties.clientID}&scope=user`);
});

// confirm login page (github callback)
router.get('/confirmlogin', function(req, res, next) {

  const body = {
    client_id: properties.clientID,
    client_secret: properties.clientSecret,
    code: req.query.code
  };
  const opts = { headers: { accept: 'application/json' } };
  var data;

  axios.post('https://github.com/login/oauth/access_token', body, opts).
    then(res => res.data.access_token).
    then(async token => {
      return (await axios.get('https://api.github.com/user', {headers: {authorization: `token ${token}`}})).data;
    }).
    then(data => {
      let user = new database.users({
        id: data.login,
        email: data.email,
        username: data.name,
        points: 0
      });
      user.save(err => {throw err;});
      req.session.username = data.login;
      console.log(req.session.username);
    }).
    then(() => {
      res.redirect('/users');
    }).
    catch(err => res.status(500).json({ message: err.message }));
})

module.exports = router;
