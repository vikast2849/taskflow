# Task 5: API Integration and Front-End Interaction
**Cognifyz Technologies Full Stack Development Internship – Level 3 (Advanced)**

---

## Objective
Introduce server-client communication through a RESTful API, implement complete CRUD operations with proper HTTP status codes, structured JSON envelopes, centralized error handling, and build an asynchronous frontend UI using `fetch()` with loading and error states.

## Requirements Satisfied
1. **RESTful API via Express**:
   - `GET /api/tasks`: List all tasks (supports query filtering by status & search).
   - `GET /api/tasks/:id`: Retrieve single task by ID.
   - `POST /api/tasks`: Create new task (returns 201 Created).
   - `PUT /api/tasks/:id`: Update existing task (returns 200 OK).
   - `DELETE /api/tasks/:id`: Remove task (returns 200 OK).
2. **Proper JSON Responses & HTTP Status Codes**:
   - Success: `200 OK`, `201 Created`.
   - Client Error: `400 Bad Request`, `404 Not Found`.
   - Server Error: `500 Internal Server Error`.
   - Uniform response envelopes: `{ success: true, message?: string, data?: any }`.
3. **Robust Input Validation & Error Handling**:
   - Validates required fields, lengths, and valid ISO dates.
4. **Frontend Interface with `fetch()`**:
   - `TaskApiClient` encapsulates all asynchronous network communications.
   - Performs GET, POST, PUT, DELETE operations via AJAX without page reloads.
5. **Loading and Error States**:
   - Dynamic spinner displayed during network latency.
   - Error banners with retry buttons on network or validation errors.
6. **Separation of Concerns**:
   - Decoupled REST controllers handling pure JSON, with frontend client rendering UI state.

## Endpoints
- `GET /tasks/task-5`: Serves the Task 5 interactive frontend application.
- `/api/tasks`: RESTful API endpoints.

## File Map
- **API Controller**: `server/controllers/task5Controller.js`
- **API Routes**: `server/routes/apiRoutes.js`
- **Frontend Client**: `public/js/task5-api.js`
- **View Template**: `views/tasks/task-5.ejs`
- **Route**: Mounted in `server/routes/taskRoutes.js` at `/tasks/task-5`
