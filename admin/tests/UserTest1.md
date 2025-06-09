# User Testing

To evaluate the usability and visual design of _MemorySpot_, we conducted a round of in-person usability testing using a functional prototype and Figma comparison.

## Method

Participants tested MemorySpot directly on localhost (127.0.0.1) alongside a Figma prototype. We observed first-time users completing a series of core tasks while thinking aloud. Afterward, we conducted post-task and post-test interviews to understand impressions, pain points, and opportunities for improvement.
Tasks included:

- Entering a Google Maps API key
- Creating a new memory
- Viewing the memory list
- Searching or filtering memories
- Editing or deleting a memory

### Participants

- 2 college students (first-time users)
- Tested across laptop and mobile screen sizes

---

## Summary of Feedback

### :key: API Key Entry

A major usability blocker.

- Users were unfamiliar with what an API key is
- Fake or invalid keys broke the site without any error handling
- No clear way to reset input after failure
  “I didn’t even know what that was supposed to be... and then it broke everything.”
  _Suggested Fixes:_
- Explain what an API key is
- Make it optional for demo/testing
- Add validation and a reset option

---

### :heavy_plus_sign: Creating a Memory

Flow was generally smooth but visually confusing.

- Duplicate “Create” buttons caused hesitation
- Once inside, the form was clear and easy to fill out
  “It was easy… but I got confused by all the ‘Create’ buttons.”
  _Suggested Fixes:_
- Consolidate memory creation buttons
- Group form inputs more clearly

---

### :page_facing_up: Viewing the Memory List

- Button was easy to find
- Navigation worked as expected
  _Minor Feedback:_
- Sidebar occasionally overlapped weirdly
- Expected the map to shift over rather than being hidden

---

### :mag: Filtering Memories

- Filter and search were easy to locate and use
- Mood filter dropdown was understood without instruction
  “The filtering was super obvious. I liked that.”

---

### :pencil2: Editing/Deleting Memories

- Icon buttons were intuitive
- Users understood actions immediately
  _Minor Suggestion:_
- Add hover tooltips for clarity

---

## Post-Test Feedback

### First Impressions

- “Figma design looked better—more colorful, nicer layout.”
- Live version felt gray and outdated

### Favorite Features

- Color scheme from Figma
- Clear form fields
- Sidebar memory layout

### Confusing or Frustrating

- API key flow
- Repeated buttons (Create / Open List)
- Non-clickable logo
- Sidebar layout issues on smaller screens

---

## Suggestions for Improvement

- Make API key optional or easier to reset
- Match layout to UI conventions:
  - Logo on left, links on right
  - Clickable logo returns home
- Push map aside when memory list is open
- Unify or remove repeated buttons
- Increase color contrast for a more modern feel

---

## Would Users Use It?

“Maybe, if I didn’t have to enter an API key.”
“Yeah—it’s intuitive and clean. I’d use it.”

---

## Overall Takeaways

- The _API key barrier_ must be addressed to avoid early drop-off
- The _visual design_ needs color and layout consistency to match user expectations
- Repetitive UI elements create unnecessary confusion
- Core features (memory form, filters, sidebar) are generally solid once reached
