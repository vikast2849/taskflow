/**
 * RESTful API Routes
 * Cognifyz Technologies Full Stack Development Internship - Tasks 5 & 6
 */

const express = require('express');
const router = express.Router();
const task5Controller = require('../controllers/task5Controller');
const taskController = require('../controllers/taskController');
const { authApi } = require('../middleware/authMiddleware');

// ============================================================
// Task 5: Core RESTful API Endpoints (CRUD operations)
// ============================================================
router.get('/tasks', task5Controller.getAllTasks);
router.get('/tasks/:id', task5Controller.getTaskById);
router.post('/tasks', task5Controller.createTask);
router.put('/tasks/:id', task5Controller.updateTask);
router.delete('/tasks/:id', task5Controller.deleteTask);

// ============================================================
// Task 6: Authenticated & Protected MongoDB API Endpoints
// Enforces User Authorization and multi-user data isolation
// ============================================================
router.get('/v1/tasks', authApi, taskController.getMyTasks);
router.get('/v1/tasks/:id', authApi, taskController.getTaskById);
router.post('/v1/tasks', authApi, taskController.createTask);
router.put('/v1/tasks/:id', authApi, taskController.updateTask);
router.delete('/v1/tasks/:id', authApi, taskController.deleteTask);

module.exports = router;
