import { getAllLocations } from "/source/scripts/dataHandlingFunctions.js";
// Implement Base Map Issue #32

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
    loadGoogleMaps(savedApiKey).then(() => {
      initMap();
    });
  }

  const request = indexedDB.open("MemoryDB", 1); // opening DB version 1

  // if database does not exist
  request.onupgradeneeded = (event) => {
    const db = request.result;

    console.log("initializing db"); // debugging message

    if (!db.objectStoreNames.contains("memories")) {
      const store = db.createObjectStore("memories", {
        keyPath: "post_id",
        autoIncrement: true,
      });

      store.createIndex("dateCreated", "dateCreated", { unique: false }); // for sorting by date/getting most recent
    }
  };

  let db; // NOTE FOR DISCUSSION: NOT PERSISTED ATM?

  request.onsuccess = (event) => {
    db = event.target.result;
    console.log("db is up, displaying all the memories on the map");
    getAllLocations(db).then((coords) => {
      // coords list from the memories stored in db
      for (let marker of coords) {
        const [lat, long, title] = marker;
        addMarker(lat, long);
      }
    });
  };

  request.onerror = (event) => {
    console.log("db err for the map"); // works so far, seen
  };
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

  // console.log(map)
}

function loadGoogleMaps(apiKey) {
  return new Promise((resolve, reject) => {
    let script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      resolve();
    };

    script.onerror = () => {
      reject(new Error("Failed to load Google Maps API"));
    };

    document.head.appendChild(script);

    document.getElementById("apiKeyInput").remove();
    document.getElementById("apiKeyPrompt").remove();
    document.getElementById("loadMapBtn").remove();
  });
}

document.getElementById("loadMapBtn").addEventListener("click", () => {
  const apiKey = document.getElementById("apiKeyInput").value.trim();
  if (!apiKey) {
    alert("Please enter a valid API key.");
    return;
  }

  localStorage.setItem(API_KEY_STORAGE, apiKey);

  loadGoogleMaps(apiKey);
  // removeAPIInput();
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

  let marker = new google.maps.Marker({
    // legacy code
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
