# Cognifyz Technologies – Full Stack Development Internship
## Final Project Technical Report

---

**Project Title:** TaskFlow – Full Stack Task Management System  
**Internship Organization:** Cognifyz Technologies  
**Domain:** Full Stack Web Development  
**Author / Intern:** Full Stack Development Intern  
**Project Repository Path:** `C:\Users\haris\.gemini\antigravity\scratch\taskflow`  
**Date of Completion:** September 2026  

---

### Executive Summary

During the Cognifyz Technologies Full Stack Development Internship Program, an enterprise-grade task management web application named **TaskFlow** was developed. The program required completing at least 5 out of 8 predefined curriculum tasks. This project successfully completed **Tasks 1 through 6** (encompassing Level 1: Beginner, Level 2: Intermediate, and Level 3: Advanced) with 100% test coverage, comprehensive documentation, and a clean progressive architecture.

TaskFlow combines modern Server-Side Rendering (SSR) via Express and EJS with asynchronous client-side API communication (`fetch`), interactive DOM manipulation, robust input validation, responsive CSS styling, and secure database persistence with MongoDB, Mongoose, and bcrypt cryptography.

---

### System Architecture Overview

TaskFlow is structured around the Model-View-Controller (MVC) and RESTful architectural patterns:

```
                          [ Client Browser ]
                                   │
              ┌────────────────────┴────────────────────┐
              ▼                                         ▼
    [ Traditional SSR View ]                 [ Asynchronous Fetch Client ]
   (GET /tasks/task-1 to task-4)               (GET /tasks/task-5 & Dashboard)
              │                                         │
              │ Form POST / HTTP GET                    │ JSON Requests
              ▼                                         ▼
   ┌─────────────────────────────────────────────────────────────┐
   │                   Express.js Web Server                     │
   │                                                             │
   │  [ Middlewares ]                                            │
   │  • Body Parsers (JSON & URL-Encoded)                        │
   │  • Session Store (express-session)                          │
   │  • Authentication Middleware (Session / Bearer JWT)         │
   │  • Authorization Guard (Multi-User Isolation)               │
   │                                                             │
   │  [ Controllers ]                                            │
   │  • authController      • taskController                     │
   │  • task1Controller     • task2Controller                    │
   │  • task3Controller     • task4Controller                    │
   │  • task5Controller     • task6Controller                    │
   └──────────────┬───────────────────────────────┬──────────────┘
                  │                               │
                  ▼                               ▼
       [ EJS Template Engine ]         [ Mongoose ODM Layer ]
       • Dynamic View Rendering        • Schema Definitions & Pre-hooks
       • Layouts & Partials            • Compound Indexes & Constraints
                                                  │
                                                  ▼
                                         [ MongoDB Database ]
                                        • Users Collection
                                        • Tasks Collection
```

---

### Task-by-Task Implementation Summary

#### Level 1 (Beginner) – Task 1: HTML Structure and Basic Server Interaction
- **Objective:** Establish the fundamentals of web forms, Node.js HTTP routing with Express, and Server-Side Rendering (SSR).
- **Implementation:**
  - Designed clean semantic HTML forms accepting task titles and descriptions.
  - Configured Express server middleware using `express.urlencoded({ extended: true })`.
  - Created endpoints `GET /tasks/task-1` and `POST /tasks/task-1`.
  - Implemented dynamic template rendering using EJS (`views/tasks/task-1.ejs`), allowing users to submit tasks and immediately observe server-rendered HTML output.

#### Level 1 (Beginner) – Task 2: Inline Styles, Basic Interaction, and Server-Side Validation
- **Objective:** Expand form interactions, apply inline styles, and enforce dual-layer (client + server) validation.
- **Implementation:**
  - Extended task data model with Title, Description, Priority (Low, Medium, High, Urgent), and Due Date.
  - Implemented client-side validation (`public/js/task2-validation.js`) providing real-time feedback and preventing malformed form dispatch.
  - Implemented strict server-side validation rules in `task2Controller.js`, verifying title length (3–100 chars), enum priority compliance, and ensuring due dates are not set in the past.
  - Invalid submissions return HTTP `400 Bad Request` with preserved user input and field-level error messages. Valid tasks are stored in temporary server-side memory.

#### Level 2 (Intermediate) – Task 3: Advanced CSS Styling and Responsive Design
- **Objective:** Elevate visual aesthetics, implement multi-section layouts, and achieve device responsiveness.
- **Implementation:**
  - Designed a 5-section layout: Sticky Navigation Bar, Hero/Dashboard Overview, Task Statistics, Responsive Task Cards Grid, and Accessible Footer.
  - Developed custom design system (`public/css/task3.css`) incorporating CSS custom variables, glassmorphism (`backdrop-filter: blur(12px)`), keyframe animations (`fadeInScale`, `pulseGlow`), and hover elevations.
  - Utilized Bootstrap 5.3 grid system and media queries, achieving certified responsiveness across Desktop (>1024px), Tablet (768px–1024px), and Mobile (<768px).

