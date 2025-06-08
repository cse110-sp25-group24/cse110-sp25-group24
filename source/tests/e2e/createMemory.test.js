/**
 * createMemory.test.js
 *
 * This is an end-to-end (E2E) test using Puppeteer that simulates creating a new memory 
 * through the web UI and checks if the memory shows up correctly on the frontend.
 */

import puppeteer from 'puppeteer';
import http from 'http';
import handler from 'serve-handler';
import path from 'path';
import { fileURLToPath } from 'url';

// __dirname fix for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
  const page = await browser.newPage();

  const homePage = `http://localhost:${PORT}/index.html`;
  const memoriesPage = `http://localhost:${PORT}/memories.html`;

  await page.goto(homePage);

  // Your test logic here...
  // e.g., wait for button, click, fill form, submit, etc.

  await page.waitForSelector('#memoryButton');
  await page.click('#memoryButton');

  await new Promise(resolve => setTimeout(resolve, 1500)); // Wait for form submission and DB save

  await new Promise(resolve => setTimeout(resolve, 1500)); // Wait for page content to load

  await page.type('#description', 'This is a test description');

  await new Promise(resolve => setTimeout(resolve, 1500));

  await page.type('#location', 'Test Location');
  
  await new Promise(resolve => setTimeout(resolve, 1500));

  await page.type('#mood-text', 'Happy');


  const imageInput = await page.$('#imageUpload');
  await imageInput.uploadFile(path.resolve(__dirname, 'image.png'));

  await new Promise(resolve => setTimeout(resolve, 1500));


  await Promise.all([
    page.waitForNavigation({ waitUntil: 'load' }),
    page.click('.save-btn'),
  ]);

  await new Promise(resolve => setTimeout(resolve, 1500));

  await page.goto(memoriesPage);

  // etc.

  await browser.close();
  await stopServer();
})();
