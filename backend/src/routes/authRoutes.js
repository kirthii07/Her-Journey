const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Real database login endpoint
router.post('/login', authController.login);

// Demo quick-switch endpoint
router.post('/demo-login', authController.demoLogin);

// Current user profile
router.get('/me', authController.getMe);

// Demo profiles directory
router.get('/demo-profiles', authController.getDemoProfiles);

module.exports = router;
