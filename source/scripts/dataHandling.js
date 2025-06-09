import * as dhf from "./dataHandlingFunctions.js";
import { getPlace, initCreate } from "./create.js";
import { retrieveMemory, initDB } from "./dataHandlingFunctions.js";

let postId;
let lat = null;
let long = null;
let db = null;

window.addEventListener("DOMContentLoaded", await init);

/**
 * This function sets up the database, loads form data, and initializes location input.
 */

async function init() {
  db = await initDB();
  document.getElementById("memory-form").addEventListener("submit", submitForm);
  document.getElementById("imageUpload").addEventListener("change", changeImg);
  postId = await fillForm(db);

  console.log("Curr lat", lat);
  console.log("Curr lat", long);
  console.log("PostID:", postId);

  initCreate();
}

/**
 * This function previews the uploaded image and makes sure only one file is selected.
 */

function changeImg() {
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

/**
 *This function handles form submission and saves or updates the memory in the database.
 * @param {Event} event The form submission event.
 */

async function submitForm(event) {
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

  console.log("Img", imageInput);

  //If the user picked a new image, convert and save it
  if (imageInput.files && imageInput.files.length > 0) {
    imageURL = await dhf.fileToDataUrl(imageInput.files[0]);
  } else {
    //if not just use the original image we backed up
    imageURL = imagePreview.dataset.original || imagePreview.src;
  }

  let place = getPlace();

  console.log(place);

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

  if (confirmSafety(post)) {
    // post is valid to submit
    // future considerations; should really clear the form only when the post is successfully added
    const newPost = dhf.addMemory(post, db, postId);
    if (newPost) {
      console.log(`new post ${newPost} made`);
      console.table(post); // for debugging, post data is displayed in
      event.target.reset(); // resets form to the original state
      window.location.href = "index.html";
    } else {
      // post not received by MemoryDB
      console.error("Post not received by MemoryDB");
      event.target.reset(); // resets form to the original state
      window.location.href = "404.html";
    }
  } else {
    // post is not valid to submit
    alert(
      "Your post is not valid to submit! Please double check and make sure you have an image, a title, and a mood.",
    );
  }
}

/**
 * This function validates the memory being submitted
 *
 * @param {object} post This is the memory being submitted
 * @returns {boolean} True if the post is valid, False if the post is not valid
 */

function confirmSafety(post) {
  try {
    // required safety checks
    if (
      !(
        post.image && // image is required
        post.title && // title is required
        post.dateCreated && // date is required
        post.location && // location requirements
        // post.latitude &&
        // post.longitude &&
        post.mood // mood is required
      )
    ) {
      console.table(post);
      console.log("required check failed");
      return false;
    }
    console.log("required check passed");
    // length safety checks
    if (
      post.title.length <= 20 &&
      post.description.length <= 500 &&
      post.mood.length <= 20
    ) {
      console.log("length passed");
      // double checking
      console.table({
        titleLength: post.title.length,
        descriptionLength: post.description.length,
        moodLength: post.mood.length,
      });
      return true;
    } else {
      console.error("length failed");
      return false;
    }
  } catch (err) {
    // error--input mismatch, trouble validating post, etc.
    console.err(err);
    return false;
  }
}

/**
 *This function loads an existing memory into the form for editing.
 * @param {IDBDatabase} db The database to retrieve the memory from.
 * @returns {number|null} The postId if editing, or null if creating a new memory.
 */
async function fillForm(db) {
  postId = localStorage.getItem("postId");
  if (postId != null) {
    const form = document.getElementById("memory-form");

    postId = parseInt(postId);
    console.log("Post Id:", postId);
    localStorage.removeItem("postId");

    let memory = await retrieveMemory(postId, db);
    console.log(memory);
    form.elements["location"].value = memory.location;
    form.elements["title"].value = memory.title;
    form.elements["description"].value = memory.description;
    form.elements["mood-text"].value = memory.mood;

    // show the saved image in the preview
    document.getElementById("imagePreview").src = memory.image;

    // also keep a backup of that image in the case the user doesn't upload a new one
    document.getElementById("imagePreview").dataset.original = memory.image;

    lat = memory.latitude;
    long = memory.longitude;

    return postId;
  } else {
    lat = null;
    long = null;
    return null;
  }
}
