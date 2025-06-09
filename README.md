# 📍 MemorySpot — A Card-Based Location Sharing Web App

## Project Overview

This project was made for our CSE 110: Software Engineering Spring 2025 Course, under supervision of our Professor, Thomas Powell, and our TA, Devanshi Chadha. All developpers on this project were randomly assigned into this group in order for us to practice the AGILE practices that we learned in class. Since our experiences in development differ widely, the course staff have decided to restrict our project to **`LOCAL FIRST`** built with `Native Web-app Components` for a `CRUD` web-app.

Due to the time constraints of this course, we were not able to fully all our intended features, most dissaponintingly using service workers to cache our application in case of a network cut-off. However, we have laid the foundation to do by choosing technologies that enable graceful degradation (for our crucial app features to function).

---

## Application Overview
**MemorySpot** allows users to create memory `cards` that include location data, descriptions, and images. These cards are displayed in conjunction with a map filled with markers to associate a `memory` with a `spot`.

## 🚀 Features

- 📸 `Create`, `update`, and `delete` cards with title, image, description, mood, and geolocation
- 🗺 View (`read`) all cards with or without a shared map with markers
- 🔍 Filter memory cards based off of moods
- 📱 Responsive design for desktop & mobile

---

## 🧪 Running the App:

```bash
git clone https://github.com/cse110-sp25-group24/cse110-sp25-group24.git
cd cse110-sp25-group24/source
```

and run on `live server` extension starting at `source/index.html`. Or, checkout our deployed page [here](https://cse110-sp25-group24.github.io/cse110-sp25-group24/)

Since this project is restricted to `native web components`, we as a team have decided that you will need your own `Google Map API` key for security reasons. For more information on this decision, please reference this [ADR](./specs/adrs/all-decisions/06062025APIKeyADR.md). (Due to time constraints of the project, we were not able to follow through with our vision) 

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

| Layer     | Tools / Libraries                         |
| --------- | ----------------------------------------- |
| Front-End | HTML, CSS, JavaScript                     |
| APIs      | Google Maps API                           |
| Storage   | IndexedDB + LocalStorage (LOCAL FIRST!)   |
| Testing   | Jest + Babel + Puppeteer                  |
| DevOps    | GitHub Actions, Prettier                  |

---

Note: Node dependencies are not required to run the app, but are required for linting and testing in our CI/CD pipeline. 

## 🤝 Contributing
To learn how to contribute, click [here](./CONTRIBUTING.md)

Note: we appologise for the large amount of tech debt and inconsistency in our efforts. This is a diverse team with a wide range of relevant skills in development and working experience. While some may have prefered to be 10x devs we wanted to allow the opportunity for our less experienced members to have a chance to learn and contribute; some devs seized this learning opportunity while others had different priorities, which led to procrastination of the project. 

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

## 👥 Team Members & Roles

- William Widjaja (Co-Lead): Fullstack + QA + DevOps
- Alexis Vega (Co-lead): UI/UX Designer + Front-end
- Thanh-Long Nguyen Trong (TL): Fullstack + QA + DevOps
- Eric Song: Backend
- Myat Thiha: Backend
- Aruthan Raveendra: Backend
- Vincent Nguyen: QA
- Noeh Parrales: Front-end + QA
- Chris Enotiadis: Front-end + QA
- Yilong Chen: Backend
- Phiroze Duggal 
