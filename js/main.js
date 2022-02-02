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
  const myLatlng = { lat: -25.363, lng: 131.044 };
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    center: myLatlng,
  });
  // Create the initial InfoWindow.
  let infoWindow = new google.maps.InfoWindow({
    content: "Click the map to get Lat/Lng!",
    position: myLatlng,
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
    infoWindow.open(map);
  });
}
