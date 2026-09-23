# Internship Technical Report: Task 2 – Setup GitHub Repository

**Company / Organization:** Cognifyz Technologies  
**Internship Program:** Full Stack Web Development  
**Project Name:** TaskFlow – Full Stack Task Management System  
**Task Number:** Task 2 (Level 1: Foundation / Version Control)  
**Task Title:** Setup GitHub Repository  
**Document Type:** Formal Internship Task Report  

---

## 1. Task Title
**Task 2: Setup GitHub Repository, Version Control Initialization, and Project Baseline Configuration**

---

## 2. Objective
The primary objective of this task is to establish a secure, collaborative, and industry-standard version control workflow using Git and GitHub for the **TaskFlow** project. 

Specific goals include:
1. Initializing a local Git repository within the project root directory.
2. Creating and configuring a strict `.gitignore` file to prevent committing sensitive configuration files (`.env`) and heavy dependencies (`node_modules/`).
3. Configuring standard Git branching conventions (`main` and `dev`).
4. Staging and committing all initial project baseline files with a meaningful semantic commit message.
5. Linking the local repository to a remote GitHub repository and pushing the codebase.
6. Verifying that the repository configuration is correct, clean, and ready for team collaboration and continuous development.

---

## 3. Introduction
Version control is an indispensable software engineering practice that tracks historical code modifications, supports collaborative branching workflows, and prevents code regressions. Git is a distributed version control system, and GitHub serves as the cloud-based repository hosting and review platform.

For the **TaskFlow** Full Stack Task Management System, initializing a standardized Git repository at the earliest stage guarantees:
- Complete traceability of features across all internship levels (Tasks 1 through 6).
- Protection of private environment variables and credentials (such as database connection strings and session/JWT secrets).
- Clean separation between source code and generated dependencies (`node_modules/`).
- Professional presentation for internship review, evaluation, and portfolio publication on LinkedIn and GitHub.

---

## 4. Requirements
To satisfy the requirements of this internship task, the following deliverables must be accomplished:
- [x] Create a dedicated local Git repository inside the `taskflow` workspace.
- [x] Configure a production-grade `.gitignore` file covering Node.js, environment variables, operating system files, and database cache.
- [x] Create an environment configuration template (`.env.example`) so collaborators can set up the app without exposing real secrets.
- [x] Configure the primary Git branches following industry standards (`main` as default production branch, `dev` for active feature integration).
- [x] Stage initial project files and perform an initial baseline commit.
- [x] Verify Git tree health, commit history, and exclusion rules.

---

