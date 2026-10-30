const express = require('express');
const router = express.Router();
const mentorshipController = require('../controllers/mentorshipController');

router.get('/member/:memberId', mentorshipController.getMentorshipForMember);
router.post('/', mentorshipController.createMentorship);

module.exports = router;

