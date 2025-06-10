# How to Contribute

## Understanding the Codebase

In order to contribute to this codebase, we first need to understand our file structure.

The codebase is structured as follows:

```ascii
/
├── admin (documenting our progress)
├── specs (documenting our big code choices)
├── source/
│   ├── scripts/  js files
│   ├── styles/   css files
│   ├── tests/
│       ├── e2e
│       ├── mock (IndexDB clone for unit testing)
│       └── all test .js files
│   ├── node_modules/ (add to .gitignore)
│   ├── package-lock.json
│   ├── package.json
│   ├── index.html
│   ├── memories.html
│   ├── create.html
│   ├── 404.html
│   └── other config files...
├── .gitignore
├── CONTRIBUTING.md
└── README.md
```

## Environment Setup

> Note: If you already have a `node_modules/` folder in your project, move it into the `source/` folder.

To set up your environment for contributing to this codebase, follow these steps:

1. Make sure you have `git` installed on your machine. If not, Google `git` and install it.
2. Clone the repository to your local machine using the following command:

   ```bash
   git clone https://github.com/cse110-sp25-group24/cse110-sp25-group24.git
   ```

3. Navigate to the source code:

   ```bash
   cd cse110-sp25-group24/source/
   ```

### Installing Node.js + CI/CD dependencies

Install [`Node.js`](https://nodejs.org/en) in order to run tests and linters used in CI/CD pipeline

To ensure consistent code formatting and documentation, we use Prettier, JSDocs. 

To test our code, we use Jest, Babel and Puppetteer in our project.

Install necessary dependencies:
   ```bash
   cd ~/cse110-sp25-group24/source/
   npm install
   ```

This will install all dependencies listed in `package.json`. Feel free to check them out and `npm install` each of them seperately if you have any concerns. If you encounter any issues, make sure to check the documentation for each tool or ask for help in the project's communication channels.


## Committing to the Codebase

> Check out our CI/CD pipeline [here](admin/cipipeline/phase2diagram.png)

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
