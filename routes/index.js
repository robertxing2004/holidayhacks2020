var express = require('express');
var router = express.Router();

// track
Radar.trackOnce(function(err, loc) {
  if (!err) {
    return loc;
  }
});

// Home page
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
