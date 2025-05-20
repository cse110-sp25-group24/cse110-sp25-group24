# BeeZee 24/7 - Sprint Standup Notes

**Date:** 2025-05-18  
**Time:** 4:30 PM  
**Location/Tool:** Slack + Discord
**Facilitator:** Alexis Vega / William Widjaja
**Notetaker:** Alexis Vega

---

## ✅ Attendance

| Team Member             | Present? | Notes (late, remote, etc.) |
| ----------------------- | -------- | -------------------------- |
| Alexis Vega             | ✅       |                            |
| Aruthan Raveendra       | ✅       |                            |
| Chris Enotiadis         | ✅       |                            |
| Eric Song               | ✅       |                            |
| Myat Thiha              | ✅       |                            |
| Noeh Parrales           | ✅       |                            |
| Phiroze Duggal          | ❌       | Absent                     |
| Thanh-Long Nguyen Trong | ✅       |                            |
| Vincent Nguyen          | ✅       |                            |
| William Widjaja         | ✅       |                            |
| Yilong Chen             | ✅       |                            |

---

## 🗣️ Individual Updates

### Alexis Vega

- **What I did since last standup:**
  Created the explore memory page and added the explore memory cards
- **What I'm working on today/next:**  
  Code reviews and fixing any bugs found in my code. I also need to actually figure out how to store it and not just manually type it to see.
- **What's blocking me:**  
  Conflicted on whether to keep the cards its own separate component similar to lab 7 where we use shadow dom for card components wondering if i should do it like that instead.

### Aruthan Raveendra

- **What I did since last standup:**
  Added a responsive "Create a New Memory" button in the top-right corner, styled with Comic Sans and adaptive to different screen sizes.
- **What I'm working on today/next:**  
  I am going to do a code review and some testing for my issue to make sure that it is working properly.
- **What's blocking me:**  
  Just the code review, no issues with the implementation or logistics

### Chris Enotiadis

- **What I did since last standup:**
  Worked on Issue #34: Toggle Switch Button, Apple style, not finished yet
- **What I'm working on today/next:**  
  Finishing up the Apple Style Toggle Switch button, and creating a PR
- **What's blocking me:**  
  Nothing, just need to finish the work.

### Eric Song

- **What I did since last standup:**
  Worked on issue #30. I have created a working prototype that satisfies most of our requirements minus some additional functionality needed to integrate with the main product.
- **What I'm working on today/next:**  
  I’m going to be adding in a lot more safety checks and handling in case something goes wrong. I am also going to be figuring out some promise-based asynchronous handling. I also am probably going to be stress testing the system and adding in some constraints on what images we can upload.
- **What's blocking me:**  
  I need some clarification from the group on what we think about asynchronous promise-based functions running plus an agreed upon syntax usage. I also need to coordinate with people to finalize the structure of the posts that are actually going to be inputted. There was something else that I was thinking about but I am currently blanking on–I will give a post stand-up update later this week when I remember it (via Slack). I also need to coordinate with the designers on additional functionality, especially for searching.

### Myat Thiha

- **What I did since last standup:**
  Added the form creation page with the form interface referencing the UI design in Miro.
- **What I'm working on today/next:**  
  Code review and fixes. Potentially close the issue assigned and expect to assign a new task.
- **What's blocking me:**  
  Need to coordinate with the backend person to actually implement the functionality of storing the created memory so that it can route back to the main page.

### Noeh Parrales

- **What I did since last standup:**
  Added the footer that's styled and responsive. Including the copyright info, navigation links
- **What I'm working on today/next:**  
  Fixing any issues or bugs, or even redesigning the footer if needed
- **What's blocking me:**  
  The code review, nothing major at this moment

### Phiroze Duggal

- **What I did since last standup:**
  N/A
- **What I'm working on today/next:**
  N/A
- **What's blocking me:**
  N/A

### Thanh-Long Nguyen Trong

- **What I did since last standup:**
  Weighed pros and cons of using different map libraries/apis and ultimately decided on gmaps api. Opened up the pr to merge to main.
- **What I'm working on today/next:**
  Making any suggested changes to the pr. Start working on adding custom markers (figure out what we want on the marker)
- **What's blocking me:**
  Offline features are limited regardless of what map api/library we use. Would be open to suggestions from anyone who has experience with making 100% offline map components.  
  Prettier failing, is it being run on the entire repo? If so, are we all supposed to install it as a node.js dependency?

### Vincent Nguyen

- **What I did since last standup:**
  Created a login page that takes in username and password with minimal styling
- **What I'm working on today/next:**
  Waiting on code review/approval for my PR and what’s my next step
- **What's blocking me:**
  I decided the post route to be /login but not sure if we want to name it that and what final styling should the login page look like

### William Widjaja

- **What I did since last standup:**  
  Made issues for everyone and tried to help reconcile the project expectations. I worked on the memories page that the user will be able to see their own cards that they made and view them in a responsive grid/list view.
- **What I'm working on today/next:**  
  Reviewing others’ code as well as pushing out new issues and doing a review of my own work
- **What's blocking me:**  
  Taking 5 upper-div classes at once

### Yilong Chen

- **What I did since last standup:**  
  Wrote an HTML and a CSS to implement card memory list
- **What I'm working on today/next:**  
  Make a PR
- **What's blocking me:**  
  N/A

---

## 🔥 Group Highlights & Issues

- [x] Figure out what to put at the bottom of footer for the links → maybe link to our GitHub
- [x] Prettier failing on GitHub — determine if it's repo-wide and if we need to install as dependency
- [ ] Coordinate final integration of frontend-backend interactions for form submission and login
- [ ] Decide on shared style conventions for async/promise syntax in JS

---

## 📌 Action Items

| Task                                                       | Assigned To                  | Due Date   |
| ---------------------------------------------------------- | ---------------------------- | ---------- |
| Coordinate frontend and backend integration                | All Members                  | 2025-05-20 |
| Take video for assignment and coordinate when to meet      | William Widjaja, All Members | 2025-05-19 |
| Resolve Prettier config and install repo-wide if necessary | All Members                  | 2025-05-19 |

---

## 🔜 Next Standup

**Date:** Tuesday, 2025-05-20  
**Time:** After CSE 110 @ 6:20 PM  
**Facilitator:** Eric Song