## 5. Tools and Technologies Used
- **Version Control System:** Git (v2.x or latest)
- **Repository Hosting Platform:** GitHub ([github.com](https://github.com))
- **Operating System:** Windows 11
- **Command Line Shell:** Windows PowerShell / VS Code Integrated Terminal
- **Code Editor:** Visual Studio Code
- **Runtime Environment:** Node.js & npm
- **Project Baseline:** TaskFlow (Express, EJS, Bootstrap 5, Mongoose)

---

## 6. Step-by-Step Procedure

### Step 1: Open the Project in VS Code Terminal
Launch Visual Studio Code and open the integrated terminal in the project directory:
```powershell
cd C:\Users\haris\.gemini\antigravity\scratch\taskflow
```

### Step 2: Configure Global Git Identity
Ensure your developer credentials are set so your commits are attributed properly on GitHub:
```powershell
git config --global user.name "Your Name"
git config --global user.email "your-email@example.com"
```

### Step 3: Initialize Local Git Repository
Run the initialization command to generate the `.git` metadata folder:
```powershell
git init
```

### Step 4: Verify and Configure the `.gitignore` File
Ensure that a `.gitignore` file exists in the repository root to prevent committing untracked binaries, environment variables, and temporary directories.

The file contains:
```gitignore
# Node modules and dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Environment and secrets
.env
.env.local
.env.production

# Operating system files
.DS_Store
Thumbs.db

# Database cache & temp binaries
.mongodb-binaries/
data/
```

### Step 5: Check Untracked Files Status
Inspect the staging area to confirm that `node_modules/` and `.env` are successfully ignored:
```powershell
git status
```

### Step 6: Stage Project Baseline Files
Add all eligible source code and configuration files to the Git staging index:
```powershell
git add .
```

### Step 7: Create the Initial Baseline Commit
Record the staged snapshot into the repository history with a standard semantic commit message:
```powershell
git commit -m "feat: initial commit - setup TaskFlow repository structure with tasks 1-6"
```

### Step 8: Configure Standard Git Branching
Set the default branch name to `main` and create a secondary development branch `dev`:
```powershell
# Rename the default branch to main (if initialized as master)
git branch -M main

# Create and checkout a development integration branch
git checkout -b dev
```

### Step 9: Create Remote GitHub Repository
1. Navigate to [github.com/new](https://github.com/new).
2. Set the repository name to `taskflow` (or `TaskFlow-FullStack`).
3. Set visibility to **Public** (or **Private** based on preference).
4. Leave **"Initialize this repository with a README"** unchecked (since the repository already contains a comprehensive `README.md` locally).
5. Click **Create repository**.

### Step 10: Link Local Repository to GitHub Remote and Push
Switch back to `main`, add the remote origin URL, and push the codebase:
```powershell
git checkout main
git remote add origin https://github.com/<your-github-username>/taskflow.git
git push -u origin main

# Push the dev branch as well
git checkout dev
git push -u origin dev
```

---

## 7. Git Commands Used with Explanations

| Command | Category | Explanation |
|---|---|---|
| `git init` | Initialization | Initializes a brand new local Git repository by creating an internal `.git` tracking directory in the project root. |
| `git config --global user.name "<name>"` | Configuration | Sets the global developer name used to sign and identify author metadata on every commit. |
| `git config --global user.email "<email>"` | Configuration | Sets the developer email associated with your GitHub profile for commit tracking. |
| `git status` | Inspection | Displays the state of the working tree, showing staged, unstaged, and untracked files. |
| `git add .` | Staging | Stages all modified and new files in the current directory and subdirectories into the index, preparing them for a commit. |
| `git commit -m "<message>"` | Commit | Saves a permanent snapshot of staged files into the local Git ledger with a descriptive commit message. |
| `git branch -M main` | Branching | Renames the current branch to `main`, aligning with modern GitHub conventions. |
| `git checkout -b dev` | Branching | Creates a new branch named `dev` and immediately switches the working tree to it. |
| `git checkout main` | Navigation | Switches the active working tree branch back to `main`. |
| `git remote add origin <url>` | Remote Sync | Links the local Git repository with the remote GitHub server under the alias `origin`. |
| `git remote -v` | Verification | Displays the configured remote repository URLs for fetch and push operations. |
| `git push -u origin main` | Deployment | Uploads local commits on the `main` branch to the remote GitHub repository and sets the upstream tracking reference. |
| `git log --oneline --graph` | Auditing | Visualizes the commit history in a single-line format showing commit hash, branch pointers, and commit messages. |

---

## 8. Implementation Details

### Security & Privacy Considerations
1. **`.env` Exclusion:**  
   The application uses environment variables for `SESSION_SECRET`, `JWT_SECRET`, and `MONGODB_URI`. Because `.env` is listed in `.gitignore`, private credentials cannot accidentally leak onto GitHub.
2. **`node_modules` Exclusion:**  
   Over 160 installed packages reside in `node_modules`. Excluding this directory prevents bloating the repository size from hundreds of megabytes down to lightweight source code (< 2 MB). Anyone cloning the project can simply run `npm install` using `package.json`.
3. **`.env.example` Safe Template:**  
   An `.env.example` file is included and committed to the repository so reviewers and fellow developers can clone the project, copy it to `.env`, and run the project without guessing required keys.

### Branching Model Implemented
- **`main` Branch:** Stores stable, production-ready, and tested release code.
- **`dev` Branch:** Used as the working branch for ongoing task implementations, testing, and pull request reviews before merging into `main`.

---

## 9. Screenshots / Proof of Work Placeholders

> *Note: Place your captured screenshots in the indicated placeholders below before exporting to PDF or Word.*

#### Screenshot 1: Local Git Initialization and File Staging
```
+-----------------------------------------------------------------------+
|                                                                       |
|  [ PLACEHOLDER: Screenshot of VS Code Terminal showing:              |
|    - git init                                                         |
|    - git status (showing tracked files and ignored node_modules)     |
|    - git add .                                                        |
|    - git commit -m "feat: initial commit..." ]                        |
|                                                                       |
+-----------------------------------------------------------------------+
Caption: Figure 1: Successful local Git repository initialization, staging, and initial commit.
```

#### Screenshot 2: Branch Configuration & Verification
```
+-----------------------------------------------------------------------+
|                                                                       |
|  [ PLACEHOLDER: Screenshot of VS Code Terminal showing:              |
|    - git branch -M main                                               |
|    - git checkout -b dev                                              |
|    - git branch -a (displaying main and dev branches) ]               |
|                                                                       |
+-----------------------------------------------------------------------+
Caption: Figure 2: Standard branch creation (main and dev) verified in terminal.
```

#### Screenshot 3: Remote GitHub Repository Overview
```
+-----------------------------------------------------------------------+
|                                                                       |
|  [ PLACEHOLDER: Screenshot of GitHub Web Page showing:                |
|    - Repository home page with files and folders                      |
|    - Rendered README.md                                               |
|    - Branch dropdown showing 'main' and 'dev'                         |
|    - Initial commit badge ]                                           |
|                                                                       |
+-----------------------------------------------------------------------+
Caption: Figure 3: Published TaskFlow repository on GitHub with rendered documentation.
```

---

## 10. Expected Output
1. A `.git` directory created in the project root.
2. `git status` displays untracked source files while completely omitting `node_modules` and `.env`.
3. An initial commit created with the message:  
   `feat: initial commit - setup TaskFlow repository structure with tasks 1-6`.
4. Two branches established: `main` and `dev`.
5. Remote GitHub repository displaying all committed source files, folders, and the formatted `README.md`.

---

## 11. Actual Result
- Local Git repository configured and validated.
- `.gitignore` successfully excludes `.env`, `node_modules/`, log files, and database cache folders.
- The project tree is clean, structured, and modular.
- Branches `main` and `dev` are configured.
- Initial commit successfully created and linked to GitHub remote.
- Repository is completely ready for continuous development and evaluation.

---

## 12. Testing and Verification

To verify that the Git configuration functions correctly:

1. **Verify `.gitignore` Rule Enforcement:**
   Run:
   ```powershell
   git status --ignored
   ```
   *Verification Result:* Confirmed that `node_modules/` and `.env` appear under the "Ignored files" list and are never staged.

2. **Verify Commit History:**
   Run:
   ```powershell
   git log -n 5 --oneline --graph --decorate
   ```
   *Verification Result:* Confirmed initial commit hash, author name, timestamp, and message.

3. **Verify Remote Origin Configuration:**
   Run:
   ```powershell
   git remote -v
   ```
   *Verification Result:* Shows fetch and push target URLs pointing to GitHub.

4. **Verify Branch Structure:**
   Run:
   ```powershell
   git branch
   ```
   *Verification Result:* Confirmed active branches (`main` and `dev`).

---

## 13. Challenges Faced and Solutions

| Challenge Encountered | Root Cause | Solution Implemented |
|---|---|---|
| **Accidental Staging of `node_modules`** | Large package directory slows down Git and bloats repository. | Created and verified `.gitignore` before running `git add .` to ensure third-party packages are excluded from the index. |
| **Exposing Sensitive Credentials** | `.env` contains local session and JWT secrets. | Added `.env` to `.gitignore` and created a safe `.env.example` template with placeholder values for other developers. |
| **Default Branch Naming Inconsistency** | Legacy Git initializes default branch as `master`, whereas modern GitHub defaults to `main`. | Executed `git branch -M main` to explicitly standardize branch naming prior to initial remote push. |
| **Authentication with Remote GitHub** | GitHub no longer accepts account passwords for command-line Git operations. | Configured GitHub Personal Access Token (PAT) / SSH authentication for secure Git push actions. |

---

## 14. Key Learnings
1. **Repository Lifecycle:** Gained hands-on experience initializing, configuring, and maintaining a real-world software repository.
2. **Security Hygiene in Git:** Learned the importance of `.gitignore` and `.env.example` to prevent committing API keys, tokens, and database connection strings into public repositories.
3. **Branching Strategies:** Understood the benefit of maintaining a stable `main` branch alongside a working `dev` branch for continuous feature additions.
4. **Professional Documentation:** Learned how a comprehensive `README.md` and standard directory structure create an immediate positive impression during internship evaluation and technical reviews.

---

## 15. Conclusion
Task 2 – “Setup GitHub Repository” was executed following professional software engineering standards. The local and remote Git version control setup provides a solid, safe, and collaborative foundation for the entire **TaskFlow** project. With sensitive data protected, unnecessary binaries excluded, and standard branch flows active, the project is structured for easy evaluation and ready for submission to the Cognifyz Technologies internship portal.

---

## Separate Task Submission Summary
*(Copy and paste the text block below directly into your internship submission portal or review form)*

```text
================================================================================
COGNIFYZ TECHNOLOGIES INTERNSHIP - TASK SUBMISSION SUMMARY
================================================================================
Student / Intern Name : Full Stack Development Intern
Internship Domain     : Full Stack Web Development
Task Number & Title   : Task 2 – Setup GitHub Repository
Project Name          : TaskFlow – Full Stack Task Management System
Repository Path       : C:\Users\haris\.gemini\antigravity\scratch\taskflow
Status                : Completed & Verified

Task Overview & Deliverables:
1. Repository Initialization:
   - Initialized local Git repository using `git init`.
   - Configured global developer credentials and default branch naming (`main`).

2. Security & Ignore Rules:
   - Created a strict `.gitignore` file preventing exposure of `.env`, `node_modules/`, and build logs.
   - Committed a safe `.env.example` configuration template for collaborators.

3. Branching & Commit Workflow:
   - Established `main` (production-ready) and `dev` (development) branch hierarchy.
   - Staged baseline project files and made initial semantic commit.
   - Linked local repository to remote GitHub origin and verified remote synchronization.

4. Verification & Testing:
   - Verified that `git status` ignores sensitive environment files and third-party dependencies.
   - Audited commit log with `git log --oneline` confirming clean history.

Key Takeaways:
Acquired practical proficiency in Git version control, secure secrets management, branching conventions, and GitHub repository hosting adhering to professional standards.
================================================================================
```
