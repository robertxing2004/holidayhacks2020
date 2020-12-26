// Interacting with the API

async function addsubmission(mongoId) { // add own submission given the mongoDB _id attribute
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
}

async function confirmsubmission(confirmed, mongoId) { //confirm someone else's submission to you
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
    console.log(message);
    // alert user of response
    alert(message);
}

async function deletesubmission(mongoId) { //delete own submission
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
    console.log(message);
    // alert user of response
    alert(message);
}

async function deleterequest(mongoId) { //delete own gift request
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
    console.log(message);
    // alert user of response
    alert(message);
}