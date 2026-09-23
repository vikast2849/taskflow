# Cognifyz Technologies – Level 3 (Advanced) Internship Submission Report
**Internship Program:** Full Stack Web Development  
**Level:** Level 3 – Advanced  
**Tasks Completed:** Task 5 & Task 6  
**Project:** TaskFlow – Full Stack Task Management System  
**Author / Intern:** Full Stack Development Intern (vikast2849)  
**Date:** September 2026  
**Status:** Completed & 100% Verified  

---

## 1. Level Executive Summary
This submission package represents the complete implementation and verification of **Cognifyz Technologies Level 3 (Advanced)** curriculum:
- **Task 5:** API Integration and Front-End Interaction
- **Task 6:** Database Integration and User Authentication

The objective of Level 3 is to master professional client-server decoupled architectures via RESTful APIs, asynchronous HTTP networking (`fetch`), NoSQL persistent database design with MongoDB and Mongoose, cryptographic password hashing using bcrypt, session & JWT authentication, and strict multi-user authorization boundaries.

---

## 2. Task 5: API Integration & Front-End Interaction

### 2.1 Objectives & Requirements
1. Design and build a RESTful API using Express:
   - `GET /api/tasks`: List all tasks (supports query filtering by `?status=` and `?search=`)
   - `GET /api/tasks/:id`: Retrieve single task by ID
   - `POST /api/tasks`: Create new task (returns HTTP 201 Created)
   - `PUT /api/tasks/:id`: Update existing task (returns HTTP 200 OK)
   - `DELETE /api/tasks/:id`: Remove task by ID (returns HTTP 200 OK)
2. Return uniform, structured JSON responses: `{ success: boolean, message?: string, data?: any }`.
3. Enforce appropriate HTTP status codes (200, 201, 400, 404, 500).
4. Centralize error handling for all API endpoints.
5. Create a modern frontend interface communicating exclusively via `fetch()`.
6. Display loading states (spinners) during network requests and error alert banners on failures.
7. Maintain strict separation of concerns between backend API and frontend presentation.

### 2.2 Technical Implementation
- **Controller:** `server/controllers/task5Controller.js`
- **Routes:** `server/routes/apiRoutes.js`
- **Frontend Client:** `public/js/task5-api.js`
- **View Template:** `views/tasks/task-5.ejs`
- **Route Endpoint:** `GET /tasks/task-5` (UI) and `/api/tasks` (REST API)
- **Architecture Highlights:**
  - Encapsulated `TaskApiClient` class handles all network requests using `async`/`await`.
  - Dynamic UI updates task cards, opens edit/create modals, and provides real-time search queries without full-page reloads.

### 2.3 Verification Results
- All CRUD operations verified: `POST /api/tasks` creates records with 201; `PUT` updates with 200; `DELETE` removes with 200; invalid payloads rejected with 400.

---

## 3. Task 6: Database Integration & User Authentication

### 3.1 Objectives & Requirements
1. Integrate MongoDB using Mongoose ODM with connection resilience.
2. Create Mongoose database models:
   - `User` model: Name, unique email, password (hashed), role, timestamps
   - `Task` model: Title, description, priority, status, dueDate, user reference (`ObjectId, ref: 'User'`), compound indexes
3. Secure user registration with 10 salt rounds of bcrypt password hashing.
4. Secure user login with credential comparison using `bcrypt.compare`.
5. Authentication middleware:
   - `ensureAuthenticated` protecting server-side rendered views (`/dashboard`, `/tasks/task-6`)
   - `authApi` protecting REST API endpoints (`/api/v1/tasks`) via session or Bearer JWT token
6. Enforce strict authorization checks:
   - A logged-in user can access, modify, and delete ONLY their own tasks.
   - Cross-user access attempts must be rejected with HTTP 403 Forbidden.
7. Protect sensitive credentials: Passwords and internal fields are never exposed in JSON responses or templates.
8. Store database URIs and secrets in `.env`, provide a sanitized `.env.example`, and exclude from Git via `.gitignore`.
9. Include an embedded zero-config fallback (`mongodb-memory-server`) to ensure instant review without manual database setup.

