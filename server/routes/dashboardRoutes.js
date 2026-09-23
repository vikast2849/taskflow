/**
 * Dashboard Routes & Controllers
 * Cognifyz Technologies Full Stack Development Internship - Full Integrated System
 */

const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const { ensureAuthenticated } = require('../middleware/authMiddleware');

// GET /dashboard
router.get('/', ensureAuthenticated, async (req, res) => {
  try {
    const userId = req.session.user._id || req.session.user.id;
    const { status, search, priority, sort } = req.query;

    const query = { user: userId };

    if (status && status !== 'all') query.status = status;
    if (priority && priority !== 'all') query.priority = priority;
    if (search) {
      const q = search.trim();
      query.$or = [
        { title: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } }
      ];
    }

    let sortOptions = { createdAt: -1 };
    if (sort === 'dueDate') sortOptions = { dueDate: 1 };
    if (sort === 'priority') sortOptions = { priority: 1 };
    if (sort === 'title') sortOptions = { title: 1 };

    const tasks = await Task.find(query).sort(sortOptions);

    // Calculate live user stats across all tasks
    const allUserTasks = await Task.find({ user: userId });
    const stats = {
      total: allUserTasks.length,
      pending: allUserTasks.filter(t => t.status === 'pending').length,
      inProgress: allUserTasks.filter(t => t.status === 'in-progress').length,
      completed: allUserTasks.filter(t => t.status === 'completed').length
    };

    res.render('dashboard/index', {
      title: 'Dashboard | TaskFlow',
      activeTab: 'dashboard',
      tasks,
      stats,
      filters: { status: status || 'all', priority: priority || 'all', search: search || '', sort: sort || 'newest' },
      user: req.session.user,
      message: req.query.message ? { type: req.query.msgType || 'success', text: req.query.message } : null
    });
  } catch (err) {
    console.error('[Dashboard Route Error]', err);
    res.status(500).send('Error loading dashboard: ' + err.message);
  }
});

// POST /dashboard/tasks (SSR Create fallback)
router.post('/tasks', ensureAuthenticated, async (req, res) => {
  try {
    const userId = req.session.user._id || req.session.user.id;
    const { title, description, priority, dueDate } = req.body;

    if (!title || title.trim().length < 3) {
      return res.redirect('/dashboard?message=Title must be at least 3 characters&msgType=danger');
    }

    await Task.create({
      title: title.trim(),
      description: description ? description.trim() : '',
      priority: priority || 'medium',
      status: 'pending',
      dueDate: dueDate || new Date(),
      user: userId
    });

    res.redirect('/dashboard?message=Task created successfully!&msgType=success');
  } catch (err) {
    res.redirect('/dashboard?message=Failed to create task: ' + err.message + '&msgType=danger');
  }
});

// POST /dashboard/tasks/:id/status
router.post('/tasks/:id/status', ensureAuthenticated, async (req, res) => {
  try {
    const userId = req.session.user._id || req.session.user.id;
    const { id } = req.params;
    const { status } = req.body;

    const task = await Task.findOne({ _id: id, user: userId });
    if (!task) {
      return res.redirect('/dashboard?message=Task not found or unauthorized&msgType=danger');
    }

    task.status = status;
    await task.save();

    res.redirect('/dashboard?message=Task status updated!&msgType=success');
  } catch (err) {
    res.redirect('/dashboard?message=Error updating status&msgType=danger');
  }
});

// POST /dashboard/tasks/:id/delete
router.post('/tasks/:id/delete', ensureAuthenticated, async (req, res) => {
  try {
    const userId = req.session.user._id || req.session.user.id;
    const { id } = req.params;

    const task = await Task.findOneAndDelete({ _id: id, user: userId });
    if (!task) {
      return res.redirect('/dashboard?message=Task not found or unauthorized&msgType=danger');
    }

    res.redirect('/dashboard?message=Task deleted successfully!&msgType=success');
  } catch (err) {
    res.redirect('/dashboard?message=Error deleting task&msgType=danger');
  }
});

module.exports = router;
