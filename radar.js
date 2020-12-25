var Radar = require('radar-sdk-js');

module.exports.intialize = function initialize() {
  // radar functionality
  Radar.initialize(prj_test_pk_e70c7e7b314f15ad6c4ea2d7aae98064afa8bfd5);
}

module.exports.setUser = function setUser(userId) {
  // identify user
  Radar.setUserId(userId); // stable unique user ID
}
/*
// track
Radar.trackOnce(function(err, loc) {
  if (!err) {
    return loc;
  }
});*/