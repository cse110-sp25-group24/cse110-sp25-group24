// // Implement Base Map Issue #32

const API_KEY_STORAGE = "googleMapsApiKLey";

document.addEventListener("DOMContentLoaded", () => {
  const savedApiKey = localStorage.getItem(API_KEY_STORAGE);
  const apiKeyInput = document.getElementById("apiKeyInput");

  if (savedApiKey && apiKeyInput) {
    apiKeyInput.value = savedApiKey;
    loadMapBtn.click();
  }
});

/**
 * Callback function for Google Maps API to initialize the map.
 * Sets up the map centered on San Diego with some controls disabled.
 * Also adds a marker at the center point.
 */
function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 32.8802, lng: -117.2392 }, // San Diego
    zoom: 10,
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false,
  });

  addMarker(map, 32.8802, -117.2392);
}

function getScript(apiKey) {
  let script = document.createElement("script");
  script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
  script.async = true;

  return script;
}

document.getElementById("loadMapBtn").addEventListener("click", () => {
  const apiKey = document.getElementById("apiKeyInput").value.trim();
  if (!apiKey) {
    alert("Please enter a valid API key.");
    return;
  }

  localStorage.setItem(API_KEY_STORAGE, apiKey);

  // const script = document.createElement("script");
  // script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`;
  // script.async = true;

  let script = getScript(apiKey);

  script.onerror = () => {
    alert("Failed to load Google Maps API. Check your API key.");
  };

  document.getElementById("apiKeyInput").remove();
  document.getElementById("apiKeyPrompt").remove();
  document.getElementById("loadMapBtn").remove();

  document.head.appendChild(script);
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

  let marker = new google.maps.Marker.AdvancedMarkerElement({
    position: new google.maps.LatLng(lat, lng),
    map: map,
    title: title,
  });
}
