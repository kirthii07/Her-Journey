const express = require('express');
const router = express.Router();
const reconciliationController = require('../controllers/reconciliationController');
const { authorizeRoles } = require('../middleware/auth');

router.post('/preview-csv', authorizeRoles('MANAGER'), reconciliationController.previewReconciliation);

module.exports = router;

