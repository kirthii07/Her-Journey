const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/applicationController');
const { authorizeRoles } = require('../middleware/auth');

router.get('/', applicationController.getApplications);
router.get('/:id', applicationController.getApplicationById);
router.post('/', applicationController.registerForProgramme);
router.put('/:id/stage', authorizeRoles('MANAGER'), applicationController.updateStage);
router.put('/:id/attendance', authorizeRoles('MANAGER'), applicationController.updateAttendance);
router.put('/:id/hire', authorizeRoles('PARTNER', 'MANAGER'), applicationController.markCandidateHired);

module.exports = router;

