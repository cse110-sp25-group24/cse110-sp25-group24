/**
 * Unit Tests for getLatestMemory(db)
 *
 * Need to mock part of IndexedDB's API like:
 * objectStore().index("dataCreated")
 * openCursour(null, "prev")
 * IDBCursor
 **/

require("./mocks/indexedDBMock"); // loads and registers global mocks
const { getLatestMemory } = require("../scripts/dataHandlingFunctions");

// Test 1 - returns the latest memory by date
describe("getLatestMemory", () => {
  // Test 1 - return the latest memory based by date
  it("retrieves the latest memory", async () => {
    const mockData = {
      1: { title: "First", dateCreated: 1000 },
      2: { title: "Second", dateCreated: 2000 }, // newest
      3: { title: "Third", dateCreated: 1500 },
    };

    const db = new global.IDBDatabase(mockData);

    const result = await getLatestMemory(db);

    expect(result).toEqual({ title: "Second", dateCreated: 2000 });
  });

  // Test 2 - returns null if no memory exists
  it("returns null when there is no memory", async () => {
    const db = new global.IDBDatabase({}); // empty database

    const result = await getLatestMemory(db);

    expect(result).toBeNull();
  });

  // Test 3 - rejects if cursor request errors out
  it("rejects on cursor error", async () => {
    // Override openCursor to simulate an error
    global.IDBIndex.prototype.openCursor = function () {
      const request = {
        result: null,
        onsuccess: null,
        onerror: null,
        error: new Error("Cursor failed"),
      };

      setTimeout(() => {
        request.onerror?.({ target: request });
      }, 0);

      return request;
    };

    const db = new global.IDBDatabase({});
    await expect(getLatestMemory(db)).rejects.toThrow("Cursor failed");
  });
});
