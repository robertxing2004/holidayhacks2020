var Radar = require('radar-sdk-js');
var axios = require('axios');
var properties = require('./properties');

// Create a Radar.io geofence only if it doesn't exist for the user yet
function createGeofence(id, description, coordinates) {
    axios.get(
        `https://api.radar.io/v1/geofences/users/${id}`,
        {headers: {Authorization: `${properties.radarSecret}`}}
    ).
    then(res => {
        console.log("\n\n\ngeofence exists\n********");
    }).
    catch(err => {
        console.log("\n\n\ngeofence doesn't exist, creating geofence\n\n\n");
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
    });
}

// Get all geofences
async function getGeofences() {
    let res;
    try {
        res = await axios.get(
            'https://api.radar.io/v1/geofences',
            {headers: {Authorization: `${properties.radarSecret}`}}
        );
        console.log('\n\n\n*******\ngetting geofences');
    }
    catch(err) {
        console.log(err);
    }
    console.log(res);
    return res.data.geofences;
}

// Get coordinates from geofence of user
async function getGeofenceCoords(id, httpres) {
    axios.get(
        `https://api.radar.io/v1/geofences/users/${id}`,
        {headers: {Authorization: `${properties.radarSecret}`}}
    ).
    then(res => {
        console.log(res.data.geofence.geometryCenter.coordinates);
        httpres.send({
            lo: res.data.geofence.geometryCenter.coordinates[0],
            la: res.data.geofence.geometryCenter.coordinates[1],
        });
    }).
    catch(err => {
        console.log(err);
        httpres.send({message: error});
    });
}

module.exports = {
    createGeofence: createGeofence,
    getGeofences: getGeofences,
    getGeofenceCoords: getGeofenceCoords
};
