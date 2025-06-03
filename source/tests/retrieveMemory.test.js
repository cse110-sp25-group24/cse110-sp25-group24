/**
 * Unit Tests for retrieveMemory(post_id, db)
 *
 * Simulates an IndexedDB environment to test retrieval logic.
 *
 * Real IndexedDB hierarchy being mocked:
 *
 * IDBDatabase
 *   └─ transaction(storeName, mode) → IDBTransaction
 *        └─ objectStore(name) → IDBObjectStore
 *             └─ get(key) → IDBRequest
 */

// ------------------------- Mock Classes -------------------------

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
}

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

// Stimulates an object store (e.g. a table in IndexedDB)
global.IDBObjectStore = class {
  constructor(data = {}) {
    this.data = data; // mock in-memory store
  }

  get(key) {
    // Mimics store.get(post_id)
    const result = this.data[key];
    return new global.IDBRequest(result);
  }
};

// stimulates an IDBRequest that handles async success/error
global.IDBRequest = class {
  constructor(result = undefined, fail = false) {
    this.result = result;
    this.error = null;
    this.onsuccess = null;
    this.onerror = null;

  // Stimulate async IndexedDB response (on next tick)
  setTimeout(() => {
    if(fail) {
      this.onerror?.({target : this});
    } else {
      this.onsuccess?.({target : this});
    }
    }, 0);
  };
}

// Get retrieveMemory function to test
import { retrieveMemory } from "../scripts/dataHandlingFunctions";

// Test 1 - Retrieve an existing memory from the store
test('retrieves an existing memory', async () => {
  // creating fake data
  const mockData = {
    1: {title: "Memory 1", post_id : 1}
  };
  const db = new global.IDBDatabase(mockData);

  const result = await retrieveMemory(1, db);
  expect(result).toEqual({title: 'Memory 1', post_id: 1});
});

// Test 2 - Handles a missing memory (should reject with null)
test('returns null if memory does not exist', async() => {
  const db = new global.IDBDatabase({}); //empty store

  await expect(retrieveMemory(69, db)).rejects.toBeNull();
});

// Test 3 - Handles transaction failure
test('fails if transaction throws', async() => {
  // Modck db taht thros when attempting a transaction
  const db = {
    transaction: () => {
      throw new Error("Transaction failed");
    }
  };

  await expect(retrieveMemory(1, db)).rejects.toThrow("Transaction failed");
})

