// http://localhost/exchange_token?state=&code=33e1b24614158d76f9e9be3335dddec19a49268f&scope=read,read_all

const secretID = "7a1eb612657bf210784d436768af70a8059e6fa5";
const clientID = 77288;
const refreshToken = "5a2c4a24cfe92d8637da700572af31d64d5728b7";
var access_token = "7a2502d1bae84411129458caefa8838a5e59bbdf";
const authLink = "https://www.strava.com/oauth/authorize";
var activityType = "running"; // running, riding
var minClimb = 4;
var maxClimb = 1;
// temp
var latSW = 47.615;
var lonSW = -122.235;
var latNE = 47.655;
var lonNE = -122.205;
// temp ^
var boundsArr = [latSW, lonSW, latNE, lonNE];

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
getSegments();
