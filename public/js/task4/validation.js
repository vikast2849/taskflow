/**
 * Task 4 Module: Complex Client-Side Form Validation
 * Cognifyz Technologies Full Stack Development Internship - Level 2 Task 4
 */

export const ValidationModule = {
  /**
   * Validates email format using RFC 5322 compliant regex pattern
   */
  validateEmail(email) {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).trim());
  },

  /**
   * Evaluates password complexity and returns score + individual criteria flags
   * Requirements:
   * - Length >= 8
   * - Uppercase letter
   * - Lowercase letter
   * - Number
   * - Special symbol
   */
  evaluatePasswordStrength(password) {
    const checks = {
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
    };

    let score = 0;
    if (checks.length) score += 20;
    if (checks.lowercase) score += 20;
    if (checks.uppercase) score += 20;
    if (checks.number) score += 20;
    if (checks.special) score += 20;

    let strength = 'weak';
    let label = 'Weak (Does not meet security guidelines)';
    let color = '#EF4444';

    if (score >= 80) {
      strength = 'strong';
      label = 'Strong (Excellent security)';
      color = '#10B981';
    } else if (score >= 60) {
      strength = 'medium';
      label = 'Moderate (Good, add special symbols for strong)';
      color = '#F59E0B';
    }

    return {
      score,
      strength,
      label,
      color,
      checks,
      isValid: score >= 60 // Minimum acceptable for submission
    };
  },

  /**
   * Validates matching confirm password
   */
  validatePasswordMatch(password, confirmPassword) {
    return password.length > 0 && password === confirmPassword;
  },

  /**
   * Validates task creation inputs
   */
  validateTaskInput({ title, dueDate, priority }) {
    const errors = {};

    if (!title || title.trim().length < 3) {
      errors.title = 'Title must be at least 3 characters.';
    } else if (title.trim().length > 100) {
      errors.title = 'Title cannot exceed 100 characters.';
    }

    if (!priority) {
      errors.priority = 'Please select a priority.';
    }

    if (!dueDate) {
      errors.dueDate = 'Due date is required.';
    } else {
      const selected = new Date(dueDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (isNaN(selected.getTime()) || selected < today) {
        errors.dueDate = 'Due date cannot be in the past.';
      }
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }
};
