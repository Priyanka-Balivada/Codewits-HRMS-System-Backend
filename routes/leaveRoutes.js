const express = require('express');
const { authenticateToken, authorizeRole } = require('../middlewares/authMiddleware');
const { submitLeave, updateLeaveStatus } = require('../controllers/leaveController');
const router = express.Router();

router.post('/submit', authenticateToken, submitLeave);
router.patch('/status/:id', authenticateToken, authorizeRole('Admin'), updateLeaveStatus);

module.exports = router;
