const bcrypt = require('bcryptjs');
const Employee = require('./models/employee');

// Function to create an admin if it doesn't exist
const createAdminIfNotExists = async () => {
    try {
        // Check if admin already exists
        const admin = await Employee.findOne({ email: 'admin@example.com' });
        if (!admin) {
            // Admin doesn't exist, create a new admin
            const hashedPassword = await bcrypt.hash('adminpassword', 10); // Hash the password
            const newAdmin = new Employee({
                name: 'Admin',
                email: 'admin@example.com',
                position: 'Admin',
                salary: 0,
                department: 'Admin',
                password: hashedPassword,
                role: 'Admin' // Ensure the role is 'Admin'
            });

            await newAdmin.save();
            console.log('Admin user created with email: admin@example.com and password: adminpassword');
        } else {
            console.log('Admin user already exists.');
        }
    } catch (error) {
        console.error('Error creating admin user:', error.message);
    }
};

module.exports = createAdminIfNotExists;
