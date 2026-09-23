/**
 * Task 3 Controller: Advanced CSS Styling and Responsive Design
 * Cognifyz Technologies Full Stack Development Internship - Level 2 Task 3
 * 
 * Objectives demonstrated:
 * 1. Professional multi-section layout: Navbar, Hero/Dashboard, Task Cards, Statistics, Footer.
 * 2. Advanced CSS styling with custom variables, glassmorphism, transitions, and hover animations.
 * 3. Mobile, Tablet, and Desktop responsive grid using Bootstrap 5 and modern CSS Media Queries.
 */

exports.getTask3 = (req, res) => {
  // Rich task dataset designed to showcase responsive layouts, card interactions, and stats
  const showcaseTasks = [
    {
      id: 'TASK-301',
      title: 'Architect Microservices Auth Flow',
      description: 'Implement secure JWT refresh token rotation with HTTP-only cookies and CSRF protection.',
      priority: 'urgent',
      status: 'in-progress',
      progress: 75,
      category: 'Security',
      dueDate: '2026-09-18',
      assignees: ['JD', 'AS']
    },
    {
      id: 'TASK-302',
      title: 'Design Dark Mode Design Tokens',
      description: 'Establish consistent contrast ratios, CSS variables, and theme switcher for the UI system.',
      priority: 'high',
      status: 'pending',
      progress: 20,
      category: 'UI/UX',
      dueDate: '2026-09-22',
      assignees: ['MK']
    },
    {
      id: 'TASK-303',
      title: 'MongoDB Aggregation Pipeline Optimization',
      description: 'Add compound indexes on user_id + status to drop query response time below 15ms.',
      priority: 'medium',
      status: 'completed',
      progress: 100,
      category: 'Database',
      dueDate: '2026-09-14',
      assignees: ['HT', 'RK']
    },
    {
      id: 'TASK-304',
      title: 'Automated E2E Test Suite with Playwright',
      description: 'Write end-to-end regression tests verifying registration, login, and task creation workflows.',
      priority: 'low',
      status: 'in-progress',
      progress: 60,
      category: 'Testing',
      dueDate: '2026-09-25',
      assignees: ['JD']
    },
    {
      id: 'TASK-305',
      title: 'RESTful API Rate Limiting & Helmet Security',
      description: 'Configure express-rate-limit and Helmet security headers to protect server endpoints.',
      priority: 'high',
      status: 'completed',
      progress: 100,
      category: 'DevOps',
      dueDate: '2026-09-12',
      assignees: ['AS']
    },
    {
      id: 'TASK-306',
      title: 'Accessibility Audit (WCAG 2.1 AA)',
      description: 'Verify keyboard focus indicators, screen reader ARIA labels, and color contrast compliance.',
      priority: 'medium',
      status: 'pending',
      progress: 10,
      category: 'Accessibility',
      dueDate: '2026-09-30',
      assignees: ['MK', 'HT']
    }
  ];

  // Calculate live statistics
  const stats = {
    total: showcaseTasks.length,
    pending: showcaseTasks.filter(t => t.status === 'pending').length,
    inProgress: showcaseTasks.filter(t => t.status === 'in-progress').length,
    completed: showcaseTasks.filter(t => t.status === 'completed').length,
    urgentOrHigh: showcaseTasks.filter(t => t.priority === 'urgent' || t.priority === 'high').length
  };

  res.render('tasks/task-3', {
    title: 'Task 3 – Advanced CSS Styling & Responsive Design',
    activeTab: 'task-3',
    extraCss: '/css/task3.css',
    tasks: showcaseTasks,
    stats,
    user: req.session ? req.session.user : null
  });
};
