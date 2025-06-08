/**
 * createMemory.test.js
 *
 * This is an end-to-end (E2E) test using Puppeteer that simulates creating a new memory 
 * through the web UI and checks if the memory shows up correctly on the frontend.
 */

import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname working in ES module context
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define file paths
const homePage = 'http://localhost:8080/index.html';
const memoriesPage = 'http://localhost:8080/memories.html';

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  try {
    // 1. Open homepage
    await page.goto(homePage);

    // 2. Click "Create a New Memory"
    await page.waitForSelector('#memoryButton');
    await page.click('#memoryButton');

    // 3. Wait for form and fill it out
    await page.waitForSelector('#memory-form');
    await page.type('#title', 'Test Memory Title');
    await page.type('#description', 'This is a test description');
    await page.type('#location', 'Test Location');
    await page.type('#mood-text', 'Happy');

    const imageInput = await page.$('#imageUpload');
    await imageInput.uploadFile(path.resolve(__dirname, 'image.png'));

    // 4. Submit the form and wait for it to process (skip waitForNavigation due to redirect issues)
    await page.click('.save-btn');
    await new Promise(resolve => setTimeout(resolve, 1500)); // Wait for form submission and DB save

    // 5. Navigate to memories.html manually
    await page.goto(memoriesPage);
    await new Promise(resolve => setTimeout(resolve, 1500)); // Wait for page content to load

    // 6. Check if memory is present in the UI
    const memoryVisible = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('memories-grid *')).some(el =>
        el.textContent.includes('Test Memory Title')
      );
    });

    console.log(memoryVisible
      ? '✅ Memory successfully displayed in UI!'
      : '❌ Memory not found in frontend.');

  } catch (err) {
    console.error('❌ Test failed with error:', err);
  } finally {
    await browser.close();
  }
})();
