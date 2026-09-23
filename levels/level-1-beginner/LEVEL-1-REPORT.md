# Cognifyz Technologies – Level 1 (Beginner) Internship Submission Report
**Internship Program:** Full Stack Web Development  
**Level:** Level 1 – Beginner  
**Tasks Completed:** Task 1 & Task 2  
**Project:** TaskFlow – Full Stack Task Management System  
**Author / Intern:** Full Stack Development Intern (vikast2849)  
**Date:** September 2026  
**Status:** Completed & 100% Verified  

---

## 1. Level Executive Summary
This submission package represents the complete implementation and verification of **Cognifyz Technologies Level 1 (Beginner)** curriculum:
- **Task 1:** HTML Structure and Basic Server Interaction
- **Task 2:** Inline Styles, Basic Interaction, and Server-Side Validation

The objective of Level 1 is to master the foundations of web client-server communication, HTML form data transfer protocols, Express server-side routing, template rendering engines (EJS), dual-layer (client & server) data validation, and temporary in-memory server state management.

---

## 2. Task 1: HTML Structure & Basic Server Interaction

### 2.1 Objectives & Requirements
1. Create semantic HTML form structure to capture user input.
2. Build a Node.js web server using Express.
3. Establish server-side routing endpoints to receive and parse form submissions.
4. Utilize EJS (Embedded JavaScript) for Server-Side Rendering (SSR).
5. Submit form using HTTP POST (`application/x-www-form-urlencoded`).
6. Dynamically render submitted task data back to the user interface.
7. Implement standard HTTP status codes (200 OK, 201 Created, 400 Bad Request).

### 2.2 Technical Implementation
- **Controller:** `server/controllers/task1Controller.js`
- **View Template:** `views/tasks/task-1.ejs`
- **Route Endpoint:** `GET /tasks/task-1` and `POST /tasks/task-1`
- **Architecture Highlights:**
  - Form data is received by Express and parsed via `express.urlencoded({ extended: true })`.
  - The controller creates a sanitized task object with an automated identifier and timestamp.
  - Express renders `task-1.ejs` dynamically on the server using EJS tags `<%= %>` and conditional logic `<% if (submittedTask) { %>`, passing the rendered HTML to the client browser.

### 2.3 Verification Results
- `GET /tasks/task-1` serves the task form (HTTP 200).
- Submitting `{ title: "Design Wireframes", description: "Figma prototype" }` creates and renders the task card immediately via SSR (HTTP 201).
- Submitting an empty title is rejected with a validation error alert (HTTP 400).

---

## 3. Task 2: Inline Styles, Basic Interaction, & Server-Side Validation

### 3.1 Objectives & Requirements
1. Extend the task form with additional fields:
   - Task Title (required, 3–100 characters)
   - Description (optional, max 500 characters)
   - Priority Level (required enum: `low`, `medium`, `high`, `urgent`)
   - Due Date (required, valid date >= today)
2. Implement client-side JavaScript validation for instant interactive feedback.
3. Implement strict server-side validation to guarantee data integrity.
4. Block invalid form submissions on both client and server layers.
5. Render clear, field-level validation error messages while preserving user input.
6. Store validated task entries in temporary server-side storage.
7. Apply inline styles to demonstrate dynamic styling per task requirements.

### 3.2 Technical Implementation
- **Controller:** `server/controllers/task2Controller.js`
- **Client Script:** `public/js/task2-validation.js`
- **View Template:** `views/tasks/task-2.ejs`
- **Route Endpoint:** `GET /tasks/task-2` and `POST /tasks/task-2`
- **Architecture Highlights:**
  - **Client-Side:** Real-time listeners on `input` and `change` update `.is-invalid` and error spans. Form submission is intercepted via `e.preventDefault()` if fields are missing or invalid.
  - **Server-Side:** Independent validation function `validateTask2ServerSide()` ensures security even if client scripts are bypassed.
  - **Temporary Storage:** Valid tasks are preserved in `task2TemporaryStorage` array during server runtime.
  - **Inline Styles:** Color-coded priority badges and left borders (`border-left: 4px solid ...`) demonstrate inline styling requirements.

### 3.3 Verification Results
- Malformed inputs (e.g., short title, past date) are blocked with HTTP 400 Bad Request.
- Valid submissions are saved to temporary storage with HTTP 201 Created and rendered in the task ledger.

---

## 4. Key Files in Level 1
| File Path | Description |
|---|---|
| `server/controllers/task1Controller.js` | Form parsing and SSR controller for Task 1 |
| `server/controllers/task2Controller.js` | Dual validation and temporary storage controller for Task 2 |
| `views/tasks/task-1.ejs` | Task 1 HTML/EJS form and output template |
| `views/tasks/task-2.ejs` | Task 2 extended form with inline styles and error feedback |
| `public/js/task2-validation.js` | Interactive client-side validation module |
| `task-1/README.md` | Dedicated Level 1 Task 1 documentation |
| `task-2/README.md` | Dedicated Level 1 Task 2 documentation |
| `tests/test_task1.js` | Automated test suite for Task 1 |
| `tests/test_task2.js` | Automated test suite for Task 2 |

---

## 5. How to Run & Test Level 1
```powershell
# 1. Start the server
npm start

# 2. Test Task 1 in browser:
# http://localhost:3000/tasks/task-1

# 3. Test Task 2 in browser:
# http://localhost:3000/tasks/task-2

# 4. Run automated tests for Level 1:
node tests/test_task1.js
node tests/test_task2.js
```

---

## 6. Level 1 Portal Submission Summary
*(Copy and paste into Cognifyz Submission Form for Level 1)*

```text
================================================================================
COGNIFYZ TECHNOLOGIES INTERNSHIP - LEVEL 1 (BEGINNER) SUBMISSION
================================================================================
Student Name        : Full Stack Development Intern (vikast2849)
Internship Domain   : Full Stack Web Development
Level               : Level 1 – Beginner (Tasks 1 & 2 Completed)
Project Name        : TaskFlow – Full Stack Task Management System
GitHub Repository   : https://github.com/vikast2849/taskflow
Routes              : /tasks/task-1, /tasks/task-2

Summary of Accomplishments:
1. Task 1 (HTML Structure & SSR):
   - Created semantic HTML form capturing task title and description.
   - Built Express route handlers and used EJS for server-side dynamic HTML generation.
   - Tested and verified GET/POST flow with HTTP 200, 201, and 400 status codes.

2. Task 2 (Inline Styles & Dual Validation):
   - Extended form with Title, Description, Priority (enum), and Due Date.
   - Implemented real-time client-side JavaScript validation preventing invalid submissions.
   - Implemented robust server-side validation rejecting invalid payloads with HTTP 400.
   - Stored validated records in temporary server storage and rendered them using inline styles.
================================================================================
```
