//the lat and lng I was trying to enter are for Seattle lat 47.606209 lng -122.332069. Not sure how to enter them properly.

// function initMap(){
//     var location = {lat: -25.363, lng: 131.044};
//     var map = new google.maps.Map(document.getElementById("map"), {
//         zoom: 4,
//         center: location
//     });
// var marker = new google.maps.Marker([
//     position: location,
//     map: map
// ]);
// }

function initMap() {
  const origin = {
    lat: 47.615,
    lng: -122.235,
  };
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 14,
    center: origin,
  });
  // Create the initial InfoWindow.

  // google.maps.event.addListener(map, "bounds_changed", function () {
  //   var bounds = map.getBounds();
  //   var ne = bounds.getNorthEast();
  //   var sw = bounds.getSouthWest();
  //   boundsArr = [sw, ne];
  // });
  map.addListener("click", (e) => {
    placeMarkerAndPanTo(e.latLng, map);
  });

  function placeMarkerAndPanTo(latLng, map) {
    new google.maps.Marker({
      position: latLng,
      map: map,
      animation: google.maps.Animation.BOUNCE,
    });
    map.panTo(latLng);
    JSON.stringify(latLng.toJSON(), null, 2);
    var clickLocation = JSON.parse(JSON.stringify(latLng.toJSON()));
    const latSW = clickLocation.lat;
    const lonSW = clickLocation.lng;
    console.log("SW latitude coordinate", latSW);
    console.log("SW longitude coordinate", lonSW);
    localStorage.setItem("latSW", latSW);
    localStorage.setItem("lonSW", lonSW);
  }
}
