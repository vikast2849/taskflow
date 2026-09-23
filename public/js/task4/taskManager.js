/**
 * Task 4 Module: Dynamic DOM Manipulation & In-Memory Task Manager
 * Cognifyz Technologies Full Stack Development Internship - Level 2 Task 4
 */

export class TaskManager {
  constructor(containerId, statsSelectors) {
    this.container = document.getElementById(containerId);
    this.statsSelectors = statsSelectors;
    this.activeFilter = 'all';
    this.searchQuery = '';

    // Initial state with sample tasks
    this.tasks = [
      {
        id: 'DOM-401',
        title: 'Build Client-Side Router',
        description: 'Implement hash change event listener for seamless SPA view switching.',
        priority: 'high',
        status: 'completed',
        dueDate: '2026-09-15'
      },
      {
        id: 'DOM-402',
        title: 'Implement Password Strength Analyzer',
        description: 'Provide live feedback with regex testing on input event.',
        priority: 'urgent',
        status: 'in-progress',
        dueDate: '2026-09-18'
      },
      {
        id: 'DOM-403',
        title: 'Dynamic DOM Animation Cleanup',
        description: 'Attach CSS transition classes before removing elements from the DOM tree.',
        priority: 'medium',
        status: 'pending',
        dueDate: '2026-09-21'
      }
    ];
  }

  init() {
    this.render();
    this.updateStats();
  }

  addTask(taskData) {
    const newTask = {
      id: 'DOM-' + (Math.floor(100 + Math.random() * 900)),
      title: taskData.title.trim(),
      description: taskData.description.trim() || 'No description provided.',
      priority: taskData.priority,
      status: 'pending',
      dueDate: taskData.dueDate
    };

    this.tasks.unshift(newTask);
    this.render();
    this.updateStats();
    return newTask;
  }

  deleteTask(taskId) {
    const cardEl = document.querySelector(`[data-task-id="${taskId}"]`);
    if (cardEl) {
      // Smooth animated removal
      cardEl.classList.add('card-deleting');
      setTimeout(() => {
        this.tasks = this.tasks.filter(t => t.id !== taskId);
        this.render();
        this.updateStats();
      }, 250);
    } else {
      this.tasks = this.tasks.filter(t => t.id !== taskId);
      this.render();
      this.updateStats();
    }
  }

  changeStatus(taskId, newStatus) {
    const task = this.tasks.find(t => t.id === taskId);
    if (task) {
      task.status = newStatus;
      this.render();
      this.updateStats();
    }
  }

  toggleComplete(taskId) {
    const task = this.tasks.find(t => t.id === taskId);
    if (task) {
      task.status = task.status === 'completed' ? 'pending' : 'completed';
      this.render();
      this.updateStats();
    }
  }

  setFilter(filter) {
    this.activeFilter = filter;
    this.render();
  }

  setSearch(query) {
    this.searchQuery = query.toLowerCase().trim();
    this.render();
  }

  getFilteredTasks() {
    return this.tasks.filter(task => {
      // Filter matching
      let matchesFilter = true;
      if (this.activeFilter === 'pending') matchesFilter = task.status === 'pending';
      if (this.activeFilter === 'in-progress') matchesFilter = task.status === 'in-progress';
      if (this.activeFilter === 'completed') matchesFilter = task.status === 'completed';

      // Search matching
      let matchesSearch = true;
      if (this.searchQuery) {
        matchesSearch = task.title.toLowerCase().includes(this.searchQuery) ||
                        task.description.toLowerCase().includes(this.searchQuery);
      }

      return matchesFilter && matchesSearch;
    });
  }

  updateStats() {
    const total = this.tasks.length;
    const pending = this.tasks.filter(t => t.status === 'pending').length;
    const inProgress = this.tasks.filter(t => t.status === 'in-progress').length;
    const completed = this.tasks.filter(t => t.status === 'completed').length;
    const rate = total > 0 ? Math.round((completed / total) * 100) : 0;

    if (this.statsSelectors.total) this.statsSelectors.total.textContent = total;
    if (this.statsSelectors.pending) this.statsSelectors.pending.textContent = pending;
    if (this.statsSelectors.inProgress) this.statsSelectors.inProgress.textContent = inProgress;
    if (this.statsSelectors.completed) this.statsSelectors.completed.textContent = completed;
    if (this.statsSelectors.rate) this.statsSelectors.rate.textContent = `${rate}%`;
  }

