# Neighbourhood Santa
_Winner of "In the spirit of the Holiday Season" Hack_  
Submission to MLH's Holiday Hacks 2020
## Inspiration
One of the best parts of the holidays is the presents! However, there are many circumstances that cause some to not receive presents. Inspired by efforts such as toy donations to children's hospitals and winter food bank drives, we wanted to make it easier for less fortunate people to receive presents, and kind-hearted people to give them.

We took inspiration from "Secret Santa," where each person is another's Santa, and considered how we could implement the Radar.io API (which we had never used before). Since our team consists of only high school students with limited experience, we're extremely proud of our Neighbourhood Santa web app!

## What it does
Our app is a gift-exchange platform, with multiple features to make gift giving more convenient and incentivized. Users create gift requests, and other people can create a submission for that request (and ultimately deliver the gift). We believe this will be especially useful when food banks, hospitals, or other charitable organizations create accounts and request gifts they need to distribute (e.g, a children's hospital requesting toys). Since all gifts are specifically requested by the charity, these donations are more targeted and useful. The app makes it easier for users to donate to these organizations in a meaningful and festive way!

From the dashboard, you can create a gift request while submitting a detailed description of the gift you want, and a maximum price limit to establish a budget. If you haven't made any gift requests before, we use Radar.io to track your coordinates and create a new geofence with them. You can also choose to submit a gift in response to someone else's request. In order to give a gift, you can simply click on a gift request and you'll add a pending submission. From your dashboard, you can edit your requests and pending submissions, as well as see the addresses you need to deliver to (when you give them the gift). A directions page will contain a recipient's approximate address, the distance it takes to get there, and info to help plan your trip.

In order to incentivize users to give gifts, we gamified the process and created a point system. You get points by delivering a gift! Note you will only get points if the recipient confirms your submission. To create competitiveness, we rank the top 15 users on the leaderboard and show their points.

## How we built it
Once we had our idea, we split the workload so that we could each work on what we felt more comfortable with. The backend was built with Node and Express, while the frontend was built with Pug, CSS, and JavaScript. We connected our app to MongoDB for the database. For logging users in, we used Github's Oauth API.

We used Radar.io's API extensively, such as for creating geofences for new users, getting gift requests within 10km of you, getting all gift requests in total, reverse Geocoding coordinates into a gift recipient's address, checking the distance between you and the recipient's address, and tracking your location. This was very complex for us as we had limited experience working with APIs, and we spent a lot of debugging (oftentimes very simple) mistakes.

## Challenges we ran into
This was the first time we used MongoDB, so we had a few hiccups getting the initial database connection. This was also our first time using the Radar.io API. One significant challenge we had was trying to create geofences. It turned out that in order to create geofences, we needed to use a secret API key from the backend, but we had been using the public key instead.

Another challenge occurred while trying to create an interface for confirming submissions, deleting your own requests, and deleting your own submissions. We wanted to keep users on the same page without needing to redirect to another page, so we instead created endpoints that would take a POST request and perform the action that we wanted (deleting the request, confirming the submission, etc). This was the first time we created endpoints not meant to be visited by the user!

We also overcame many challenges in the design of the app and iterated over many UI choices.

## Accomplishments that we're proud of
For Robert and Andrew, this is the first hackathon they've ever attended. For Scott and Josh, this is their second. Even though we had limited experience, we were still able to make a complex and technically demanding app!

This was the first time any of us worked with Radar.io and with REST APIs in general, and we were able to navigate through often limited documentation and figure things out. For Scott, he learned a lot about how to interact with APIs, and about HTTP requests. For Robert, this was his first real experience with Pug and he thinks it felt so much easier and quicker using Pug instead of HTML. For Andrew, he had never worked on a programming project of this scale before. He learned a lot about both server-side and client-side web development using JavaScript, Pug, CSS, and Mongoose.

## What we learned
We're glad we did all the heavy lifting early on, it's definitely the way to go when approaching a project like this. It made our final 24 hours so much more relaxed and we didn't feel as though we were running out of time.

In terms of technical skills, we learned how to use REST APIs, and Radar in particular, as well as Pug and JavaScript. We also learned how to use MongoDB.

## What's next for Neighbourhood Santa
If we had more time, we would like to add "verified" accounts, so if an account was made on behalf of a charity organization or some other non-profit, their requests would take precedence over other ones (for security). We could also add a direct messaging feature so accounts could chat with each other.
