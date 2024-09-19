const Employee = require('../models/employee');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// User login (Admin/Employee)
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const employee = await Employee.findOne({ email });
        if (!employee) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, employee.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: employee._id, role: employee.role }, // Include user's role in the token
            process.env.JWT_SECRET, // Use a strong secret key from environment variables
            { expiresIn: '1h' } // Token expiration time
        );

        // Return the token
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
