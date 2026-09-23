# TaskFlow – Full Stack Task Management System

[![Cognifyz Technologies Internship](https://img.shields.io/badge/Cognifyz%20Technologies-Full%20Stack%20Development-blue.svg)](https://cognifyz.com)
[![Node.js](https://img.shields.io/badge/Node.js-v24.x%20LTS-green.svg)](https://nodejs.org)
[![Express](https://img.shields.io/badge/Express-v4.21-lightgrey.svg)](https://expressjs.com)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-brightgreen.svg)](https://mongoosejs.com)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-v5.3-purple.svg)](https://getbootstrap.com)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

> A modern, production-ready Full Stack Task Management System built progressively across **Level 1 (Beginner)**, **Level 2 (Intermediate)**, and **Level 3 (Advanced)** as part of the **Cognifyz Technologies Full Stack Development Internship Program**.

---

## Table of Contents
1. [Project Title](#1-project-title)
2. [Project Description](#2-project-description)
3. [Internship Information](#3-internship-information)
4. [Technologies Used](#4-technologies-used)
5. [Key Features](#5-key-features)
6. [Task 1 Implementation](#6-task-1-implementation)
7. [Task 2 Implementation](#7-task-2-implementation)
8. [Task 3 Implementation](#8-task-3-implementation)
9. [Task 4 Implementation](#9-task-4-implementation)
10. [Task 5 Implementation](#10-task-5-implementation)
11. [Task 6 Implementation](#11-task-6-implementation)
12. [Project Architecture](#12-project-architecture)
13. [Installation Instructions](#13-installation-instructions)
14. [Environment Setup](#14-environment-setup)
15. [MongoDB Setup & Zero-Config Mode](#15-mongodb-setup--zero-config-mode)
16. [How to Run the Application](#16-how-to-run-the-application)
17. [RESTful API Documentation](#17-restful-api-documentation)
18. [Screenshots & UI Showcase](#18-screenshots--ui-showcase)
19. [Future Enhancements](#19-future-enhancements)
20. [Author & Acknowledgments](#20-author--acknowledgments)

---

## 1. Project Title
**TaskFlow – Full Stack Task Management System**

---

## 2. Project Description
**TaskFlow** is a comprehensive task management platform designed to provide individual developers and collaborative teams with a secure, responsive, and intuitive workspace. Users can register securely, log in, create tasks with deadlines and priority levels, dynamically update task statuses, perform instant search and filtering, and access their data with guaranteed multi-user privacy.

The project is structured to demonstrate progressive software engineering mastery: beginning with fundamental HTML form submissions and Express Server-Side Rendering (SSR) in Level 1, progressing to advanced responsive CSS styling, dynamic DOM manipulation, and Single Page Application (SPA) routing in Level 2, and concluding with a complete RESTful API, MongoDB integration, and bcrypt/JWT authentication in Level 3.

---

## 3. Internship Information
- **Company:** Cognifyz Technologies
- **Domain:** Full Stack Web Development
- **Internship Scope:** Completion of Tasks 1 through 6 (exceeding the 5-task requirement):
  - **Level 1 (Beginner):** Task 1 (HTML Structure & Basic Server Interaction) & Task 2 (Inline Styles & Server-Side Validation)
  - **Level 2 (Intermediate):** Task 3 (Advanced CSS & Responsive Design) & Task 4 (Complex Validation & Dynamic DOM Manipulation)
  - **Level 3 (Advanced):** Task 5 (API Integration & Frontend Interaction) & Task 6 (Database Integration & User Authentication)
- **Review Portals:**
  - Standalone Showcase Hub: `/`
  - Individual Task Launchers: `/tasks/task-1` to `/tasks/task-6`
  - Production Workspace: `/dashboard`

---

## 4. Technologies Used

### Frontend
- **HTML5:** Semantic document markup (`<main>`, `<nav>`, `<section>`, `<article>`, `<header>`, `<footer>`).
- **CSS3:** Custom properties (CSS variables), glassmorphism (`backdrop-filter`), Flexbox, CSS Grid, keyframe animations, micro-interactions.
- **Bootstrap 5.3.3:** Responsive grid, offcanvas navigation, modal dialogs, form components, and badges.
- **JavaScript (ES6+):** Clean ES Modules (`import`/`export`), async/await, Fetch API, DOM manipulation, hash-based client routing.

### Backend
- **Node.js (v24 LTS):** High-performance asynchronous runtime environment.
- **Express.js (v4.21):** Fast, unopinionated web framework handling routing, REST endpoints, and middleware.
- **EJS (Embedded JavaScript):** Server-side rendering engine for dynamic templating.

### Database & Authentication
- **MongoDB:** NoSQL document database.
- **Mongoose (v8.9):** Elegant object modeling schema library with indexing, pre-save hooks, and custom methods.
- **bcryptjs (v2.4):** 10-round salted password hashing for credential security.
- **express-session & jsonwebtoken:** Session management for web templates and JWT Bearer token authentication for API requests.
- **mongodb-memory-server:** Embedded zero-config fallback ensuring immediate evaluation without pre-existing MongoDB daemons.

---

## 5. Key Features
- **Progressive Architecture:** Each of the 6 internship levels is completely accessible via its own dedicated route (`/tasks/task-X`) and documented in individual directories (`task-X/`).
- **Dual-Layer Validation:** Instant client-side feedback combined with strict server-side validation rejecting invalid payloads with HTTP 400.
- **Interactive Password Strength Meter:** Real-time analysis of password complexity (length, lowercase, uppercase, digits, special characters) with a 3-tier visual progress indicator.
- **Dynamic DOM Manipulation:** Real-time task creation, status toggles (Pending → In Progress → Completed), animated deletions, and instant search/filtering without page reload.
- **Complete RESTful API:** Standard HTTP methods (GET, POST, PUT, DELETE) with uniform JSON response envelopes and error handling.
- **MongoDB Persistence & Multi-User Isolation:** Tasks are linked to specific user ObjectIds. Users can only read, update, or delete their own tasks; unauthorized actions trigger HTTP 403 Forbidden.
- **Fully Responsive:** Tested across mobile (<768px), tablet (768px–1024px), and desktop (>1024px) viewports.

---

## 6. Task 1 Implementation
- **Route:** `GET /tasks/task-1`, `POST /tasks/task-1`
- **Objective:** Introduce server-side rendering and basic form submissions.
- **How it works:**
  1. An HTML/EJS form captures task title and description.
  2. The form submits via HTTP POST (`application/x-www-form-urlencoded`).
  3. Express receives the payload via `express.urlencoded({ extended: true })`.
  4. The server validates that the title is not empty, constructs a task object, stores it in session memory, and passes it directly to `views/tasks/task-1.ejs`.
  5. EJS conditionally renders the newly submitted task card dynamically on the server.

---

## 7. Task 2 Implementation
- **Route:** `GET /tasks/task-2`, `POST /tasks/task-2`
- **Objective:** Expand inline styles, interactive client validation, server-side validation, and temporary server storage.
- **How it works:**
  1. Form is extended with fields: Title, Description, Priority (Low, Medium, High, Urgent), and Due Date.
  2. Client-side JavaScript (`public/js/task2-validation.js`) listens on input and submit events. If fields are missing or invalid, submission is blocked via `event.preventDefault()` with real-time error spans.
  3. Server-side validation (`server/controllers/task2Controller.js`) enforces string lengths (title 3–100 chars), valid priority enums, and ensures due date is not in the past.
  4. Malformed requests are rejected with HTTP 400 Bad Request, preserving user input and rendering field-specific error messages.
  5. Valid tasks are stored in temporary server-side memory (`task2TemporaryStorage`) and rendered with priority-coded inline styles.

---

## 8. Task 3 Implementation
- **Route:** `GET /tasks/task-3`
- **Objective:** Enhance CSS styling and build a fully responsive multi-section layout.
- **How it works:**
  1. Implements a multi-section design:
     - **Navbar:** Sticky navigation with brand badge and responsive hamburger menu.
     - **Hero Section:** Gradient mesh styling, velocity summary, and call-to-action buttons.
     - **Task Statistics:** 4 interactive metric cards (Total, In Progress, Completed, High/Urgent).
     - **Task Cards Grid:** Responsive card deck with progress tracks, priority badges, and assignees.
     - **Footer:** Accessible links and internship credits.
  2. Advanced CSS (`public/css/task3.css`): CSS custom properties (`--t3-hero-bg`, `--t3-card-bg`), glassmorphism (`backdrop-filter: blur()`), hover card lifts (`transform: translateY(-5px)`), and keyframe pulse animations.
  3. Responsive layout built with Bootstrap 5 grid adapting seamlessly to mobile, tablet, and desktop screens.

---

## 9. Task 4 Implementation
- **Route:** `GET /tasks/task-4`
- **Objective:** Complex form validation, dynamic DOM updates, and client-side routing.
- **How it works:**
  1. **Clean ES Modules Architecture (`public/js/task4/`):**
     - `validation.js`: Regex email validator, confirm password matcher, and 5-tier password strength analyzer (evaluating length >= 8, uppercase, lowercase, numbers, and special characters).
     - `taskManager.js`: In-memory DOM state manager handling dynamic task addition, status toggling, smooth animated deletions, and real-time search/filtering.
     - `router.js`: Hash-based client router switching views (`#tasks`, `#create`, `#register-demo`, `#stats`) without page reload.
     - `app.js`: Main orchestrator coordinating user interactions and live statistics re-calculation.
  2. Live DOM updates recalculate metrics (Total, Pending, In Progress, Completed, Velocity Rate) instantaneously upon any user action.

---

## 10. Task 5 Implementation
- **Route:** `GET /tasks/task-5` (Frontend UI) & `/api/tasks` (RESTful API)
- **Objective:** Server-client communication through a RESTful API.
- **How it works:**
  1. **Express RESTful API:** Implements complete CRUD operations:
     - `GET /api/tasks`: Retrieves all tasks with query filter support (`?status=` and `?search=`).
     - `GET /api/tasks/:id`: Retrieves single task by ID.
     - `POST /api/tasks`: Creates a task, returning HTTP 201 Created.
     - `PUT /api/tasks/:id`: Updates an existing task, returning HTTP 200 OK.
     - `DELETE /api/tasks/:id`: Deletes a task, returning HTTP 200 OK.
  2. **JSON Responses:** All endpoints return structured envelopes: `{ success: boolean, message?: string, data?: any }`.
  3. **Frontend Fetch Client (`public/js/task5-api.js`):** Uses modern `fetch()` with async/await, displaying loading spinners during network requests and error alert banners on failures.

---

## 11. Task 6 Implementation
- **Route:** `GET /tasks/task-6` (Workspace), `/auth/*` (Authentication), `/api/v1/tasks` (Protected API)
- **Objective:** Database integration and user authentication.
- **How it works:**
  1. **MongoDB with Mongoose:** Connected via `server/config/db.js`.
  2. **Models:**
     - `User` (`server/models/User.js`): Name, unique email, password (bcrypt hashed with 10 salt rounds), role. Password and internal fields are stripped in `toJSON`.
     - `Task` (`server/models/Task.js`): Title, description, priority, status, dueDate, and user reference (`type: ObjectId, ref: 'User'`).
  3. **Authentication:**
     - `POST /auth/register`: Hashes password with bcrypt, saves user to MongoDB, issues session & JWT token.
     - `POST /auth/login`: Verifies credentials with `bcrypt.compare`, sets session, issues token. Generic "Invalid email or password" error prevents credential enumeration.
     - `GET /auth/logout`: Safely destroys session.
  4. **Authorization & Multi-User Isolation:**
     - Task API endpoints are protected by `authApi` and `ensureAuthenticated`.
     - Queries are scoped strictly to `user: req.user._id`.
     - Attempting to view, modify, or delete another user's task returns HTTP 403 Forbidden.

---

## 12. Project Architecture

```
taskflow/
├── task-1/                     # Cognifyz Level 1 Task 1 standalone module & docs
├── task-2/                     # Cognifyz Level 1 Task 2 standalone module & docs
├── task-3/                     # Cognifyz Level 2 Task 3 standalone module & docs
├── task-4/                     # Cognifyz Level 2 Task 4 standalone module & docs
├── task-5/                     # Cognifyz Level 3 Task 5 standalone module & docs
├── task-6/                     # Cognifyz Level 3 Task 6 standalone module & docs
│
├── server/
│   ├── config/
│   │   └── db.js               # MongoDB Mongoose connection manager & memory-server fallback
│   ├── models/
│   │   ├── User.js             # Mongoose User model with bcrypt pre-save hook
│   │   └── Task.js             # Mongoose Task model with compound indexes
│   ├── controllers/
│   │   ├── authController.js   # Registration, login, logout, and token issuance
│   │   ├── taskController.js   # Database CRUD controller with multi-user isolation
│   │   ├── task1Controller.js  # Level 1 Task 1 SSR form controller
│   │   ├── task2Controller.js  # Level 1 Task 2 dual-validation & temp storage
│   │   ├── task3Controller.js  # Level 2 Task 3 responsive UI showcase
│   │   ├── task4Controller.js  # Level 2 Task 4 dynamic DOM SPA controller
│   │   ├── task5Controller.js  # Level 3 Task 5 REST API CRUD controller
│   │   └── task6Controller.js  # Level 3 Task 6 database workspace controller
│   ├── middleware/
│   │   └── authMiddleware.js   # Session/JWT auth & task ownership verification
│   ├── routes/
│   │   ├── index.js            # Showcase Hub (/)
│   │   ├── authRoutes.js       # Authentication routes (/auth/*)
│   │   ├── taskRoutes.js       # Individual task routes (/tasks/task-1 to /tasks/task-6)
│   │   ├── apiRoutes.js        # RESTful API routes (/api/tasks & /api/v1/tasks)
│   │   └── dashboardRoutes.js  # Production dashboard routes (/dashboard)
│   └── app.js                  # Main Express application initialization
│
├── views/
│   ├── layouts/
│   │   ├── header.ejs          # Common head, Bootstrap 5, fonts, and meta tags
│   │   ├── navbar.ejs          # Responsive navigation bar with internship menu
│   │   └── footer.ejs          # Accessible footer with internship metadata
│   ├── index.ejs               # Internship Showcase Hub landing page
│   ├── auth/
│   │   ├── login.ejs           # User sign-in page
│   │   └── register.ejs        # User registration page with live strength meter
│   ├── tasks/
│   │   ├── task-1.ejs          # Task 1 SSR form and task output
│   │   ├── task-2.ejs          # Task 2 extended form with dual validation
│   │   ├── task-3.ejs          # Task 3 responsive dashboard with advanced CSS
│   │   ├── task-4.ejs          # Task 4 dynamic DOM SPA with hash routing
│   │   ├── task-5.ejs          # Task 5 REST API interface with fetch()
│   │   └── task-6.ejs          # Task 6 database integration & auth workspace
│   └── dashboard/
│       └── index.ejs           # Integrated production dashboard
│
├── public/
│   ├── css/
│   │   ├── style.css           # Global design system tokens and common styles
│   │   ├── task3.css           # Advanced CSS, glassmorphism, animations
│   │   └── task4.css           # Dynamic DOM styles, strength meter, SPA tabs
│   ├── js/
│   │   ├── task2-validation.js # Client-side validation script for Task 2
│   │   ├── task4/
│   │   │   ├── validation.js   # Complex password strength and regex module
│   │   │   ├── taskManager.js  # In-memory DOM state manager & live stats
│   │   │   ├── router.js       # Hash-based client router
│   │   │   └── app.js          # Task 4 orchestrator module
│   │   └── task5-api.js        # Pure fetch() CRUD client with loading/error handling
│   └── images/
│       └── logo.svg            # TaskFlow SVG brand logo
│
├── tests/
│   ├── test_task1.js           # Automated test for Task 1
│   ├── test_task2.js           # Automated test for Task 2
│   ├── test_task3.js           # Automated test for Task 3
│   ├── test_task4.js           # Automated test for Task 4
│   ├── test_task5.js           # Automated test for Task 5
│   ├── test_task6.js           # Automated test for Task 6
│   └── verify_all.js           # Master End-to-End test suite for Tasks 1–6
│
├── .env                        # Local environment variables
├── .env.example                # Template configuration file
├── .gitignore                  # Git exclusions (node_modules, .env)
├── package.json                # Project dependencies and npm scripts
├── README.md                   # Comprehensive project documentation
├── TASK-COMPLETION.md          # Requirement-by-requirement verification matrix
└── PROJECT-REPORT.md           # Formal internship project submission report
```

---

## 13. Installation Instructions

### Prerequisites
- [Node.js](https://nodejs.org) (v18, v20, or v24 LTS recommended)
- `npm` (bundled with Node.js)
- Git (optional, for cloning)

### Step 1: Clone or Navigate to the Project
```bash
cd C:\Users\haris\.gemini\antigravity\scratch\taskflow
```

### Step 2: Install Dependencies
```bash
npm install
```

---

## 14. Environment Setup
The project includes a `.env.example` file. To customize settings, copy it to `.env`:
```bash
cp .env.example .env
```

Default configuration in `.env`:
```ini
# Server Port
PORT=3000

# Environment Mode
NODE_ENV=development

# MongoDB Connection String
MONGODB_URI=mongodb://127.0.0.1:27017/taskflow

# Session Secret (random secret key)
SESSION_SECRET=taskflow_secure_session_secret_key_2026_cognifyz

# JWT Secret for API Authentication
JWT_SECRET=taskflow_jwt_secret_token_key_2026_cognifyz
```

---

## 15. MongoDB Setup & Zero-Config Mode
TaskFlow is engineered with **Zero-Config Database Flexibility**:
1. **Local MongoDB:** If you have MongoDB installed and running on `mongodb://127.0.0.1:27017/taskflow`, TaskFlow connects directly.
2. **MongoDB Atlas (Cloud):** Set `MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/taskflow` in `.env`.
3. **Zero-Config Embedded Fallback:** If no local MongoDB service is active, TaskFlow **automatically starts an embedded in-memory MongoDB instance** using `mongodb-memory-server`. Any reviewer or evaluator can clone and run `npm start` immediately with zero setup!

---

## 16. How to Run the Application

### Start the Server
```bash
npm start
```
The server will output:
```
====================================================
🚀 TaskFlow Server successfully running!
🌐 Local URL: http://localhost:3000
📋 Level 1 Task 1: http://localhost:3000/tasks/task-1
====================================================
```

### Accessing the Web Application
Open your browser to:
- **Showcase Hub:** [http://localhost:3000/](http://localhost:3000/)
- **Task 1 (HTML Forms & SSR):** [http://localhost:3000/tasks/task-1](http://localhost:3000/tasks/task-1)
- **Task 2 (Dual Validation):** [http://localhost:3000/tasks/task-2](http://localhost:3000/tasks/task-2)
- **Task 3 (Advanced CSS & Responsive):** [http://localhost:3000/tasks/task-3](http://localhost:3000/tasks/task-3)
- **Task 4 (Dynamic DOM SPA):** [http://localhost:3000/tasks/task-4](http://localhost:3000/tasks/task-4)
- **Task 5 (REST API & Fetch Client):** [http://localhost:3000/tasks/task-5](http://localhost:3000/tasks/task-5)
- **Task 6 (Database & Auth Workspace):** [http://localhost:3000/tasks/task-6](http://localhost:3000/tasks/task-6)
- **Production Dashboard:** [http://localhost:3000/dashboard](http://localhost:3000/dashboard)

### Run Automated Tests
```bash
npm test
```
Runs the comprehensive master verification suite (`tests/verify_all.js`) testing all 6 tasks end-to-end.

---

## 17. RESTful API Documentation

### Core Endpoints (Task 5 Demo API)
| Method | Endpoint | Description | Status Code |
|---|---|---|---|
| `GET` | `/api/tasks` | List all tasks (supports `?status=` & `?search=`) | `200 OK` |
| `GET` | `/api/tasks/:id` | Retrieve single task by ID | `200 OK` / `404 Not Found` |
| `POST` | `/api/tasks` | Create a new task | `201 Created` / `400 Bad Request` |
| `PUT` | `/api/tasks/:id` | Update existing task | `200 OK` / `404 Not Found` |
| `DELETE` | `/api/tasks/:id` | Remove task by ID | `200 OK` / `404 Not Found` |

### Protected Database Endpoints (Task 6 & Production API)
*Requires `Authorization: Bearer <jwt_token>` or active session cookie.*

| Method | Endpoint | Description | Status Code |
|---|---|---|---|
| `POST` | `/auth/register` | Register new user account | `201 Created` / `400 Bad Request` |
| `POST` | `/auth/login` | Authenticate user & receive JWT | `200 OK` / `401 Unauthorized` |
| `GET` | `/auth/logout` | Terminate session | `302 Redirect` |
| `GET` | `/api/v1/tasks` | Retrieve authenticated user's tasks | `200 OK` / `401 Unauthorized` |
| `POST` | `/api/v1/tasks` | Create task in MongoDB bound to user | `201 Created` / `400 Bad Request` |
| `GET` | `/api/v1/tasks/:id` | Retrieve task (strictly verifies ownership) | `200 OK` / `403 Forbidden` |
| `PUT` | `/api/v1/tasks/:id` | Update task (strictly verifies ownership) | `200 OK` / `403 Forbidden` |
| `DELETE` | `/api/v1/tasks/:id`| Delete task (strictly verifies ownership) | `200 OK` / `403 Forbidden` |

---

## 18. Screenshots & UI Showcase

*(Placeholders ready for GitHub/LinkedIn video & image uploads)*

### 1. Internship Showcase Hub
`![Showcase Hub](public/images/screenshots/showcase-hub.png)`
*Central navigation portal linking to all 6 internship levels with badges and descriptions.*

### 2. Level 2 Task 3 – Responsive Engineering Dashboard
`![Task 3 Responsive Layout](public/images/screenshots/task3-responsive.png)`
*Multi-section layout showcasing CSS Grid, glassmorphism hero banner, and hover cards.*

### 3. Level 2 Task 4 – Complex Password Validation & DOM SPA
`![Task 4 Password Strength Meter](public/images/screenshots/task4-validation.png)`
*Live password strength analyzer evaluating complexity criteria in real time.*

### 4. Level 3 Task 5 – Asynchronous REST API Interface
`![Task 5 REST API Fetch Client](public/images/screenshots/task5-api.png)`
*Async fetch client displaying CRUD operations with loading indicators and error banners.*

### 5. Level 3 Task 6 & Production Dashboard
`![Production Dashboard](public/images/screenshots/production-dashboard.png)`
*Multi-user task management workspace with MongoDB persistence, modal editors, and search/filtering.*

---

## 19. Future Enhancements
- **Task Collaboration:** Multi-user team sharing with role-based permissions (Viewer, Editor, Admin).
- **Subtasks & Checklists:** Hierarchical task trees with progress percentage computation.
- **WebSocket Live Sync:** Real-time updates across multiple devices using Socket.io.
- **Email Notifications:** Due-date reminder emails scheduled via Redis job queues (aligned with Cognifyz Task 8).

---

## 20. Author & Acknowledgments
- **Developer:** Cognifyz Technologies Full Stack Development Intern
- **Internship Organization:** [Cognifyz Technologies](https://cognifyz.com) — *Where Data Meets Intelligence*
- **Hashtags for LinkedIn Sharing:** `#cognifyz` `#cognifyzTech` `#cognifyzTechnologies` `#fullstackdevelopment` `#nodejs` `#expressjs` `#mongodb`

*This repository represents original, clean, production-standard code adhering strictly to the academic integrity and professional guidelines of the Cognifyz Technologies Internship Program.*
