// Implement Base Map Issue #32
let map = L.map('map').setView([37.7749, -122.4194], 13); // San Francisco coordinates

// Add OpenStreetMap tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
maxZoom: 19,
attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Add a marker at the center
L.marker([37.7749, -122.4194]).addTo(map)
.bindPopup('Hello from San Francisco!')
.openPopup();