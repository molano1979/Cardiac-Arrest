let map;
let markers = [];
var callback_results;

function initMap() {
  const origin = {
    lat: 47.615,
    lng: -122.235,
  };
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 14,
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
    if (markers.length <= 1) {
      const marker = new google.maps.Marker({
        position,
        map,
        animation: google.maps.Animation.BOUNCE,
      });
      markers.push(marker);
      console.log("need to find coordiantes in these", markers);
    } else {
      console.log(
        "Maximum amount of markers has been reached:",
        markers.length
      );
      //
      //now we hide the code until it's parsed
      //
      // JSON.stringify(latLng.toJSON(), null, 2);
      //   var clickLocation = JSON.parse(JSON.stringify(latLng.toJSON()));
      //   const latSW = clickLocation.lat;
      //   const lonSW = clickLocation.lng;
      //   console.log("SW latitude coordinate", latSW);
      //   console.log("SW longitude coordinate", lonSW);
      //   localStorage.setItem("latSW", latSW);
      //   localStorage.setItem("lonSW", lonSW);
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
}
