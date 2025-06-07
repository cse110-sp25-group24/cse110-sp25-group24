let autocomplete;

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
  const place = autocomplete.getPlace();

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
