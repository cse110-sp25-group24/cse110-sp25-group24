---
title: [Map API ADR] - [Concise Decision Name]
status: Proposed
date: 05-08-2025
decision-makers: [William Widjaja, Alexis Vega]
---

## Summary

**One-sentence overview of the decision.**
_(e.g., We will store card data in Firestore as JSON documents tied to user accounts.)_

---

## Context and Problem Statement

How to write readable test assertions?
How to write readable test assertions for advanced tests?

## Considered Options

* Cookies
* WebStorage
* IndexDB
* Cache API

## Decision Outcome

Chosen option: "IndexDB", because comes out best (see "Pros and Cons of the Options" below).

### Consequences

* Good, supports storage of structured and unstructured data
* Good, much higher storage capacity than other local storage APIs (since we are restricted to only local dependencies)
* Good, data isn't lost when the browser is closed

* Bad, while supported on many browsers, there are many different restrictions accross the browsers
* Bad, writing clean and maintainable code using this API can be challenging

### Confirmation

* Check project dependencies, IndexDB should appear.
* Collect experience with IndexDB in sprint reviews and retrospectives to determine if the gains pros and cons evaluation below?
* Have a trial run with other teams in charge of determining datatypes of how to store location, images, and other needs.

## Pros and Cons of the Options

### Plain JUnit5

[Homepage](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)

Example:

```js
const openRequest = indexedDB.open("InstaPostsDB", 1);

openRequest.onupgradeneeded = function (e) {
  const db = e.target.result;
  if (!db.objectStoreNames.contains("posts")) {
    const store = db.createObjectStore("posts", { keyPath: "id", autoIncrement: true });
    store.createIndex("title", "title", { unique: false });
  }
};

openRequest.onsuccess = function (e) {
  const db = e.target.result;
  const fileInput = document.querySelector("#imageInput");

  fileInput.addEventListener("change", () => {
    const file = fileInput.files[0];

    // Convert Blob to base64 for JSON storage
    const reader = new FileReader();
    reader.onload = function (event) {
      const base64String = event.target.result;

      const post = {
        title: "Beach Day",
        caption: "Sunny and chill vibes ☀️🏖️",
        imageBase64: base64String, // now fully structured
      };

      const tx = db.transaction("posts", "readwrite");
      const store = tx.objectStore("posts");
      store.add(post);

      tx.oncomplete = () => console.log("Structured JSON post added!");
      tx.onerror = () => console.error("Failed to add post.");
    };

    reader.readAsDataURL(file); // This returns a base64 string
  });
};

```

* Good, because Junit5 is "common Java knowledge"
* Bad, because complex assertions tend to get hard to read
* Bad, because no fluent API

### Hamcrest

Homepage: <https://github.com/hamcrest/JavaHamcrest>

* Good, because offers advanced matchers (such as `contains`)
* Bad, because not full fluent API
* Bad, because entry barrier is increased

### AssertJ

Homepage: <https://joel-costigliola.github.io/assertj/>

Example:

```java
assertThat(markdownFormatter.format(source))
        .contains("Markup<br />")
        .contains("<li>list item one</li>")
        .contains("<li>list item 2</li>")
        .contains("> rest")
        .doesNotContain("\n");
```

* Good, because offers fluent assertions
* Good, because allows partial string testing to focus on important parts
* Good, because assertions are more readable
* Bad, because not commonly used
* Bad, because newcomers have to learn an additional language to express test cases
* Bad, because entry barrier is increased
* Bad, because expressions of test cases vary from unit test to unit test

## More Information

German comparison between Hamcrest and AssertJ: <https://www.sigs-datacom.de/uploads/tx_dmjournals/philipp_JS_06_15_gRfN.pdf>.
