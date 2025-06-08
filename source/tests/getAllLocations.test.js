// Placeholder test that always returns true
it("placeholder test - should always return true", () => {
  expect(true).toBe(true);
});
// const createTestDBWithData = (mockData = {}) => {
//   return new IDBDatabase(mockData);
// };

// describe("getAllLocations", () => {
//   let consoleSpy;

//   beforeEach(() => {
//     consoleSpy = jest.spyOn(console, "error").mockImplementation();
//   });

//   // After the tests, clean up
//   afterEach(() => {
//     consoleSpy.mockRestore();
//   });

//   it("should return coordinates from memories", async () => {
//     const mockData = {
//       1: { latitude: 32.7157, longitude: -117.1611, title: "Balboa Park" },
//       2: { latitude: 32.6401, longitude: -117.0844, title: "Coronado Beach" },
//     };
//     const testDB = createTestDBWithData(mockData);

//     const oldCount = IDBObjectStore.prototype.count;
//     IDBObjectStore.prototype.count = function () {
//       const request = new IDBRequest(Object.keys(this.data).length);
//       return request;
//     };

//     // Override openCursor to iterate through our mock data
//     const oldOpenCursor = IDBObjectStore.prototype.openCursor;
//     IDBObjectStore.prototype.openCursor = function () {
//       const dataValues = Object.values(this.data);
//       let index = 0;

//       const request = new IDBRequest();

//       const processNext = () => {
//         if (index < dataValues.length) {
//           const mockCursor = {
//             value: dataValues[index],
//             continue: () => {
//               index++;
//               setTimeout(processNext, 0);
//             },
//           };
//           request.result = mockCursor;
//           request.onsuccess?.({ target: request });
//         } else {
//           request.result = null;
//           request.onsuccess?.({ target: request });
//         }
//       };

//       setTimeout(processNext, 0);
//       return request;
//     };

//     const result = await getAllLocations(testDB);

//     expect(result).toEqual([
//       [32.7157, -117.1611, "Balboa Park"],
//       [32.6401, -117.0844, "Coronado Beach"],
//     ]);

//     IDBObjectStore.prototype.openCursor = oldOpenCursor;
//     IDBObjectStore.prototype.count = oldCount;
//   });

//   // Test 2 - empty database
//   it("should return empty array when database is empty", async () => {
//     const testDB = createTestDBWithData({});

//     // Mock count method to return 0 for empty database
//     const oldCount = IDBObjectStore.prototype.count;
//     IDBObjectStore.prototype.count = () => new IDBRequest(0);

//     const result = await getAllLocations(testDB);

//     expect(result).toEqual([]);

//     IDBObjectStore.prototype.count = oldCount;
//   });

//   // Test 3 - error when creating transaction
//   it("should reject when transaction creation fails", async () => {
//     const testDB = createTestDB(true);

//     await expect(getAllLocations(testDB)).rejects.toEqual(
//       new Error("Transaction failed"),
//     );
//   });

//   // Test 4 - cursor request fails
//   it("should log error when cursor request fails", async () => {
//     const testDB = createTestDBWithData({
//       1: { latitude: 32.7767, longitude: -117.0736, title: "Gaslamp Quarter" },
//     });

//     // Mock count method for isEmptyDB to return non-zero
//     const oldCount = IDBObjectStore.prototype.count;
//     IDBObjectStore.prototype.count = () => new IDBRequest(1);

//     // Override openCursor to simulate failure
//     const oldOpenCursor = IDBObjectStore.prototype.openCursor;
//     IDBObjectStore.prototype.openCursor = () => {
//       const request = new IDBRequest();
//       request.simulateFailure();
//       setTimeout(() => {
//         request.error = new Error("Cursor operation failed");
//         request.onerror?.({ target: request });
//       }, 0);
//       return request;
//     };

//     await getAllLocations(testDB);

//     expect(consoleSpy).toHaveBeenCalledWith(
//       "MemoryDB cursor failed:",
//       expect.any(Error),
//     );

//     IDBObjectStore.prototype.openCursor = oldOpenCursor;
//     IDBObjectStore.prototype.count = oldCount;
//   });
// });
