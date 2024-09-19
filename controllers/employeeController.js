const Employee = require('../models/employee');
const bcrypt = require('bcryptjs');

// Create employee (Admin only)
exports.createEmployee = async (req, res) => {
    if (req.user.role !== 'Admin') {
        return res.status(403).json({ message: 'Access forbidden: Admins only' });
    }

    const { name, email, position, salary, department, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newEmployee = new Employee({
            name,
            email,
            position,
            salary,
            department,
            password: hashedPassword
        });
        await newEmployee.save();
        res.status(201).json(newEmployee);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all employees (Admin only)
exports.getAllEmployees = async (req, res) => {
    if (req.user.role !== 'Admin') {
        return res.status(403).json({ message: 'Access forbidden: Admins only' });
    }

    try {
        const employees = await Employee.find();
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single employee by ID (Admin/Employee)
exports.getEmployeeById = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        // Allow employee to view their own profile or Admin to view any profile
        if (req.user.role !== 'Admin' && req.user.id !== req.params.id) {
            return res.status(403).json({ message: 'Access forbidden: You can only view your own profile' });
        }

        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update employee (Admin only)
exports.updateEmployee = async (req, res) => {
    if (req.user.role !== 'Admin') {
        return res.status(403).json({ message: 'Access forbidden: Admins only' });
    }

    const { name, email, position, salary, department, password } = req.body;
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        // Update employee details
        if (name) employee.name = name;
        if (email) employee.email = email;
        if (position) employee.position = position;
        if (salary) employee.salary = salary;
        if (department) employee.department = department;
        if (password) employee.password = await bcrypt.hash(password, 10);

        await employee.save();
        res.status(200).json(employee);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete employee (Admin only)
exports.deleteEmployee = async (req, res) => {
    if (req.user.role !== 'Admin') {
        return res.status(403).json({ message: 'Access forbidden: Admins only' });
    }

    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        await employee.deleteOne();
        res.status(200).json({ message: 'Employee removed successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
