const express = require('express');
const router = express.Router();

// Showcase Hub landing page
router.get('/', (req, res) => {
  res.render('index', {
    title: 'Showcase Hub | Cognifyz Full Stack Development Internship',
    activeTab: 'home',
    user: req.session ? req.session.user : null
  });
});

module.exports = router;
