const express = require('express');
const router = express.Router();

const task1Controller = require('../controllers/task1Controller');
const task2Controller = require('../controllers/task2Controller');
const task3Controller = require('../controllers/task3Controller');
const task4Controller = require('../controllers/task4Controller');
const task5Controller = require('../controllers/task5Controller');
const task6Controller = require('../controllers/task6Controller');

// Task 1: HTML Structure and Basic Server Interaction (Level 1)
router.get('/task-1', task1Controller.getTask1);
router.post('/task-1', task1Controller.postTask1);

// Task 2: Inline Styles, Basic Interaction & Server-Side Validation (Level 1)
router.get('/task-2', task2Controller.getTask2);
router.post('/task-2', task2Controller.postTask2);

// Task 3: Advanced CSS Styling and Responsive Design (Level 2)
router.get('/task-3', task3Controller.getTask3);

// Task 4: Complex Form Validation and Dynamic DOM Manipulation (Level 2)
router.get('/task-4', task4Controller.getTask4);

// Task 5: RESTful API Integration & Frontend Interaction (Level 3)
router.get('/task-5', task5Controller.getTask5View);

// Task 6: Database Integration & User Authentication (Level 3)
router.get('/task-6', task6Controller.getTask6);

module.exports = router;
