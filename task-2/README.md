# Task 2: Inline Styles, Basic Interaction, and Server-Side Validation
**Cognifyz Technologies Full Stack Development Internship – Level 1 (Beginner)**

---

## Objective
Expand forms with additional attributes, implement client-side interactive validation, enforce strict server-side validation rules, use inline styles, and store validated entries in temporary server-side storage.

## Requirements Satisfied
1. **Extended Form Fields**:
   - Task Title (`title`, 3–100 chars, required)
   - Description (`description`, max 500 chars, optional)
   - Priority (`priority`, enum: `low`, `medium`, `high`, `urgent`, required)
   - Due Date (`dueDate`, ISO date >= today, required)
2. **Client-Side JavaScript Validation**:
   - Dynamic real-time input validation on `input`, `change`, and form `submit`.
   - Visual indicators using `.is-invalid`, `.is-valid`, and custom error helper spans.
   - Prevents invalid form submission via `e.preventDefault()`.
3. **Server-Side Validation**:
   - `validateTask2ServerSide()` verifies input integrity independently of client state.
   - Returns HTTP 400 Bad Request with field-level error messages and preserves existing input.
4. **Input Length & Format Enforcement**:
   - Title minimum 3 characters, maximum 100 characters.
   - Due date verified to prevent past dates.
5. **Clear Validation Messages**:
   - Both client-side inline messages and server-side alerts inform the user explicitly.
6. **Temporary Server-Side Storage**:
   - In-memory collection persists validated tasks throughout the server lifecycle.
7. **Inline Styles**:
   - Priority border colors, styled badges, and status pills demonstrate inline styling per task specification.

## Endpoints
- `GET /tasks/task-2`: Serves the extended form and temporary storage list.
- `POST /tasks/task-2`: Processes, validates, and stores submitted task data.

## File Map
- **Controller**: `server/controllers/task2Controller.js`
- **View Template**: `views/tasks/task-2.ejs`
- **Client Script**: `public/js/task2-validation.js`
- **Route**: Mounted in `server/routes/taskRoutes.js` at `/tasks/task-2`
