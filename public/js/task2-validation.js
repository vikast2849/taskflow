/**
 * Task 2: Client-Side Form Validation & Interactive Feedback
 * Cognifyz Technologies Full Stack Development Internship - Level 1 Task 2
 */

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('task2Form');
  if (!form) return;

  const titleInput = document.getElementById('task2Title');
  const prioritySelect = document.getElementById('task2Priority');
  const dueDateInput = document.getElementById('task2DueDate');
  const descInput = document.getElementById('task2Description');

  // Helper to mark field error
  function setError(inputElement, errorSpanId, message) {
    inputElement.classList.add('is-invalid');
    inputElement.classList.remove('is-valid');
    const span = document.getElementById(errorSpanId);
    if (span) {
      span.textContent = message;
      span.style.display = 'block';
    }
  }

  // Helper to mark field success
  function setSuccess(inputElement, errorSpanId) {
    inputElement.classList.remove('is-invalid');
    inputElement.classList.add('is-valid');
    const span = document.getElementById(errorSpanId);
    if (span) {
      span.textContent = '';
      span.style.display = 'none';
    }
  }

  // Field validation functions
  function validateTitle() {
    const val = titleInput.value.trim();
    if (!val) {
      setError(titleInput, 'titleClientError', 'Client Validation: Task title is required.');
      return false;
    }
    if (val.length < 3) {
      setError(titleInput, 'titleClientError', 'Client Validation: Title must be at least 3 characters.');
      return false;
    }
    if (val.length > 100) {
      setError(titleInput, 'titleClientError', 'Client Validation: Title cannot exceed 100 characters.');
      return false;
    }
    setSuccess(titleInput, 'titleClientError');
    return true;
  }

  function validatePriority() {
    const val = prioritySelect.value;
    if (!val) {
      setError(prioritySelect, 'priorityClientError', 'Client Validation: Please select a task priority.');
      return false;
    }
    setSuccess(prioritySelect, 'priorityClientError');
    return true;
  }

  function validateDueDate() {
    const val = dueDateInput.value;
    if (!val) {
      setError(dueDateInput, 'dueDateClientError', 'Client Validation: Due date is required.');
      return false;
    }
    const selectedDate = new Date(val);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (isNaN(selectedDate.getTime())) {
      setError(dueDateInput, 'dueDateClientError', 'Client Validation: Please enter a valid date.');
      return false;
    }
    if (selectedDate < today) {
      setError(dueDateInput, 'dueDateClientError', 'Client Validation: Due date cannot be in the past.');
      return false;
    }
    setSuccess(dueDateInput, 'dueDateClientError');
    return true;
  }

  // Live input event listeners for immediate interactive feedback
  titleInput.addEventListener('input', validateTitle);
  prioritySelect.addEventListener('change', validatePriority);
  dueDateInput.addEventListener('change', validateDueDate);

  // Form submission prevention on invalid inputs
  form.addEventListener('submit', (e) => {
    const isTitleValid = validateTitle();
    const isPriorityValid = validatePriority();
    const isDueDateValid = validateDueDate();

    if (!isTitleValid || !isPriorityValid || !isDueDateValid) {
      e.preventDefault();
      // Highlight form-level alert
      const clientAlert = document.getElementById('clientValidationBanner');
      if (clientAlert) {
        clientAlert.classList.remove('d-none');
        clientAlert.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      console.warn('[Task 2 Client Validation] Form submission prevented due to invalid fields.');
    } else {
      const clientAlert = document.getElementById('clientValidationBanner');
      if (clientAlert) clientAlert.classList.add('d-none');
    }
  });
});
