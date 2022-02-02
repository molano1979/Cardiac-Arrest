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
  const origin = { lat: 47.615, lng: -122.235 };
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 14,
    center: origin,
  });
  // Create the initial InfoWindow.
  let infoWindow = new google.maps.InfoWindow({
    content: "Click on the map to set the corners of the search boundary",
    position: origin,
  });

  map.addListener("click", (e) => {
    placeMarkerAndPanTo(e.latLng, map);
  });

  infoWindow.open(map);
  // Configure the click listener.
  map.addListener("click", (mapsMouseEvent) => {
    // Close the current InfoWindow.
    infoWindow.close();
    // Create a new InfoWindow.
    infoWindow = new google.maps.InfoWindow({
      position: mapsMouseEvent.latLng,
    });
    infoWindow.setContent(
      JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2)
    );
    //this is the string
    console.log("this is latitude and longitude string of the click event");
    // we need to get the latitude and longitude stored in latSW and lonSW variables for the strava api to use.
    console.log(JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2));
    // { lat: -25.363882, lng: 131.044922 } =
  });

  function placeMarkerAndPanTo(latLng, map) {
    new google.maps.Marker({
      position: latLng,
      map: map,
      animation: google.maps.Animation.BOUNCE,
    });
    map.panTo(latLng);
  }
}
// function toggleBounce() {
//   if (marker.getAnimation() !== null) {
//     marker.setAnimation(null);
//   } else {
//     marker.setAnimation(google.maps.Animation.BOUNCE);
//   }
// }
