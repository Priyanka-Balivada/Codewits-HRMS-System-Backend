const express = require('express');
// const connectDB = require('./config/db');
const mongoose = require('mongoose');

const employeeRoutes = require('./routes/employeeRoutes');
const leaveRoutes = require('./routes/leaveRoutes');
const authRoutes = require('./routes/auth');
const createAdminIfNotExists = require('./createAdmin');

const app = express();

// Load environment variables
require('dotenv').config();

// Connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/HRMS_DB");
        console.log('MongoDB connected');
        createAdminIfNotExists();
    } catch (error) {
        console.error('MongoDB connection error', error);
        process.exit(1);
    }
};

connectDB();

// Middleware
app.use(express.json());

// Routes

app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/leaves', leaveRoutes);

module.exports = app;
