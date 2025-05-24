# How to Contribute

## Table of Contents

- [How to Contribute](#how-to-contribute)
  - [Table of Contents](#table-of-contents)
  - [Understanding the Codebase](#understanding-the-codebase)
  - [Environment Setup](#environment-setup)
    - [Installing Node.js and NVM](#installing-nodejs-and-nvm)
    - [Installing Prettier, JSDocs, and Jest](#installing-prettier-jsdocs-and-jest)
  - [Committing to the Codebase](#committing-to-the-codebase)

## Understanding the Codebase

In order to contribute to this codebase, we first need to understand our file structure.

The codebase is structured as follows:

```ascii
/
├── source/
│   ├── demo/
│   ├── imgs/
│   ├── scripts/
│   ├── styles/
│   ├── tests/
│   ├── node_modules/ (this one is hidden in the remote)
│   ├── package-lock.json
│   ├── package.json
│   └── everything else...
├── .gitignore
├── CONTRIBUTING.md
├── README.md
└── everything else...
```

The `source/` folder contains all the HTML, CSS, and JavaScript files that make up the project. The `demo/` folder contains demo files for testing purposes. The `imgs/` folder contains images used in the project. The `scripts/` folder contains JavaScript files, while the `styles/` folder contains CSS files. The `tests/` folder is where you can find test files for the project.

## Environment Setup

To set up your environment for contributing to this codebase, follow these steps:

1. Make sure you have `git` installed on your machine. If not, Google `git` and install it.
2. Clone the repository to your local machine using the following command:

   ```bash
   git clone repo_url_here/repo_ssh_here
   ```

3. Navigate to the source code:

   ```bash
   cd cse110-sp25-group24/source/
   ```

### Installing Node.js and NVM

1. Make sure you have `nvm` (Node Version Manager) installed on your machine. If not, follow [this guide](https://www.freecodecamp.org/news/node-version-manager-nvm-install-guide/).

2. Install Node.js version 22 using `nvm`:

   ```bash
   nvm install 22
   nvm use 22
   ```

### Installing Prettier, JSDocs, and Jest

To ensure consistent code formatting and documentation, we use Prettier, JSDocs, and Jest in our project. Follow these steps to set them up:

1. Make sure you are in the source of the project directory (where `package.json` is located).

   ```bash
   cd ~/cse110-sp25-group24/source/
   ```

2. Install the necessary packages:

   ```bash
   npm install --save-dev prettier jsdoc jest
   ```

3. After installing, you can run the following commands to ensure everything is set up correctly:

   ```bash
   npx prettier --check .
   npx jsdoc -c jsdoc.json
   npx jest --version
   ```

4. If you encounter any issues, make sure to check the documentation for each tool or ask for help in the project's communication channels.

## Committing to the Codebase

1. Make sure you first make a new branch with a name like: `feature_name-issue_number`
2. Do the work.
3. Run Prettier to format your code properly (see below for instructions).
   1. Make sure your working directory in your terminal is in the source code of the project `~\cse110-sp25-group24\source>`.
   2. Run `npx prettier --write .`
   3. Restage the files and make a new commit if needed.
4. When you are done with making all your commits and are ready to push to the remote, run:

   ```bash
   git push origin HEAD
   ```

5. Then make a PR and fill out the template.
6. Once you've passed the prettier format check and the testing suites passed, you are good to get your work reviewed by a peer.
7. Happy Coding :)
