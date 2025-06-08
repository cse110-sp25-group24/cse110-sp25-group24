/**
 * 
 * 
 * createMemory.test.js
 * 
 * This is an end-to-end (E2E) test using Puppeteer that simulates creating a new memory 
 * through the web UI and checks if the memory shows up correctly on the frontend.
 * 
 * It performs the following:
 * 1. Opens the homepage (index.html)
 * 2. Navigates to the memory creation page
 * 3. Fills out and submits the memory form
 * 4. Navigates to the memories.html page
 * 5. Verifies that the newly created memory appears
 * 
 * 
 * 
 * Current Issue: 
 * Even though the form submits and redirects correctly, the test is failing at the 
 * final step — the memory is not found on `memories.html`. This likely means one of 
 * the following:
 *   - The memory isn't being saved properly to IndexedDB.
 *   - The `memories.html` page is loading before IndexedDB finishes reading.
 *   - The memory isn't being rendered fast enough before the test checks.
 * 
 */


import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname working in ES module context
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define file paths for test navigation
const homePage = `file:${path.resolve(__dirname, '../../index.html')}`;
const memoriesPage = `file:${path.resolve(__dirname, '../../memories.html')}`;

(async () => {
  const browser = await puppeteer.launch({ headless: false }); // Set to true if you don’t want a visible browser
  const page = await browser.newPage();

  // Go to homepage
  await page.goto(homePage);

  // Click "Create a New Memory"
  await page.waitForSelector('#memoryButton');
  await page.click('#memoryButton');

  // Wait for the memory creation form to load
  await page.waitForSelector('#memory-form');

  // Fill out the memory form fields
  await page.type('#title', 'Test Memory Title');
  await page.type('#description', 'This is a test description');
  await page.type('#location', 'Test Location');
  await page.type('#mood-text', 'Happy');

  // Upload an image (image.png must exist in the same folder)
  const imageInput = await page.$('#imageUpload');
  await imageInput.uploadFile(path.resolve(__dirname, 'image.png'));

  // Submit the form
  await page.click('.save-btn');

  // Give the form some time to process and redirect
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Go to the memories display page
  await page.goto(memoriesPage);

  await new Promise(resolve => setTimeout(resolve, 1000));

  // Wait for memory cards to be displayed
  await page.waitForSelector('memories-grid', { timeout: 3000 });

  // Check if the new memory card contains the test title
  const memoryVisible = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('memories-grid *')).some(el =>
      el.textContent.includes('Test Memory Title')
    );
  });

  console.log(memoryVisible
    ? ' Memory displayed in UI'
    : ' Memory not found in frontend');

  await browser.close();
})();
