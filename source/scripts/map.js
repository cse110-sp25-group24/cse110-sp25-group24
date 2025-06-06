// // Implement Base Map Issue #32

let map = null;

const API_KEY_STORAGE = "googleMapsApiKLey";

// function removeAPIInput(){
//   document.getElementById("apiKeyInput").remove();
//   document.getElementById("apiKeyPrompt").remove();
//   document.getElementById("loadMapBtn").remove();
// }

document.addEventListener("DOMContentLoaded", () => {
  const savedApiKey = localStorage.getItem(API_KEY_STORAGE);

  if (savedApiKey) {
    loadMaps(savedApiKey);
  }

  // removeAPIInput();
});

/**
 * Callback function for Google Maps API to initialize the map.
 * Sets up the map centered on San Diego with some controls disabled.
 * Also adds a marker at the center point.
 */
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 32.8802, lng: -117.2392 }, // San Diego
    zoom: 10,
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false,
  });

  // add a for loop here to access all card info and get coords. 
  addMarker(map, 32.8802, -117.2392);
}

// Given API key and a callback function (default is initMap), loads the map content onto  
function loadMaps(apiKey, libraries='',callBack='initMap') {
  let script = document.createElement("script");
  script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=${libraries}&callback=${callBack}`;
  script.async = true;

  // need to improve this error handling.

  script.onerror = () => {
    alert("Failed to load Google Maps API. Check your API key.");
  };

  document.head.appendChild(script);
}


document.getElementById("loadMapBtn").addEventListener("click", () => {
  const apiKey = document.getElementById("apiKeyInput").value.trim();
  if (!apiKey) {
    alert("Please enter a valid API key.");
    return;
  }

  localStorage.setItem(API_KEY_STORAGE, apiKey);

  loadMaps(apiKey)
  // removeAPIInput();
  document.getElementById("apiKeyInput").remove();
  document.getElementById("apiKeyPrompt").remove();
  document.getElementById("loadMapBtn").remove();

});

/**
 * Adds a marker to the specified map at given latitude and longitude.
 * @param {google.maps.Map} map - The map instance to add the marker to.
 * @param {number} lat - Latitude coordinate for the marker.
 * @param {number} lng - Longitude coordinate for the marker.
 * @param {string} [title=""] - Optional title text for the marker tooltip.
 */
function addMarker(map, lat, lng, title = "") {
  console.log("Attempting to add marker", lat, lng, title);

  let marker = new google.maps.Marker({ // legacy code
    position: new google.maps.LatLng(lat, lng),
    map: map,
    title: title,
  });

  // try to implement advanced advanced marker element by tn
  // let marker =  google.maps.marker.AdvancedMarkerElement({ // legacy code
  //   position: new google.maps.LatLng(lat, lng),
  //   map: map,
  //   title: title,
  // });
}
