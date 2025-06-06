const { isEmptyDB } = require("../scripts/dataHandlingFunctions");

describe("isEmptyDB", () => {
  //Test 1 - checks if it returns true when there are no posts in the DB
  it("should resolve to true when there are no posts", async () => {
    const mockCount = {
      onsuccess: null,
      onerror: null,
      result: 0,
    };

    const mockDB = {
      transaction: () => ({
        objectStore: () => ({
          count: () => {
            setTimeout(() => {
              mockCount.onsuccess();
            }, 0);
            return mockCount;
          },
        }),
      }),
    };

    const result = await isEmptyDB(mockDB);
    expect(result).toBe(true);
  });

  // Test 2 - checks if it returns false when there are posts in the DB
  it("should resolve to false when there are posts", async () => {
    const mockCount = {
      onsuccess: null,
      onerror: null,
      result: 5,
    };

    const mockDB = {
      transaction: () => ({
        objectStore: () => ({
          count: () => {
            setTimeout(() => {
              mockCount.onsuccess();
            }, 0);
            return mockCount;
          },
        }),
      }),
    };

    const result = await isEmptyDB(mockDB);
    expect(result).toBe(false);
  });

  // Test 3 - checks if it rejects when there’s an error in counting
  it("should reject on error", async () => {
    const mockCount = {
      onsuccess: null,
      onerror: null,
      error: new Error("count failed"),
    };

    const mockDB = {
      transaction: () => ({
        objectStore: () => ({
          count: () => {
            setTimeout(() => {
              mockCount.onerror();
            }, 0);
            return mockCount;
          },
        }),
      }),
    };

    await expect(isEmptyDB(mockDB)).rejects.toThrow("count failed");
  });
  //test 4
  it("should reject if db is null or undefined", async () => {
    await expect(isEmptyDB(null)).rejects.toThrow();
    await expect(isEmptyDB(undefined)).rejects.toThrow();
  });
});
