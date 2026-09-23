/**
 * Task 1 Controller: HTML Structure & Basic Server Interaction
 * Cognifyz Technologies Full Stack Development Internship - Level 1 Task 1
 * 
 * Objectives demonstrated:
 * 1. Handling HTTP GET request to serve an EJS template form.
 * 2. Processing HTTP POST form submissions on the Express server.
 * 3. Utilizing EJS (Server-Side Rendering) to dynamically render submitted task data into HTML.
 */

// In-memory collection for Task 1 demonstrations
const task1List = [];

/**
 * GET /tasks/task-1
 * Renders the initial HTML/EJS task creation form.
 */
exports.getTask1 = (req, res) => {
  res.render('tasks/task-1', {
    title: 'Task 1 – HTML Structure & Basic Server Interaction',
    activeTab: 'task-1',
    submittedTask: null,
    tasks: task1List,
    message: null,
    user: req.session ? req.session.user : null
  });
};

/**
 * POST /tasks/task-1
 * Receives form submission via Express body-parser,
 * processes the input, and re-renders the EJS view with the submitted task.
 */
exports.postTask1 = (req, res) => {
  const { title, description } = req.body;

  // Basic validation to demonstrate server-side reception
  if (!title || title.trim() === '') {
    return res.status(400).render('tasks/task-1', {
      title: 'Task 1 – HTML Structure & Basic Server Interaction',
      activeTab: 'task-1',
      submittedTask: null,
      tasks: task1List,
      message: { type: 'danger', text: 'Task title is required.' },
      user: req.session ? req.session.user : null
    });
  }

  // Construct task object
  const newTask = {
    id: 'T1-' + (task1List.length + 1),
    title: title.trim(),
    description: description ? description.trim() : 'No description provided.',
    createdAt: new Date().toLocaleString()
  };

  // Store in temporary in-memory list
  task1List.unshift(newTask);

  // Render EJS view with the newly created task demonstrating SSR
  res.status(201).render('tasks/task-1', {
    title: 'Task 1 – HTML Structure & Basic Server Interaction',
    activeTab: 'task-1',
    submittedTask: newTask,
    tasks: task1List,
    message: { type: 'success', text: `Task "${newTask.title}" successfully processed and rendered via EJS!` },
    user: req.session ? req.session.user : null
  });
};
