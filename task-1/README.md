# Task 1: HTML Structure and Basic Server Interaction
**Cognifyz Technologies Full Stack Development Internship – Level 1 (Beginner)**

---

## Objective
Introduce the concept of server-side rendering (SSR) and basic HTTP form submissions using Node.js and Express.

## Requirements Satisfied
1. **HTML/EJS Structure**: Form elements configured with semantic labels, inputs, and submission buttons.
2. **Node.js & Express Server**: Configured server with middleware for body parsing (`express.urlencoded`).
3. **Server-Side Endpoints**:
   - `GET /tasks/task-1`: Serves the task form template.
   - `POST /tasks/task-1`: Receives and parses form submission.
4. **Server-Side Rendering (EJS)**: Dynamically injects submitted task data into the template using EJS tags (`<%= %>` and `<% if %>`).
5. **Basic Task Creation Form**: Captures task title and description.
6. **Form Submission to Express**: Sent via HTTP POST with `application/x-www-form-urlencoded`.
7. **Display Submitted Task**: Instant feedback rendering the submitted task card and session history.
8. **Proper HTTP Routes**: Modularized routes with HTTP status codes (200 OK, 201 Created, 400 Bad Request).

## File Map
- **Controller**: `server/controllers/task1Controller.js`
- **View Template**: `views/tasks/task-1.ejs`
- **Route Definition**: Mounted in `server/routes/taskRoutes.js` at `/tasks/task-1`

## How to Test
1. Start the server: `npm start`
2. Open `http://localhost:3000/tasks/task-1` in your browser.
3. Fill in the "Task Title" and "Task Description" and click "Submit Task to Server".
4. Notice how the page renders the newly created task card directly on the server without client-side JavaScript.
