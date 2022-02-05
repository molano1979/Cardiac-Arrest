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
      elementType: "geometry",
      stylers: [
        {
          color: "#ebe3cd",
        },
      ],
    },
    {
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#523735",
        },
      ],
    },
    {
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#f5f1e6",
        },
      ],
    },
    {
      featureType: "administrative",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: "#c9b2a6",
        },
      ],
    },
    {
      featureType: "administrative.land_parcel",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "administrative.land_parcel",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: "#dcd2be",
        },
      ],
    },
    {
      featureType: "administrative.land_parcel",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#ae9e90",
        },
      ],
    },
    {
      featureType: "administrative.neighborhood",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "landscape.natural",
      elementType: "geometry",
      stylers: [
        {
          color: "#dfd2ae",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "geometry",
      stylers: [
        {
          color: "#dfd2ae",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "labels.text",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#93817c",
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#a5b076",
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#447530",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [
        {
          color: "#f5f1e6",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "labels",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "road.arterial",
      elementType: "geometry",
      stylers: [
        {
          color: "#fdfcf8",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [
        {
          color: "#f8c967",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: "#e9bc62",
        },
      ],
    },
    {
      featureType: "road.highway.controlled_access",
      elementType: "geometry",
      stylers: [
        {
          color: "#e98d58",
        },
      ],
    },
    {
      featureType: "road.highway.controlled_access",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: "#db8555",
        },
      ],
    },
    {
      featureType: "road.local",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#806b63",
        },
      ],
    },
    {
      featureType: "transit.line",
      elementType: "geometry",
      stylers: [
        {
          color: "#dfd2ae",
        },
      ],
    },
    {
      featureType: "transit.line",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#8f7d77",
        },
      ],
    },
    {
      featureType: "transit.line",
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#ebe3cd",
        },
      ],
    },
    {
      featureType: "transit.station",
      elementType: "geometry",
      stylers: [
        {
          color: "#dfd2ae",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#b9d3c2",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "labels.text",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#92998d",
        },
      ],
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

  google.maps.event.addListener(map, 'bounds_changed', () => {
    var bounds = map.getBounds();
    var ne = bounds.getNorthEast();
    var sw = bounds.getSouthWest();
    boundsJSON = {
      'south': sw.lat(),
      'west': sw.lng(),
      'north': ne.lat(),
      'east': ne.lng()
    }
    localStorage.setItem('boundsJSON', JSON.stringify(boundsJSON))
    boundsArr = [boundsJSON.south, boundsJSON.west, boundsJSON.north, boundsJSON.east];
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

// document.onload() = {
//   fetch(authorize, 'https://www.strava.com/oauth/authorize') {

//   }
// }