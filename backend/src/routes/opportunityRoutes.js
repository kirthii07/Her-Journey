const express = require('express');
const router = express.Router();
const opportunityController = require('../controllers/opportunityController');

router.get('/member/:memberId', opportunityController.getOpportunitiesForMember);

module.exports = router;

