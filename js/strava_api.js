// http://localhost/exchange_token?state=&code=33e1b24614158d76f9e9be3335dddec19a49268f&scope=read,read_all

const secretID = "7a1eb612657bf210784d436768af70a8059e6fa5";
const clientID = 77288;
const refreshToken = "5a2c4a24cfe92d8637da700572af31d64d5728b7";
// access token must be flexible, as it gets refreshed every 6 hours
var exchange_token = "2c506b3e48536a6236ac2efc7cc0fd6f8608a23e";
const callBackDomain = "http://localhost/";
var access_token = "ddab1afabce3ef95516c13e2d7f9f841a307170f";
const authLink = "https://www.strava.com/oauth/authorize";

const activityType = document.getElementById("activityType").value;
const minClimb = document.getElementById("minClimb").value;
const maxClimb = document.getElementById("maxClimb").value;

function getSegments(response) {

  boundsArr = getLastBounds();

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
      var segmentList = [];
      var cardTarget = 5;
      var cardLimit = 3;
      if (data.segments.length > cardLimit) {
        cardTarget = 6;
      } else {
        cardTarget = data.segments.length;
      }

      for (var i = 0; i < cardTarget; i++) {
        var currentSegment = data.segments[i];
        // var start = currentSegment.start_latlng;
        // localStorage.setItem("start_latlng", start);
        // var end = currentSegment.end_latlng;
        // localStorage.setItem("end_latlng", end);
        var name = currentSegment.name;
        var avgGrade = currentSegment.avg_grade;
        var climbL = currentSegment.distance;
        var profileC = currentSegment.elevation_profile;
        var lats = currentSegment.start_latlng[0];
        var lons = currentSegment.start_latlng[1];
        let hillsCard = `
          <div class="col-sm this" >
          <div class="card">
          <div class="card-body">
          <p><strong>${name}</strong></p>
          <!--- <div><img src=${profileC} /></div> --->
          <p>Length: ${climbL} feet.</p>
          <p>Grade: ${avgGrade}%</p>
          <!--- <p><a href="https://www.google.com/maps/search/?api=1&query=${lats}%2C${lons}">Starting location</a></p></div> --->
          </div>
          </div>`;
        segmentList.push(hillsCard);
      }
      //
      $("#hillCards").html(segmentList.join(""));
      hideFunction();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

// $("#submit").click(hideFunction()); // button with an id="submit" to run the getSegments function after variables have been selected and read by document.querySelector dom, or maybe a <form>? something like that

function hideFunction() {
  var x = document.getElementById("hillCards");
  if (x.style.display === "none") {
    x.style.display = "flex";
  } else {
    x.style.display = "none";
    getSegments();
  }
}

function showFunction() {
  var y = document.getElementById("hillCards");
  if (y.style.display === "flex") {
    y.style.display = "none";
  }
}

setTimeout(function() {
  if (map) {
    map.addListener('bounds_changed', () => {
      getSegments();
    })
  } else {
    console.log('map is not ready for strava yet');
  }
}, 1000)

setInterval( () => {
  // if current coords are not equal to previous coordinates, update strava data
  if (boundsArr != boundsJSON) {
    getSegments();
  }
}, 1000)