# Task 6: Database Integration and User Authentication
**Cognifyz Technologies Full Stack Development Internship – Level 3 (Advanced)**

---

## Objective
Integrate MongoDB using Mongoose, create User and Task schemas, implement user registration with bcrypt password hashing, provide session/JWT authentication, protect endpoints with middleware, and enforce strict user-level authorization so users can access only their own tasks.

## Requirements Satisfied
1. **MongoDB Integration with Mongoose**:
   - Connection manager in `server/config/db.js`.
   - Supports local MongoDB, MongoDB Atlas URI via `.env`, and embedded in-memory MongoDB fallback.
2. **Database Models**:
   - `User` model (`server/models/User.js`): `name`, `email` (unique, lowercase), `password` (bcrypt salted & hashed), `role`, timestamps.
   - `Task` model (`server/models/Task.js`): `title`, `description`, `priority`, `status`, `dueDate`, `user` (ref: 'User', indexed), timestamps.
3. **User Registration & Login**:
   - `POST /auth/register`: Validates input, hashes password with 10 salt rounds, creates user document, starts session.
   - `POST /auth/login`: Verifies email and password using `bcrypt.compare`, sets session, issues JWT.
4. **Secure Password Handling**:
   - `pre('save')` hook hashes raw password.
   - Passwords and `__v` are deleted in `toJSON` schema transforms and never returned in API responses or logs.
   - Generic timing-safe error message on authentication failure ("Invalid email or password").
5. **Authentication Middleware**:
   - `ensureAuthenticated`: Protects SSR dashboard views (`/dashboard`, `/tasks/task-6`).
   - `authApi`: Protects API endpoints (`/api/v1/tasks`).
6. **Authorization Checks & Multi-User Isolation**:
   - Every query automatically scopes to `{ user: req.user._id }`.
   - Attempts to access, edit, or delete another user's task are rejected with `403 Forbidden` (`verifyTaskOwnership`).
7. **Environment Secrets**:
   - Database URI, JWT Secret, and Session Secret stored in `.env`.
   - Template provided in `.env.example`.
   - Excluded in `.gitignore`.

## Endpoints
- `GET /tasks/task-6`: Serves the Task 6 database and authentication workspace.
- `GET /auth/register` & `POST /auth/register`: User registration.
- `GET /auth/login` & `POST /auth/login`: User login.
- `GET /auth/logout`: User logout.
- `GET /dashboard`: Protected production task dashboard.
- `GET /api/v1/tasks`: Protected task listing for authenticated user.
- `POST /api/v1/tasks`: Protected task creation.
- `PUT /api/v1/tasks/:id`: Protected task update with ownership check.
- `DELETE /api/v1/tasks/:id`: Protected task deletion with ownership check.

## File Map
- **Mongoose Models**: `server/models/User.js`, `server/models/Task.js`
- **Database Config**: `server/config/db.js`
- **Controllers**: `server/controllers/authController.js`, `server/controllers/taskController.js`, `server/controllers/task6Controller.js`
- **Middleware**: `server/middleware/authMiddleware.js`
- **Views**: `views/auth/login.ejs`, `views/auth/register.ejs`, `views/tasks/task-6.ejs`, `views/dashboard/index.ejs`
