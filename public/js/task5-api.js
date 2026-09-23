/**
 * Task 5: Frontend Interface with Fetch() API Integration
 * Cognifyz Technologies Full Stack Development Internship - Level 3 Task 5
 */

class TaskApiClient {
  constructor(baseUrl = '/api/tasks') {
    this.baseUrl = baseUrl;
  }

  async fetchTasks(status = 'all', search = '') {
    const params = new URLSearchParams();
    if (status && status !== 'all') params.append('status', status);
    if (search) params.append('search', search);

    const url = `${this.baseUrl}?${params.toString()}`;
    const response = await fetch(url);
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Failed to fetch tasks from server');
    }
    return result.data;
  }

  async getTask(id) {
    const response = await fetch(`${this.baseUrl}/${id}`);
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || 'Task not found');
    }
    return result.data;
  }

  async createTask(taskData) {
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(taskData)
    });
    const result = await response.json();
    if (!response.ok) {
      const errMsg = result.errors ? result.errors.join(' ') : result.message;
      throw new Error(errMsg || 'Failed to create task');
    }
    return result.data;
  }

  async updateTask(id, updateData) {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updateData)
    });
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || 'Failed to update task');
    }
    return result.data;
  }

  async deleteTask(id) {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'DELETE'
    });
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || 'Failed to delete task');
    }
    return result;
  }
}

