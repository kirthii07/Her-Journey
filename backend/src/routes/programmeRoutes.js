const express = require('express');
const router = express.Router();
const programmeController = require('../controllers/programmeController');
const applicationController = require('../controllers/applicationController');
const { authorizeRoles } = require('../middleware/auth');

router.get('/', programmeController.getAllProgrammes);
router.get('/:id', programmeController.getProgrammeById);
router.post('/', authorizeRoles('MANAGER'), programmeController.createProgramme);
router.put('/:id', authorizeRoles('MANAGER'), programmeController.updateProgramme);
router.get('/:id/eligible-members', authorizeRoles('MANAGER'), programmeController.getEligibleMembersForProgramme);
router.post('/:id/invite', authorizeRoles('MANAGER'), applicationController.inviteMember);

module.exports = router;

