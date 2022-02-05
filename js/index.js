let map;
let markers = [];
var callback_results;

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
  });
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

    console.log("SW", markers[0].position.toJSON());
    console.log("NE", markers[1].position.toJSON());

    var southWest = JSON.parse(JSON.stringify(markers[0].position.toJSON()));
    const latSW = southWest.lat;
    const lonSW = southWest.lng;

    var northEast = JSON.parse(JSON.stringify(markers[1].position.toJSON()));
    const latNE = northEast.lat;
    const lonNE = northEast.lng;

    console.log("SW latitude coordinate", latSW);
    console.log("SW longitude coordinate", lonSW);

    console.log("NE latitude coordinate", latNE);
    console.log("NE longitude coordinate", lonNE);

    localStorage.setItem("latSW", latSW);
    localStorage.setItem("lonSW", lonSW);
    localStorage.setItem("latNE", latNE);
    localStorage.setItem("lonNE", lonNE);
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
