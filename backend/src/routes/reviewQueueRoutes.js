const express = require('express');
const router = express.Router();
const reviewQueueController = require('../controllers/reviewQueueController');
const { authorizeRoles } = require('../middleware/auth');

router.get('/', authorizeRoles('MANAGER'), reviewQueueController.getReviewQueueItems);
router.put('/:id', authorizeRoles('MANAGER'), reviewQueueController.resolveReviewQueueItem);

module.exports = router;

