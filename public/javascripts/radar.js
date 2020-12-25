import Radar from 'radar-sdk-js';
import axios from 'axios';
Radar.initialize('prj_test_pk_d5f66490d6cfa0cbdc3f4075c9f432c2368cdb59'); //Test client

function initializeUser(id) { //id is user's id we store in database
    Radar.setUserId(id);
}

function getCoords(id) { 

}

function createGeofence(id, description) { 
    axios.post(
        'https://api.radar.io/v1/geofences',
        {
            tag: 'users',
            externalID: id,
            description: description,
            type: 'circle',
            radius: 100
        },
        { headers: { Authorization: 'prj_test_pk_d5f66490d6cfa0cbdc3f4075c9f432c2368cdb59' } }
    ).
    then(res => {
        console.log(res);
    }).
    catch(err => {
        console.log(err);
    });
}