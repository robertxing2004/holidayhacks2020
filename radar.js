var Radar = require('radar-sdk-js');
var axios = require('axios');
var properties = require('./properties');

// Create a Radar.io geofence only if it doesn't exist for the user yet
function createGeofence(id, description, coordinates) {
    console.log(id);
    console.log(description);
    console.log(coordinates);
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

module.exports = {
    createGeofence: createGeofence
};
