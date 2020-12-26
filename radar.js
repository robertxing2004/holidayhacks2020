var Radar = require('radar-sdk-js');
var axios = require('axios');
var properties = require('./properties');

// Check to see if a Radar.io geofence exists for the user
async function checkGeofence(id) {
    let res;
    try {
        res = await axios.get(
            `https://api.radar.io/v1/geofences/users/${id}`,
            {headers: {Authorization: `${properties.radarSecret}`}}
        );
    }
    catch(err) {
        console.log("\n\n\nerror occured\n\n\n");
        return false;
    }
    console.log(res);
    return true;
}

// Create a Radar.io geofence
function createGeofence(id, description, coordinates) {
    axios.post(
        'https://api.radar.io/v1/geofences',
        {
            tag: 'users',
            externalId: id,
            type: 'circle',
            radius: 100,
            description: description,
            coordinates: coordinates
        },
        {headers: {Authorization: `${properties.radarSecret}`}}
    ).
    catch(err => {
        console.log(err);
    });
}

module.exports = {
    checkGeofence: checkGeofence,
    createGeofence: createGeofence
};
