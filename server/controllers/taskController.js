/**
 * Production Task Controller (Database Integrated with User Authorization)
 * Cognifyz Technologies Full Stack Development Internship - Level 3 Task 6
 * 
 * Demonstrates:
 * 1. Mongoose CRUD operations with MongoDB persistence.
 * 2. User Authorization: Users can ONLY access, query, update, or delete their OWN tasks.
 * 3. Strict 403 Forbidden / 404 Not Found handling on unauthorized operations.
 */

const Task = require('../models/Task');

/**
 * GET /api/v1/tasks
 * Returns all tasks belonging exclusively to the authenticated user
 */
exports.getMyTasks = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;
    const { status, search, priority, sort } = req.query;

    const query = { user: userId };

    if (status && status !== 'all') {
      query.status = status;
    }

    if (priority && priority !== 'all') {
      query.priority = priority;
    }

    if (search) {
      const q = search.trim();
      query.$or = [
        { title: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } }
      ];
    }

    let sortOption = { createdAt: -1 };
    if (sort === 'dueDate') sortOption = { dueDate: 1 };
    if (sort === 'priority') sortOption = { priority: 1 };

    const tasks = await Task.find(query).sort(sortOption);

    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve tasks from database: ' + err.message
    });
  }
};

/**
 * GET /api/v1/tasks/:id
 * Retrieves a single task ensuring strict ownership
 */
exports.getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id || req.user.id;

    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: `Task not found with ID "${id}"`
      });
    }

    // Strict Authorization check
    if (task.user.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Access forbidden: You do not own this task resource'
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
 * POST /api/v1/tasks
 * Creates a task in MongoDB bound to req.user._id
 */
exports.createTask = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;
    const { title, description, priority, dueDate } = req.body;

    if (!title || title.trim().length < 3) {
      return res.status(400).json({
        success: false,
        message: 'Validation error: Task title must be at least 3 characters long.'
      });
    }

    if (!dueDate || isNaN(new Date(dueDate).getTime())) {
      return res.status(400).json({
        success: false,
        message: 'Validation error: A valid due date is required.'
      });
    }

    const task = await Task.create({
      title: title.trim(),
      description: description ? description.trim() : '',
      priority: priority || 'medium',
      status: 'pending',
      dueDate,
      user: userId
    });

    res.status(201).json({
      success: true,
      message: 'Task successfully created in MongoDB.',
      data: task
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to create task in database: ' + err.message
    });
  }
};

/**
 * PUT /api/v1/tasks/:id
 * Updates task in MongoDB with ownership check
 */
exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id || req.user.id;

    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: `Task not found with ID "${id}"`
      });
    }

    // Strict Authorization check
    if (task.user.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Access forbidden: You cannot modify another user’s task'
      });
    }

    const { title, description, priority, status, dueDate } = req.body;
    if (title) task.title = title.trim();
    if (typeof description !== 'undefined') task.description = description.trim();
    if (priority) task.priority = priority;
    if (status) task.status = status;
    if (dueDate) task.dueDate = dueDate;

    await task.save();

    res.status(200).json({
      success: true,
      message: 'Task updated successfully in MongoDB.',
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
 * DELETE /api/v1/tasks/:id
 * Deletes task from MongoDB with ownership check
 */
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id || req.user.id;

    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: `Task not found with ID "${id}"`
      });
    }

    // Strict Authorization check
    if (task.user.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Access forbidden: You cannot delete another user’s task'
      });
    }

    await Task.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: 'Task deleted successfully from MongoDB.',
      id
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete task: ' + err.message
    });
  }
};
