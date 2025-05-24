// // Implement Base Map Issue #32
function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 32.8802, lng: -117.2392 }, // San Diego
    zoom: 10,
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false
  });

  document.getElementById("map").style.display = "block"; // Show map div
}

document.getElementById("loadMapBtn").addEventListener("click", () => {
  const apiKey = document.getElementById("apiKeyInput").value.trim();
  if (!apiKey) {
    alert("Please enter a valid API key.");
    return;
  }

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
