# 📍 MemoryMap — A Card-Based Location Sharing Web App

## 🧠 Overview

MemoryMap allows users to create memory “cards” that include location data, descriptions, and images. These are displayed on a map and are able to be shared with others of the app 
in a fashion similar to social media. 

---

## 🚀 Features

- 📸 Add and display memory cards with title, image, and geolocation 
- 🗺 View all cards pinned on a shared map
- 🔍 Filter/search memory cards
- 📴 Potential Offline support via service worker (PWA)
- 📱 Responsive design for desktop & ideally for mobile in future
  
---

## 🧪 Running the App locally: 

```bash
git clone https://github.com/cse110-sp25-group24/cse110-sp25-group24.git
cd cse110-sp25-group24/source
npm install
npm test    # Run unit tests
```
---

## 📦 Tech Stack

| Layer        | Tools / Libraries                               |
|--------------|-------------------------------------------------|
| Front-End    | HTML, CSS, JavaScript                           |
| APIs         | Google Maps API (Places & Geocoding)            |
| Storage      | IndexedDB + localStorage                        |
| Testing      | Jest                                            |
| DevOps       | GitHub Actions (CI), ESLint, Prettier           |

---

## 🤝 Contributing

[Contributing File](./CONTRIBUTING.md)

-- 

## 🧾 Documentation

[Link to team page.](/admin/team.md)

--- 

## Running Tests / Instructions

A few basic commands for running tests:
1. Ensure `npm install` is run to install all dependencies first.
2. To run a single test file, enter and run `npm test fileName.test.js` where 'fileName' is the test file you wish to run.
3. To run all test files at once, enter and run `npx jest`.
4. In case of end-to-end or 'e2e' tests that are implemented now or in the future, run `npm run test:ete`. 

---

## 👥 Team Members
- Yilong Chen
- Phiroze Duggal
- Vincent Nguyen
- Eric Song
- Alexis Vega
- Thanh-Long Nguyen Trong (TL)
- Aruthan Raveendra
- Noeh Parrales
- Chris Enotiadis
- William Widjaja
- Myat Thiha

