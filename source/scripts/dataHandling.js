import * as dhf from "./dataHandlingFunctions.js";
import { getPlace, initCreate } from "./create.js";
import { retrieveMemory } from "./dataHandlingFunctions.js";

let postId;
let lat = null;
let long = null;
let db = null;

// import { getPlace, initCreate } from "./map.js"
// making sure all the content is loaded before handling the DB
window.addEventListener("DOMContentLoaded", init);
document.getElementById("memory-form").addEventListener("submit", submitForm)
document.getElementById("imageUpload").addEventListener("change", changeImg)

async function init() {
  db = await initDB();

  postId = await fillForm(db);

  console.log("Curr lat", lat);
  console.log("Curr lat", long);
  console.log("PostID:", postId);

  initCreate();
}

function changeImg(){
  const imageInput = document.getElementById("imageUpload");
  const imagePreview = document.getElementById("imagePreview");
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

}

async function submitForm(event){
    event.preventDefault();
    let form = document.getElementById("memory-form");
    const data = new FormData(form);
    const title = data.get("title");
    const description = data.get("description");

    const date = new Date();
    const locationTag = data.get("location");
    const moodTags = data.get("mood-text");

    const imageInput = document.getElementById("imageUpload");
    const imagePreview = document.getElementById("imagePreview");
    let imageURL;

    console.log("Img", imageInput)
    //If the user picked a new image, convert and save it 
    if (imageInput.files && imageInput.files.length > 0) {
      
      imageURL = await dhf.fileToDataUrl(imageInput.files[0]);
    } else {
    //if not just use the original image we backed up 
      imageURL = imagePreview.dataset.original || imagePreview.src;    
    }

    let place = getPlace();

    console.log(place)


    // if you changed the place
    if (place != null) {
      lat = place.geometry.location.lat() + (Math.random() * 0.0003);
      long = place.geometry.location.lng() + (Math.random() * 0.0003);
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
    
    // window.location.href = "index.html";
}


async function fillForm(db) {
  postId = localStorage.getItem("postId");
  if (postId != null) {
      const form = document.getElementById("memory-form");
      
      postId = parseInt(postId);
      console.log("Post Id:", postId);
      localStorage.removeItem("postId");
      
      let memory  = await retrieveMemory(postId, db);
      console.log(memory);
      form.elements["location"].value = memory.location;
      form.elements["title"].value = memory.title;
      form.elements["description"].value = memory.description;
      form.elements["mood-text"].value = memory.mood;
      //show the saved image in the preview 
      document.getElementById("imagePreview").src = memory.image;
      //also keep a backup of that image in the case the user doesn't upload a new one
      document.getElementById("imagePreview").dataset.original = memory.image;

      lat = memory.latitude;
      long = memory.longitude;

      return postId;
  } 
  else {
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