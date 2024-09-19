const express = require('express');
const { authenticateToken, authorizeRole } = require('../middlewares/authMiddleware');
const { createEmployee } = require('../controllers/employeeController');
const router = express.Router();

router.post('/create', authenticateToken, authorizeRole('Admin'), createEmployee);

module.exports = router;
