# 06/02/25 - Testing With Babel ADR

## Context

Our codebase uses modern JavaScript (ES Modules) with `import` and `export` statements, but Jest (our testing framework) runs in a Node.js environment, which doesn't support ES Modules out of the box.

This caused tests using `import/export` to break, especially when testing browser-specific features like `FileReader`. To allow Jest to process these modules, we needed to add a JavaScript compiler.

## Decision

We decided to configure and use **Babel** to transpile ES6+ code to a format Jest understands.

Specifically, we:

- Installed `babel-jest`, `@babel/core`, and `@babel/preset-env` as development dependencies
- Added a `babel.config.js` file in the `source/` directory
- Updated the `package.json` test script to run Jest
- Mocked `FileReader` globally in test files to simulate browser behavior

This allowed us to write and run unit tests for functions in `dataHandlingFunctions.js`, including `fileToDataUrl`, without needing to rewrite the project’s module system.

## Consequences

- All contributors must run `npm install` from inside the `source/` directory to get Babel and Jest working
- Tests now support ES6+ syntax and can accurately simulate DOM/browser behavior using mocks
- Future tests that involve browser APIs will be easier to implement
- We'll eventually need to update our GitHub Actions pipeline to make sure it installs dev dependencies and runs tests with Babel support
