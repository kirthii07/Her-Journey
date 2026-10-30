const express = require('express');
const router = express.Router();
const certificateController = require('../controllers/certificateController');
const { authorizeRoles } = require('../middleware/auth');

router.post('/', authorizeRoles('MANAGER'), certificateController.issueCertificate);
router.get('/member/:memberId', certificateController.getMemberCertificates);

module.exports = router;

