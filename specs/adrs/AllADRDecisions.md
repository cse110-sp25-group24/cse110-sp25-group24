# BeeZee 24/7 Architectural Decision Records (ADR)

Each ADR will have a seperate document, but this will be the master document to have an overview of all decisions made.

> Format is: MMDDYY-Decision-Name.md

[5/10 - Map ADR](all-decisions/05102025MapADR.md)

- We propose using the **Google Maps JavaScript API via `<script>` tag** to display and interact with a map on our web application. This will enable users to drop pins, view memory cards on a location, and search for places. This decision minimizes dependencies but still provides the interactive features our project requires.

[5/10 - Card ADR](all-decisions/05102025CardADR.md)

- Our goal is to implement location cards on the map using dual view (being able to see cards both on the map and in list format), using IndexedDB in order to achieve efficient data retrieval, as well as geospatial caching, and consistency in the components of each card. **Updated 5/25:** Clarified data retrieval method, locked in IndexedDB, and added updated schema and code references.

[5/10 - Storage API ADR](all-decisions/05102025StorageApiADR.md)

- We will store card data in as JSON documents tied to user accounts in IndexDB. **Updated 5/25 to note removal of server-side storage** due to project constraints.

[5/10 - User Profiles ADR](all-decisions/05102025UserProfilesADR.md)

- We will use JWT for user authentication to support public/private memory cards and a draft/save/publish workflow, with a user model that includes email, password, `user_cards`, and `user_icon`, all without external dependencies. **Updated 5/25:** Decision revised — authentication was removed entirely due to IndexedDB/local-only limitations and scope reduction. All card data will be stored and managed anonymously on the client side.

[5/25 - User Profiles ADR](all-decisions/05252025UserProfilesADR.md)

- The team ultimately consulted and chose the Google Maps API to solve the issue of needing to store markers on a map. This is a crucial function of our application in order to save data, locations, and memories.

[6/1 - Displaying Cards ADR](all-decisions/05252025UserProfilesADR.md)

- This proposal outlines the workflow for creating and displaying memory entries using IndexedDB. When a user submits the Memory Creation Form, the data is stored in IndexedDB. Each stored memory is then dynamically displayed on the Memories Page and visually represented as a marker on the Memories Map.


[6/3 - View Card Detail ADR](all-decisions/06032025ViewCardDetailADR.md)

- This ADR propose an implementation of card detail and card editing view.

[6/3 - API Key ADR](all-decisions/06062025APIKeyADR.md)

- Currently, it is required to generate an API key for users to access the website. This is not idea and is a consequence from our lack of server-side interaction. I propose that the current system be a fallback and we used a restricted API key.
