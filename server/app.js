/**
 * TaskFlow – Main Application Entry Point
 * Cognifyz Technologies Full Stack Development Internship (Tasks 1–6)
 */

require('dotenv').config();
const express = require('express');
const path = require('path');
const session = require('express-session');
const cors = require('cors');

// Initialize Express App
const app = express();
const PORT = process.env.PORT || 3000;

// View Engine Configuration (EJS for Server-Side Rendering)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

// Core Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

// Session Middleware (for authentication and temporary server session state)
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'taskflow_dev_session_secret_2026',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60 * 24 // 24 hours
    }
  })
);

// Global context middleware for views (makes user available to all EJS templates)
app.use((req, res, next) => {
  res.locals.currentUser = req.session ? req.session.user : null;
  res.locals.currentPath = req.path;
  next();
});

// Database Connection
const { connectDB } = require('./config/db');
connectDB().catch(err => console.error('[DB Startup Error]', err));

// Mount Routes
const indexRoutes = require('./routes/index');
const taskRoutes = require('./routes/taskRoutes');
const authRoutes = require('./routes/authRoutes');
const apiRoutes = require('./routes/apiRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

app.use('/', indexRoutes);
app.use('/tasks', taskRoutes);
app.use('/auth', authRoutes);
app.use('/api', apiRoutes);
app.use('/dashboard', dashboardRoutes);

// 404 Not Found Handler
app.use((req, res, next) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ success: false, message: 'API endpoint not found' });
  }
  res.status(404).render('tasks/task-1', {
    title: '404 - Page Not Found',
    activeTab: '404',
    submittedTask: null,
    tasks: [],
    message: { type: 'warning', text: `Page ${req.path} not found.` },
    user: req.session ? req.session.user : null
  });
});

// Central Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('[TaskFlow Server Error]', err);
  if (req.path.startsWith('/api')) {
    return res.status(err.status || 500).json({
      success: false,
      message: err.message || 'Internal Server Error'
    });
  }
  res.status(err.status || 500).send(`
    <h1>500 - Internal Server Error</h1>
    <p>${err.message}</p>
    <a href="/">Return to Home</a>
  `);
});

// Server Initialization (only when run directly)
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(`🚀 TaskFlow Server successfully running!`);
    console.log(`🌐 Local URL: http://localhost:${PORT}`);
    console.log(`📋 Level 1 Task 1: http://localhost:${PORT}/tasks/task-1`);
    console.log(`====================================================`);
  });
}

module.exports = app;