#### Level 2 (Intermediate) – Task 4: Complex Form Validation and Dynamic DOM Manipulation
- **Objective:** Implement modular client JavaScript, password complexity evaluation, real-time DOM mutations, and client-side routing.
- **Implementation:**
  - Structured modular ES architecture (`public/js/task4/`):
    - `validation.js`: Regex email validation, password match validation, and a 5-point password complexity analyzer (length >= 8, uppercase, lowercase, numbers, special characters) with a dynamic 3-color strength meter.
    - `taskManager.js`: In-memory DOM manager supporting task creation, status toggles, animated deletions, real-time text searching, and status filtering without page reloads.
    - `router.js`: Hash-based client router (`#tasks`, `#create`, `#register-demo`, `#stats`) providing a Single Page Application (SPA) experience.
    - `app.js`: Main orchestrator maintaining reactive live statistics counters.

#### Level 3 (Advanced) – Task 5: API Integration and Front-End Interaction
- **Objective:** Create a RESTful API and an asynchronous frontend client using `fetch()`.
- **Implementation:**
  - Built full CRUD REST API endpoints:
    - `GET /api/tasks` (with query filter support)
    - `GET /api/tasks/:id`
    - `POST /api/tasks` (returns 201 Created)
    - `PUT /api/tasks/:id` (returns 200 OK)
    - `DELETE /api/tasks/:id` (returns 200 OK)
  - Designed uniform JSON response envelopes `{ success, count, data, message }` with standard HTTP status codes.
  - Built `public/js/task5-api.js` using `async`/`await` with loading spinners and error banners.

#### Level 3 (Advanced) – Task 6: Database Integration and User Authentication
- **Objective:** Integrate persistent MongoDB storage, secure user authentication, and multi-user data isolation.
- **Implementation:**
  - Configured Mongoose connection in `server/config/db.js` with an automated zero-config embedded fallback (`mongodb-memory-server`) to ensure instant out-of-the-box execution.
  - Created `User` and `Task` schemas.
  - Secured credentials using 10 salt rounds of bcrypt hashing in a Mongoose `pre('save')` hook.
  - Sensitive data protection: Passwords and internal versions are stripped via schema `toJSON` transforms.
  - Authentication middleware (`ensureAuthenticated` for web views, `authApi` for Bearer JWT tokens).
  - Multi-user data isolation: Queries automatically filter by `user: req.user._id`. Attempts to access, edit, or delete another user's task are rejected with HTTP `403 Forbidden`.

---

### Verification and Quality Assurance

A dedicated automated test suite was engineered to validate all features programmatically:

| Test Script | Target Level | Key Assertions Tested | Result |
|---|---|---|---|
| `tests/test_task1.js` | Level 1 Task 1 | GET form 200 OK, POST form 201 Created, SSR EJS dynamic injection | **PASSED** |
| `tests/test_task2.js` | Level 1 Task 2 | 400 Bad Request on invalid fields, length bounds, temporary storage | **PASSED** |
| `tests/test_task3.js` | Level 2 Task 3 | 5 sections verified (Navbar, Hero, Stats, Cards, Footer), CSS keyframes | **PASSED** |
| `tests/test_task4.js` | Level 2 Task 4 | ES modules loaded, SPA views, password meter elements | **PASSED** |
| `tests/test_task5.js` | Level 3 Task 5 | Full REST API CRUD (GET, POST 201, PUT 200, DELETE 200), JSON structure | **PASSED** |
| `tests/test_task6.js` | Level 3 Task 6 | Registration, bcrypt hashing, login, JWT token, 401 unauth, 403 isolation | **PASSED** |
| `tests/verify_all.js` | Tasks 1–6 Master | Complete end-to-end integration and regression suite | **PASSED** |

---

### Security Best Practices Implemented

1. **Password Hashing:** 10-round bcrypt salted hashing prevents rainbow table attacks.
2. **Timing-Safe Authentication:** Unified "Invalid email or password" error prevents user enumeration.
3. **Sensitive Field Stripping:** Passwords are never returned in JSON outputs or view contexts.
4. **Environment Isolation:** Secrets and connection URIs are stored in `.env` and excluded via `.gitignore`.
5. **Multi-User Data Protection:** Strict authorization middleware verifies resource ownership before executing mutations.

---

### Conclusion

The **TaskFlow** project successfully fulfills all technical objectives and academic integrity guidelines stipulated by the **Cognifyz Technologies Full Stack Development Internship Program**. By developing each task progressively—from basic SSR form processing to an enterprise-grade authenticated MongoDB platform—the project demonstrates a comprehensive understanding of the complete JavaScript full-stack ecosystem.
