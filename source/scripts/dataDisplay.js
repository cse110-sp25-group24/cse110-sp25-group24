import { cardTemplate } from "/source/scripts/cardTemplate.js";
import { isEmptyDB } from "/source/scripts/dataHandlingFunctions.js";
import { deleteMemory } from "/source/scripts/dataHandlingFunctions.js";

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

  request.onsuccess = (event) => {
    db = event.target.result;
    console.log("db is up, displaying all the memories now");
    displayAllMemories(db);
  };

  request.onerror = (event) => {
    console.log("db err"); // works so far, seen
  };
});

/**
 * This function is written to display all the memories from date descending.
 *
 * @param {IDBDatabase} db Database instance
 */
function displayAllMemories(db) {
  isEmptyDB(db).then((empty) => {
    const display = document.querySelector("memories-grid");
    if (empty) {
      display.innerHTML = ``; //`<p> placeholder </p>`;
    } else {
      const tx = db.transaction("memories", "readonly");
      const store = tx.objectStore("memories").index("dateCreated");
      const request = store.openCursor(null, "prev");
      let cnt = 0;
      request.onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) {
          cnt += 1;
          const post = cursor.value;
          console.log(cnt);
          //create a card for the post
          const card = document.createElement("memory-data");
          card.setAttribute("card_id", post.post_id);
          card.setAttribute("img", post.image);
          card.setAttribute("img_alt", post.description || "memory image");
          // const temp=post.dateCreated.getFullYear();
          // card.setAttribute("date", temp);
          card.setAttribute("date", post.dateCreated);
          card.setAttribute("mood", post.mood);
          card.setAttribute("title", post.title);
          card.setAttribute("link", post.link);
          card.setAttribute("description", post.description);
          card.setAttribute("location", post.location || "No Location Provided");

          display.appendChild(card);
          setTimeout(() => {
            deleteListener(card, post.post_id, db);
          }, 0);
          cursor.continue();
        }
      };

      request.onerror = () => {
        console.log("unable to open cursor");
      };
    }
  });
}

/**
 * This function adds a delete listener to the card element.
 * 
 * @param {*} cardElement to remove from DOM
 * @param {*} id to delete from IndexedDB
 * @param {*} db Database instance
 */
function deleteListener(cardElement, id, db){
  const deleteBtn = cardElement.shadowRoot.querySelector(".delete-btn");
  console.log("deleteBtn", deleteBtn);
  if(deleteBtn){
    console.log("Inside Here");
    deleteBtn.addEventListener("click", () => {
      deleteMemory(id, db);
      cardElement.remove(); // Remove from DOM
      console.log(`Deleted memory with id: ${id}`);
    });
  }
}
