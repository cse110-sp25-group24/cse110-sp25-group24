import { getAllLocations } from "/source/scripts/dataHandlingFunctions.js";
// Implement Base Map Issue #32

/*---------Global Variables---------*/

let map = null;
const API_KEY_STORAGE = "googleMapsApiKLey";

let autocomplete;
let place;

/*---------General Google Maps API functions---------*/

export function loadGoogleMaps(apiKey, lib ='', removeInput=true) {
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

    if (removeInput){
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

  loadGoogleMaps(apiKey, 'marker').then(() => {
    initMap();
    populateMap(map, db);
  });
}

/*---------------Map Specific Functions---------------*/

export async function initMapDisplay(){
  return new Promise((resolve, reject) => {
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

    const savedApiKey = localStorage.getItem(API_KEY_STORAGE);

    request.onsuccess = (event) => {
      db = event.target.result;
      console.log("db is up, displaying all the memories on the map");
      if (savedApiKey) {
        loadGoogleMaps(savedApiKey, "marker").then(() => {
          initMap();
          populateMap(map, db);
        });
      }
    };

    request.onerror = (event) => {
      console.log("db err for the map"); // works so far, seen
    };
  })
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
    mapId: 'f47c32b1338834821e79fe83',
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

  const marker = new google.maps.marker.AdvancedMarkerElement({
    map: map,
    position: { lat, lng },
  });

  // try to implement advanced advanced marker element by tn
  // let marker =  google.maps.marker.AdvancedMarkerElement({ // legacy code
  //   position: new google.maps.LatLng(lat, lng),
  //   map: map,
  //   title: title,
  // });
}

/*---------------Auto-Complete functions---------------*/

export function initCreate(){
  const savedApiKey = localStorage.getItem(API_KEY_STORAGE);

  if (savedApiKey) {
    console.log(savedApiKey);
    loadGoogleMaps(savedApiKey, 'places').then(() => {
      initAutocomplete();
    });
  }
}

/**
 * Initializes the Google Places Autocomplete widget on the input element with id "location".
 * Configures autocomplete to restrict results to US geocoded addresses and limits the
 * fields returned to optimize performance.
 */
function initAutocomplete() {
  const input = document.getElementById("location");
  autocomplete = new google.maps.places.Autocomplete(input, {
    types: ["geocode"], // or use ['establishment'] or ['(regions)'] for different types of places
    componentRestrictions: { country: "us" }, // Restrict to US, remove if you want worldwide
    fields: ["address_components", "geometry", "formatted_address"], // Limit returned data for efficiency
  });

  autocomplete.addListener("place_changed", onPlaceChanged);
}

/**
 * Callback fired when the user selects a place from the autocomplete suggestions.
 * It retrieves place details and logs relevant information, or warns if no geometry is available.
 */
function onPlaceChanged() {
  place = autocomplete.getPlace();

  if (!place.geometry) {
    // User entered something that was not suggested
    console.log("No details available for input: '" + place.name + "'");
    return;
  }

  console.log(place.formatted_address);
  console.log(place.geometry.location.lat());
  console.log(place.geometry.location.lng());
  console.log(typeof place);
}