// UI Controller
document.addEventListener('DOMContentLoaded', () => {
  const apiClient = new TaskApiClient();

  const container = document.getElementById('apiTaskGrid');
  const spinner = document.getElementById('apiLoadingSpinner');
  const errorBanner = document.getElementById('apiErrorBanner');
  const errorText = document.getElementById('apiErrorText');
  const countBadge = document.getElementById('apiTaskCount');

  let currentStatus = 'all';
  let currentSearch = '';

  // Helpers for UI feedback
  function showLoading(isLoading) {
    if (spinner) spinner.classList.toggle('d-none', !isLoading);
    if (container) container.style.opacity = isLoading ? '0.4' : '1';
  }

  function showError(msg) {
    if (errorBanner && errorText) {
      errorText.textContent = msg;
      errorBanner.classList.remove('d-none');
    }
  }

  function hideError() {
    if (errorBanner) errorBanner.classList.add('d-none');
  }

  // Load and Render Tasks
  async function loadTasks() {
    showLoading(true);
    hideError();

    try {
      const tasks = await apiClient.fetchTasks(currentStatus, currentSearch);
      renderTaskList(tasks);
    } catch (err) {
      showError(err.message);
      if (container) {
        container.innerHTML = `
          <div class="col-12 text-center py-5 text-danger">
            <i class="bi bi-cloud-slash fs-1 d-block mb-2"></i>
            <h5>Error Connecting to API</h5>
            <p class="small text-muted mb-3">${err.message}</p>
            <button id="btnRetryLoad" class="btn btn-sm btn-outline-danger px-3">Retry Request</button>
          </div>
        `;
        document.getElementById('btnRetryLoad')?.addEventListener('click', loadTasks);
      }
    } finally {
      showLoading(false);
    }
  }

  function renderTaskList(tasks) {
    if (countBadge) countBadge.textContent = `${tasks.length} tasks`;

    if (!tasks || tasks.length === 0) {
      container.innerHTML = `
        <div class="col-12 text-center py-5 text-muted">
          <i class="bi bi-inbox fs-1 d-block mb-2 text-secondary opacity-50"></i>
          <h5>No Tasks Available</h5>
          <p class="small mb-3">No tasks found matching your filter or query.</p>
          <button class="btn btn-sm btn-primary-tf" data-bs-toggle="modal" data-bs-target="#createTaskModal">
            <i class="bi bi-plus-lg me-1"></i> Add New Task
          </button>
        </div>
      `;
      return;
    }

    const priorityBadges = {
      urgent: '<span class="badge bg-danger">Urgent</span>',
      high: '<span class="badge bg-warning text-dark">High</span>',
      medium: '<span class="badge bg-info-subtle text-info-emphasis">Medium</span>',
      low: '<span class="badge bg-success-subtle text-success">Low</span>'
    };

    container.innerHTML = tasks.map(task => {
      const isCompleted = task.status === 'completed';
      return `
        <div class="col-12 col-md-6 col-lg-4 mb-3" data-id="${task.id}">
          <div class="tf-card h-100 p-3 d-flex flex-column" style="border-left: 4px solid ${task.priority === 'urgent' ? '#EF4444' : task.priority === 'high' ? '#F59E0B' : '#4F46E5'};">
            <div class="d-flex justify-content-between align-items-start mb-2">
              <div>
                ${priorityBadges[task.priority] || '<span class="badge bg-secondary">Normal</span>'}
                <span class="badge bg-light text-secondary border ms-1 small">${task.id}</span>
              </div>
              <div class="dropdown">
                <button class="btn btn-sm btn-light border-0 py-0 px-2" data-bs-toggle="dropdown">
                  <i class="bi bi-three-dots-vertical"></i>
                </button>
                <ul class="dropdown-menu dropdown-menu-end shadow-sm border-0">
                  <li><button class="dropdown-item btn-api-edit" data-id="${task.id}"><i class="bi bi-pencil me-2"></i>Edit Task</button></li>
                  <li><hr class="dropdown-divider"></li>
                  <li><button class="dropdown-item text-danger btn-api-delete" data-id="${task.id}"><i class="bi bi-trash3 me-2"></i>Delete</button></li>
                </ul>
              </div>
            </div>

            <h5 class="h6 fw-bold text-dark mb-1 ${isCompleted ? 'text-decoration-line-through text-muted' : ''}">${escapeHtml(task.title)}</h5>
            <p class="text-muted small mb-3 flex-grow-1">${escapeHtml(task.description || '')}</p>

            <div class="d-flex justify-content-between align-items-center pt-2 border-top small text-muted">
              <span><i class="bi bi-calendar3 me-1"></i>${task.dueDate}</span>
              <div class="d-flex align-items-center gap-1">
                <select class="form-select form-select-sm py-0 px-2 status-select" data-id="${task.id}" style="width: auto; font-size: 0.75rem;">
                  <option value="pending" ${task.status === 'pending' ? 'selected' : ''}>Pending</option>
                  <option value="in-progress" ${task.status === 'in-progress' ? 'selected' : ''}>In Progress</option>
                  <option value="completed" ${task.status === 'completed' ? 'selected' : ''}>Completed</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      `;
    }).join('');

    attachListeners();
  }

  function attachListeners() {
    // Edit task click
    container.querySelectorAll('.btn-api-edit').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const id = e.currentTarget.dataset.id;
        try {
          const task = await apiClient.getTask(id);
          document.getElementById('editTaskId').value = task.id;
          document.getElementById('editTitle').value = task.title;
          document.getElementById('editDescription').value = task.description || '';
          document.getElementById('editPriority').value = task.priority;
          document.getElementById('editDueDate').value = task.dueDate;
          document.getElementById('editStatus').value = task.status;

          const modal = new bootstrap.Modal(document.getElementById('editTaskModal'));
          modal.show();
        } catch (err) {
          showError('Failed to load task details for editing: ' + err.message);
        }
      });
    });

    // Delete task click
    container.querySelectorAll('.btn-api-delete').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const id = e.currentTarget.dataset.id;
        if (confirm(`Are you sure you want to delete task "${id}" via DELETE /api/tasks/${id}?`)) {
          try {
            await apiClient.deleteTask(id);
            await loadTasks();
          } catch (err) {
            showError('Delete failed: ' + err.message);
          }
        }
      });
    });

    // Inline status change select
    container.querySelectorAll('.status-select').forEach(select => {
      select.addEventListener('change', async (e) => {
        const id = e.target.dataset.id;
        const newStatus = e.target.value;
        try {
          await apiClient.updateTask(id, { status: newStatus });
          await loadTasks();
        } catch (err) {
          showError('Status update failed: ' + err.message);
        }
      });
    });
  }

  // Handle Create Task Form (POST /api/tasks)
  const createForm = document.getElementById('apiCreateTaskForm');
  if (createForm) {
    createForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const payload = {
        title: document.getElementById('apiTitle').value,
        description: document.getElementById('apiDescription').value,
        priority: document.getElementById('apiPriority').value,
        dueDate: document.getElementById('apiDueDate').value
      };

      try {
        await apiClient.createTask(payload);
        const modalEl = document.getElementById('createTaskModal');
        const modal = bootstrap.Modal.getInstance(modalEl);
        if (modal) modal.hide();
        createForm.reset();
        await loadTasks();
      } catch (err) {
        alert('Validation or API error: ' + err.message);
      }
    });
  }

  // Handle Edit Task Form (PUT /api/tasks/:id)
  const editForm = document.getElementById('apiEditTaskForm');
  if (editForm) {
    editForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const id = document.getElementById('editTaskId').value;
      const payload = {
        title: document.getElementById('editTitle').value,
        description: document.getElementById('editDescription').value,
        priority: document.getElementById('editPriority').value,
        dueDate: document.getElementById('editDueDate').value,
        status: document.getElementById('editStatus').value
      };

      try {
        await apiClient.updateTask(id, payload);
        const modalEl = document.getElementById('editTaskModal');
        const modal = bootstrap.Modal.getInstance(modalEl);
        if (modal) modal.hide();
        await loadTasks();
      } catch (err) {
        alert('Update error: ' + err.message);
      }
    });
  }

  // Search and Filter Listeners
  const searchInput = document.getElementById('apiSearchInput');
  if (searchInput) {
    let timeout;
    searchInput.addEventListener('input', (e) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        currentSearch = e.target.value;
        loadTasks();
      }, 250);
    });
  }

  document.querySelectorAll('.btn-api-filter').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.btn-api-filter').forEach(b => b.classList.remove('active', 'btn-primary'));
      document.querySelectorAll('.btn-api-filter').forEach(b => b.classList.add('btn-outline-secondary'));

      e.currentTarget.classList.add('active', 'btn-primary');
      e.currentTarget.classList.remove('btn-outline-secondary');

      currentStatus = e.currentTarget.dataset.status;
      loadTasks();
    });
  });

  // Initial Data Load
  loadTasks();
});

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
