let map;
let markers = [];
var callback_results;
var boundsArr = [];

function initMap() {
  const origin = {
    lat: 47.615,
    lng: -122.235,
  };
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 12,
    center: origin,
    mapTypeId: "terrain",
  });
  map.addListener("click", (event) => {
    addMarker(event.latLng);
  });
  document
    .getElementById("delete-markers")
    .addEventListener("click", deleteMarkers);
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
      console.log(
        "Maximum amount of markers has been reached:",
        markers.length
      );
    }
  }

  google.maps.event.addListener(map, 'bounds_changed', () => {
    var bounds = map.getBounds();
    var ne = bounds.getNorthEast();
    var sw = bounds.getSouthWest();
    mapBounds = {
      'north': ne.lat(),
      'east': ne.lng(),
      'south': sw.lat(),
      'west': sw.lng()
    }
    localStorage.setItem('bounds', JSON.stringify(mapBounds))
    boundsArr = [mapBounds.north, mapBounds.east, mapBounds.south, mapBounds.west];
    boundsArrString = boundsArr.toString();
    console.log(boundsArr)
  })

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
}

// document.onload() = {
//   fetch(authorize, 'https://www.strava.com/oauth/authorize') {

//   }
// }