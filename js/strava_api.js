// http://localhost/exchange_token?state=&code=33e1b24614158d76f9e9be3335dddec19a49268f&scope=read,read_all

const secretID = "7a1eb612657bf210784d436768af70a8059e6fa5";
const clientID = 77288;
const refreshToken = "5a2c4a24cfe92d8637da700572af31d64d5728b7";
var access_token = "7a2502d1bae84411129458caefa8838a5e59bbdf";
const authLink = "https://www.strava.com/oauth/authorize";

var activityType = document.getElementById("activityType").value; //needs an html drop down menu with id="activityType" selection with two values "running" and "riding"
var minClimb = document.getElementById("minClimb").value; // minClimb needs a limited number input field <input type="number" id="minClimb" min="1" max="3">
// must be limited to 3 since maximum will be from 2 to 4.
var maxClimb = document.getElementById("maxClimb").value; // same as above: <input type="number" id="maxClimb" min="2" max="4">
// temp values for latitudes and longitudes, will have to be pulled from googlemaps api output
var latSW = 47.615;
var lonSW = -122.235;
var latNE = 47.655;
var lonNE = -122.205;
// temp ^
var boundsArr = [latSW, lonSW, latNE, lonNE]; // the actual values will have to be recieved from google api

function getSegments(response) {
  const segmentsUrl = `https://www.strava.com/api/v3/segments/explore?bounds=${boundsArr}&activity_type=${activityType}&min_cat=${minClimb}&max_cat=${maxClimb}?access_token=${access_token}`;
  fetch(segmentsUrl, {
    method: "GET",
    headers: {
      Authorization: "Bearer 7a2502d1bae84411129458caefa8838a5e59bbdf",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

$("#submit").click(getSegments()); // button with an id="submit" to run the getSegments function after variables have been selected and read by document.querySelector dom, or maybe a <form>? something like that

//
//
//
//
//
//
//
//
//

// setting explicit scopes in app script going to have to wait, if we have time

// function getAuthToken() {
//   // POST Request (To get Access Token)
//   var url =
//     "https://api.us.onelogin.com/auth/oauth2/v2/token?grant_type=client_credentials";

//   var postOptions = {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json; charset=utf-8",
//       Authorization:
//         "client_id:77288, client_secret:7a1eb612657bf210784d436768af70a8059e6fa5",
//     },
//     redirect: "follow",
//   };
//   const access_token = UrlFetchApp.fetch(url, postOptions);
//   getSegments();
//   function getSegments(response) {
//     const segmentsUrl = `https://www.strava.com/api/v3/segments/explore?bounds=${boundsArr}&activity_type=${activityType}&min_cat=${minClimb}&max_cat=${maxClimb}?access_token=${access_token}`;
//     fetch(segmentsUrl, {
//       method: "GET",
//       headers: {
//         Authorization: "Bearer 7a2502d1bae84411129458caefa8838a5e59bbdf",
//       },
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         console.log("Success:", data);
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//       });
//   }
// }

// getAuthToken();
