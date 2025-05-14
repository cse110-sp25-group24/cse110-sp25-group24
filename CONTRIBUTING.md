# How to make changes to this repo

1. MAKE SURE YOU FIRST MAKE A NEW BRANCH LIKE `your_github_username-issue#`
2. MAKE A NEW HTML/CSS FILE (if your issue does not have template files already) FOR YOUR WORK UNDER THE `source/` FOLDER
3. When you are done with making all your commits and are ready to push to the remote, do this command:

   ```bash
   git push origin HEAD:your_current_branch_name
   ```

4. Run Prettier to format your code properly
   1. Make sure your working directory in your terminal is at the root of the project `~\cse110-sp25-group24>`.
   2. Make sure you have `node` installed by running `npm -v`, if not Google `node.js` and then install it.
   3. Run `npm install --save-dev prettier`
   4. Run `npx prettier --write .`
   5. Restage the files and make a new commit if needed.
5. Then make a PR and fill out the template.
6. Once you've passed the prettier format check, you are good to get your work reviewed by a peer.
7. Happy Coding :)
