const express = require('express');
const router = express.Router();
const memberController = require('../controllers/memberController');
const { authorizeMemberSelf } = require('../middleware/auth');

router.get('/', memberController.getAllMembers);
router.post('/check-duplicate', memberController.checkDuplicate);
router.get('/:id', memberController.getMemberById);
router.put('/:id', authorizeMemberSelf, memberController.updateMember);

module.exports = router;

