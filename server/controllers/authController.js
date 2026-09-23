/**
 * Authentication Controller: User Registration, Login & Session Management
 * Cognifyz Technologies Full Stack Development Internship - Level 3 Task 6
 */

const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'taskflow_jwt_secret_token_key_2026_cognifyz';

/**
 * Generate JWT token helper
 */
function generateToken(user) {
  return jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

/**
 * GET /auth/register
 */
exports.getRegister = (req, res) => {
  if (req.session && req.session.user) {
    return res.redirect('/dashboard');
  }
  res.render('auth/register', {
    title: 'Create an Account | TaskFlow',
    activeTab: 'register',
    formData: {},
    errors: {},
    message: null,
    user: null
  });
};

/**
 * POST /auth/register
 */
exports.postRegister = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  const isApi = req.xhr || req.headers.accept?.includes('application/json');

  const errors = {};
  if (!name || name.trim().length < 2) errors.name = 'Full name must be at least 2 characters.';
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) errors.email = 'Valid email is required.';
  if (!password || password.length < 6) errors.password = 'Password must be at least 6 characters long.';
  if (password !== confirmPassword) errors.confirmPassword = 'Passwords do not match.';

  if (Object.keys(errors).length > 0) {
    if (isApi) {
      return res.status(400).json({ success: false, errors });
    }
    return res.status(400).render('auth/register', {
      title: 'Create an Account | TaskFlow',
      activeTab: 'register',
      formData: { name, email },
      errors,
      message: { type: 'danger', text: 'Please correct the registration errors below.' },
      user: null
    });
  }

  try {
    const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
    if (existingUser) {
      errors.email = 'An account with this email address already exists.';
      if (isApi) {
        return res.status(400).json({ success: false, errors });
      }
      return res.status(400).render('auth/register', {
        title: 'Create an Account | TaskFlow',
        activeTab: 'register',
        formData: { name, email },
        errors,
        message: { type: 'danger', text: 'Email already registered. Please sign in instead.' },
        user: null
      });
    }

    const newUser = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password
    });

    const userObj = newUser.toJSON();
    const token = generateToken(newUser);

    // Set session for browser views
    req.session.user = userObj;

    if (isApi) {
      return res.status(201).json({
        success: true,
        message: 'Registration successful',
        token,
        user: userObj
      });
    }

    res.redirect('/dashboard');
  } catch (err) {
    console.error('[Register Error]', err);
    if (isApi) return res.status(500).json({ success: false, message: err.message });
    res.status(500).render('auth/register', {
      title: 'Create an Account | TaskFlow',
      activeTab: 'register',
      formData: { name, email },
      errors: {},
      message: { type: 'danger', text: 'Server error during registration: ' + err.message },
      user: null
    });
  }
};

/**
 * GET /auth/login
 */
exports.getLogin = (req, res) => {
  if (req.session && req.session.user) {
    return res.redirect('/dashboard');
  }
  const queryMsg = req.query.message ? { type: 'info', text: req.query.message } : null;
  res.render('auth/login', {
    title: 'Sign In | TaskFlow',
    activeTab: 'login',
    formData: {},
    errors: {},
    message: queryMsg,
    user: null
  });
};

/**
 * POST /auth/login
 */
exports.postLogin = async (req, res) => {
  const { email, password } = req.body;
  const isApi = req.xhr || req.headers.accept?.includes('application/json');

  if (!email || !password) {
    const msg = 'Email and password are required.';
    if (isApi) return res.status(400).json({ success: false, message: msg });
    return res.status(400).render('auth/login', {
      title: 'Sign In | TaskFlow',
      activeTab: 'login',
      formData: { email },
      errors: { general: msg },
      message: { type: 'danger', text: msg },
      user: null
    });
  }

  try {
    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      // Secure timing-safe generic error
      const msg = 'Invalid email or password.';
      if (isApi) return res.status(401).json({ success: false, message: msg });
      return res.status(401).render('auth/login', {
        title: 'Sign In | TaskFlow',
        activeTab: 'login',
        formData: { email },
        errors: { general: msg },
        message: { type: 'danger', text: msg },
        user: null
      });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      const msg = 'Invalid email or password.';
      if (isApi) return res.status(401).json({ success: false, message: msg });
      return res.status(401).render('auth/login', {
        title: 'Sign In | TaskFlow',
        activeTab: 'login',
        formData: { email },
        errors: { general: msg },
        message: { type: 'danger', text: msg },
        user: null
      });
    }

    const userObj = user.toJSON();
    const token = generateToken(user);

    // Save session
    req.session.user = userObj;

    if (isApi) {
      return res.status(200).json({
        success: true,
        message: 'Login successful',
        token,
        user: userObj
      });
    }

    const returnUrl = req.session.returnTo || '/dashboard';
    delete req.session.returnTo;
    res.redirect(returnUrl);
  } catch (err) {
    console.error('[Login Error]', err);
    if (isApi) return res.status(500).json({ success: false, message: err.message });
    res.status(500).render('auth/login', {
      title: 'Sign In | TaskFlow',
      activeTab: 'login',
      formData: { email },
      errors: {},
      message: { type: 'danger', text: 'Server error during login: ' + err.message },
      user: null
    });
  }
};

/**
 * GET /auth/logout
 */
exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/auth/login?message=You have been securely signed out.');
  });
};
