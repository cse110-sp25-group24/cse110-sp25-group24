// Store and Display a "Memory" using IndexedDB Issue # 30

// making sure all the content is loaded before handling the DB
window.addEventListener("DOMContentLoaded", () => {
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

  // sanity checks for making sure the database is up

  request.onsuccess = (event) => {
    db = event.target.result;
    console.log("db is up");
    displayLatestMemory(db);
  };

  request.onerror = (event) => {
    console.log("db err"); // works so far, seen
  };

  // functions to hook up to the form for testing db functions
  /**
    Desired Content:
    - display the most recent memory, placeholder if nothing submitted

  */

  const form = document.getElementById("memory-form");

  /**
   * Memory submission creation logic.
   */
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const title = data.get("title");
    const description = data.get("description");
    const image = data.get("image");
    const imageURL = await fileToDataUrl(image);
    const date = new Date();
    const locationTag = data.get("location");
    const moodTags = data.getAll("mood");
    const post = {
      title: title,
      description: description,
      dateCreated: date,
      image: imageURL,
      location: locationTag,
      mood: moodTags,
    };

    addMemory(post, db).then(() => displayLatestMemory(db));
    event.target.reset();
    // addMarker(window.map, locationTag.geometry.location.lat(), locationTag.geometry.location.lng(), title);
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
});

/**
 * This function is written to display the latest memory that has been uploaded
 * to the IndexedDB MemoryDB.
 *
 * @param {IDBDatabase} db
 */
async function displayLatestMemory(db) {
  // getting the latest memory
  // store is called memories

  // using promise in checking to see if there are posts
  isEmptyDB(db).then((result) => {
    const mainElement = document.querySelector("preview");

    if (mainElement === null) {
      console.error("Main element not found.");
      return;
    }

    mainElement.innerHTML = "";

    if (result) {
      // there are 0 posts
      const placeholder = document.createElement("p");
      placeholder.classList.add("placeholder");
      placeholder.textContent = "No posts.";
      mainElement.append(placeholder);
    } else {
      getLatestMemory(db).then((post) => {
        console.log("snagging most recent memory");
        // build the DOM
        const card = document.createElement("article");
        card.innerHTML = `
            <h2>${post.title}</h2>
            <p>${post.description}</p>
            <img src="${post.image}" alt="${
              post.title
            }" style="max-width:150px; height:auto; display:block; margin:0.5em 0;"/>
            <footer>Created: ${new Date(
              post.dateCreated,
            ).toLocaleString()}</footer>
          `;
        mainElement.appendChild(card);
      });
    }
  });
}

/**
 * This function checks the MemoryDB to see if it is empty or not.
 *
 * @param {IDBDatabase} db
 * @returns {boolean} Returns `true` if db is empty, `false` if db is not empty.
 */
function isEmptyDB(db) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction("memories", "readonly");
    const store = tx.objectStore("memories");
    const numPosts = store.count();

    numPosts.onsuccess = () => {
      console.log("zero posts");
      resolve(numPosts.result === 0);
    };

    numPosts.onerror = () => {
      console.log("error");
      reject(numPosts.error);
    };
  });
}

/**
 * This function adds a memory to the MemoryDB.
 *
 * @param {{
 *   title: string,
 *   description: string,
 *   dateCreated: Date,
 *   image: string,
 *   location: string
 * }} post
 * @param {IDBDatabase} db
 * @returns {Promise} Promise that resolves into a post being added.
 */
function addMemory(post, db) {
  // adding a memory to the database
  return new Promise((resolve, reject) => {
    const tx = db.transaction("memories", "readwrite");
    const store = tx.objectStore("memories");
    const request = store.add(post);
    request.onsuccess = () => {
      const id = request.result;
      console.log(`saved post ${id}`);
      resolve(id);
    };

    request.onerror = () => {
      console.log("error adding post");
      reject(request.error);
    };
  });
}

/**
 * This function gets the latest memory uploaded to the db (by date).
 *
 * @param {IDBDatabase} db
 * @returns {Promise} Promise that resolves into the latest memory.
 */
function getLatestMemory(db) {
  // just going to log the details to console atm
  return new Promise((resolve, reject) => {
    const tx = db.transaction("memories", "readonly");
    const store = tx.objectStore("memories").index("dateCreated");
    const request = store.openCursor(null, "prev");
    request.onsuccess = () => {
      const cursor = request.result;
      resolve(cursor ? cursor.value : null); // return the cursor's value if cursor is not null
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
}

/**
 * This function deletes all the memoryes currently being stored.
 *
 * @param {IDBDatabase} db The database being deleted.
 */
function deleteAllMemories(db) {
  if (db) {
    db.close();
  }
  const deleteRequest = indexedDB.deleteDatabase("MemoryDB");

  deleteRequest.onblocked = () => {
    console.warn(
      "Database deletion blocked: please close all other tabs using it.",
    );
  };
  deleteRequest.onerror = () => {
    console.error("Error deleting database:", deleteRequest.error);
  };
  deleteRequest.onsuccess = () => {
    console.log("Database deleted successfully.");
    // reset? VERY rough
    window.location.reload();
  };
}

// reading the data as a URL
/**
 *
 * @param {Blob} file
 * @returns {Promise} Promise that resolves into the image data URL
 */
function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    // starting a new filereader
    const reader = new FileReader();

    // startinghe promises
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);

    // reading the file w default API --> is returned
    reader.readAsDataURL(file);
  });
}
