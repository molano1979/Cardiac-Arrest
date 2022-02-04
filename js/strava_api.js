// http://localhost/exchange_token?state=&code=33e1b24614158d76f9e9be3335dddec19a49268f&scope=read,read_all

const secretID = "7a1eb612657bf210784d436768af70a8059e6fa5";
const clientID = 77288;
const refreshToken = "5a2c4a24cfe92d8637da700572af31d64d5728b7";
// access token must be flexible, as it gets refreshed every 6 hours
var access_token = "21bf63dea698faa4b7d00d610f84433cf87be1fd";
const authLink = "https://www.strava.com/oauth/authorize";

const activityType = document.getElementById("activityType").value;
const minClimb = document.getElementById("minClimb").value;
const maxClimb = document.getElementById("maxClimb").value;
var latSW = localStorage.getItem("latSW");
var lonSW = localStorage.getItem("lonSW");
var latNE = localStorage.getItem("latNE");
var lonNE = localStorage.getItem("lonNE");
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
      // for i
      console.log("segment", data.segments[0].name);
      console.log("segment", data.segments[0].avg_grade);
      console.log("segment", data.segments[0].distance);
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
