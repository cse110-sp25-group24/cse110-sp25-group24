# BeeZee 24/7 Architectural Decision Records (ADR)

Each ADR will have a seperate document, but this will be the master document to have an overview of all decisions made.

> Format is: MMDDYY-Decision-Name.md

[5/10 - Map ADR](all-decisions/05102025MapADR.md)

- We propose using the **Google Maps JavaScript API via `<script>` tag** to display and interact with a map on our web application. This will enable users to drop pins, view memory cards on a location, and search for places. This decision minimizes dependencies but still provides the interactive features our project requires.

[5/10 - Card ADR](all-decisions/05102025CardADR.md)

- Our goal is to implement location cards on the map using dual view (being able to see cards both on the map and in list format), using IndexedDB in order to achieve efficient data retrieval, as well as geospatial caching, and consistency in the components of each card.

[5/10 - Storage API ADR](all-decisions/05102025StorageApiADR.md)

- We will store card data in as JSON documents tied to user accounts in IndexDB.

[5/10 - User Profiles ADR](all-decisions/05102025UserProfilesADR.md)

- We will use JWT for user authentication to support public/private memory cards and a draft/save/publish workflow, with a user model that includes email, password, `user_cards`, and `user_icon`, all without external dependencies.
