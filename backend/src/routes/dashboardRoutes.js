const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const { authorizeRoles } = require('../middleware/auth');

router.get('/member/:memberId', dashboardController.getMemberDashboard);
router.get('/manager', authorizeRoles('MANAGER'), dashboardController.getManagerDashboard);
router.get('/partner/:partnerId', authorizeRoles('PARTNER', 'MANAGER'), dashboardController.getPartnerDashboard);

module.exports = router;

