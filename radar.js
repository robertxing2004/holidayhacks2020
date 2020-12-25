var Radar = require('radar-sdk-js');

// radar functionality
Radar.initialize(prj_test_pk_e70c7e7b314f15ad6c4ea2d7aae98064afa8bfd5);

// identify user
Radar.setUserId(userId); // stable unique user ID
Radar.setMetadata(metadata); // OPTIONAL, JSON object, up to 16 keys and of type string, boolean, or number

// track
Radar.trackOnce(function(err, loc) {
    if (!err) {
      return loc;
    }
  });