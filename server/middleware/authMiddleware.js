/**
 * Authentication and Authorization Middleware
 * Cognifyz Technologies Full Stack Development Internship - Level 3 Task 6
 */

const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Task = require('../models/Task');

/**
 * Ensures user is authenticated for Server-Side Rendered views (Session-based)
 */
exports.ensureAuthenticated = (req, res, next) => {
  if (req.session && req.session.user) {
    req.user = req.session.user;
    return next();
  }
  req.session.returnTo = req.originalUrl;
  res.redirect('/auth/login?message=Please log in to access this page');
};

/**
 * Protects API Endpoints (Supports both Session & Bearer JWT tokens)
 */
exports.authApi = async (req, res, next) => {
  try {
    // 1. Check session auth first
    if (req.session && req.session.user) {
      req.user = req.session.user;
      return next();
    }

    // 2. Check Authorization header (Bearer <token>)
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'taskflow_jwt_secret_token_key_2026_cognifyz');
      const user = await User.findById(decoded.id).select('-password');

      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Invalid authorization token. User not found.'
        });
      }

      req.user = user.toJSON();
      return next();
    }

    // Unauthenticated
    return res.status(401).json({
      success: false,
      message: 'Access denied: Authentication required. Please provide a valid Bearer token or active session.'
    });
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired authorization token: ' + err.message
    });
  }
};

/**
 * Authorization Check: Ensures a logged-in user can ONLY access or mutate their OWN task
 */
exports.verifyTaskOwnership = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: `Task with ID "${id}" was not found.`
      });
    }

    const currentUserId = req.user._id || req.user.id;
    if (task.user.toString() !== currentUserId.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Access forbidden: You do not have authorization to access or modify this user’s task.'
      });
    }

    req.targetTask = task;
    next();
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Authorization check error: ' + err.message
    });
  }
};
