# CI/CD Pipeline Overview

## Current Functional CI/CD Stages

### 1. Developer pushes code or opens a Pull Request

* **Status:** Fully Functional
* **Details:** Development is done through feature branches. Once a developer opens a PR against the `main` branch, it triggers the pipeline.

### 2. GitHub Actions triggered on PR to main branch

* **Status:** Fully Functional
* **Details:** The GitHub Actions workflow is set to run on `pull_request` events targeting `main`. This initiates automated checks and tests.

### 3. Set up Node.js environment (`actions/setup-node`)

* **Status:** Functional
* **Details:** A specific Node.js version is installed and made available to ensure consistent runtime behavior across machines.

### 4. Install dependencies (Prettier only)

* **Status:** Fully Functional
* **Details:** Only Prettier is installed via `npm ci` or `npm install --omit=dev` to keep dependencies minimal and reduce build time.

### 6. Run Prettier in check mode (`npx prettier . --check`)

* **Status:** Fully Functional
* **Details:** This enforces consistent code style. The build fails if any file is not formatted correctly, which helps standardize codebase quality.

### 7. Run unit tests

* **Status:** Planned
* **Planned Setup:**

  * **Frontend:** Jest will be configured to test UI components and logic.
  * **Backend:** Mocha/Chai will be used to validate REST APIs or server logic.

### 8. Run integration or end-to-end tests (Maybe use Cypress)

* **Status:** Planned  
* **Next Steps:** Add Cypress configuration for UI interaction tests, such as user profile flows and card creation validation.

### 9. Require Pull Request approval (Code Quality via Human Review)

* **Status:** Fully Functional
* **Details:** GitHub branch protection rules require at least one review before merging. This step ensures logical, stylistic, and documentation correctness.

### 10. Merge PR into main

* **Status:** Functional
* **Details:** Merges are performed manually after all CI checks and reviews are satisfied.

### 11. Auto-deploy main to staging or production

* **Status:** Planned
* **Details:** Once merged, Vercel will be configured to automatically deploy the latest code from `main`.

### 12. Deployment target: Vercel

* **Why Vercel:**

  * Minimal configuration
  * Fast deployments
  * Built-in CI integration
  * Serverless support for future API routes

---

## CI/CD Pipeline Diagram

```mermaid
graph TD
    A[Developer pushes code or opens a Pull Request] --> B[GitHub Actions triggered on PR to main]
    B --> C[Checkout repository (actions/checkout)]
    C --> D[Set up Node.js environment (actions/setup-node)]
    D --> E[Install dependencies (Prettier only)]
    E --> F[Run Prettier in check mode]
    F --> G[Run unit tests]
    G --> H[Run integration or E2E tests (Cypress)]
    H --> I[Pull Request Review (Manual approval)]
    I --> J[Merge PR into main]
    J --> K[Auto-deploy to staging/production]
    K --> L[Deployment on Vercel (Frontend)]
```

---

## Summary

We’ve completed most of the initial CI steps including formatting, review enforcement, and code checkout. Our next milestone involves completing unit and e2e testing setups, and configuring Vercel for automatic deployment. Once completed, this pipeline will enforce quality while enabling rapid development and safe releases.
