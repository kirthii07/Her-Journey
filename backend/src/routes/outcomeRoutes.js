const express = require('express');
const router = express.Router();
const outcomeController = require('../controllers/outcomeController');
const { authorizeRoles } = require('../middleware/auth');

router.post('/', outcomeController.reportOutcome);
router.get('/', outcomeController.getOutcomes);
router.put('/:id/verify', authorizeRoles('MANAGER', 'PARTNER'), outcomeController.verifyOutcome);

module.exports = router;

