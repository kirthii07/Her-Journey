const express = require('express');
const router = express.Router();
const communityController = require('../controllers/communityController');

router.get('/', communityController.getAllCommunities);
router.post('/:id/join', communityController.joinCommunity);
router.post('/:id/leave', communityController.leaveCommunity);

module.exports = router;

