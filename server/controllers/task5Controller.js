/**
 * Task 5 Controller: RESTful API & CRUD Operations
 * Cognifyz Technologies Full Stack Development Internship - Level 3 Task 5
 * 
 * Objectives demonstrated:
 * 1. RESTful API endpoints for complete CRUD operations (GET, POST, PUT, DELETE).
 * 2. Proper HTTP status codes: 200 OK, 201 Created, 400 Bad Request, 404 Not Found, 500 Internal Error.
 * 3. Consistent JSON response envelope: { success: boolean, message?: string, data?: any }.
 * 4. Input validation and structured error handling.
 */

// In-Memory REST task store
let restTasks = [
  {
    id: 'api-101',
    title: 'Implement RESTful API Endpoints',
    description: 'Design GET, POST, PUT, DELETE endpoints following REST architectural principles.',
    priority: 'urgent',
    status: 'completed',
    dueDate: '2026-09-14',
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString()
  },
  {
    id: 'api-102',
    title: 'Integrate Client-Side Fetch() Layer',
    description: 'Connect frontend UI to Express REST API with async/await and JSON parsing.',
    priority: 'high',
    status: 'in-progress',
    dueDate: '2026-09-18',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString()
  },
  {
    id: 'api-103',
    title: 'Build UI Loading & Error States',
    description: 'Render responsive spinners and error alert notifications on API network delays or errors.',
    priority: 'medium',
    status: 'pending',
    dueDate: '2026-09-22',
    createdAt: new Date(Date.now() - 86400000).toISOString()
  }
];

/**
 * GET /api/tasks
 * Retrieves all tasks, with support for query filters (?status= & ?search=)
 */
exports.getAllTasks = (req, res) => {
  try {
    let result = [...restTasks];
    const { status, search } = req.query;

    if (status && status !== 'all') {
      result = result.filter(t => t.status.toLowerCase() === status.toLowerCase());
    }

    if (search) {
      const q = search.toLowerCase().trim();
      result = result.filter(t => 
        t.title.toLowerCase().includes(q) || 
        t.description.toLowerCase().includes(q)
      );
    }

    res.status(200).json({
      success: true,
      count: result.length,
      data: result
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve tasks from API: ' + err.message
    });
  }
};

/**
 * GET /api/tasks/:id
 * Retrieves a single task by ID
 */
exports.getTaskById = (req, res) => {
  try {
    const { id } = req.params;
    const task = restTasks.find(t => t.id === id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: `Task with ID "${id}" was not found.`
      });
    }

    res.status(200).json({
      success: true,
      data: task
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server error retrieving task: ' + err.message
    });
  }
};

/**
 * POST /api/tasks
 * Creates a new task after strict payload validation
 */
exports.createTask = (req, res) => {
  try {
    const { title, description, priority, dueDate } = req.body;
    const errors = [];

    if (!title || typeof title !== 'string' || title.trim().length < 3) {
      errors.push('Task title is required and must be at least 3 characters.');
    }

    const validPriorities = ['low', 'medium', 'high', 'urgent'];
    if (!priority || !validPriorities.includes(priority.toLowerCase())) {
      errors.push('Valid priority is required (low, medium, high, urgent).');
    }

    if (!dueDate || isNaN(new Date(dueDate).getTime())) {
      errors.push('A valid due date is required.');
    }

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed.',
        errors
      });
    }

    const newTask = {
      id: 'api-' + (Math.floor(100 + Math.random() * 900)),
      title: title.trim(),
      description: description ? description.trim() : 'No description provided.',
      priority: priority.toLowerCase(),
      status: 'pending',
      dueDate,
      createdAt: new Date().toISOString()
    };

    restTasks.unshift(newTask);

    res.status(201).json({
      success: true,
      message: 'Task created successfully via REST API.',
      data: newTask
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to create task: ' + err.message
    });
  }
};

/**
 * PUT /api/tasks/:id
 * Updates an existing task by ID
 */
exports.updateTask = (req, res) => {
  try {
    const { id } = req.params;
    const taskIndex = restTasks.findIndex(t => t.id === id);

    if (taskIndex === -1) {
      return res.status(404).json({
        success: false,
        message: `Cannot update: Task with ID "${id}" does not exist.`
      });
    }

    const { title, description, priority, status, dueDate } = req.body;
    const task = restTasks[taskIndex];

    if (title && title.trim().length >= 3) {
      task.title = title.trim();
    }
    if (typeof description !== 'undefined') {
      task.description = description.trim();
    }
    if (priority && ['low', 'medium', 'high', 'urgent'].includes(priority.toLowerCase())) {
      task.priority = priority.toLowerCase();
    }
    if (status && ['pending', 'in-progress', 'completed'].includes(status.toLowerCase())) {
      task.status = status.toLowerCase();
    }
    if (dueDate && !isNaN(new Date(dueDate).getTime())) {
      task.dueDate = dueDate;
    }

    task.updatedAt = new Date().toISOString();

    res.status(200).json({
      success: true,
      message: 'Task updated successfully via REST API.',
      data: task
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to update task: ' + err.message
    });
  }
};

/**
 * DELETE /api/tasks/:id
 * Removes a task by ID
 */
exports.deleteTask = (req, res) => {
  try {
    const { id } = req.params;
    const initialLen = restTasks.length;
    restTasks = restTasks.filter(t => t.id !== id);

    if (restTasks.length === initialLen) {
      return res.status(404).json({
        success: false,
        message: `Cannot delete: Task with ID "${id}" does not exist.`
      });
    }

    res.status(200).json({
      success: true,
      message: 'Task deleted successfully via REST API.',
      id
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete task: ' + err.message
    });
  }
};

/**
 * GET /tasks/task-5
 * Serves the Task 5 Frontend UI
 */
exports.getTask5View = (req, res) => {
  res.render('tasks/task-5', {
    title: 'Task 5 – RESTful API & Frontend Interaction',
    activeTab: 'task-5',
    user: req.session ? req.session.user : null
  });
};