  render() {
    if (!this.container) return;

    const filtered = this.getFilteredTasks();

    if (filtered.length === 0) {
      this.container.innerHTML = `
        <div class="text-center py-5 text-muted col-12">
          <i class="bi bi-search fs-1 d-block mb-2 text-secondary opacity-50"></i>
          <h5 class="fw-semibold">No matching tasks found</h5>
          <p class="small mb-0">Try adjusting your search query or changing active filter.</p>
        </div>
      `;
      return;
    }

    this.container.innerHTML = filtered.map(task => {
      const isCompleted = task.status === 'completed';
      const priorityColors = {
        urgent: 'bg-danger text-white',
        high: 'bg-warning text-dark',
        medium: 'bg-primary-subtle text-primary',
        low: 'bg-success-subtle text-success'
      };

      return `
        <div class="col-12 col-md-6 mb-3" data-task-id="${task.id}">
          <div class="card h-100 dynamic-task-card task-${task.status} p-3 shadow-sm rounded-3">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <div class="d-flex align-items-center gap-2">
                <span class="badge ${priorityColors[task.priority] || 'bg-light text-dark'} text-uppercase small">${task.priority}</span>
                <span class="badge bg-light text-secondary border small">${task.id}</span>
              </div>
              <div class="dropdown">
                <button class="btn btn-sm btn-light border-0 py-0 px-2" type="button" data-bs-toggle="dropdown">
                  <i class="bi bi-three-dots-vertical"></i>
                </button>
                <ul class="dropdown-menu dropdown-menu-end shadow-sm border-0">
                  <li><h6 class="dropdown-header">Change Status</h6></li>
                  <li><button class="dropdown-item btn-status-change" data-id="${task.id}" data-status="pending"><i class="bi bi-clock me-2"></i>Pending</button></li>
                  <li><button class="dropdown-item btn-status-change" data-id="${task.id}" data-status="in-progress"><i class="bi bi-arrow-repeat me-2"></i>In Progress</button></li>
                  <li><button class="dropdown-item btn-status-change" data-id="${task.id}" data-status="completed"><i class="bi bi-check2-circle me-2 text-success"></i>Completed</button></li>
                  <li><hr class="dropdown-divider"></li>
                  <li><button class="dropdown-item text-danger btn-delete-task" data-id="${task.id}"><i class="bi bi-trash3 me-2"></i>Delete Task</button></li>
                </ul>
              </div>
            </div>

            <div class="d-flex align-items-start gap-2 mb-2">
              <input type="checkbox" class="form-check-input mt-1 btn-toggle-complete" data-id="${task.id}" ${isCompleted ? 'checked' : ''}>
              <h5 class="h6 fw-bold mb-0 task-title-text flex-grow-1">${escapeHtml(task.title)}</h5>
            </div>

            <p class="text-muted small mb-3 flex-grow-1">${escapeHtml(task.description)}</p>

            <div class="d-flex justify-content-between align-items-center pt-2 border-top small text-muted">
              <span><i class="bi bi-calendar-event me-1"></i>Due: ${task.dueDate}</span>
              <span class="badge ${isCompleted ? 'bg-success-subtle text-success' : task.status === 'in-progress' ? 'bg-primary-subtle text-primary' : 'bg-secondary-subtle text-secondary'} text-capitalize">${task.status.replace('-', ' ')}</span>
            </div>
          </div>
        </div>
      `;
    }).join('');

    // Attach event delegation for dynamic cards
    this.attachCardEvents();
  }

  attachCardEvents() {
    this.container.querySelectorAll('.btn-toggle-complete').forEach(chk => {
      chk.addEventListener('change', (e) => {
        this.toggleComplete(e.target.dataset.id);
      });
    });

    this.container.querySelectorAll('.btn-status-change').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.id;
        const status = e.currentTarget.dataset.status;
        this.changeStatus(id, status);
      });
    });

    this.container.querySelectorAll('.btn-delete-task').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.id;
        if (confirm('Are you sure you want to delete this task from the UI?')) {
          this.deleteTask(id);
        }
      });
    });
  }
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
