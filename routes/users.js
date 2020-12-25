var express = require('express');
var router = express.Router();

// Users main page
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// Users login page
router.get('/login', function(req, res, next) {

});

//Users github callback page
router.get('/confirmlogin', function(req, res, next) {

});

//Users profile page
router.get('/profile', function(req, res, next) {

});

module.exports = router;
