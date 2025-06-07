import * as dhf from "./dataHandlingFunctions.js";
import { getPlace, initCreate } from "./create.js";
import { retrieveMemory } from "./dataHandlingFunctions.js";

let postId;

let lat = null;
let long = null;

// import { getPlace, initCreate } from "./map.js"
// making sure all the content is loaded before handling the DB
window.addEventListener("DOMContentLoaded", async () => {
  let db = await initDB();

  // functions to hook up to the form for testing db functions
  /**
    Desired Content:
    - display the most recent memory, placeholder if nothing submitted
  */

  const form = document.getElementById("memory-form");

  postId = await fillForm(db, form);

  console.log(lat);
  console.log(long);

  console.log("PostID:", postId);

  /**
   * Memory submission creation logic.
   */
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const title = data.get("title");
    const description = data.get("description");
    const image = data.get("image");
    const imageURL = await dhf.fileToDataUrl(image);
    const date = new Date();
    const locationTag = data.get("location");
    const moodTags = data.get("mood-text");

    let place = getPlace();

    console.log(place)


    // if you changed the place
    if (place != null) {
      lat = place.geometry.location.lat() + Math.random() * 0.0003;
      long = place.geometry.location.lng() + Math.random() * 0.0003;
    }


    const post = {
      title: title,
      description: description,
      dateCreated: date,
      image: imageURL,
      location: locationTag,
      longitude: long,
      latitude: lat,
      mood: moodTags,
    };
  
    dhf.addMemory(post, db, postId); //.then(() => displayLatestMemory(db));
    console.table(post); // for debugging, post data is displayed in
    event.target.reset();
    // addMarker(window.map, locationTag.geometry.location.lat(), locationTag.geometry.location.lng(), title);
    
    // remember to set postId = none once you leave submit the form

    // window.location.href = "index.html";

  });

  const imageInput = document.getElementById("imageUpload");
  const imagePreview = document.getElementById("imagePreview");

  imageInput.addEventListener("change", () => {
    const files = imageInput.files;

    if (files.length > 1) {
      alert("Please select only one image file.");
      imageInput.value = "";
      imagePreview.src = "";
      return;
    }

    const file = files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      imagePreview.src = reader.result;
    };
    reader.readAsDataURL(file);
  });

  initCreate();
});


async function fillForm(db, form) {
  postId = localStorage.getItem("postId");
  if (postId != null) {
      postId = parseInt(postId);
      console.log("Post Id:", postId);
      localStorage.removeItem("postId");
      let memory  = await retrieveMemory(postId, db);
      console.log(memory);
      form.elements["location"].value = memory.location;
      form.elements["title"].value = memory.title;
      form.elements["description"].value = memory.description;
      form.elements["mood-text"].value = memory.mood;
      document.getElementById("imagePreview").src = memory.image;

      lat = memory.latitude;
      long = memory.longitude;
    return postId;
  } else {
    lat = null;
    long = null;
    return null;
  }
}

async function initDB() {
  
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("MemoryDB", 1); // opening DB version 1

    // if database does not exist
    request.onupgradeneeded =  (event) => {
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

    let db;
    // sanity checks for making sure the database is up

    request.onsuccess = (event) => {
      db = event.target.result;
      console.log("db is up");
      resolve(db);
      // displayLatestMemory(db); outdated 5/31/25
    };

    request.onerror = (event) => {
      console.error("db err"); // works so far, seen
      reject(event.target.error);
    };
  });
}