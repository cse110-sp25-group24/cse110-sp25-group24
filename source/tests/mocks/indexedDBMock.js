/**
 * indexedDBMock.js
 *
 * This file sets up a simulated IndexedDB environment for unit testing.
 * It mocks key components of the IndexedDB API, allowing async operations
 * like .get(), .delete(), and .openCursor() to behave as they would in the browser.
 *
 * At the top of each unit test file is require("./mocks/indexedDBMock")
 * Allows the test to use these global mocks
 **/

// create IndexedDB memory for test
global.IDBTrans = class {
  objectStore(name) {
    return new IDBObjectStore();
  }
};

// Stimulates an object store (e.g. a table in IndexedDB)
// represents memories table, needs delete to return a request object
global.IDBObjectStore = class {
  constructor(data = {}) {
    this.data = data; // mock in-memory store
  }

  get(key) {
    // Mimics store.get(post_id)
    const result = this.data[key];
    return new global.IDBRequest(result);
  }

  delete(key) {
    return new global.IDBRequest();
  }

  index(indexName) {
    return new global.IDBIndex(this.data);
  }
};

// request object that basically simulates the indexdb async delete
global.IDBRequest = class {
  constructor(result = undefined) {
    this.result = result;
    this.onsuccess = null;
    this.onerror = null;
    this.shouldFail = false;
    this.error = null;
    //async behaviour
    setTimeout(() => {
      if (this.shouldFail) {
        this.error = new Error("Could not Delete - Operation failed");
        this.onerror?.({ target: this });
      } else {
        this.onsuccess?.({ target: this });
      }
    }, 0);
  }
  //simple method to force failure
  simulateFailure() {
    this.shouldFail = true;
  }
};

// mock implementation of the FileReader class for testing
// creating a fake FileReader
global.FileReader = class {
  constructor() {
    this.onload = null;
    this.onerror = null;
    this.result = null;
  }
  // mimics how the browser reads file data and converts it to a base64 String
  readAsDataURL(blob) {
    const reader = this;
    const fileReaderSimulator = new Promise((resolve) => {
      const reader = new FileReader();
      const mimeType = blob.type || "application/octet-stream";
      // convert the blob into a base64 string and stores it in a this.result, just like the real
      // file reader would
      blob.arrayBuffer().then((buffer) => {
        const base64 = Buffer.from(buffer).toString("base64");
        reader.result = `data:${mimeType};base64,${base64}`;
        this.result = reader.result;
        this.onload?.();
        resolve();
      });
    });

    return fileReaderSimulator;
  }
};

// Mock IDBCursor
global.IDBCursor = class {
  constructor(value) {
    this.value = value;
  }
};

// Mock IDBIndex
global.IDBIndex = class {
  constructor(data) {
    this.data = data;
  }

  openCursor(_, direction) {
    // Compute descending by dateCreated
    const values = Object.values(this.data).sort(
      (a, b) => b.dateCreated - a.dateCreated,
    );
    // Create cursor object for first result
    const result = values.length > 0 ? new global.IDBCursor(values[0]) : null;

    // fake IDBRequest Object returned by openCursor()
    const request = {
      result,
      onsuccess: null,
      onerror: null,
    };

    // Simulate async behavior
    setTimeout(() => {
      request.onsuccess?.({ target: request });
    }, 0);

    return request;
  }
};

// Stimulates IndexedDB database object
global.IDBDatabase = class {
  constructor(data = {}) {
    this.data = data; // key-value pairs for in-memory simulation
  }

  transaction(storeName, mode) {
    // Simulates db.transaction("memories", "readonly");
    // Returns a mock transaction object that gives access to an object store
    return new global.IDBTransaction(new global.IDBObjectStore(this.data));
  }
};

// Stimulates a transaction object returned by db.transaction()
global.IDBTransaction = class {
  constructor(store) {
    this.store = store;
  }

  objectStore(name) {
    // Mimics tx.objectStore("memories")
    return this.store;
  }
};
