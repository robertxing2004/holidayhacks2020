// Interacting with the API

async function addSubmission(mongoId) { // add own submission given the mongoDB _id attribute
    let res = await fetch(
        '/addsubmission',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({mongoId: mongoId})
        }
    );
    res = await res.json();
    message = res.message;
    console.log(message);
    // alert user of response
    alert(message);
    // show changes
    location.reload();
}

async function confirmSubmission(confirmed, mongoId) { //confirm someone else's submission to you
    console.log(mongoId);
    let res = await fetch(
        '/confirmsubmission',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                confirmed: confirmed,
                mongoId: mongoId
            })
        }
    );
    res = await res.json();
    message = res.message;
    // alert user of response
    alert(message);
    // show changes
    location.reload();
}

async function deleteSubmission(mongoId) { //delete own submission
    console.log(mongoId);
    let res = await fetch(
        '/deletesubmission',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({mongoId: mongoId})
        }
    );
    res = await res.json();
    message = res.message;
    // alert user of response
    alert(message);
    // show changes
    location.reload();
}

async function deleteRequest(mongoId) { //delete own gift request and all submissions associated with it
    console.log(mongoId);
    let res = await fetch(
        '/deleterequest',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({mongoId: mongoId})
        }
    );
    res = await res.json();
    message = res.message;
    // alert user of response
    alert(message);
    // show changes
    location.reload();
}

async function getLocation(userid) { //get coordinates from an id (assumes a geofence exists)
    console.log(userid);
    let res = await fetch(
        '/getlocation',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({userid: userid})
        }
    );
    res = await res.json();
    coords = res.coords;
    //do something with coords
}