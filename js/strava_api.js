// http://localhost/exchange_token?state=&code=33e1b24614158d76f9e9be3335dddec19a49268f&scope=read,read_all

const secretID = "7a1eb612657bf210784d436768af70a8059e6fa5";
const clientID = 77288;
const refreshToken = "5a2c4a24cfe92d8637da700572af31d64d5728b7";
// access token must be flexible, as it gets refreshed every 6 hours
var access_token = "09168ff9929035b44297531a834cfba6d9ac6fcf";
var exchange_token = "2c506b3e48536a6236ac2efc7cc0fd6f8608a23e";
const callBackDomain = "http://localhost/";
// const callBackDomain = "file:///G:/my%20drive/bootcamp%20uw/Cardiac-Arrest/index.html/";
// const callBackDomain = "https://molano1979.github.io/Cardiac-Arrest/";
const authLink = "https://www.strava.com/oauth/authorize?scope=read,activity:read_all,profile:read_all,read_all&client_id=" + clientID + "&response_type=code&redirect_uri=" + callBackDomain + "exchange_token&approval_prompt=force";

const activityType = document.getElementById("activityType").value;
const minClimb = document.getElementById("minClimb").value;
const maxClimb = document.getElementById("maxClimb").value;
// var boundsArr = {};

function getSegments(response) {
  const segmentsUrl = `https://www.strava.com/api/v3/segments/explore?bounds=${boundsArrString}&activity_type=${activityType}&min_cat=${minClimb}&max_cat=${maxClimb}?access_token=${access_token}`;
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
