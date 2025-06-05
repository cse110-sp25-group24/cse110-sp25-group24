function displayAllMemories(db) {
  isEmptyDB(db).then((empty) => {
    const display = document.querySelector("memory-display");
    if (empty) {
      display.innerHTML = `<p> placeholder </p>`;
    } else {
      const tx = db.transaction("memories", "readonly");
      const store = tx.objectStore("memories").index("dateCreated");
      const request = store.openCursor(null, "prev");
      request.onsuccess = () => {
        const cursor = request.result;
        if (cursor) {
          const post = cursor.value;
          const card = cardTemplate(post);
          display.appendChild(card);
          cursor.continue();
        }
      };
      request.onerror = () => {
        console.log("unable to open cursor");
      };
    }
  });
}

function displayLatestMemory(db) {
  isEmptyDB(db).then((result) => {
    const mainElement = document.querySelector("main");
    mainElement.innerHTML = "";

    if (result) {
      const placeholder = document.createElement("p");
      placeholder.classList.add("placeholder");
      placeholder.textContent = "No posts.";
      mainElement.append(placeholder);
    } else {
      getLatestMemory(db).then((post) => {
        console.log("snagging most recent memory");
        const card = document.createElement("article");
        card.innerHTML = `
            <h2>${post.title}</h2>
            <p>${post.description}</p>
            <img src="${post.image}" alt="${
              post.title
            }" style="max-width:150px; height:auto; display:block; margin:0.5em 0;"/>
            <footer>Created: ${new Date(
              post.dateCreated
            ).toLocaleString()}</footer>
          `;
        mainElement.appendChild(card);
      });
    }
  });
}

function isEmptyDB(db) {
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

function addMemory(post, db) {
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

function getLatestMemory(db) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction("memories", "readonly");
    const store = tx.objectStore("memories").index("dateCreated");
    const request = store.openCursor(null, "prev");
    request.onsuccess = () => {
      const cursor = request.result;
      resolve(cursor ? cursor.value : null);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
}

function deleteAllMemories(db) {
  if (db) {
    db.close();
  }
  const deleteRequest = indexedDB.deleteDatabase("MemoryDB");

  deleteRequest.onblocked = () => {
    console.warn(
      "Database deletion blocked: please close all other tabs using it."
    );
  };
  deleteRequest.onerror = () => {
    console.error("Error deleting database:", deleteRequest.error);
  };
  deleteRequest.onsuccess = () => {
    console.log("Database deleted successfully.");
    window.location.reload();
  };
}

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    if (!(file instanceof Blob)) {
      return reject(new TypeError("Input must be a Blob"));
    }

    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

function retrieveMemory(post_id, db) {
  return new Promise((resolve, reject) => {
    let tx;
    let store;
    try {
      tx = db.transaction("memories", "readonly");
      store = tx.objectStore("memories");
    } catch (err) {
      reject(err);
    }

    const request = store.get(post_id);

    request.onsuccess = () => {
      const memory = request.result;
      if (memory === undefined) {
        console.log("could not find the memory!");
        reject(null);
      } else {
        console.log(`retrieved post #${post_id}`);
        resolve(memory);
      }
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
}

function deleteMemory(post_id, db) {
  return new Promise((resolve, reject) => {
    let tx;
    let store;
    try {
      tx = db.transaction("memories", "readwrite");
      store = tx.objectStore("memories");
    } catch (err) {
      reject(err);
    }

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

module.exports = {
  displayAllMemories,
  displayLatestMemory,
  isEmptyDB,
  addMemory,
  getLatestMemory,
  deleteAllMemories,
  fileToDataUrl,
  retrieveMemory,
  deleteMemory
};
