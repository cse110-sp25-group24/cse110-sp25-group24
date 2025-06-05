/**
 * Unit Tests for retrieveMemory(post_id, db)
 *
 * Need to mock part of IndexedDB's API like:
 * IDBDatabase.transaction
 * IDBTransaction.objectStore()
 * IDBObjectStore.get()
 * IDBRequest for async to get result 
**/

require("./mocks/indexedDBMock"); // loads and registers global mocks
const { retrieveMemory } = require("../scripts/dataHandlingFunctions")


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
  // Mock db that throws when attempting a transaction
  const db = {
    transaction: () => {
      throw new Error("Transaction failed");
    }
  };

  await expect(retrieveMemory(1, db)).rejects.toThrow("Transaction failed");
})