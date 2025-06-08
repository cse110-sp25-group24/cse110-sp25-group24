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

    console.log(`Navigated to: ${createNav.url()}`);

    // 3. Wait for form and fill it out
    await page.waitForSelector('#memory-form');
    await page.type('#title', 'Test Memory Title');
    await page.type('#description', 'This is a test description');
    await page.type('#location', 'Test Location');
    await page.type('#mood-text', 'Happy');


    const imageInput = await page.$('#imageUpload');
    await imageInput.uploadFile(path.resolve(__dirname, 'image.png'));

    // 4. Submit the form and wait for redirect
    await Promise.all([
      page.waitForNavigation(),
      page.click('.save-btn'),
    ]);

    // 5. Navigate to memories.html
    await page.goto(memoriesPage);

    console.log('Navigated to memories page');

    // 6. Check if memory is present in the UI
    // const cards = await page.evaluate(async () => {
    //   const grid = await page.$('memories-grid');
    //   if (!grid) {
    //   return 'memories-grid element not found';
    //   }
    //   const shadow = await grid.getProperty('shadowRoot');
    //   if (!shadow) {
    //   return 'shadowRoot not found on memories-grid';
    //   }
    //   return Array.from(shadow.querySelectorAll('*')).map(el => el.outerHTML);
    // });
    // console.log('Shadow DOM elements in memories-grid:', cards);

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
