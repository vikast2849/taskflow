/**
 * Task 4 Controller: Complex Form Validation & Dynamic DOM Manipulation SPA
 * Cognifyz Technologies Full Stack Development Internship - Level 2 Task 4
 * 
 * Objectives demonstrated:
 * 1. Serving the Single Page Application (SPA) container.
 * 2. Integrating modular client-side JavaScript architecture (ES Modules).
 * 3. Client-side hash routing, dynamic DOM rendering, real-time filtering, and password strength analysis.
 */

exports.getTask4 = (req, res) => {
  res.render('tasks/task-4', {
    title: 'Task 4 – Complex Form Validation & Dynamic DOM Manipulation',
    activeTab: 'task-4',
    extraCss: '/css/task4.css',
    user: req.session ? req.session.user : null
  });
};
