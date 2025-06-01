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

function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 32.8802, lng: -117.2392 }, // San Diego
    zoom: 10,
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false,
  });
  document.getElementById("map").style.display = "block"; // Show map div

  addMarker(map, 32.8802, -117.2392)
}

document.getElementById("loadMapBtn").addEventListener("click", () => {
  const apiKey = document.getElementById("apiKeyInput").value.trim();
  if (!apiKey) {
    alert("Please enter a valid API key.");
    return;
  }

  localStorage.setItem(API_KEY_STORAGE, apiKey);

  const script = document.createElement("script");
  script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`;
  script.async = true;

  script.onerror = () => {
    alert("Failed to load Google Maps API. Check your API key.");
  };

  document.getElementById("apiKeyInput").remove();
  document.getElementById("apiKeyPrompt").remove();
  document.getElementById("loadMapBtn").remove();

  document.getElementById("container").className = "";

  document.head.appendChild(script);
});

function addMarker(map, lat, lng, title = "") {
  console.log("Attempting to add marker", lat, lng, title);

  let marker = new google.maps.Marker({
    position: new google.maps.LatLng(lat, lng),
    map: map,
    title: title,
  });
}

addMarker(map, 32.8802, -117.2392)