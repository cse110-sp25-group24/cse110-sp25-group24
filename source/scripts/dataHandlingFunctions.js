/**
 * This function checks the MemoryDB to see if it is empty or not.
 *
 * @param {IDBDatabase} db
 * @returns {boolean} Returns `true` if db is empty, `false` if db is not empty.
 */
export function isEmptyDB(db) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction("memories", "readonly");
    const store = tx.objectStore("memories");
    const numPosts = store.count();

    numPosts.onsuccess = () => {
      if (numPosts.result === 0) {
        console.log("zero posts");
      } else {
        console.log(`${numPosts.result} posts`);
      }
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
export function addMemory(post, db) {
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
 * This function deletes all the memoryes currently being stored.
 *
 * @param {IDBDatabase} db The database being deleted.
 */
export function deleteAllMemories(db) {
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
export function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    if (!(file instanceof Blob)) {
      reject(new Error("Input must be a Blob or File"));
      return;
    }
    // starting a new filereader
    const reader = new FileReader();

    // startinghe promises
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);

    // reading the file w default API --> is returned
    reader.readAsDataURL(file);
  });
}

/**
 * This function retrieves a specific memory that was stored.
 *
 * @param {int} post_id Primary key
 * @param {IDBDatabase} db Database instance
 * @returns {Promise} Resolves into the memory or failure message
 */
export function retrieveMemory(post_id, db) {
  return new Promise((resolve, reject) => {
    // opening a read-only transaction
    let tx;
    let store;
    try {
      tx = db.transaction("memories", "readonly");
      store = tx.objectStore("memories");
    } catch (err) {
      reject(err);
    }
    console.log(post_id);
    // grabbing the post
    const request = store.get(post_id);

    request.onsuccess = () => {
      const memory = request.result;
      if (memory === undefined) {
        // no memory
        console.log("could not find the memory!");
        reject(null);
      } else {
        console.log(`retrieved post #${post_id}`);
        resolve(memory);
      }
    };

    // could not use the get function
    request.onerror = () => {
      reject(request.error);
    };
  });
}

/**
 * This function deletes a specific memory that was stored
 *
 * @param {int} post_id
 * @param {IDBDatabase} db Database instance
 * @returns {Promise} Resolves into true/false for successful deletion
 */
export function deleteMemory(post_id, db) {
  return new Promise((resolve, reject) => {
    // opening a read-write transaction
    let tx;
    let store;
    try {
      tx = db.transaction("memories", "readwrite");
      store = tx.objectStore("memories");
    } catch (err) {
      reject(err);
    }
    // deleting the post
    const request = store.delete(post_id);
    request.onsuccess = () => {
      console.log(`deleted post #${post_id}`);
      resolve(true);
    };
    request.onerror = () => {
      console.log("error deleting post");
      reject(request.error);
    };
  });
}

/**
 * This function handles grabbing all the longitudes and latitudes.
 *
 * @param {IDBDatabase} db MemoryDB
 * @returns {Promise} resolves into the list of the following: latitude, longitude, and title [(lat, long, title), ...]
 */
export function getAllLocations(db) {
  let coords = [];
  return new Promise((resolve, reject) => {
    try {
      isEmptyDB(db).then((empty) => {
        if (empty) {
          resolve(coords); // return empty coords
        } else {
          let tx = db.transaction("memories", "readonly");
          let store = tx.objectStore("memories");
          let request = store.openCursor(null, "next");

          // iterating logic
          request.onsuccess = (event) => {
            const cursor = event.target.result;
            if (cursor) {
              const post = cursor.value;
              coords.push([post.latitude, post.longitude, post.title]);
              cursor.continue();
            } else {
              resolve(coords); // pushing out the coordinates
            }
          };
          request.onerror = (event) => {
            console.error("MemoryDB cursor failed:", event.target.error);
          };
        }
      });
    } catch (err) {
      reject(err);
    }
  });
}