require("./mocks/indexedDBMock"); 
const { deleteMemory } = require("../scripts/dataHandlingFunctions");

// Create DB for test that throws error if shouldfail is true
const createTestDB = (shouldFailTrans = false) => ({
  transaction() {
    if (shouldFailTrans) {
      throw new Error("Transaction failed");
    }
    return new IDBTrans();
  },
});

describe("deleteMemory", () => {
  let consoleSpy;
  // Setup to capture log calls before the tests
  beforeEach(() => {
    consoleSpy = jest.spyOn(console, "log").mockImplementation();
  });
  // After the tests, clean up
  afterEach(() => {
    consoleSpy.mockRestore();
  });

  // Test 1 - success
  it("should successfully delete the memory", async () => {
    const testDB = createTestDB();
    const postId = 69;

    const result = await deleteMemory(postId, testDB); //simple test, self explanatory

    expect(result).toBe(true);
    expect(consoleSpy).toHaveBeenCalledWith(`deleted post #${postId}`);
  });

  // Test 2 - error when creating transaction - delete never goes through
  it("should reject when transaction creation fails", async () => {
    const testDB = createTestDB(true); //true so it forces error
    const postId = 420;

    await expect(deleteMemory(postId, testDB)).rejects.toEqual(
      new Error("Transaction failed"),
    );
  });

  // Test 3 - transaction created, but error when delete fails
  it("should reject when delete request fails", async () => {
    const testDB = createTestDB();
    const postId = 80085;

    // Now essentially saves the old delete, while creating a new delete designed to fail
    const oldDelete = IDBObjectStore.prototype.delete;
    IDBObjectStore.prototype.delete = () => {
      const request = new IDBRequest();
      request.simulateFailure(); // Make request return true for simulateFailure
      return request;
    };

    await expect(deleteMemory(postId, testDB)).rejects.toEqual(
      // Returns could not delete error from above
      new Error("Could not Delete - Operation failed"),
    );
    expect(consoleSpy).toHaveBeenCalledWith("error deleting post");

    IDBObjectStore.prototype.delete = oldDelete;
  });
});
