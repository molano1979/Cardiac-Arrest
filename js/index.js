let map;
let markers = [];
var callback_results;
var south, west, north, east = '';

function initMap() {
  // const directionsService = new google.maps.DirectionsService();
  // const directionsRenderer = new google.maps.DirectionsRenderer();
  const origin = {
    lat: 47.615,
    lng: -122.235,
  };
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 12,
    center: origin,
    mapTypeId: "terrain",
    streetViewControl: false,
    showTooltip: false,
    showInfoWindow: false,
  });
  var customStyled = [
    {
      featureType: "all",
      elementType: "labels",
      stylers: [{ visibility: "off" }],
    },
  ];
  map.set("styles", customStyled);
  map.setTilt(0);
  map.addListener("click", (event) => {
    addMarker(event.latLng);
  });
  document
    .getElementById("delete-markers")
    .addEventListener("click", deleteMarkers);
  //
  // directionsRenderer.setMap(map);
  // document.getElementById("submit").addEventListener("click", () => {
  //   calculateAndDisplayRoute(directionsService, directionsRenderer);
  // });
}

// to delete markers We need a button: <input id="delete-markers" type="button" value="Delete Markers">
function addMarker(position) {
  if (markers.length == 0) {
    const marker = new google.maps.Marker({
      position,
      map,
      animation: google.maps.Animation.BOUNCE,
    });
    markers.push(marker);
  } else if (markers.length == 1) {
    const marker = new google.maps.Marker({
      position,
      map,
      animation: google.maps.Animation.BOUNCE,
    });
    markers.push(marker);

    boundsJSON = {
      south: markers[0].position.toJSON().lat,
      west: markers[0].position.toJSON().lng,
      north: markers[1].position.toJSON().lat,
      east: markers[1].position.toJSON().lng
    }

    // console.log("S latitude coordinate", boundsJSON.south);
    // console.log("W longitude coordinate", boundsJSON.west);

    // console.log("N latitude coordinate", boundsJSON.north);
    // console.log("E longitude coordinate", boundsJSON.east);

    localStorage.setItem("boundsJSON", JSON.stringify(boundsJSON));
  } else {
    console.log("Maximum amount of markers has been reached:", markers.length);
  }
}

function setMapOnAll(map) {
  for (let i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}
function hideMarkers() {
  setMapOnAll(null);
}

function deleteMarkers() {
  hideMarkers();
  markers = [];
}

// closing argument

// function routeDraw() {
//   const directionsService = new google.maps.DirectionsService();
//   const directionsRenderer = new google.maps.DirectionsRenderer();
// }
function calculateAndDisplayRoute(directionsService, directionsRenderer) {
  const waypts = [];
  // const checkboxArray = document.getElementById("waypoints");

  // for (let i = 0; i < checkboxArray.length; i++) {
  //   if (checkboxArray.options[i].selected) {
  //     waypts.push({
  //       location: checkboxArray[i].value,
  //       stopover: true,
  //     });
  //   }
  // }

  directionsService
    .route({
      origin: localStorage.getItem("start_latlng"),
      destination: localStorage.getItem("end_latlng"),
      waypoints: waypts,
      optimizeWaypoints: true,
      travelMode: google.maps.TravelMode.WALKING,
    })
    .then((response) => {
      directionsRenderer.setDirections(response);

      // const route = response.routes[0];
      // const summaryPanel = document.getElementById("directions-panel");

      // summaryPanel.innerHTML = "";

      // // For each route, display summary information.
      // for (let i = 0; i < route.legs.length; i++) {
      //   const routeSegment = i + 1;

      //   summaryPanel.innerHTML +=
      //     "<b>Route Segment: " + routeSegment + "</b><br>";
      //   summaryPanel.innerHTML += route.legs[i].start_address + " to ";
      //   summaryPanel.innerHTML += route.legs[i].end_address + "<br>";
      //   summaryPanel.innerHTML += route.legs[i].distance.text + "<br><br>";
    })
    .catch((e) => window.alert("Directions request failed due to " + status));
}

function getLastBounds() {
  if (localStorage.getItem('boundsJSON')) {
    lastBounds = {
      south: JSON.parse(localStorage.getItem('boundsJSON')).south,
      west: JSON.parse(localStorage.getItem('boundsJSON')).west,
      north: JSON.parse(localStorage.getItem('boundsJSON')).north,
      east: JSON.parse(localStorage.getItem('boundsJSON')).east
    }
    return boundsArr = [lastBounds.south, lastBounds.west, lastBounds.north, lastBounds.east];
  }
}
