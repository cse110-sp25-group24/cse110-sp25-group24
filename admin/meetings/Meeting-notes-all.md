## BeeZee 24/7 Meeting Notes

FIGMA DESIGN: [https://www.figma.com/design/j5dsZGY9REcKf4zlFZ585E/Untitled?node-id=60-4&t=TWyql1a0A1vTKNLV-1](https://www.figma.com/design/j5dsZGY9REcKf4zlFZ585E/Untitled?node-id=60-4&t=TWyql1a0A1vTKNLV-1)

↓↓↓↓

CSS INSPO:


## Meetings
- [BeeZee 24/7 Meeting Notes](#beezee-247-meeting-notes)
- [Meetings](#meetings)
- [Warmup Exercise](#warmup-exercise)
- [Apr 18, 2025](#apr-18-2025)
- [Apr 23, 2025](#apr-23-2025)
- [May 7, 2025](#may-7-2025)
- [May 14, 2025](#may-14-2025)
- [May 20, 2025](#may-20-2025)
- [May 20, 2025 (Additional)](#may-20-2025-additional)
- [May 22, 2025](#may-22-2025)
- [May 24, 2025](#may-24-2025)
- [Jun 1, 2025](#jun-1-2025)
- [Jun 3, 2025](#jun-3-2025)
- [Jun 5, 2025](#jun-5-2025)
- [Jun 6. 2025](#jun-6-2025)




##   Warmup Exercise

Present: Alexis, Widjaja, Aruthan, Eric, Myat, Noeh, TL, Vincent, Yilong

Absent: Phiroze, Chris



* Set up the github repo - [https://github.com/cse110-sp25-group24/warmup-exercise/](https://github.com/cse110-sp25-group24/warmup-exercise/)
* Find everyone's strengths and weaknesses/ experience

<table>
  <tr>
   <td>
How Comfortable?
   </td>
   <td>HTML
   </td>
   <td>CSS
   </td>
   <td>JavaScript
   </td>
  </tr>
  <tr>
   <td>Alexis
   </td>
   <td>4
   </td>
   <td>4
   </td>
   <td>2
   </td>
  </tr>
  <tr>
   <td>Aruthan
   </td>
   <td>2
   </td>
   <td>1
   </td>
   <td>3
   </td>
  </tr>
  <tr>
   <td>Chris
   </td>
   <td>3
   </td>
   <td>1
   </td>
   <td>2
   </td>
  </tr>
  <tr>
   <td>Eric
   </td>
   <td>2
   </td>
   <td>1
   </td>
   <td>1
   </td>
  </tr>
  <tr>
   <td>Myat
   </td>
   <td>4
   </td>
   <td>3
   </td>
   <td>3
   </td>
  </tr>
  <tr>
   <td>Noeh
   </td>
   <td>2
   </td>
   <td>2
   </td>
   <td>1
   </td>
  </tr>
  <tr>
   <td>Phiroze
   </td>
   <td>1
   </td>
   <td>1
   </td>
   <td>2
   </td>
  </tr>
  <tr>
   <td>TL
   </td>
   <td>3
   </td>
   <td>2
   </td>
   <td>3
   </td>
  </tr>
  <tr>
   <td>Vincent
   </td>
   <td>3
   </td>
   <td>2
   </td>
   <td>2
   </td>
  </tr>
  <tr>
   <td>Widjaja
   </td>
   <td>4
   </td>
   <td>3
   </td>
   <td>3
   </td>
  </tr>
  <tr>
   <td>Yilong
   </td>
   <td>3
   </td>
   <td>1
   </td>
   <td>1
   </td>
  </tr>
</table>


4 groups

* 1. Eric, Yilong, Chris - HTML
    * Issues [#2](https://github.com/cse110-sp25-group24/warmup-exercise/issues/2), [#3](https://github.com/cse110-sp25-group24/warmup-exercise/issues/3)
* 2. Aruthan, TL, Vincent - Balanced HTML & JS
    * Issue [#1](https://github.com/cse110-sp25-group24/warmup-exercise/issues/1)
* 3. Noeh, Myat, Phiroze - HTML & CSS
    * Issues [#4](https://github.com/cse110-sp25-group24/warmup-exercise/issues/4)
* Alexis & Widjaja floaters(tell us if you need extra help and we’ll help!)

#1: Focusing on: Card Deck and Playing Card Web Components complete with animation of flip and/or shuffle (HTML, CSS, and very light JS)



* Come Up    with a design/idea of what we want to do - All Hands
    * Deck in the middle
    * Upon the user “flipping a card” 
        * Put the current card in front of the user (if not the first card in the deck) face down in the “discard pile”
        * Pull the next card from the shuffled deck and “flip it over”
    * If the deck is empty, reshuffle automatically and put the deck back
    * If the user clicks a button to “Shuffle” it should flip all the cards into the discard pile, then start the shuffle process.
* Create Issues on github for what needs to get done - All Hands
    *  HTML
        * Create a container for a card
            * Create placeholder cards (when deleting a placeholder, the next placeholder under it should pop up for example) - html
            * [https://rawgit.com/richardschneider/cardsJS/master/hello.html](https://rawgit.com/richardschneider/cardsJS/master/hello.html)
        * Create a non-functional Shuffle button
        * Create a non-functional Draw button
        * *Put this all together for overall game*
            * Create a container for the deck
            * Create container for where the decks/shuffle button will go
    * CSS
        * Style the cards?
            * Style the card backing?
        * Style the buttons
        * Style the whole screen
    * JavaScript
        * Create a representation of cards
        * Create a representation of a deck or “stack” containing multiple cards
        * Implement shuffle logic - js
            * If shuffle button is clicked, shuffle the deck
            * If deck is empty and shuffle/flip button are clicked, shuffle the deck
            * To shuffle the deck - put all the cards back in the “unflipped” deck data structure and shuffle them randomly
        * Add animations - js
            * Flip
            * Shuffle
* Pair up into groups to work on different tasks (will rotate tasks)
* Alexis - Rough Design on Figma

(When done with #1 we’ll see if we can do #2)

#2: Dealing with the deck, complete with an ability to pull the cards one or multiple at a time and state management of the deck (more JS + some simple web APIs)

##  Apr 18, 2025

BeeZee24/7 Leads meeting:

To Fix:

#9 cards.js

deck.push('${value} of $suit'); 

Need to replace taht with: 

deck.push(`${j} of ${i}`);

#7 and #9 are the same → worked on same part

Todo: 



- [ ] Connect Draw Button to drawCard() Function → JS
- [ ] Connect Shuffle Button to shuffleDeck() Function → JS
- [ ] Display the Drawn Card →JS
- [ ] Add flip animation → CSS, maybe slight JS
- [ ] Replace Placeholder Card with Dynamic Image
- [ ] Style Shuffle and Draw Buttons → CSS
- [ ] Style Overall Screen with name of game and background → CSS
- [ ] We could add class names or ids to html rn 


##  Apr 23, 2025

Attendance: Alexis, Widjaja, Aruthan, Eric, Myat, Noeh, TL, Vincent, Yilong, Chris, Phiroze

Absent: 

Time: Wed Apr 23 3:00pm

Tool/location: Miro Hybrid


##  May 7, 2025

Attendance: Alexis, Widjaja, Aruthan, Eric, Myat, TL, Vincent, Chris, Phiroze, Noeh

Time: Wed May 07 2:00pm

Tool/location: Hybrid

**What we did during meeting:**



* Made a doc with bullets of what to have in the contract 
    * Everyone wrote down ideas for bullets for what we need to have in our contract
* Going to convert that into markdown
    * Eric made format and transfering all our notes
* Copied the template for ADR from the link on canvas
    * 
* Made the folders/paths for it on github 
* Made Miro Board for CI/CD
    * [https://miro.com/app/board/uXjVI41SusE=/?share_link_id=576561649157](https://miro.com/app/board/uXjVI41SusE=/?share_link_id=576561649157)





* TWTH- meetings 
    * Wednesday in person project development 
    * Tuesday and Thursday standup meetings after cse 110 (in person)

**What is left to do after meeting:**



* Everyone should make a pdf of team contract and sign it at bottom and put it in /admin/misc/rules-studentname.md
    * Ex: /admin/misc/rules-thomaspowell.md
    * Project leads will convert your signed md to a pdf
* Design a CI/CD pipeline for Checkpoint 1
    * [https://miro.com/app/board/uXjVI41SusE=/?share_link_id=576561649157](https://miro.com/app/board/uXjVI41SusE=/?share_link_id=576561649157)
    * Transfer it to a drawio.png in the repo
    * Actually implement the CI/CD pipeline in our GitHub
* Make an ADR for Checkpoint 1
    * Have at least 3-5 major design decisions
* Leads need to make product back log - after lecture on Thursday

**Questions?**



* Should there be anything in ADR right now or is the template fine for now?
* checkpoint 1 and checkpoint 2? → elaborate

<span style="text-decoration:underline;">MEETING WITH TA:</span>

Scrum masters - organize team 

Suggestions: 



* Product back log: create all issue for product rn only as initial phase 
    * Write allllll issues
    * Send TA repo link
    * There will still be some between sprint
    * Every sprint pull some  issues to sprint back log and assign to team member
* Project Roadmap 
    * Chart or in mind, by which sprint we should be done with which part 
    * Week 6 be done with this feature week 7 UI etc….
* After each sprint can create more decisions 
    * Create some for now for first checkpoint and as sprint goes keep adding to it
    * Should have 3-5 rn
* CI pipeline
    * Like 3 steps
* Sprint planning - take from product back log and put into sprint backlog 
    * One issue assigned every week 
    * At least one task each sprint
    * Sprint standups - status report - where they are with their issue
    * End of week sprint review : demo what you've developed to each other and how they executed it - record it
    * End of week  sprint retrospective: what went well and what went wrong during development - record it 
* Branch and merge strategy - who will be reviewing pull request (us or them ex)
* Setup GitHub projects - track all issues, use in daily standups, then move it 
* Create Product Backlog, Project Roadmap
* Submit ADR, CI/CD Pipeline, Group Contract Assignments by Sunday
* Schedule Weekly Sprint Meetings: Sprint Planning, Sprint StandUps, Sprint Review, Sprint Retro (last 2 are recorded)
* Decide on Branch/Merge Strategy(peer review?lead review?)
* Setup Github Projects for your Sprint StandUps
* Participate in Class

##  May 14, 2025

Attendance: Alexis, Widjaja, Aruthan, Eric, Myat, TL, Vincent, Chris, Phiroze, Noeh, Yilong

Time: Wed May 14 3:00pm - 5:00 pm

Tool/location: Hybrid

**What we did during meeting:**



* Came together and figured out which issues we would each like to take over
* Everyone chose their own issue and figured out what they wanted to do
* We went over each issue and what they might need/entail together as a group
* Made the issues on GitHub
* Made template files for the issues with inline-comments on what each person should be working on
* Made a [CONTRIBUTING.md](CONTRIBUTING.md) file for reference on how to make changes to the repository
* Miro board: [https://miro.com/app/board/uXjVI41SusE=/?share_link_id=576561649157](https://miro.com/app/board/uXjVI41SusE=/?share_link_id=576561649157)



**What is left to do after meeting:**



*  Make GitHub actions
    * Integrate documentation checks in the CI/CD pipeline
    * Also implement Unit Testing somehow (is there a way to do this with HTML CSS? Or is this JS specific? - ask Devanshi?)
* and need to refine everybody’s issues by TONIGHT on GitHub so everyone can start working on their respective branches
    * Make Issues for Chris + Widjaja and template files/areas to work on and inline comment sections for our issues
* How can we make everyone on the team aware of the Project board?
* Also we need to let everyone know that collaboration on issues is encouraged.
* Everyone should finish issues by Friday night and then we will meet on Sunday for the Sprint Review and Retrospective

**Questions?**



* Also implement Unit Testing somehow (is there a way to do this with HTML CSS? Or is this JS specific? - ask Devanshi?)

<span style="text-decoration:underline;">MEETING WITH TA:</span>

Map api - way to do it without / still show static map —> with js create clickable data; too much code so didnt reject map api—> issue when network goes down. If network down and cant load google map api. Cant create show message to show message on top that network is down and limited functions. 

CICD pipeline: only one step —> whenever pull request ; prettier. 

linting fornatting prettier

need more steps in phase one

we only have: format and check 

list of steps in canvas : set up documentation and unit testing this sprint 

prettier one works well

in repo theres meetings folders there store md file with meeting notes and store it iin md —> store all meeting notes there 

review and retro sprint planning meeting do at start of week like monday —> assign issues monday and assign and estimate

last 

create issues in cicd divide entire task into issues—> 

eveyr sprint plan decide what we all need to do for this week and sprint. 

pull issues from backlog


##  May 20, 2025

Attendance: Alexis, Widjaja, Aruthan, Eric, Myat, TL, Vincent, Phiroze, Noeh, Yilong

Time: Tuesday May 20 6:20pm - 6:45 pm

Tool/location: In-Person

We talked about what groups to put everybody in and an idea of what issues we each want to make in our groups to start putting this thing together.

Phiroze, Yilong, TL, Noeh, Chris:



* Putting the homepage together
* Conforming styling for CSS into one stylesheet/style, however you would like to do this
* Making the header connect to the other pages and polishing the styling in general

Aruthan, Eric, Myat, Vincent:



* Putting functionality for creating a memory
* Make the create new memory button connect to the create a new memory page (if you can collab with the other team to also put this on the homepage when they are putting it together, that would be great as well)
* Putting functionality in the case that a user logs in (what will we do when we can’t login/network request for this part gets cut?)


##  May 20, 2025 (Additional)

Attendance: Alexis, Widjaja

Time: Tuesday May 20 6:20pm - 6:45 pm

Tool/location: Remote



* Set up documentation in the CI/CD pipeline
* Clean up the branches - Name branches well according to the feature you are working on instead of your own name
    * Close branches where work is already done
* Make a staging branch


## May 22, 2025

Attendance: Alexis, Widjaja, Aruthan, Chris, Eric, Myat, TL, Phiroze, Noeh, Yilong

Time: Thursday May 22 6:20pm - 6:45 pm

Tool/location: In-Person



* Finalized issues and clarified requirements
* Work on CI/CD pipeline - Alexis, Widjaja
    * Setting up JSDocs/automatic documentation of some kind
    * Unit testing/Integration testing
* Sprint and Retro this Saturday 12-2, after the meeting we will go back into our groups for the ADRs and re-review what we might need to change in our design docs
* Should we continue using JWT?


##  May 24, 2025

Attendance: Everyone

Time: Saturday May 24 12:00pm - 2:00pm

Tool/location: Discord / Slack / Retrium

Assignments to cover:



* [Agile - Sprint Review Meetings](https://canvas.ucsd.edu/courses/64571/assignments/952012)
* [Agile - Retrospective](https://canvas.ucsd.edu/courses/64571/assignments/952011)

Wait for late people… (5-10 minutes)

Standup (55 minutes):



* Google Form: [https://forms.gle/eZZaY8NLNTWZpY5q7](https://forms.gle/eZZaY8NLNTWZpY5q7)
* Then we will go over everyones’ responses.

Retrospective (20-30 minutes):



* Retrium: [https://app.retrium.com/team-room/74a0c95e-b95c-4a1d-97a7-5ab5a9d62579/retro](https://app.retrium.com/team-room/74a0c95e-b95c-4a1d-97a7-5ab5a9d62579/retro)

Assignments to cover:



* [CI/CD Pipeline](https://canvas.ucsd.edu/courses/64571/assignments/952015)
* [Documentation - Internal Documentation : ADR (Architectural Decision Records)](https://canvas.ucsd.edu/courses/64571/assignments/952016)

Post-meeting (20 minutes):



* Talk about CI/CD changes
    * Prettier
    * JSDocs
    * Jest
    * Talk about assigning oneself to an issue
    * Talk about assigning labels to an issue
    * Talk about the Project board
* Talk about change in main/prod
    * We want to make a branch stemming from main called **prod **where we will make our feature changes and then once we feel we have hit a certain stage, we will clean up and make a big pull request to main. This way we reduce merging and branching from the main deployment branch.
* What changes might we want to make to our team for this next upcoming sprint? How can we most effectively get things done and get an MVP (regardless of how we’re supposed to not do an MVP but we gotta get something to show for 😭)

TODO:



* Alexis and Widjaja must update the CI/CD pipeline through the cicd branch and create submittables for this canvas assignment
* **Each team must submit at least one MAJOR change to an ADR OR create a new ADR entirely (for a new feature/new change) by<span style="text-decoration:underline;"> Sunday 6:00 PM</span>**
* [https://www.when2meet.com/?30657566-Rn4vz](https://www.when2meet.com/?30657566-Rn4vz) (old one)


## Jun 1, 2025

Absent: 

Time: Sunday June 1 6:00pm - 7:30pm

Tool/location: Discord / Slack / Retrium

Assignments to cover:



* [Agile - Sprint Review Meetings](https://canvas.ucsd.edu/courses/64571/assignments/952012)
* [Agile - Retrospective](https://canvas.ucsd.edu/courses/64571/assignments/952011)

Wait for late people… (5-10 minutes)

Standup (55 minutes):



* Google Form: [https://forms.gle/XtqLgFwxA5ZeN9JV9](https://forms.gle/XtqLgFwxA5ZeN9JV9) 
* Then we will go over everyones’ responses.

Retrospective (20-30 minutes):



* Retrium: [https://app.retrium.com/team-room/74a0c95e-b95c-4a1d-97a7-5ab5a9d62579/retro](https://app.retrium.com/team-room/74a0c95e-b95c-4a1d-97a7-5ab5a9d62579/retro)

Notes: 



* For people who need something to do:
    * TESTING 
    * refactor functions
    * tests and documentation in pipeline 
    * end to end —>pupeteering, jest
    * Make buttons nicer and → hover bubble that will go to : frontend changes
        * Add better styling to certain things
        * Look into why on screen it scrolled left and right (should just stay put)
        * Alexis wants to fix the front end. It is there but it can be nicer and also I want to fix css to match how powell likes with root variables and stuff
        * Make new branch → styling css refactoring-css → memories and index
        * No touch form or login → widjaja wants to keep playing around with this
        * Alexis make an issue for css
* Changes are in the refactor branch of the repo if anyone wants to look at the changes we discussed in meeting
* List availabilities for next week (put it in slack thread)
    * → delegate backend task based on hours available 
* We need to do real life user testing too.
* Increase the # of async stand ups
    * Understand where we’re at daily 
    * What did you do 
    * What did you work on 
    * Where to jump in/blockers etd
* Friday → soft deadline
* Sunday → Hard deadline
* Unit testing fix card templates
* Reach out to myat or eric who have been doing backend and ask them how to help or look at their stuff in the branch and see what initiatives to take to help 
* [cardTemplate.js](cardTemplate.js) → look what its trying to do (shadow dom) , and then reach out if confused how to help

TODO:



* Increase the # of async stand ups(slack)
* Respond to TL’s thread in the Slack so we can figure out how to delegate all the backend tasks
* Respond to Alexis’ mini sprint todos in the new async updates channel so we can all figure out where we’re headed :)
* Alexis and Widjaja 
    * Fill out Retro meeting notes → alexis will do this after meeting
    * Fill out sprint review meeting notes ( widjaja will do this )


##  Jun 3, 2025

Excused: TL, Phiroze

Time: Tuesday June 3 6:20pm - 6:45pm

Tool/location: In-Person



* form safety checks
* page fallback for things that break
* restricted api key
* more testing, E2E hookup
* also fix css - > refactor w/ styling  and potentially help refactor html semantics (for actual html tags that i might not have known ab)
* come up w/ justification/rejection reasons for babel (do we necessarily need for integration/e2e testing? does this necessarily make our lives a whole lot easier?)
* a way to edit cards?? (talk ab rest of website design sometime tn or tmr, low pressure)


## Jun 5, 2025 

Attendance: Perfect

Time: Thursday Jun 5th 6:20-6:45

Location: In person



* Discussed timeline for deadline: Friday meet to work, aim to finish Saturday
* Clean up branches : Suggestion to only have 4 rn theyre all getting jumbled and confusing
  


##  Jun 6. 2025

Attendance: Alexis, Widjaja, TL, Myat

Time: Friday Jun 6th 3-whenever

Location: In person



* Css:
    * center/scale image on create page when image is uploaded (particularly an issue with smaller images)
  
