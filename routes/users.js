var express = require('express');
var axios = require('axios');
var properties = require('../properties');
var router = express.Router();

// Users profile page
router.get('/', function(req, res, next) {
  res.send('profile page');
});

// Users login page
router.get('/login', function(req, res, next) {
  res.redirect(`https://github.com/login/oauth/authorize?client_id=${appinfo.clientID}`);

});

// confirm login page (github callback)
router.get('/confirmlogin', function(req, res, next) {
  var client = req.app.locals.client;

  const body = {
    client_id: properties.clientID,
    client_secret: properties.clientSecret,
    code: req.query.code
  };

  const opts = { headers: { accept: 'application/json' } };

  axios.post(`https://github.com/login/oauth/access_token`, body, opts).
    then(res => {
      var token = res.data.access_token;

      
    }).
    catch(err => res.status(500).json({ message: err.message }));
})

module.exports = router;
