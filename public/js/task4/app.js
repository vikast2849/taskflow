/**
 * Task 4 Main Orchestrator Module
 * Cognifyz Technologies Full Stack Development Internship - Level 2 Task 4
 */

import { ValidationModule } from './validation.js';
import { TaskManager } from './taskManager.js';
import { ClientRouter } from './router.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Task Manager with dynamic stats selectors
  const taskManager = new TaskManager('dynamicTaskGrid', {
    total: document.getElementById('domStatTotal'),
    pending: document.getElementById('domStatPending'),
    inProgress: document.getElementById('domStatInProgress'),
    completed: document.getElementById('domStatCompleted'),
    rate: document.getElementById('domStatRate')
  });
  taskManager.init();

  // 2. Initialize Client-Side Router
  const router = new ClientRouter({
    '#tasks': 'viewTasks',
    '#create': 'viewCreate',
    '#register-demo': 'viewRegister',
    '#stats': 'viewStats'
  }, '#tasks');
  router.init();

  // 3. Bind Search & Filter Controls
  const searchInput = document.getElementById('domSearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      taskManager.setSearch(e.target.value);
    });
  }

  document.querySelectorAll('.btn-filter-pill').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.btn-filter-pill').forEach(b => b.classList.remove('active', 'btn-primary'));
      document.querySelectorAll('.btn-filter-pill').forEach(b => b.classList.add('btn-outline-secondary'));

      e.currentTarget.classList.add('active', 'btn-primary');
      e.currentTarget.classList.remove('btn-outline-secondary');
      taskManager.setFilter(e.currentTarget.dataset.filter);
    });
  });

  // 4. Bind Dynamic Task Creation Form
  const dynamicTaskForm = document.getElementById('dynamicTaskForm');
  if (dynamicTaskForm) {
    dynamicTaskForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const title = document.getElementById('dynTitle').value;
      const priority = document.getElementById('dynPriority').value;
      const dueDate = document.getElementById('dynDueDate').value;
      const description = document.getElementById('dynDescription').value;

      const validation = ValidationModule.validateTaskInput({ title, priority, dueDate });

      if (!validation.isValid) {
        // Show validation errors
        if (validation.errors.title) {
          document.getElementById('dynTitle').classList.add('is-invalid');
          document.getElementById('dynTitleError').textContent = validation.errors.title;
        }
        if (validation.errors.priority) {
          document.getElementById('dynPriority').classList.add('is-invalid');
          document.getElementById('dynPriorityError').textContent = validation.errors.priority;
        }
        if (validation.errors.dueDate) {
          document.getElementById('dynDueDate').classList.add('is-invalid');
          document.getElementById('dynDueDateError').textContent = validation.errors.dueDate;
        }
        return;
      }

      // Add task dynamically into the DOM
      taskManager.addTask({ title, priority, dueDate, description });

      // Reset form and errors
      dynamicTaskForm.reset();
      document.querySelectorAll('#dynamicTaskForm .is-invalid').forEach(el => el.classList.remove('is-invalid'));

      // Show toast notification
      showToast('Task added dynamically to the DOM!');

      // Smoothly navigate to the tasks board via client routing
      window.location.hash = '#tasks';
    });
  }

  // 5. Bind Complex Registration Validation Form with Live Password Strength Meter
  const regEmail = document.getElementById('regEmail');
  const regPassword = document.getElementById('regPassword');
  const regConfirmPassword = document.getElementById('regConfirmPassword');
  const meterBar = document.getElementById('passwordMeterBar');
  const meterLabel = document.getElementById('passwordMeterLabel');
  const regForm = document.getElementById('complexRegisterForm');

  // Live Password Strength Analysis
  if (regPassword) {
    regPassword.addEventListener('input', () => {
      const val = regPassword.value;
      const evalResult = ValidationModule.evaluatePasswordStrength(val);

      meterBar.className = 'strength-meter-bar';
      if (val.length === 0) {
        meterBar.style.width = '0%';
        meterLabel.textContent = 'Enter password to test strength';
        meterLabel.style.color = '#64748B';
      } else {
        meterBar.classList.add(`strength-${evalResult.strength}`);
        meterLabel.textContent = evalResult.label;
        meterLabel.style.color = evalResult.color;
      }

      // Update criteria checklist indicators
      updateCriterion('critLength', evalResult.checks.length);
      updateCriterion('critLower', evalResult.checks.lowercase);
      updateCriterion('critUpper', evalResult.checks.uppercase);
      updateCriterion('critNumber', evalResult.checks.number);
      updateCriterion('critSpecial', evalResult.checks.special);

      // Check confirm password matching if filled
      if (regConfirmPassword.value) {
        validateConfirmMatch();
      }
    });
  }

  function updateCriterion(id, isMet) {
    const el = document.getElementById(id);
    if (!el) return;
    if (isMet) {
      el.classList.add('met');
      el.querySelector('i').className = 'bi bi-check-circle-fill';
    } else {
      el.classList.remove('met');
      el.querySelector('i').className = 'bi bi-dash-circle';
    }
  }

  function validateConfirmMatch() {
    const isMatch = ValidationModule.validatePasswordMatch(regPassword.value, regConfirmPassword.value);
    if (isMatch) {
      regConfirmPassword.classList.remove('is-invalid');
      regConfirmPassword.classList.add('is-valid');
      document.getElementById('regConfirmError').style.display = 'none';
      return true;
    } else {
      regConfirmPassword.classList.remove('is-valid');
      regConfirmPassword.classList.add('is-invalid');
      document.getElementById('regConfirmError').textContent = 'Passwords do not match.';
      document.getElementById('regConfirmError').style.display = 'block';
      return false;
    }
  }

  if (regConfirmPassword) {
    regConfirmPassword.addEventListener('input', validateConfirmMatch);
  }

  if (regEmail) {
    regEmail.addEventListener('input', () => {
      if (ValidationModule.validateEmail(regEmail.value)) {
        regEmail.classList.remove('is-invalid');
        regEmail.classList.add('is-valid');
      } else {
        regEmail.classList.remove('is-valid');
        regEmail.classList.add('is-invalid');
      }
    });
  }

  if (regForm) {
    regForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const isEmailValid = ValidationModule.validateEmail(regEmail.value);
      const evalPass = ValidationModule.evaluatePasswordStrength(regPassword.value);
      const isMatch = validateConfirmMatch();

      if (!isEmailValid) {
        regEmail.classList.add('is-invalid');
      }

      if (!evalPass.isValid) {
        regPassword.classList.add('is-invalid');
      }

      if (isEmailValid && evalPass.isValid && isMatch) {
        const successModal = document.getElementById('regSuccessAlert');
        if (successModal) {
          successModal.classList.remove('d-none');
          regForm.reset();
          meterBar.className = 'strength-meter-bar';
          meterBar.style.width = '0%';
          meterLabel.textContent = 'Password validated successfully!';
          document.querySelectorAll('.criteria-item').forEach(c => c.classList.remove('met'));
          document.querySelectorAll('#complexRegisterForm .is-valid').forEach(el => el.classList.remove('is-valid'));
        }
      }
    });
  }

  function showToast(msg) {
    console.log(`[TaskFlow DOM Toast] ${msg}`);
  }
});
