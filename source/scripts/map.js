import { getAllLocations, initDB } from "./dataHandlingFunctions.js";
// Implement Base Map Issue #32

/*---------Global Variables---------*/

let map = null;
const API_KEY_STORAGE = "googleMapsApiKLey";
let db = null;

/*---------General Google Maps API functions---------*/

export function loadGoogleMaps(apiKey, lib = "", removeInput = true) {
  return new Promise((resolve, reject) => {
    let script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=${lib}`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      resolve();
    };

    script.onerror = () => {
      reject(new Error("Failed to load Google Maps API"));
    };

    if (removeInput) {
      document.head.appendChild(script);
      document.getElementById("apiKeyInput").remove();
      document.getElementById("apiKeyPrompt").remove();
      document.getElementById("loadMapBtn").remove();
      document.getElementById("api-key-box").remove();
      // document.getElementByClassName("api-key-box").remove()
    }
  });
}

export function insertAPIKey() {
  const apiKey = document.getElementById("apiKeyInput").value.trim();
  if (!apiKey) {
    alert("Please enter a valid API key.");
    return;
  }

  localStorage.setItem(API_KEY_STORAGE, apiKey);

  loadGoogleMaps(apiKey, "marker").then(() => {
    initMap();
    populateMap(map, db);
    // window.location.href = "index.html";
  });
}

/*---------------Map Specific Functions---------------*/

export async function initMapDisplay() {
  return new Promise(async (resolve, reject) => {
    db = await initDB();
    const savedApiKey = localStorage.getItem(API_KEY_STORAGE);
    try {
      if (savedApiKey) {
        loadGoogleMaps(savedApiKey, "marker").then(() => {
          initMap();
          populateMap(map, db);
        });
        resolve(console.log("map initialized"));
      }
    } catch (err) {
      reject(err);
    }
  });
}

/**
 * Callback function for Google Maps API to initialize the map.
 * Sets up the map centered on San Diego with some controls disabled.
 * Also adds a marker at the center point.
 *
 */
function initMap() {
  console.log("INITIALIZING MAP");
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 32.8802, lng: -117.2392 }, // San Diego
    zoom: 10,
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false,
    mapId: "f47c32b1338834821e79fe83",
  });
}

function populateMap(map, db) {
  console.log("POPULATING MAP");
  getAllLocations(db).then((coords) => {
    // coords list from the memories stored in db
    for (let marker of coords) {
      const [lat, long, title] = marker;
      console.table(marker);
      addMarker(map, lat, long, title);
    }
  });
}

/**
 * Adds a marker to the specified map at given latitude and longitude.
 * @param {google.maps.Map} map - The map instance to add the marker to.
 * @param {number} lat - Latitude coordinate for the marker.
 * @param {number} lng - Longitude coordinate for the marker.
 * @param {string} [title=""] - Optional title text for the marker tooltip.
 */
function addMarker(map, lat, lng, title = "") {
  console.log("Attempting to add marker", lat, lng, title);

  // let marker = new google.maps.Marker({
  //   // legacy code
  //   position: new google.maps.LatLng(lat, lng),
  //   map: map,
  //   title: title,
  // });

  // placing marker

  // to-do: add marker interactivity if possible
  const marker = new google.maps.marker.AdvancedMarkerElement({
    map: map,
    position: { lat, lng },
  });
}
