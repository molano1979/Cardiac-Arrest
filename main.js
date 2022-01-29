//the lat and lng I was trying to enter are for Seattle lat 47.606209 lng -122.332069. Not sure how to enter them properly.

function initMap(){
    var location = {lat: -25.363, lng: 131.044};
    var map = new google.maps.Map(document.getElementById("map"), {
        zoom: 4,
        center: location
    });
var marker = new google.maps.Marker([
    position: location,
    map: map
]);
}
//make change