### 3.2 Technical Implementation
- **Database Config:** `server/config/db.js`
- **Models:** `server/models/User.js` and `server/models/Task.js`
- **Middleware:** `server/middleware/authMiddleware.js`
- **Controllers:**
  - `server/controllers/authController.js` (Register, Login, Logout)
  - `server/controllers/taskController.js` (Database CRUD with user isolation)
  - `server/controllers/task6Controller.js` (Task 6 workspace view)
- **Routes:** `server/routes/authRoutes.js`, `server/routes/dashboardRoutes.js`, `/api/v1/tasks`
- **Views:** `views/auth/login.ejs`, `views/auth/register.ejs`, `views/tasks/task-6.ejs`, `views/dashboard/index.ejs`

### 3.3 Verification Results
- User registration hashes passwords with bcrypt salt rounds.
- Unauthorized requests blocked with HTTP 401 Unauthorized.
- User A creates Task A; User B attempts to access or modify Task A -> rejected with HTTP 403 Forbidden.
- User B queries tasks -> receives only User B's tasks (0 tasks returned), confirming multi-user isolation.

---

## 4. Key Files in Level 3
| File Path | Description |
|---|---|
| `server/controllers/task5Controller.js` | RESTful API CRUD controller for Task 5 |
| `server/routes/apiRoutes.js` | Express routing for `/api/tasks` and `/api/v1/tasks` |
| `public/js/task5-api.js` | Asynchronous fetch() client with loading & error UI |
| `views/tasks/task-5.ejs` | Task 5 REST API frontend interface template |
| `server/config/db.js` | Resilient MongoDB connection manager with memory-server fallback |
| `server/models/User.js` | User Mongoose model with bcrypt pre-save hook and toJSON sanitize |
| `server/models/Task.js` | Task Mongoose model with user reference and compound indexes |
| `server/middleware/authMiddleware.js` | Session & JWT authentication and 403 authorization guard |
| `server/controllers/authController.js` | User registration, login, and session/JWT issuance |
| `server/controllers/taskController.js` | Multi-user isolated database CRUD controller |
| `views/tasks/task-6.ejs` | Task 6 database and authentication workspace template |
| `views/dashboard/index.ejs` | Production dashboard with full database integration |
| `task-5/README.md` | Dedicated Level 3 Task 5 documentation |
| `task-6/README.md` | Dedicated Level 3 Task 6 documentation |
| `tests/test_task5.js` | Automated test suite for Task 5 |
| `tests/test_task6.js` | Automated test suite for Task 6 |

---

## 5. How to Run & Test Level 3
```powershell
# 1. Start the server
npm start

# 2. Test Task 5 in browser:
# http://localhost:3000/tasks/task-5

# 3. Test Task 6 in browser:
# http://localhost:3000/tasks/task-6

# 4. Test Production Dashboard:
# http://localhost:3000/dashboard

# 5. Run automated tests for Level 3:
node tests/test_task5.js
node tests/test_task6.js
```

---

## 6. Level 3 Portal Submission Summary
*(Copy and paste into Cognifyz Submission Form for Level 3)*

```text
================================================================================
COGNIFYZ TECHNOLOGIES INTERNSHIP - LEVEL 3 (ADVANCED) SUBMISSION
================================================================================
Student Name        : Full Stack Development Intern (vikast2849)
Internship Domain   : Full Stack Web Development
Level               : Level 3 – Advanced (Tasks 5 & 6 Completed)
Project Name        : TaskFlow – Full Stack Task Management System
GitHub Repository   : https://github.com/vikast2849/taskflow
Routes              : /tasks/task-5, /tasks/task-6, /dashboard, /api/tasks, /api/v1/tasks

Summary of Accomplishments:
1. Task 5 (API Integration & Frontend Fetch):
   - Created full CRUD RESTful API (GET, POST, PUT, DELETE) with standard status codes (200, 201, 400, 404).
   - Built an asynchronous frontend client using fetch() with loading spinners and error alerts.
   - Enforced uniform JSON response envelopes: { success, data, message }.

2. Task 6 (Database Integration & User Authentication):
   - Integrated MongoDB using Mongoose with User and Task schemas and compound indexes.
   - Secured user registration and login using 10-round bcrypt salted password hashing.
   - Protected endpoints using session and Bearer JWT authentication middleware.
   - Enforced strict authorization checks: Users access only their own tasks; cross-user mutations are blocked with HTTP 403 Forbidden.
   - Built complete production dashboard (/dashboard) with zero-config embedded MongoDB fallback.
================================================================================
```
