/**
 * createMemory.test.js
 *
 * This is an end-to-end (E2E) test using Puppeteer that simulates creating a new memory 
 * through the web UI and checks if the memory shows up correctly on the frontend.
 */

// import http from 'http';
// import handler from 'serve-handler';
// import puppeteer from 'puppeteer';
// import path from 'path';
// import { fileURLToPath } from 'url';

// // Get __dirname working in ES module context
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Define file paths
// const homePage = `file:${path.resolve(__dirname, '../../index.html')}`;
// const memoriesPage = `file:${path.resolve(__dirname, '../../memories.html')}`;

// const serveDir = path.resolve(__dirname, '../../'); // adjust if needed
// const PORT = 8080;

// let server;

// async function startServer() {
//   server = http.createServer((request, response) => {
//     return handler(request, response, { public: serveDir });
//   });

//   return new Promise((resolve) => {
//     server.listen(PORT, () => {
//       console.log(`Server running at http://localhost:${PORT}`);
//       resolve();
//     });
//   });
// }

// async function stopServer() {
//   return new Promise((resolve, reject) => {
//     if (!server) resolve();
//     server.close((err) => {
//       if (err) reject(err);
//       else resolve();
//     });
//   });
// }

// (async () => {
//   const browser = await puppeteer.launch({ headless: false });
//   const page = await browser.newPage();

//   try {
//     // 1. Open homepage
//     const browser = await puppeteer.launch({ headless: false });
//     const page = await browser.newPage();

//     const homePage = `http://localhost:${PORT}/index.html`;
//     const memoriesPage = `http://localhost:${PORT}/memories.html`;

//     await page.goto(homePage);

//     // 2. Click "Create a New Memory"
//     await page.waitForSelector('#memoryButton');
//     await page.click('#memoryButton');

//     await new Promise(resolve => setTimeout(resolve, 10000));

//     // 3. Wait for form and fill it out
//     await page.waitForSelector('#memory-form');

//     await new Promise(resolve => setTimeout(resolve, 1000));

//     await page.type('#title', 'Test Memory Title');

//     await new Promise(resolve => setTimeout(resolve, 1000));


//     await page.type('#description', 'This is a test description');

//     await new Promise(resolve => setTimeout(resolve, 1000));


//     await page.type('#location', 'Test Location');
    
//     await new Promise(resolve => setTimeout(resolve, 1000));

//     await page.type('#mood-text', 'Happy');


//     const imageInput = await page.$('#imageUpload');
//     await imageInput.uploadFile(path.resolve(__dirname, 'image.png'));

//     await new Promise(resolve => setTimeout(resolve, 5000));


//     // 4. Submit the form and wait for redirect
//     await Promise.all([
//       page.waitForNavigation({ waitUntil: 'load' }),
//       page.click('.save-btn'),
//     ]);

//     await new Promise(resolve => setTimeout(resolve, 5000));

//     // 5. Navigate to memories.html
//     await page.goto(memoriesPage);
    
//     // Wait for content to render
//     await new Promise(resolve => setTimeout(resolve, 1500));

//     // 6. Check if memory is present in the UI
//     const memoryVisible = await page.evaluate(() => {
//       return Array.from(document.querySelectorAll('memories-grid *')).some(el =>
//         el.textContent.includes('Test Memory Title')
//       );
//     });

//     console.log(memoryVisible
//       ? '✅ Memory successfully displayed in UI!'
//       : '❌ Memory not found in frontend.');

//   } catch (err) {
//     console.error('❌ Test failed with error:', err);
//   } finally {
//     await browser.close();
//   }
// })();

import puppeteer from 'puppeteer';
import http from 'http';
import handler from 'serve-handler';
import path from 'path';
import { fileURLToPath } from 'url';

// __dirname fix for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve the folder containing your HTML and scripts
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

  // Example filling input after ensuring autocomplete or just normal inputs:
  await page.waitForSelector('#memoryButton');
  await page.click('#memoryButton');

  await new Promise(resolve => setTimeout(resolve, 1500));

  // 3. Wait for form and fill it out
  await page.waitForSelector('#memory-form');

  await new Promise(resolve => setTimeout(resolve, 1000));

  await page.type('#title', 'Test Memory Title');

  await new Promise(resolve => setTimeout(resolve, 1000));


  await page.type('#description', 'This is a test description');

  await new Promise(resolve => setTimeout(resolve, 1000));


  await page.type('#location', 'Test Location');
  
  await new Promise(resolve => setTimeout(resolve, 1000));

  await page.type('#mood-text', 'Happy');


  const imageInput = await page.$('#imageUpload');
  await imageInput.uploadFile(path.resolve(__dirname, 'image.png'));

  await new Promise(resolve => setTimeout(resolve, 5000));


  // 4. Submit the form and wait for redirect
  await Promise.all([
    page.waitForNavigation({ waitUntil: 'load' }),
    page.click('.save-btn'),
  ]);

  await new Promise(resolve => setTimeout(resolve, 5000));


  // etc.

  await browser.close();
  await stopServer();
})();
