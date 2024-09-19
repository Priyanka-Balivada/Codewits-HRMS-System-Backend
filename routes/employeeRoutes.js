const express = require('express');
const { authenticateToken, authorizeRole } = require('../middlewares/authMiddleware');
const {
    createEmployee,
    getAllEmployees,
    getEmployeeById,
    updateEmployee,
    deleteEmployee
} = require('../controllers/employeeController');

const router = express.Router();

// Create employee (Admin only)
router.post('/create', authenticateToken, authorizeRole('Admin'), createEmployee);

// Get all employees (Admin only)
router.get('/', authenticateToken, authorizeRole('Admin'), getAllEmployees);

// Get a specific employee by ID (Admin only)
router.get('/:id', authenticateToken, authorizeRole('Admin'), getEmployeeById);

// Update employee by ID (Admin only)
router.put('/:id', authenticateToken, authorizeRole('Admin'), updateEmployee);

// Delete employee by ID (Admin only)
router.delete('/:id', authenticateToken, authorizeRole('Admin'), deleteEmployee);

module.exports = router;
