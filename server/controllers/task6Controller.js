/**
 * Task 6 Controller: Database Integration & User Authentication
 * Cognifyz Technologies Full Stack Development Internship - Level 3 Task 6
 */

const mongoose = require('mongoose');
const Task = require('../models/Task');
const User = require('../models/User');

exports.getTask6 = async (req, res) => {
  const dbStatus = {
    connected: mongoose.connection.readyState === 1,
    host: mongoose.connection.host || '127.0.0.1',
    port: mongoose.connection.port || 27017,
    dbName: mongoose.connection.name || 'taskflow'
  };

  let userTasks = [];
  let stats = { total: 0, pending: 0, inProgress: 0, completed: 0 };

  if (req.session && req.session.user) {
    try {
      userTasks = await Task.find({ user: req.session.user._id }).sort({ createdAt: -1 });
      stats = {
        total: userTasks.length,
        pending: userTasks.filter(t => t.status === 'pending').length,
        inProgress: userTasks.filter(t => t.status === 'in-progress').length,
        completed: userTasks.filter(t => t.status === 'completed').length
      };
    } catch (err) {
      console.error('[Task 6 DB Error]', err);
    }
  }

  res.render('tasks/task-6', {
    title: 'Task 6 – Database Integration & User Authentication',
    activeTab: 'task-6',
    dbStatus,
    tasks: userTasks,
    stats,
    user: req.session ? req.session.user : null
  });
};
