# Task 4: Complex Form Validation and Dynamic DOM Manipulation
**Cognifyz Technologies Full Stack Development Internship – Level 2 (Intermediate)**

---

## Objective
Implement complex client-side validation (including real-time password strength evaluation), dynamic DOM updates, real-time task mutations (add, complete, status change, delete, filter, search), live statistics calculation, and client-side routing using clean ES modules.

## Requirements Satisfied
1. **Complex Client-Side Validation**:
   - `ValidationModule.validateEmail()`: RFC 5322 regex validation.
   - `ValidationModule.evaluatePasswordStrength()`: Evaluates length (>=8), lowercase, uppercase, digits, and special characters.
   - Live visual strength bar (`.strength-weak`, `.strength-medium`, `.strength-strong`) with criteria indicators.
   - `ValidationModule.validatePasswordMatch()`: Compares password and confirmation.
   - Task validation for title length (3–100 chars), priority selection, and future/today due date.
2. **Dynamic DOM Manipulation**:
   - `TaskManager.addTask()`: Injects new task cards directly into the DOM tree without reloading.
   - `TaskManager.toggleComplete()`: Toggles completed status, strike-through styling, and status pills.
   - `TaskManager.changeStatus()`: Updates status to pending, in-progress, or completed.
   - `TaskManager.deleteTask()`: Removes cards from the UI with animated CSS transitions.
3. **Live Search & Filter**:
   - Instant search across task titles and descriptions.
   - Filter pills for All, Pending, In Progress, and Completed.
4. **Live Reactive Statistics**:
   - Recalculates Total, Pending, In Progress, Completed, and Completion Percentage whenever the DOM changes.
5. **Client-Side Routing**:
   - `ClientRouter` manages `#tasks`, `#create`, `#register-demo`, and `#stats` via `window.location.hash`.
6. **Clean Modular JavaScript Architecture**:
   - `public/js/task4/validation.js`: Validation module.
   - `public/js/task4/taskManager.js`: DOM manipulation & state manager.
   - `public/js/task4/router.js`: Client router.
   - `public/js/task4/app.js`: Application orchestrator.

## Endpoints
- `GET /tasks/task-4`: Serves the Task 4 SPA interface.

## File Map
- **Controller**: `server/controllers/task4Controller.js`
- **View Template**: `views/tasks/task-4.ejs`
- **Modules**: `public/js/task4/` (`validation.js`, `taskManager.js`, `router.js`, `app.js`)
- **Stylesheet**: `public/css/task4.css`
- **Route**: Mounted in `server/routes/taskRoutes.js` at `/tasks/task-4`
