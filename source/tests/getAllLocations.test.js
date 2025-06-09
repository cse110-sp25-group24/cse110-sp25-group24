import {
  IDBDatabase,
  IDBObjectStore,
  IDBRequest,
  IDBTrans,
} from "./mocks/indexedDBMock";

import { getAllLocations } from "../scripts/dataHandlingFunctions";

const createTestDBWithData = (mockData = {}) => {
  return new IDBDatabase(mockData);
};

// Create DB for test that throws error if shouldfail is true
const createTestDB = (shouldFailTrans = false) => ({
  transaction() {
    if (shouldFailTrans) {
      throw new Error("Transaction failed");
    }
    return new IDBTrans();
  },
});

describe("getAllLocations", () => {
  let consoleSpy;

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, "error").mockImplementation();
  });

  // After the tests, clean up
  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it("should return coordinates from memories", async () => {
    const mockData = {
      1: { latitude: 32.7157, longitude: -117.1611, title: "Balboa Park" },
      2: { latitude: 32.6401, longitude: -117.0844, title: "Coronado Beach" },
    };
    const testDB = createTestDBWithData(mockData);

    const result = await getAllLocations(testDB);

    expect(result).toEqual([
      [32.7157, -117.1611, "Balboa Park"],
      [32.6401, -117.0844, "Coronado Beach"],
    ]);
  });

  // Test 2 - empty database
  it("should return empty array when database is empty", async () => {
    const testDB = createTestDBWithData({});

    // Mock count method to return 0 for empty database
    const tx = testDB.transaction("memories", "readonly");
    const store = tx.objectStore("memories");

    // Patch count method on *this* instance only
    store.count = () => {
      const req = new IDBRequest();
      req.result = 0;
      setTimeout(() => req.onsuccess?.({ target: req }), 0);
      return req;
    };

    const result = await getAllLocations(testDB);
    expect(result).toEqual([]);
  });
});
