var Radar = require('radar-sdk-js');
var axios = require('axios');
var properties = require('./properties');

function createGeofence(id, description, coordinates) {
    axios.post(
        'https://api.radar.io/v1/geofences',
        {
            tag: 'users',
            externalId: id,
            description: description,
            coordinates: coordinates
        },
        {headers: {Authorization: `Authorization: ${properties.radarSecret}`}}
    )
}