

//mock implementation of the FileReader class for testing
//creating a fake FileReader 
global.FileReader = class {
  constructor() {
    this.onload = null;
    this.onerror = null;
    this.result = null;
  }
//mimics how the browser reads file data and converts it to a base64 String
  readAsDataURL(blob) {
    const reader = this;
    const fileReaderSimulator = new Promise((resolve) => {
      const reader = new FileReader();
      const mimeType = blob.type || 'application/octet-stream';
//convert the blob into a base64 string and stores it in a this.result, just like the real
//file reader would 
      blob.arrayBuffer().then((buffer) => {
        const base64 = Buffer.from(buffer).toString('base64');
        reader.result = `data:${mimeType};base64,${base64}`;
        this.result = reader.result;
        this.onload?.();
        resolve();
      });
    });

    return fileReaderSimulator;
  }
};


// Import AFTER defining the mock
import { fileToDataUrl } from '../scripts/dataHandlingFunctions.js';


//** 
//Test 1
// This test checks if the function correctly turns a text file into a base64 string
//**
describe('fileToDataUrl', () => {
  it('should convert a file to a data URL', async () => {
    const blob = new Blob(['Hello, world!'], { type: 'text/plain' });

    const result = await fileToDataUrl(blob);

    expect(result).toMatch(/^data:text\/plain;base64,/);
  });
  //*
  // Test 2
  //This test checks if the function works with a JSON file and includes the correct type in the result
  //*/
  it('should convert a JSON blob to a data URL', async () => {
  const json = JSON.stringify({ name: "Noeh", feeling: "smart" });
  const blob = new Blob([json], { type: 'application/json' });

  const result = await fileToDataUrl(blob);

  expect(result).toMatch(/^data:application\/json;base64,/);
});
//**
// Test 3 
// This test checks what happens when the file is empty. It should still return a valid data URL.
//  */
it('should convert an empty Blob to a data URL with correct MIME type', async () => {
    const emptyBlob = new Blob([], { type: 'text/plain' });

    const result = await fileToDataUrl(emptyBlob);

    expect(result).toBe('data:text/plain;base64,');
  });

//**
// Test 4 
// This test makes sure the function throws an error when it gets something that’s not a file
//  */
  it('should throw or reject when input is not a Blob', async () => {
  await expect(fileToDataUrl(null)).rejects.toBeDefined();
});


});
