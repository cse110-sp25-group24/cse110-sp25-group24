/**
 * createMemory.test.js
 *
 * This is an end-to-end (E2E) test using Puppeteer that simulates creating a new memory 
 * through the web UI and checks if the memory shows up correctly on the frontend.
 */

import http from 'http';
import handler from 'serve-handler';
import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname working in ES module context
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define file paths
const homePage = `file:${path.resolve(__dirname, '../../index.html')}`;
const memoriesPage = `file:${path.resolve(__dirname, '../../memories.html')}`;

const serveDir = path.resolve(__dirname, '../../'); // adjust if needed
const PORT = 8080;

let server;

async function startServer() {
  server = http.createServer((request, response) => {
    return handler(request, response, { public: serveDir });
  });

  return new Promise((resolve) => {
    server.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
      resolve();
    });
  });
}

async function stopServer() {
  return new Promise((resolve, reject) => {
    if (!server) resolve();
    server.close((err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}

(async () => {
  await startServer();
  const browser = await puppeteer.launch({ headless: false });
  try {
    // 1. Open homepage
    const page = await browser.newPage();

    const homePage = `http://localhost:${PORT}/index.html`;
    const memoriesPage = `http://localhost:${PORT}/memories.html`;

    await page.goto(homePage);

    // 2. Click "Create a New Memory"
    const [createNav] = await Promise.all([
      page.waitForNavigation(),
      page.$$eval('button', (buttons) => {buttons[0].click();}),
    ]);

    console.log(`Create memory button redirects to: ${createNav.url()}`);

    // 3. Wait for form and fill it out
    await page.waitForSelector('#memory-form');
    await page.type('#title', 'Test Memory Title');
    await page.type('#description', 'This is a test description');
    await page.type('#location', 'Test Location');
    await page.type('#mood-text', 'Happy');


    const imageInput = await page.$('#imageUpload');
    await imageInput.uploadFile(path.resolve(__dirname, 'image.png'));

    // 4. Submit the form and wait for redirect
    const [submitNav] = await Promise.all([
      page.waitForNavigation(),
      page.$$eval('button', (buttons) => {buttons[0].click();}),
    ]);

    console.log(`Submit button redirects to: ${submitNav.url()}`);

    // 5. Navigate to memories.html
    const [memoryNav] = await Promise.all([
      page.waitForNavigation(),
      page.$$eval('a', (a) => {a[2].click();}),
    ]);

    console.log(`My Memories header redirects to: ${memoryNav.url()}`);

    // 6. Check if memory is present in the UI
    const grid = await page.$('memory-data');
    const shadow = await grid.getProperty('shadowRoot');

    const memoryVisible = await shadow.$$eval('*', elements => elements.map(el => el.outerHTML));
    console.log('Memory data in UI:', memoryVisible);

     // 7. Check for specific fields in memory card
    const fieldChecks = await shadow.$$eval('*', elements => {
      const content = elements.map(el => el.textContent).join(' ').toLowerCase();

      return {
        hasTitle: content.includes('test memory title'),
        hasDescription: content.includes('this is a test description'),
        hasLocation: content.includes('test location'),
        hasMood: content.includes('happy'),
        allMatch:
          content.includes('test memory title') &&
          content.includes('this is a test description') &&
          content.includes('test location') &&
          content.includes('happy')
      };
    });

     if (fieldChecks.allMatch) {
      console.log('✅ All memory fields correctly displayed in the UI!');
    } else {
      console.log('⚠️ Some fields are missing:');
      if (!fieldChecks.hasTitle) console.log('❌ Missing: Title');
      if (!fieldChecks.hasDescription) console.log('❌ Missing: Description');
      if (!fieldChecks.hasLocation) console.log('❌ Missing: Location');
      if (!fieldChecks.hasMood) console.log('❌ Missing: Mood');
    }


    await new Promise(resolve => setTimeout(resolve, 20000));

    await console.log(memoryVisible
      ? '✅ Memory successfully displayed in UI!'
      : '❌ Memory not found in frontend.');

  } catch (err) {
    console.error('❌ Test failed with error:', err);
  } finally {
    await browser.close();
    await stopServer();
  }
})();
