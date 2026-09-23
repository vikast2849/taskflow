/**
 * Task 2 Controller: Inline Styles, Basic Interaction & Server-Side Validation
 * Cognifyz Technologies Full Stack Development Internship - Level 1 Task 2
 * 
 * Objectives demonstrated:
 * 1. Extended form fields: Title, Description, Priority, Due Date.
 * 2. Server-side validation enforcing required fields, string length bounds, enum values, and future dates.
 * 3. Preventing invalid form submissions and returning structured validation error messages.
 * 4. Storing validated data in temporary server-side storage (in-memory list).
 */

// Temporary server-side storage for Task 2
const task2TemporaryStorage = [
  {
    id: 'T2-101',
    title: 'Setup GitHub Repository',
    description: 'Initialize Git repo with .gitignore and standard branch protection.',
    priority: 'high',
    dueDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
    createdAt: new Date().toLocaleString()
  },
  {
    id: 'T2-102',
    title: 'Design Database Schemas',
    description: 'Prepare Mongoose schemas for User and Task models.',
    priority: 'medium',
    dueDate: new Date(Date.now() + 86400000 * 5).toISOString().split('T')[0],
    createdAt: new Date().toLocaleString()
  }
];

/**
 * Validates Task 2 input on the server
 * @param {Object} data - req.body containing title, description, priority, dueDate
 * @returns {Object} errors map
 */
function validateTask2ServerSide(data) {
  const errors = {};
  const { title, description, priority, dueDate } = data;

  // 1. Title validation: required, 3 - 100 characters
  if (!title || typeof title !== 'string' || title.trim().length === 0) {
    errors.title = 'Task title is required.';
  } else if (title.trim().length < 3) {
    errors.title = 'Task title must be at least 3 characters long.';
  } else if (title.trim().length > 100) {
    errors.title = 'Task title cannot exceed 100 characters.';
  }

  // 2. Description validation: max 500 characters
  if (description && description.length > 500) {
    errors.description = 'Description cannot exceed 500 characters.';
  }

  // 3. Priority validation: must be one of allowed enum values
  const validPriorities = ['low', 'medium', 'high', 'urgent'];
  if (!priority || !validPriorities.includes(priority.toLowerCase())) {
    errors.priority = 'Please select a valid priority (Low, Medium, High, or Urgent).';
  }

  // 4. Due Date validation: required, valid ISO date, cannot be before today
  if (!dueDate || dueDate.trim() === '') {
    errors.dueDate = 'Due date is required.';
  } else {
    const parsedDate = new Date(dueDate);
    if (isNaN(parsedDate.getTime())) {
      errors.dueDate = 'Please enter a valid due date.';
    } else {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (parsedDate < today) {
        errors.dueDate = 'Due date cannot be set in the past.';
      }
    }
  }

  return errors;
}

/**
 * GET /tasks/task-2
 * Renders the extended form with temporary server-side storage
 */
exports.getTask2 = (req, res) => {
  res.render('tasks/task-2', {
    title: 'Task 2 – Inline Styles, Basic Interaction & Server-Side Validation',
    activeTab: 'task-2',
    formData: {},
    errors: {},
    tasks: task2TemporaryStorage,
    message: null,
    user: req.session ? req.session.user : null
  });
};

/**
 * POST /tasks/task-2
 * Validates submitted data on the server; rejects invalid inputs with 400 and error messages;
 * stores valid data in temporary server-side storage.
 */
exports.postTask2 = (req, res) => {
  const formData = {
    title: req.body.title ? req.body.title.trim() : '',
    description: req.body.description ? req.body.description.trim() : '',
    priority: req.body.priority ? req.body.priority.trim().toLowerCase() : '',
    dueDate: req.body.dueDate ? req.body.dueDate.trim() : ''
  };

  // Perform Server-Side Validation
  const errors = validateTask2ServerSide(formData);

  // If validation errors exist, prevent storage and return 400 Bad Request
  if (Object.keys(errors).length > 0) {
    return res.status(400).render('tasks/task-2', {
      title: 'Task 2 – Inline Styles, Basic Interaction & Server-Side Validation',
      activeTab: 'task-2',
      formData,
      errors,
      tasks: task2TemporaryStorage,
      message: {
        type: 'danger',
        text: 'Form submission blocked by Server-Side Validation. Please correct the highlighted errors.'
      },
      user: req.session ? req.session.user : null
    });
  }

  // If valid, store in temporary server-side storage
  const newTask = {
    id: 'T2-' + (task2TemporaryStorage.length + 101),
    title: formData.title,
    description: formData.description || 'No description provided.',
    priority: formData.priority,
    dueDate: formData.dueDate,
    createdAt: new Date().toLocaleString()
  };

  task2TemporaryStorage.unshift(newTask);

  // Render view with success confirmation and updated server storage
  res.status(201).render('tasks/task-2', {
    title: 'Task 2 – Inline Styles, Basic Interaction & Server-Side Validation',
    activeTab: 'task-2',
    formData: {}, // Clear form on success
    errors: {},
    tasks: task2TemporaryStorage,
    message: {
      type: 'success',
      text: `Task "${newTask.title}" passed both Client & Server Validation and was saved to temporary server storage!`
    },
    user: req.session ? req.session.user : null
  });
};

// Export temporary storage for testing assertions
exports.task2TemporaryStorage = task2TemporaryStorage;
