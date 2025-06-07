import {IDBDatabase, IDBObjectStore, IDBRequest} from "./mocks/indexedDBMock.js"
import { addMemory } from "../scripts/dataHandlingFunctions.js"

describe("addMemory", () => {
  // Test 1 - Valid post adds and returns new ID
  it("should add a post and return the ID", async () => {
    const mockPost = {
      title: "Hellooo",
      description: "Test 1",
      dateCreated: new Date(),
      image: "image.png",
      location: "La Jolla",
    };

    const mockDB = new IDBDatabase();
    const result = await addMemory(mockPost, mockDB);
    expect(result).toBe(1);
  });

  // Test 2 - Reject if adding the post fails
  it("should reject if adding fails", async () => {
    const failingStore = new IDBObjectStore();
    failingStore.add = function () {
      const request = new IDBRequest();
      request.simulateFailure(); // triggers error
      return request;
    };

    const db = {
      transaction: () => ({
        objectStore: () => failingStore,
      }),
    };

    await expect(addMemory({ title: "error test" }, db)).rejects.toThrow(
      "Could not Delete",
    );
  });

  // Test 3 - Multiple post
  it("should add multiple post and return incrementing Id number", async () => {
    const memory = new IDBObjectStore();
    const db = {
      transaction: () => ({
        objectStore: () => memory,
      }),
    };
    const id1 = await addMemory({ title: "fist" }, db);
    const id2 = await addMemory({ title: "second" }, db);

    expect(id1).toBe(1);
    expect(id2).toBe(2);
  });

  // Test 4 - missing information
  it("should still add a post even with some fields missing", async () => {
    const mockPost = {
      title: "title",
      dateCreated: new Date(),
    };

    const mockDB = new IDBDatabase();
    const result = await addMemory(mockPost, mockDB);
    expect(result).toBe(1);
  });
});
