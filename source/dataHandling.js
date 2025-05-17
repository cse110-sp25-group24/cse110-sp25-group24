let db;

window.addEventListener("DOMContentLoaded", () => {
  const request = indexedDB.open("PostDB", 1);

  request.onupgradeneeded = (event) => {
    db = event.target.result;
    if (!db.objectStoreNames.contains("posts")) {
      const store = db.createObjectStore("posts", {
        keyPath: "post_id",
        autoIncrement: true,
      });
      store.createIndex("by_id", "post_id");
    }
  };

  request.onsuccess = (event) => {
    db = event.target.result;

    // initial dummy posts
    addPost({
      title: "First Post",
      description: "This is the very first dummy post.",
      image: "https://via.placeholder.com/300x150?text=First",
    });
    addPost({
      title: "Second Post",
      description: "Another example post for the demo.",
      image: "https://via.placeholder.com/300x150?text=Second",
    });
    addPost({
      title: "Third Post",
      description: "The most recent dummy post!",
      image: "https://via.placeholder.com/300x150?text=Third",
    });

    // display the latest once on load
    setTimeout(refreshLatestPost, 500);

    // wire up the generate button
    document.getElementById("generate-btn").addEventListener("click", () => {
      generatePosts(5);
      // after adding, show newest
      setTimeout(refreshLatestPost, 300);
    });

    // wire up the refresh button
    document
      .getElementById("refresh-btn")
      .addEventListener("click", refreshLatestPost);
  };

  request.onerror = (event) => {
    console.error("IndexedDB error:", event.target.error);
  };
});

/** Adds a post object to the "posts" store. */
function addPost(post) {
  const tx = db.transaction("posts", "readwrite");
  const store = tx.objectStore("posts");
  const req = store.add(post);
  req.onsuccess = () => console.log("Added post ID:", req.result);
  req.onerror = () => console.error("Add error:", req.error);
}

/** Generates and adds N dummy posts in one go. */
function generatePosts(count) {
  for (let i = 1; i <= count; i++) {
    addPost({
      title: `Generated Post #${i}`,
      description: `Automatically generated post number ${i}.`,
      image: `https://via.placeholder.com/300x150?text=Gen+${i}`,
    });
  }
}

/** Retrieves the most recently added post (highest post_id). */
function getLatestPost() {
  return new Promise((resolve, reject) => {
    const tx = db.transaction("posts", "readonly");
    const store = tx.objectStore("posts");
    const cursorReq = store.openCursor(null, "prev");
    cursorReq.onsuccess = () => {
      const cursor = cursorReq.result;
      resolve(cursor ? cursor.value : null);
    };
    cursorReq.onerror = () => reject(cursorReq.error);
  });
}

/** Fetches & displays the newest post. */
function refreshLatestPost() {
  getLatestPost()
    .then(displayPost)
    .catch((err) => console.error("Fetch latest failed:", err));
}

/** Renders a post inside #latest-post */
function displayPost(post) {
  const container = document.getElementById("latest-post");
  if (!post) {
    container.textContent = "No posts found.";
    return;
  }
  container.innerHTML = `
    <h2>${post.title}</h2>
    <p>${post.description}</p>
    <img src="${post.image}" alt="${post.title}">
  `;
}

/** Clears all entries in the "posts" store. */
function clearAllPosts() {
  return new Promise((resolve, reject) => {
    const tx = db.transaction("posts", "readwrite");
    const store = tx.objectStore("posts");
    const req = store.clear();
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}
