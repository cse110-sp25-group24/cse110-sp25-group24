# 📍 MemorySpot — A Card-Based Location Sharing Web App

## 🧠 Overview

MemorySpot allows users to create memory `cards` that include location data, descriptions, and images. These cards are displayed in conjunction with a map filled with markers to associate a `memory` with a `spot`.

---

## 🚀 Features

- 📸 Add, update, and delete cards with title, image, description, mood, and geolocation
- 🗺 View all cards with pins on a shared map
- 🔍 Filter memory cards
- 📱 Responsive design for desktop & mobile

---

## 🧪 Running the App locally:

```bash
git clone https://github.com/cse110-sp25-group24/cse110-sp25-group24.git
cd cse110-sp25-group24/source
```

and run on live server. Or, checkout our deployed page [here](https://cse110-sp25-group24.github.io/cse110-sp25-group24/)

Since this project is restricted to native web components, we as a team have decided that you will need your own Google Map API key for security reasons. For more information on this decision, please reference this [ADR](./specs/adrs/all-decisions/06062025APIKeyADR.md)

 If you would like an API key, you can do one of the following: 

1. Contact one of the Team Members to aquire a restricted api key.

2. Make your own API key (for instructions on how to do so see below). Google Maps API offers a $300 free credit which is more than enough to run our project.

## Creating your own Google Maps API Key
To make your own API key, navigate to the [Google Maps Platform](https://developers.google.com/maps). 

Click `Get started` to navigate to the console, where you will be able to make your own API key. 

Then, enable the the following APIs:
* Maps JavaScript API
* Places API
* Places API (New)

---

## 📦 Tech Stack

| Layer     | Tools / Libraries                     |
| --------- | ------------------------------------- |
| Front-End | HTML, CSS, JavaScript                 |
| APIs      | Google Maps API                       |
| Storage   | IndexedDB + LocalStorage              |
| Testing   | Jest + Babel + Puppeteer              |
| DevOps    | GitHub Actions, Prettier              |

---

## 🤝 Contributing
To learn how to contribute, click [here](./CONTRIBUTING.md)

--

## 🧾 Documentation

[Link to all method documentation.](https://cse110-sp25-group24.github.io/cse110-sp25-group24/docs/)

---

## Running Tests / Instructions

A few basic commands for running tests:

1. Ensure `npm install` is run to install all dependencies first.
2. To run a single test file, enter and run `npm test fileName.js` where 'fileName' is the test file you wish to run.
3. In case of end-to-end ('e2e') tests, run `npm run test:e2e`.
4. To run all test files at once, enter and run `npx jest`.

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
