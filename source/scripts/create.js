/* File below implements creating a memory page. 
 * File loads Google Maps Places API, allows user to type in a location,
 * and stores location information for the card. 
*/

let autocomplete;
let place; //location picked by user

const API_KEY_STORAGE = "googleMapsApiKLey";

/**
 * Function run upon loading the page -- API key saved in localStorage
 * is sought after, then initAutocomplete() is run to hook up address search 
 * box
 */
export function initCreate() {
  const savedApiKey = localStorage.getItem(API_KEY_STORAGE);

  if (savedApiKey) {
    console.log(savedApiKey);
    loadGoogleMaps(savedApiKey, "places").then(() => {
      initAutocomplete();
    });
  }
}

/**
 * Initializes the Google Places Autocomplete widget on the input element with id "location".
 * Configures autocomplete to restrict results to US geocoded addresses and limits the
 * fields returned to optimize performance.
 * Function sets up search bar, currently set to US locations only.
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
  //latitudanal and longitudanal coordiantes saved specifically
  console.log(place.geometry.location.lat()); 
  console.log(place.geometry.location.lng());
  console.log(typeof place);
}

/**
 * @param {any} apiKey 
 * @param {any} libraries 
 * Function loads Google Maps if it isn't already loaded.
 * Potential refactoring needed 
 */
async function loadGoogleMaps(apiKey, libraries) {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=${libraries}`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      resolve();
    };

    script.onerror = () => {
      reject(new Error("Failed to load Google Maps API"));
    };

    document.head.appendChild(script);
  });
}

// place object returned
export function getPlace() {
  return place;
}
