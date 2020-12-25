var express = require('express');
var router = express.Router();

// Home page
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Placeholder' });
});

module.exports = router;
