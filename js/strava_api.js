// http://localhost/exchange_token?state=&code=33e1b24614158d76f9e9be3335dddec19a49268f&scope=read,read_all

const secretID = "7a1eb612657bf210784d436768af70a8059e6fa5";
const clientID = 77288;
const refreshToken = "5a2c4a24cfe92d8637da700572af31d64d5728b7";
// access token must be flexible, as it gets refreshed every 6 hours
var access_token = "3d48c8b06140973077a646386de3417b7582e13b";
const authLink = "https://www.strava.com/oauth/authorize";
const refreshLink = "https://www.strava.com/oauth/token";
///////////////////////////////
//refreshing the access_token//
///////////////////////////////
function reAuthorize() {
  fetch(refreshLink, {
    method: "post",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      client_id: `${clientID}`,
      client_secret: `${secretID}`,
      refresh_token: `${refreshToken}`,
      grant_type: "refresh_token",
    }),
  }).then((res) => res.json());
}
reAuthorize();
////////////////////////
/// you may proceed ///
///////////////////////
const activityType = document.getElementById("activityType").value;
const minClimb = document.getElementById("minClimb").value;
const maxClimb = document.getElementById("maxClimb").value;
var latSW = 47.615;
var lonSW = -122.235;
var latNE = 47.655;
var lonNE = -122.205;
const boundsArr = [latSW, lonSW, latNE, lonNE];

function getSegments(response) {
  const segmentsUrl = `https://www.strava.com/api/v3/segments/explore?bounds=${boundsArr}&activity_type=${activityType}&min_cat=${minClimb}&max_cat=${maxClimb}?access_token=${access_token}`;
  fetch(segmentsUrl, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${access_token}`,
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
